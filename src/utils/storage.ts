import { DailySnapshot } from '../types';
import { compressSnapshots, unpackSnapshots } from './compactData';

const LOCAL_STORAGE_KEY = 'screener_industry_snapshots_compact_v2';
const LEGACY_STORAGE_KEY = 'screener_industry_snapshots_v1';

export function loadSnapshotsLocally(): DailySnapshot[] | null {
  try {
    // 1. Try compact format first
    const savedCompact = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCompact) {
      const parsed = JSON.parse(savedCompact);
      let unpacked = unpackSnapshots(parsed);
      unpacked = unpacked.filter((s) => s && s.date && s.date >= '2026-08-23');
      if (unpacked.length > 0) return unpacked;
    }

    // 2. Fallback to legacy key if exists
    const savedLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (savedLegacy) {
      const parsedLegacy = JSON.parse(savedLegacy);
      if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
        const filtered = parsedLegacy.filter((s: any) => s && s.date && s.date >= '2026-08-23');
        if (filtered.length > 0) return filtered;
      }
    }
  } catch (e) {
    console.warn('Failed to load snapshots from localStorage:', e);
  }
  return null;
}

export function clearLocalStorageCache(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function saveSnapshotsLocally(snapshots: DailySnapshot[]): void {
  if (!snapshots || snapshots.length === 0) return;

  try {
    // Remove old bulky legacy format
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }

    // Save ultra-compact version
    const compact = compressSnapshots(snapshots);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(compact));
  } catch (err: any) {
    console.warn('localStorage write warning, attempting trimmed cache:', err);
    try {
      const trimmed = snapshots.slice(-45);
      const compactTrimmed = compressSnapshots(trimmed);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(compactTrimmed));
    } catch {
      // Ignore fallback failure
    }
  }
}

