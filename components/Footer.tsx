import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-xs text-gray-500 py-4">
            <p>&copy; {new Date().getFullYear()} Intelligence Lookup Tool. All rights reserved.</p>
            <p className="mt-1">For authorized and legitimate security research purposes only. Misuse is strictly prohibited.</p>
        </footer>
    );
};

export default Footer;
