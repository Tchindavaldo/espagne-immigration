import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Phone, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_DROPDOWNS = [
  {
    label: 'Résidence Temporaire',
    links: [
      { id: 'visa-visiteur',    label: 'Visa Visiteur' },
      { id: 'visa-touriste',    label: 'Visa Touriste' },
      { id: 'permis-etudes',   label: "Permis d'Études" },
      { id: 'permis-travail',  label: 'Permis de Travail' },
      { id: 'sejour-temporaire', label: 'Séjour Temporaire' },
    ],
  },
  {
    label: 'Résidence Permanente',
    links: [
      { id: 'programme-national',  label: 'Programme National' },
      { id: 'programme-regional',  label: 'Programme Régional' },
      { id: 'regroupement-familial', label: 'Regroupement Familial' },
      { id: 'retraites',           label: 'Visa Retraités' },
    ],
  },
  {
    label: 'Affaires',
    links: [
      { id: 'visa-entrepreneur',   label: 'Visa Entrepreneur' },
      { id: 'visa-investissement', label: 'Visa Investissement' },
      { id: 'golden-visa',         label: 'Golden Visa' },
    ],
  },
  {
    label: 'Autres',
    links: [
      { id: 'nie-tie',      label: 'NIE / TIE' },
      { id: 'asile',        label: 'Demande d\'Asile' },
      { id: 'citoyennete',  label: 'Citoyenneté Espagnole' },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#0D1B2A] py-2 text-[12.5px] text-[#8A9BB0] tracking-[0.03em]">
        <div className="max-w-[1280px] mx-auto px-10 flex justify-between items-center">
          <div className="hidden md:flex gap-7">
            <Link to="/about" className="text-[#E8C97A] hover:text-white transition-all">À propos</Link>
            <Link to="#"      className="text-[#E8C97A] hover:text-white transition-all">Offres d'emploi</Link>
            <Link to="#"      className="text-[#E8C97A] hover:text-white transition-all">Confidentialité</Link>
          </div>
          <div className="flex gap-7">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#E8C97A]" />
              <a href="mailto:contact@espana-immigration.com" className="text-[#E8C97A]">contact@espana-immigration.com</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E8C97A]" />
              <a href="tel:+34600000000" className="text-[#E8C97A]">+34 600 000 000</a>
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-[1000] shadow-[0_2px_30px_rgba(13,27,42,0.10)]">
        <div className="max-w-[1280px] mx-auto px-10 flex items-center justify-between h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3.5 no-underline">
            <div className="w-[46px] h-[46px] bg-[#0D1B2A] rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute bottom-0 inset-x-0 h-[40%] bg-[#C60B1E]" />
              <Star className="text-[#C9A84C] w-5 h-5 relative z-[2] fill-[#C9A84C]" />
            </div>
            <div className="flex flex-col leading-[1.1]">
              <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-[22px] font-semibold text-[#0D1B2A] tracking-[0.02em]">España Immigration</span>
              <span className="text-[10px] font-medium text-[#C9A84C] tracking-[0.18em] uppercase">Cabinet d'Immigration · Espagne</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center">
            <ul className="flex gap-0 list-none m-0 p-0">
              <li>
                <Link
                  to="/"
                  className="px-[15px] py-7 text-[13px] font-medium text-[#0D1B2A] tracking-[0.02em] hover:text-[#A0762E] transition-all inline-block"
                >
                  Accueil
                </Link>
              </li>

              {NAV_DROPDOWNS.map((dropdown) => (
                <li key={dropdown.label} className="relative group">
                  <button className="px-[15px] py-7 text-[13px] font-medium text-[#0D1B2A] tracking-[0.02em] hover:text-[#A0762E] flex items-center gap-1 bg-transparent border-none cursor-pointer">
                    {dropdown.label}
                    <ChevronDown className="w-2.5 h-2.5 text-[#C9A84C] group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 bg-white min-w-[220px] shadow-[0_20px_60px_rgba(13,27,42,0.16)] border-t-[3px] border-[#C9A84C] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[8px] group-hover:translate-y-0 transition-all duration-200 z-[999]">
                    {dropdown.links.map((link) => (
                      <Link
                        key={link.id}
                        to={`/service/${link.id}`}
                        className="flex items-center gap-2.5 px-5 py-3 text-[12.5px] text-[#3D4B5C] border-b border-black/5 hover:bg-[#F8F4EE] hover:text-[#0D1B2A] hover:pl-7 transition-all uppercase tracking-wide"
                      >
                        <span className="text-[#C9A84C] font-bold">›</span> {link.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}

              <li>
                <Link to="/about"    className="px-[15px] py-7 text-[13px] font-medium text-[#0D1B2A] hover:text-[#A0762E] transition-all inline-block">À Propos</Link>
              </li>
           
            </ul>

            <Link
              to="/evaluation"
              className="ml-4 px-5 py-2.5 bg-[#0D1B2A] text-[#C9A84C] rounded-[3px] text-[12.5px] font-semibold tracking-[0.06em] uppercase hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-all whitespace-nowrap"
            >
              Évaluation
            </Link>
          </nav>

          {/* MOBILE BURGER */}
          <button className="xl:hidden p-2 text-[#0D1B2A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-[80px] inset-x-0 bg-white shadow-2xl z-[9999] max-h-[80vh] overflow-y-auto border-t border-black/5">
            <div className="flex flex-col p-5 gap-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-3 px-2 text-[13.5px] font-medium border-b border-black/5">Accueil</Link>

              {NAV_DROPDOWNS.map((dropdown) => (
                <div key={dropdown.label} className="border-b border-black/[0.03]">
                  <button 
                    onClick={() => toggleDropdown(dropdown.label)}
                    className="w-full py-4 px-2 flex items-center justify-between text-[13.5px] font-bold text-[#0D1B2A] uppercase tracking-wide"
                  >
                    {dropdown.label}
                    <ChevronDown className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 ${openDropdown === dropdown.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === dropdown.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#FDFCFB]"
                      >
                        {dropdown.links.map((link) => (
                          <Link
                            key={link.id}
                            to={`/service/${link.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="pl-8 py-3.5 text-[13px] text-[#3D4B5C] border-t border-black/[0.03] flex items-center gap-2 hover:text-[#C9A84C] transition-colors"
                          >
                            <span className="text-[#C9A84C] opacity-40">›</span> {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link to="/about"    onClick={() => setIsMenuOpen(false)} className="py-3 px-2 text-[13.5px] font-medium border-b border-black/5 mt-2">À Propos</Link>
              
              <Link to="/evaluation" onClick={() => setIsMenuOpen(false)} className="mt-4 py-3 text-center bg-[#0D1B2A] text-[#C9A84C] font-bold uppercase tracking-widest text-[12.5px] rounded">
                Évaluation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
