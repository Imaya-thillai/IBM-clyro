import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }: any) => {
    const variants = {
        default: 'bg-slate-800 text-slate-300',
        success: 'bg-green-900/30 text-green-400 border border-green-800/50',
        brand: 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant as keyof typeof variants]} ${className}`}>
            {children}
        </span>
    );
};
