
import React from 'react';
import { LookupKey } from '../types';
import { LOOKUP_CONFIG } from '../constants';
import { SearchIcon, RefreshCwIcon, InfoIcon } from './icons';

interface SearchPanelProps {
    selectedLookup: LookupKey;
    onLookupChange: (key: LookupKey) => void;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSearch: () => void;
    onClear: () => void;
    isLoading: boolean;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
    selectedLookup,
    onLookupChange,
    inputValue,
    onInputChange,
    onSearch,
    onClear,
    isLoading
}) => {
    const config = LOOKUP_CONFIG[selectedLookup];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            onSearch();
        }
    };

    const allInfos = (Object.keys(LOOKUP_CONFIG) as LookupKey[]).map(key => LOOKUP_CONFIG[key].info).join(' | ');

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    value={selectedLookup}
                    onChange={(e) => onLookupChange(e.target.value as LookupKey)}
                    className="md:col-span-1 w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {(Object.keys(LOOKUP_CONFIG) as LookupKey[]).map(key => (
                        <option key={key} value={key}>{LOOKUP_CONFIG[key].label}</option>
                    ))}
                </select>
                <input
                    type={config.inputType || 'text'}
                    placeholder={config.placeholder}
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="md:col-span-2 w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onSearch}
                    disabled={isLoading || !inputValue}
                    className="w-full sm:w-auto flex-grow flex items-center justify-center bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
                >
                    <SearchIcon /> {isLoading ? 'Searching...' : 'Search'}
                </button>
                <button
                    onClick={onClear}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center bg-gray-600 text-white font-semibold p-3 rounded-md hover:bg-gray-700 disabled:bg-gray-800 transition-colors"
                >
                    <RefreshCwIcon /> Clear
                </button>
            </div>
            <div className="flex items-center space-x-2 bg-blue-900/50 text-blue-200 text-xs p-3 rounded-md border border-blue-800">
                <InfoIcon className="w-8 h-8 md:w-4 md:h-4 flex-shrink-0" />
                <span>{allInfos}</span>
            </div>
        </div>
    );
};

export default SearchPanel;
