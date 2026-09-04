import { DailySnapshot } from '../types';
import { unpackSnapshots } from './compactData';

const GITHUB_REPO_STORAGE_KEY = 'screener_github_repo_target';
const DATA_SOURCE_STORAGE_KEY = 'screener_data_source_type';
export const DEFAULT_REPO = 'lkshdby/IndiaSectorTrends';

/**
 * Get user configured GitHub repo target (e.g. 'lkshdby/IndiaSectorTrends')
 */
export function getSavedGitHubRepo(): string {
  try {
    const saved = localStorage.getItem(GITHUB_REPO_STORAGE_KEY);
    if (saved && saved.trim() && saved.includes('/')) return saved.trim();
  } catch {
    // ignore
  }
  return DEFAULT_REPO;
}

/**
 * Save user preferred GitHub repo target
 */
export function setSavedGitHubRepo(repo: string): void {
  try {
    localStorage.setItem(GITHUB_REPO_STORAGE_KEY, repo.trim());
  } catch {
    // ignore
  }
}

export function getDataSourceBadge(): { isLive: boolean; label: string; updatedAt?: string } {
  try {
    const info = localStorage.getItem(DATA_SOURCE_STORAGE_KEY);
    if (info) {
      return JSON.parse(info);
    }
  } catch {
    // ignore
  }
  return { isLive: false, label: 'Synthetic Historical Seed' };
}

export function setDataSourceBadge(isLive: boolean, label: string, updatedAt?: string): void {
  try {
    localStorage.setItem(
      DATA_SOURCE_STORAGE_KEY,
      JSON.stringify({ isLive, label, updatedAt: updatedAt || new Date().toISOString() })
    );
  } catch {
    // ignore
  }
}

/**
 * Fetch the latest live daily industry snapshots from GitHub's data-storage branch.
 * Tries fast global jsDelivr CDN first, then falls back to Raw GitHub UserContent.
 */
export async function fetchSnapshotsFromGitHub(
  repoName = getSavedGitHubRepo()
): Promise<{ success: boolean; data?: DailySnapshot[]; error?: string; source?: string; updatedAt?: string }> {
  const targetRepo = repoName && repoName.includes('/') ? repoName : DEFAULT_REPO;
  const cleanRepo = targetRepo.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
  const timestamp = Date.now();

  const endpoints = [
    {
      url: `https://raw.githubusercontent.com/${cleanRepo}/data-storage/public/data/snapshots.json?v=${timestamp}`,
      name: 'GitHub Raw (data-storage branch)',
      branch: 'data-storage',
    },
    {
      url: `https://raw.githubusercontent.com/${cleanRepo}/data-storage/snapshots.json?v=${timestamp}`,
      name: 'GitHub Raw (data-storage root)',
      branch: 'data-storage',
    },
    {
      url: `https://cdn.jsdelivr.net/gh/${cleanRepo}@data-storage/public/data/snapshots.json?v=${timestamp}`,
      name: 'jsDelivr CDN (data-storage)',
      branch: 'data-storage',
    },
    {
      url: `https://raw.githubusercontent.com/${cleanRepo}/main/public/data/snapshots.json?v=${timestamp}`,
      name: 'GitHub Raw (main branch)',
      branch: 'main',
    },
    {
      url: `https://cdn.jsdelivr.net/gh/${cleanRepo}@main/public/data/snapshots.json?v=${timestamp}`,
      name: 'jsDelivr CDN (main)',
      branch: 'main',
    },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url, {
        cache: 'no-cache',
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const rawJson = await response.json();
        let unpacked = unpackSnapshots(rawJson);
        // Purge any legacy synthetic mock data prior to real scrape start (2026-08-23)
        if (unpacked && unpacked.length > 0) {
          unpacked = unpacked.filter((s) => s && s.date && s.date >= '2026-08-23');
        }
        if (unpacked && unpacked.length > 0) {
          const updatedAt = rawJson.updatedAt || new Date().toISOString();
          setDataSourceBadge(true, `GitHub Actions (${cleanRepo}@${endpoint.branch})`, updatedAt);
          return {
            success: true,
            data: unpacked,
            source: `${endpoint.name}`,
            updatedAt,
          };
        }
      }
    } catch {
      // Continue to next endpoint fallback
    }
  }

  return {
    success: false,
    error: `Could not fetch live data from ${cleanRepo}. Ensure your GitHub Action has run successfully in your GitHub repo, and that the repository is Public.`,
  };
}

/**
 * Calculates the next in-browser Auto-Sync window.
 * The GitHub workflow runs at :37 hourly (09:37 AM to 07:37 PM IST, Mon-Fri).
 * The in-browser Auto-Sync runs with an offset at :00 (10:00 AM to 08:00 PM IST, Mon-Fri)
 * to smoothly pull the fresh data snapshot into the active page without manual intervention.
 */
export function getNextInPageAutoSyncTime(): {
  formattedIST: string;
  isDuringMarketHours: boolean;
  istHour: number;
  istMinute: number;
  istDay: string;
} {
  const now = new Date();

  // Parse current IST time
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    hour12: false,
  });

  const parts = istFormatter.formatToParts(now);
  const istHour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const istMinute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const istDay = parts.find((p) => p.type === 'weekday')?.value || 'Mon';

  const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(istDay);
  const isDuringMarketHours = isWeekday && istHour >= 10 && istHour <= 20;

  // Auto-sync occurs at :00 for hours 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  let targetHour = 10;
  let targetPrefix = 'Today';

  if (!isWeekday) {
    targetPrefix = istDay === 'Sat' ? 'Monday' : 'Monday';
    targetHour = 10;
  } else if (istHour < 10) {
    targetPrefix = 'Today';
    targetHour = 10;
  } else if (istHour >= 20 && istMinute > 0) {
    targetPrefix = istDay === 'Fri' ? 'Monday' : 'Tomorrow';
    targetHour = 10;
  } else {
    // Current hour + 1 at top of the hour
    targetHour = istMinute === 0 ? istHour : istHour + 1;
    if (targetHour > 20) {
      targetPrefix = istDay === 'Fri' ? 'Monday' : 'Tomorrow';
      targetHour = 10;
    } else {
      targetPrefix = 'Today';
    }
  }

  const hour12 = targetHour % 12 === 0 ? 12 : targetHour % 12;
  const ampm = targetHour >= 12 ? 'PM' : 'AM';
  const formattedIST = `${targetPrefix} @ ${hour12}:00 ${ampm} IST`;

  return {
    formattedIST,
    isDuringMarketHours,
    istHour,
    istMinute,
    istDay,
  };
}

