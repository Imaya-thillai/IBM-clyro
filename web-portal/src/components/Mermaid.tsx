'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif'
});

export default function Mermaid({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
                if (ref.current) ref.current.innerHTML = svg;
            });
        }
    }, [chart]);

    return <div ref={ref} className="flex justify-center my-8 overflow-auto" />;
}
