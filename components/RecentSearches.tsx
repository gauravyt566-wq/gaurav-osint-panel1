import React from 'react';
import { RecentSearch } from '../types';
import { HistoryIcon } from './icons';

interface RecentSearchesProps {
    searches: RecentSearch[];
}

// Simple time ago formatter
const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    if (seconds < 10) return "just now";
    return Math.floor(seconds) + " seconds ago";
};


const RecentSearches: React.FC<RecentSearchesProps> = ({ searches }) => {
    if (searches.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1F2937] p-6 rounded-lg border border-gray-700 shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <HistoryIcon className="w-5 h-5 mr-2 text-gray-400" />
                Recent Searches
            </h2>
            <div className="space-y-3">
                {searches.map((search, index) => (
                    <div key={`${search.query}-${search.timestamp.getTime()}-${index}`} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md transition-all hover:bg-gray-800">
                        <div>
                            <p className="text-sm font-medium text-white">
                                <span className="font-mono bg-gray-700/50 px-2 py-1 rounded text-blue-300">{search.query}</span> 
                                <span className="text-gray-400"> in </span> 
                                <span className="capitalize">{search.type}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{timeSince(search.timestamp)}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            search.status === 'Found' 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                            {search.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;
