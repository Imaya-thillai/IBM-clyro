import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
    const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-50"
    };
    return (
        <button className={`${base} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
            {children}
        </button>
    );
};
