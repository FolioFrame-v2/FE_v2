import React from 'react';

export const ColorDiv = ({ children, className = "", ...props }: any) => (
    <div className={`text-[#0A27A6] ${className}`} {...props}>
        {children}
    </div>
);

export const Color = ({ children, className = "", ...props }: any) => (
    <span className={`text-[#0A27A6] ${className}`} {...props}>
        {children}
    </span>
);
