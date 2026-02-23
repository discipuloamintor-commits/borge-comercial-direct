import { useEffect, useRef, useState } from "react";

const brands = [
    "Nestlé",
    "Unilever",
    "Coca-Cola",
    "Colgate",
    "P&G",
    "Danone",
    "L'Oréal",
    "Johnson & Johnson"
];

const BrandsSection = () => {
    // Duplicate the array to ensure seamless infinite scrolling loop
    const scrollItems = [...brands, ...brands, ...brands];

    return (
        <section className="py-12 bg-gray-50/50 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-8">
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    Trabalhamos com as melhores marcas
                </p>
            </div>

            {/* Left and Right Fade Masks for a premium look */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />

            <div className="flex w-full group overflow-hidden">
                <div
                    className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] opacity-70 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 items-center"
                    style={{ animationDuration: '60s' }}
                >
                    {/* First Track */}
                    <div className="flex gap-8 md:gap-12 px-4 items-center justify-around min-w-full">
                        {brands.map((brand, i) => (
                            <span
                                key={`${brand}-${i}-1`}
                                className="text-2xl md:text-3xl font-black text-gray-500 hover:text-primary transition-colors cursor-default select-none"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                    {/* Second Track (Seamless copy) */}
                    <div className="flex gap-8 md:gap-12 px-4 items-center justify-around min-w-full">
                        {brands.map((brand, i) => (
                            <span
                                key={`${brand}-${i}-2`}
                                className="text-2xl md:text-3xl font-black text-gray-500 hover:text-primary transition-colors cursor-default select-none"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
