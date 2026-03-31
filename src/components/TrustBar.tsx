import React from 'react';
import { Check, Landmark, Clock, Globe, Shield } from 'lucide-react';

const TrustBar: React.FC = () => {
  const items = [
    { icon: <Check />, label: "Consultants certifiés", bold: "agréés" },
    { icon: <Landmark />, label: "Conforme", bold: "aux lois 2025" },
    { icon: <Clock />, label: "Réponse", bold: "sous 24 heures" },
    { icon: <Globe />, label: "Service en", bold: "FR · ES · EN" },
    { icon: <Shield />, label: "Confidentialité", bold: "garantie" }
  ];

  return (
    <div className="bg-navy-mid py-5 px-10">
      <div className="max-w-[1280px] mx-auto flex justify-around items-center flex-wrap gap-4 text-[13.5px] text-white/75">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-gold text-lg">{item.icon}</span>
            <span>{item.label} <strong className="text-white font-semibold">{item.bold}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
