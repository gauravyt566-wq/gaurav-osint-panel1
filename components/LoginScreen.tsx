import React, { useState } from 'react';
import { ShieldIcon, LoginKeyIcon, LoginAuthIcon, AlertCircleIcon } from './icons';

const CORRECT_PIN = '5914'; // Hardcoded PIN

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(3);
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthenticate = (e: React.FormEvent) => {
        e.preventDefault();
        if (attempts === 0) return;

        setIsLoading(true);
        setError(null);

        // Simulate network delay
        setTimeout(() => {
            if (pin === CORRECT_PIN) {
                onLoginSuccess();
            } else {
                const newAttempts = attempts - 1;
                setAttempts(newAttempts);
                if (newAttempts > 0) {
                    setError('Invalid PIN. Please try again.');
                } else {
                    setError('Too many failed attempts. Access is locked.');
                }
                setPin('');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-6 text-center">
                    
                    <div className="mx-auto bg-slate-900/50 border-2 border-blue-500/50 rounded-full h-20 w-20 flex items-center justify-center">
                        <ShieldIcon className="w-10 h-10 text-blue-400" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white">Intelligence Lookup Tool</h1>
                        <p className="text-sm text-gray-400 mt-1">OSINT Intelligence Platform</p>
                    </div>

                    <form onSubmit={handleAuthenticate} className="space-y-4">
                        <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LoginKeyIcon />
                             </span>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Enter your secure access PIN"
                                disabled={isLoading || attempts === 0}
                                className="w-full bg-slate-900/70 border border-slate-600 text-white rounded-md pl-10 pr-4 py-3 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading || attempts === 0 || !pin}
                                className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                     </svg>
                                     Authenticating...
                                    </>
                                ) : (
                                    <>
                                     <LoginAuthIcon /> Authenticate
                                    </>
                                )}
                            </button>
                             <a
                                href="https://t.me/ITZ_GAURAVYT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center bg-gray-600 text-white font-semibold py-3 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                BUY PIN
                            </a>
                        </div>
                    </form>

                    {(error || attempts < 3) && (
                        <div className={`text-sm ${error ? 'text-red-400' : 'text-gray-400'}`}>
                            {error ? error : `Attempts remaining: ${attempts}`}
                        </div>
                    )}

                    <div className="flex items-center space-x-2 bg-slate-900/50 text-gray-500 text-xs px-3 py-2 rounded-md border border-slate-700">
                        <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                        <span>This system is monitored and all access attempts are logged.</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginScreen;