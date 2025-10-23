import React, { useState } from 'react';
import { CopyIcon, DownloadIcon, FileTextIcon, TableIcon, AlertTriangleIcon } from './icons';

interface ResultsPanelProps {
    result: string | null;
    isLoading: boolean;
    error: string | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, isLoading, error }) => {
    const [copyStatus, setCopyStatus] = useState('Copy Result');

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy Result'), 2000);
        }
    };
    
    const handleDownload = (format: 'txt') => {
        if (result) {
            const blob = new Blob([result], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `lookup_result_${Date.now()}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                 <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                 </div>
            );
        }
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-400">
                    <AlertTriangleIcon />
                    <p className="mt-2 text-center">{error}</p>
                </div>
            )
        }
        return (
            <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words custom-scrollbar">
                {result || 'Formatted results will appear here...'}
            </pre>
        );
    }

    return (
        <div className="space-y-4">
             <div className="bg-gray-900/50 h-[350px] p-4 rounded-md border border-gray-700 overflow-y-auto font-mono custom-scrollbar">
                {renderContent()}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                    onClick={handleCopy}
                    disabled={!result || isLoading}
                    className="flex items-center justify-center bg-green-600 text-white font-semibold p-3 rounded-md hover:bg-green-700 disabled:bg-green-800 transition-colors">
                    <CopyIcon /> {copyStatus}
                </button>
                 <button 
                    onClick={() => handleDownload('txt')}
                    disabled={!result || isLoading}
                    className="flex items-center justify-center bg-yellow-500 text-black font-semibold p-3 rounded-md hover:bg-yellow-600 disabled:bg-yellow-800 transition-colors">
                    <DownloadIcon /> Download TXT
                </button>
                 <button disabled className="flex items-center justify-center bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 disabled:bg-blue-800 transition-colors cursor-not-allowed">
                    <FileTextIcon /> PDF
                </button>
                 <button disabled className="flex items-center justify-center bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 disabled:bg-blue-800 transition-colors cursor-not-allowed">
                    <TableIcon /> CSV
                </button>
            </div>
        </div>
    );
};

export default ResultsPanel;