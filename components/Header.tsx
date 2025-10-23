
import React, { useState, useEffect } from 'react';
import { SearchIcon, ClockIcon } from './icons';

const Header: React.FC = () => {
    const [sessionTime, setSessionTime] = useState(1800); // 30 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setSessionTime(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="relative bg-[#1F2937] p-5 rounded-lg border border-gray-700 shadow-xl flex items-center space-x-4">
            <div className="bg-blue-600/20 p-3 rounded-full border-2 border-blue-500">
                <SearchIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-white">Intelligence Lookup Tool</h1>
                <p className="text-sm text-gray-400">Advanced intelligence analysis for legitimate security research</p>
            </div>
            <div className="absolute top-3 right-3 bg-red-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
                <ClockIcon className="w-3 h-3"/>
                <span>Session: {formatTime(sessionTime)}</span>
            </div>
        </div>
    );
};

export default Header;
