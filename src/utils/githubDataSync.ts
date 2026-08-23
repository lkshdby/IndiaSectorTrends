import { DailySnapshot } from '../types';
import { unpackSnapshots } from './compactData';

const GITHUB_REPO_STORAGE_KEY = 'screener_github_repo_target';
const DEFAULT_REPO = 'lkshdby/screenersectorytrends';

/**
 * Get user configured GitHub repo target (e.g. 'lkshdby/screenersectorytrends')
 */
export function getSavedGitHubRepo(): string {
  try {
    const saved = localStorage.getItem(GITHUB_REPO_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
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

/**
 * Fetch the latest live daily industry snapshots from GitHub's data-storage branch.
 * Tries fast global jsDelivr CDN first, then falls back to Raw GitHub UserContent.
 */
export async function fetchSnapshotsFromGitHub(
  repoName = getSavedGitHubRepo()
): Promise<{ success: boolean; data?: DailySnapshot[]; error?: string; source?: string }> {
  if (!repoName || !repoName.includes('/')) {
    return { success: false, error: 'Invalid GitHub repository format. Use owner/repo' };
  }

  const cleanRepo = repoName.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
  const timestamp = Date.now();

  const cdnUrl = `https://cdn.jsdelivr.net/gh/${cleanRepo}@data-storage/public/data/snapshots.json?v=${timestamp}`;
  const rawGithubUrl = `https://raw.githubusercontent.com/${cleanRepo}/data-storage/public/data/snapshots.json?v=${timestamp}`;
  const directSnapshotsUrl = `https://raw.githubusercontent.com/${cleanRepo}/data-storage/snapshots.json?v=${timestamp}`;

  const endpoints = [
    { url: cdnUrl, name: 'jsDelivr Edge CDN' },
    { url: rawGithubUrl, name: 'GitHub Raw (public/data)' },
    { url: directSnapshotsUrl, name: 'GitHub Raw (root)' },
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
          return {
            success: true,
            data: unpacked,
            source: `${endpoint.name} (${cleanRepo}@data-storage)`,
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
