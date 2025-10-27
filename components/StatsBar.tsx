
import React from 'react';
import { Stats } from '../types';
import { KeyIcon, DatabaseIcon, ZapIcon } from './icons';

interface StatsBarProps {
    stats: Stats;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; subtext?: string; status?: 'ok' | 'warn' | 'error' }> = ({ icon, label, value, subtext, status }) => {
    
    const statusColor = {
        ok: 'text-green-400',
        warn: 'text-yellow-400',
        error: 'text-red-400',
    }

    return (
        <div className="flex-1 flex items-center space-x-3">
            {icon}
            <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-lg font-bold text-white">{value}</p>
                 {subtext && <p className={`text-xs ${status ? statusColor[status] : 'text-gray-500'}`}>{subtext}</p>}
            </div>
        </div>
    )
}


const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
    return (
        <div className="bg-[#1F2937] p-4 rounded-lg border border-gray-700 shadow-xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex w-full md:w-auto">
                 <StatCard icon={<KeyIcon />} label="Queries" value="Secure & Encrypted" />
                 <StatCard icon={<DatabaseIcon />} label="Sources" value="Multiple" />
                 <StatCard icon={<ZapIcon />} label="Processing" value="Real-time" />
            </div>
            <div className="w-full md:w-px h-px md:h-12 bg-gray-700"></div>
            <div className="flex w-full md:w-auto text-center md:text-left">
                <div className="flex-1">
                    <p className="text-xs text-gray-400">Total Searches</p>
                    <p className="text-lg font-bold text-blue-400">{stats.total}</p>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-gray-400">Success Rate</p>
                    <p className="text-lg font-bold text-blue-400">{stats.successRate}%</p>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="text-lg font-bold text-blue-400">{stats.avgResponse}ms</p>
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
