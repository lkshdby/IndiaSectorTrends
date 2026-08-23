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
      name: 'GitHub Raw (public/data)',
    },
    {
      url: `https://raw.githubusercontent.com/${cleanRepo}/data-storage/snapshots.json?v=${timestamp}`,
      name: 'GitHub Raw (root)',
    },
    {
      url: `https://cdn.jsdelivr.net/gh/${cleanRepo}@data-storage/public/data/snapshots.json?v=${timestamp}`,
      name: 'jsDelivr Edge CDN',
    },
    {
      url: `https://cdn.jsdelivr.net/gh/${cleanRepo}@data-storage/snapshots.json?v=${timestamp}`,
      name: 'jsDelivr (root)',
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
        const unpacked = unpackSnapshots(rawJson);
        if (unpacked && unpacked.length > 0) {
          const updatedAt = rawJson.updatedAt || new Date().toISOString();
          setDataSourceBadge(true, `GitHub Actions (${cleanRepo}@data-storage)`, updatedAt);
          return {
            success: true,
            data: unpacked,
            source: `${endpoint.name} (${cleanRepo}@data-storage)`,
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
    error: `Could not fetch from data-storage branch on ${cleanRepo}. Ensure the GitHub Action has run once.`,
  };
}

