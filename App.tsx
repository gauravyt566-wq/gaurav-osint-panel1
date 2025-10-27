import React, { useState, useEffect } from 'react';
import { LookupKey, ApiData, RecentSearch, Stats } from './types';
import { LOOKUP_CONFIG } from './constants';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import SearchPanel from './components/SearchPanel';
import ResultsPanel from './components/ResultsPanel';
import RecentSearches from './components/RecentSearches';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import { formatApiData } from './utils/formatters';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedLookup, setSelectedLookup] = useState<LookupKey>('mobile');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [stats, setStats] = useState<Stats>({
        total: 0,
        successRate: 100,
        avgResponse: 0,
    });
    const [responseTimes, setResponseTimes] = useState<number[]>([]);

    useEffect(() => {
        const successfulSearches = recentSearches.filter(s => s.status === 'Found').length;
        const totalSearches = recentSearches.length;
        const successRate = totalSearches > 0 ? Math.round((successfulSearches / totalSearches) * 100) : 100;

        const avgResponse = responseTimes.length > 0 ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) : 0;

        setStats({
            total: totalSearches,
            successRate,
            avgResponse,
        });
    }, [recentSearches, responseTimes]);

    const handleInputChange = (value: string) => {
        const config = LOOKUP_CONFIG[selectedLookup];
        let transformedValue = value;
        if (config.inputType === 'number') {
            transformedValue = transformedValue.replace(/\D/g, '');
        }
        if (config.inputTransform) {
            transformedValue = config.inputTransform(transformedValue);
        }
        if (transformedValue.length <= config.maxLength) {
            setInputValue(transformedValue);
        }
    };

    const handleLookupChange = (key: LookupKey) => {
        setSelectedLookup(key);
        setInputValue('');
        setResult(null);
        setError(null);
    };

    const handleSearch = async () => {
        const config = LOOKUP_CONFIG[selectedLookup];
        if (inputValue.length < config.minLength || inputValue.length > config.maxLength) {
            setError(config.errorMsg);
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);
        const startTime = Date.now();

        try {
            const response = await fetch(`${config.url}${inputValue}`);
            const data: ApiData = await response.json();

            const endTime = Date.now();
            setResponseTimes(prev => [...prev, endTime - startTime]);

            let newSearch: RecentSearch;

            if (response.ok && data && (typeof data !== 'object' || Object.keys(data).length > 0) && !(data as any)?.error) {
                const formattedResult = formatApiData(data, selectedLookup, inputValue);
                setResult(formattedResult);
                newSearch = { query: inputValue, type: selectedLookup, status: 'Found', timestamp: new Date() };
            } else {
                const errorMessage = (data as any)?.message || (data as any)?.error || `No data found for ${inputValue}.`;
                setError(errorMessage);
                setResult(null);
                newSearch = { query: inputValue, type: selectedLookup, status: 'Not Found', timestamp: new Date() };
            }
             setRecentSearches(prev => [newSearch, ...prev].slice(0, 5));
        } catch (err) {
            const endTime = Date.now();
            setResponseTimes(prev => [...prev, endTime - startTime]);
            setError('An unexpected error occurred. The API might be down or the response is not valid JSON.');
            setResult(null);
            const newSearch: RecentSearch = { query: inputValue, type: selectedLookup, status: 'Not Found', timestamp: new Date() };
            setRecentSearches(prev => [newSearch, ...prev].slice(0, 5));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClear = () => {
        setInputValue('');
        setResult(null);
        setError(null);
        setIsLoading(false);
    };

    if (!isAuthenticated) {
        return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="bg-[#111827] min-h-screen text-gray-300 font-sans p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Header />
                <StatsBar stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#1F2937] p-6 rounded-lg border border-gray-700 shadow-xl">
                    <SearchPanel 
                        selectedLookup={selectedLookup}
                        onLookupChange={handleLookupChange}
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        onSearch={handleSearch}
                        onClear={handleClear}
                        isLoading={isLoading}
                    />
                    <ResultsPanel 
                        result={result}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
                <RecentSearches searches={recentSearches} />
                <Footer />
            </div>
        </div>
    );
};

export default App;