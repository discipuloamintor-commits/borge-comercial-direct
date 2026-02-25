import React from 'react';

interface PriceTagProps {
    price: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, size = 'md', className = '' }) => {
    const formatted = price.toFixed(2);
    const [whole, cents] = formatted.split(".");
    const localeWhole = Number(whole).toLocaleString("pt-MZ");

    // Determine size classes based on prop
    const sizes = {
        sm: {
            wrapper: "items-start",
            main: "text-2xl leading-none",
            cents: "text-xs mt-[2px]",
            currency: "text-[10px] mt-1.5 ml-1"
        },
        md: {
            wrapper: "items-start",
            main: "text-2xl md:text-3xl leading-none",
            cents: "text-xs md:text-sm mt-1",
            currency: "text-[10px] md:text-xs mt-2 ml-1"
        },
        lg: {
            wrapper: "items-start",
            main: "text-5xl leading-none",
            cents: "text-lg mt-1",
            currency: "text-sm mt-3.5 ml-1"
        },
        xl: {
            wrapper: "items-start",
            main: "text-6xl md:text-7xl leading-none",
            cents: "text-xl md:text-2xl mt-1.5",
            currency: "text-lg md:text-xl mt-4 ml-1.5"
        }
    };

    const s = sizes[size];

    return (
        <div className={`flex ${s.wrapper} font-price text-foreground ${className}`} style={{ letterSpacing: '0.01em' }}>
            <span className={`${s.main} font-normal`}>{localeWhole}</span>
            <span className={`${s.cents} font-normal ml-0.5 opacity-90`} style={{ verticalAlign: 'super' }}>{cents}</span>
            <span className={`${s.currency} font-sans font-bold text-muted-foreground uppercase opacity-80`}>MT</span>
        </div>
    );
};

export default PriceTag;
