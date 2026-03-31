import React from 'react';
import type { InfoCardData } from '../data/servicesData.tsx';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InfoCardsBAOSProps {
  mainCard: {
    title: string;
    icon: React.ReactNode;
    btnText: string;
  };
  cards: InfoCardData[];
  nextSectionBg?: string; // e.g. "bg-white", "bg-cream"
}

const InfoCardsBAOS: React.FC<InfoCardsBAOSProps> = ({ mainCard, cards, nextSectionBg = "bg-white" }) => {
  return (
    <section className={cn(
      "py-[80px] relative transition-colors duration-500",
      nextSectionBg
    )}>
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 opacity-[0.045]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
      </div>

      <div className="max-w-[1280px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px] items-stretch">
          
          {/* Main Orange Card */}
          <div className="bg-gradient-to-br from-[#F4A81D] via-[#E89010] to-[#D4780A] rounded-[18px] p-[42px_36px] flex flex-col justify-center items-start relative overflow-hidden min-h-[340px] shadow-[0_8px_30px_rgba(228,144,16,0.30)] group">
            {/* Decorative circles */}
            <div className="absolute -right-10 -bottom-10 w-[200px] height-[200px] border-[40px] border-white/10 rounded-full"></div>
            <div className="absolute right-5 -top-[30px] w-[140px] height-[140px] border-[30px] border-white/10 rounded-full"></div>
            
            <div className="w-20 h-20 bg-white/25 rounded-full flex items-center justify-center text-[38px] mb-7 relative z-10 border-3 border-white/40">
              {mainCard.icon}
            </div>
            
            <h3 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-white leading-[1.3] mb-[18px] relative z-10">
              {mainCard.title}
            </h3>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B2A] text-[#E8C97A] rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 relative z-10 hover:-translate-y-0.5 hover:bg-[#0D1B2A]/80">
              {mainCard.btnText} →
            </button>
          </div>

          {/* Secondary Cards - Middle Column */}
          <div className="flex flex-col gap-[22px]">
            {cards.slice(0, 2).map((card, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-md rounded-[18px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_rgba(0,0,0,0.08)] flex-1">
                <div className="text-[15px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2.5">
                   <div className="w-8 h-[3px] bg-[#C9A84C]/60 rounded-[2px]"></div>
                  {card.title}
                </div>
                <ul className="flex flex-col gap-[9px]">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-[#4A5568] leading-[1.5]">
                      <span className="text-[#22C55E] mt-[1px]">✔</span>
                      <span dangerouslySetInnerHTML={{ 
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1A2E] font-bold">$1</strong>') 
                      }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Secondary Cards - Right Column */}
          <div className="flex flex-col gap-[22px]">
            {cards.slice(2, 4).map((card, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-md rounded-[18px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_rgba(0,0,0,0.08)] flex-1">
                <div className="text-[15px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2.5">
                   <div className="w-8 h-[3px] bg-[#C9A84C]/60 rounded-[2px]"></div>
                  {card.title}
                </div>
                <ul className="flex flex-col gap-[9px]">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-[#4A5568] leading-[1.5]">
                      <span className="text-[#22C55E] mt-[1px]">✔</span>
                      <span dangerouslySetInnerHTML={{ 
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1A2E] font-bold">$1</strong>') 
                      }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoCardsBAOS;
