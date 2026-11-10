import React, { useRef, useState } from 'react';
import { CheckCircle2, FileUp, LockKeyhole, Trash2 } from 'lucide-react';
import {
  clearPrivateIndustryEvidence, savePrivateIndustryEvidence,
  type PrivateIndustryAssignments,
} from '../utils/privateIndustryEvidence';

interface Props {
  activeCount: number;
  onImport: (assignments: PrivateIndustryAssignments) => void;
  onRemove: () => void;
}

/** No upload endpoint: the selected JSON is validated and stored on this browser only. */
export function PrivateIndustryImportPanel({ activeCount, onImport, onRemove }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  const accept = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    setMessage(null);
    setIsReading(true);
    try {
      if (file.size > 2_000_000) throw new Error('File exceeds the 2 MB limit. Choose the 313-record private JSON, not the full CSV.');
      const contents = await file.text();
      const result = savePrivateIndustryEvidence(JSON.parse(contents));
      onImport(result.assignments);
      setMessage(result.assignments.size + ' Screener classifications are now active in this browser. ' +
        result.primarySourceDuplicates + ' duplicates retained from NSE.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to import private industry evidence.');
    } finally {
      setIsReading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const remove = () => {
    clearPrivateIndustryEvidence();
    onRemove();
    setError(null);
    setMessage('Private Screener mappings removed from this browser.');
  };

  return (
    <div className="rounded-2xl bg-[#eff6ff] border border-[#93c5fd]/60 p-4 space-y-3"
      aria-label="Private industry mapping import">
      <div className="flex items-start gap-2">
        <LockKeyhole className="h-5 w-5 text-[#1d4ed8] mt-0.5 shrink-0"/>
        <div>
          <h3 className="text-sm font-extrabold">Activate your 313 private Screener industry mappings</h3>
          <p className="text-xs text-[#08090a]/75 mt-1 leading-relaxed">
            Import your <code>IndiaSectorTrends_screener_evidence_PRIVATE.json</code>.
            We validate every ticker, NSE industry code, source link and date, then combine it with the existing NSE-verified records.
            <strong> The file stays in this browser's local storage; no upload or server copy.</strong>
            Data is private to this browser, not synced to other devices.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="min-h-10 inline-flex items-center gap-2 cursor-pointer rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2 text-xs font-bold">
          <FileUp className="w-4 h-4"/>
          {isReading ? 'Checking file…' : activeCount ? 'Replace private mappings' : 'Choose private JSON'}
          <input ref={fileRef} type="file" accept=".json,application/json" className="sr-only"
            onChange={accept} disabled={isReading} aria-label="Import private Screener industry classifications"/>
        </label>
        <span className="text-sm font-bold text-[#1d4ed8]">
          {activeCount ? <><CheckCircle2 className="w-4 h-4 inline mr-1"/>{activeCount} mappings active</> : 'No private mappings loaded'}
        </span>
        {activeCount > 0 && (
          <button type="button" onClick={remove}
            className="min-h-10 inline-flex items-center gap-1.5 px-3 rounded-xl text-xs font-bold border border-[#b1ada1]/40 bg-white">
            <Trash2 className="w-3.5 h-3.5"/> Remove local copy
          </button>
        )}
      </div>
      {message && <p role="status" className="text-xs text-[#047857] font-semibold">{message}</p>}
      {error && <p role="alert" className="text-xs text-[#be123c] font-semibold">{error}</p>}
      <p className="text-[11px] text-[#08090a]/65">
        Screener is a user-accepted secondary source, not an NSE company quote.
        Existing NSE mappings take precedence; unrecognized industries and outdated symbols are never guessed.
        Use an export you are permitted to retain for your own research. The public site does not include these records.
      </p>
    </div>
  );
}
