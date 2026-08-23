import React, { useState } from 'react';
import {
  Check,
  ClipboardCopy,
  Database,
  Download,
  FileJson,
  FileSpreadsheet,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';
import { DailySnapshot } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshots: DailySnapshot[];
  onImportData: (importedSnapshots: DailySnapshot[]) => void;
  onResetSeedData: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  snapshots,
  onImportData,
  onResetSeedData,
}) => {
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate CSV Data String
  const generateCSV = (): string => {
    const headers = [
      'Date',
      'Sector',
      'No. of Companies',
      'Total Market Cap (Cr)',
      'Median Market Cap (Cr)',
      'Median P/E',
      'Wtd. Avg Sales Growth (%)',
      'Wtd. Avg OPM (%)',
      'Wtd. Avg ROCE (%)',
      'Median 1Y Return (%)',
    ];

    const rows: string[] = [headers.join(',')];

    snapshots.forEach((snap) => {
      snap.sectors.forEach((s) => {
        rows.push(
          [
            snap.date,
            `"${s.sector.replace(/"/g, '""')}"`,
            s.noOfCompanies,
            s.totalMarketCap,
            s.medianMarketCap,
            s.medianPE,
            s.wtdAvgSalesGrowth,
            s.wtdAvgOPM,
            s.wtdAvgROCE,
            s.median1YReturn,
          ].join(',')
        );
      });
    });

    return rows.join('\n');
  };

  // Direct CSV File Download
  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `screener_industry_trends_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Direct JSON File Download
  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(snapshots, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `screener_industry_trends_backup_${today}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy CSV to Clipboard for Excel / Google Sheets
  const handleCopyClipboard = () => {
    const csvContent = generateCSV();
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // File Import Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].date && parsed[0].sectors) {
          onImportData(parsed);
          setImportStatus(`Successfully restored ${parsed.length} days of snapshots!`);
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1500);
        } else {
          setImportStatus('Error: Invalid dataset structure. Must be an array of snapshots.');
        }
      } catch (err: any) {
        setImportStatus(`Error parsing JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#f4f3ee] rounded-[24px] shadow-2xl max-w-xl w-full flex flex-col border border-[#b1ada1]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#b1ada1]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#08090a] text-white">
              <Database className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#08090a] font-display">Export & Backup Dataset</h3>
              <p className="text-xs text-[#08090a]/60 font-medium">
                Prevent data loss with universal CSV and JSON backups
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#f4f3ee] hover:bg-[#b1ada1]/20 flex items-center justify-center text-[#08090a] transition-colors cursor-pointer border border-[#b1ada1]/30"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 bg-[#f4f3ee]">
          {/* Summary Box */}
          <div className="bg-white p-4 rounded-[18px] border border-[#b1ada1]/30 text-xs flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[#08090a]/60 font-semibold">Stored Historical Records:</span>
              <div className="font-extrabold text-[#08090a] text-sm font-display">
                {snapshots.length} Trading Days ({snapshots.reduce((a, b) => a + b.sectors.length, 0)}{' '}
                Sector Rows)
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#08090a]/60 font-semibold">Date Range:</span>
              <div className="font-bold text-[#08090a] font-display">
                {snapshots[0]?.date} → {snapshots[snapshots.length - 1]?.date}
              </div>
            </div>
          </div>

          {/* Export Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Download CSV */}
            <button
              onClick={handleDownloadCSV}
              className="p-4 rounded-[18px] border border-[#b1ada1]/30 hover:border-[#10b981] hover:bg-[#10b981]/5 transition-all flex flex-col items-start text-left group bg-white shadow-xs cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-[#10b981]/15 text-[#10b981] mb-3 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-extrabold text-sm text-[#08090a] group-hover:text-[#10b981] font-display">
                Export to CSV (.csv)
              </div>
              <div className="text-xs text-[#08090a]/60 mt-1 font-medium leading-relaxed">
                Formatted for Excel, Google Sheets, Python, and BI dashboards.
              </div>
            </button>

            {/* Download JSON */}
            <button
              onClick={handleDownloadJSON}
              className="p-4 rounded-[18px] border border-[#b1ada1]/30 hover:border-[#A2AB73] hover:bg-[#A2AB73]/10 transition-all flex flex-col items-start text-left group bg-white shadow-xs cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-[#A2AB73]/15 text-[#A2AB73] mb-3 group-hover:scale-105 transition-transform">
                <FileJson className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-extrabold text-sm text-[#08090a] group-hover:text-[#A2AB73] font-display">
                Export Raw JSON (.json)
              </div>
              <div className="text-xs text-[#08090a]/60 mt-1 font-medium leading-relaxed">
                Full structured schema backup for restoring into this app anytime.
              </div>
            </button>
          </div>

          {/* Quick Copy to Clipboard */}
          <button
            onClick={handleCopyClipboard}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#f4f3ee] text-[#08090a] font-bold text-xs rounded-xl border border-[#b1ada1]/40 transition-colors cursor-pointer font-display shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-[#10b981] stroke-[2.5]" /> : <ClipboardCopy className="w-4 h-4 stroke-[2]" />}
            <span>{copied ? 'Copied CSV Data to Clipboard!' : 'Copy Table CSV to Clipboard'}</span>
          </button>

          {/* Import / Restore Section */}
          <div className="border-t border-[#b1ada1]/30 pt-4">
            <span className="text-xs font-bold text-[#08090a] block mb-2 font-display">
              Restore / Import Backup:
            </span>
            <label className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-dashed border-[#b1ada1]/60 rounded-xl cursor-pointer hover:bg-white transition-colors text-xs font-bold text-[#08090a] font-display">
              <Upload className="w-4 h-4 text-[#A2AB73] stroke-[2]" />
              <span>Select previously exported .JSON backup file</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {importStatus && (
              <div className="mt-2 text-xs font-bold text-[#10b981] bg-[#10b981]/15 p-2.5 rounded-xl border border-[#10b981]/30 text-center font-display">
                {importStatus}
              </div>
            )}
          </div>

          {/* Purge Mock History Option */}
          <div className="border-t border-[#b1ada1]/30 pt-3 flex items-center justify-between text-xs">
            <span className="text-[#08090a]/60 font-medium">Delete pre-generated mock snapshots?</span>
            <button
              onClick={() => {
                if (confirm('Purge all simulated pre-launch snapshots and keep only genuine live scrapes?')) {
                  onResetSeedData();
                  onClose();
                }
              }}
              className="flex items-center gap-1 text-[#A2AB73] hover:underline font-bold cursor-pointer font-display"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Purge Mock History</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#b1ada1]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#08090a] bg-[#f4f3ee] border border-[#b1ada1]/40 rounded-xl hover:bg-[#b1ada1]/20 transition-colors font-display cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

