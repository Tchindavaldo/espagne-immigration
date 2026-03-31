import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[88vh] bg-navy relative flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(13, 27, 42, 0.97) 0%, rgba(13, 27, 42, 0.75) 50%, rgba(13, 27, 42, 0.60) 100%), url('https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1800&q=80')` 
        }}
      />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(201,168,76,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(201,168,76,0.06)_0%,transparent_50%)]" />
      
      {/* Abstract lines */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -right-[100px] -translate-y-1/2 w-[500px] h-[500px] border border-gold/15 rounded-full" />
        <div className="absolute top-1/2 -right-[50px] -translate-y-1/2 w-[350px] h-[350px] border border-gold/10 rounded-full" />
      </div>

      <div className="max-w-[1280px] mx-auto px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 items-center py-20">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/12 border border-gold/30 px-4 py-1.5 rounded-sm text-[11px] font-bold text-gold-light tracking-[0.16em] uppercase mb-7 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            <div className="spain-flag mr-1">
              <div className="flag-red" />
              <div className="flag-yellow" />
              <div className="flag-red2" />
            </div>
            Cabinet d'immigration certifié · Espagne
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl font-normal text-white leading-[1.08] mb-6 animate-fade-up [animation-delay:0.2s]">
            Votre avenir commence<br />
            en <em className="italic text-gold-light not-italic">España</em>
          </h1>

          <p className="text-[16px] leading-[1.7] text-white/65 max-w-[480px] mb-10 animate-fade-up [animation-delay:0.35s]">
            Cabinet spécialisé en immigration espagnole. Nous vous accompagnons à chaque étape de votre projet — visa, résidence, citoyenneté — avec expertise, transparence et engagement total.
          </p>

          <div className="flex gap-4 flex-wrap animate-fade-up [animation-delay:0.45s]">
            <Link to="/contacts" className="btn-primary">Consultation Gratuite</Link>
            <Link to="#services" className="btn-outline">Nos Services</Link>
          </div>

          <div className="flex gap-10 mt-14 pt-10 border-t border-white/10 animate-fade-up [animation-delay:0.55s]">
            <div>
              <div className="font-serif text-[38px] font-semibold text-gold-light leading-none">98%</div>
              <div className="text-[12px] text-white/50 mt-1 tracking-[0.04em]">Taux de réussite</div>
            </div>
            <div>
              <div className="font-serif text-[38px] font-semibold text-gold-light leading-none">1500+</div>
              <div className="text-[12px] text-white/50 mt-1 tracking-[0.04em]">Dossiers traités</div>
            </div>
            <div>
              <div className="font-serif text-[38px] font-semibold text-gold-light leading-none">12+</div>
              <div className="text-[12px] text-white/50 mt-1 tracking-[0.04em]">Années d'expérience</div>
            </div>
          </div>
        </div>

        {/* Evaluation Card */}
        <div className="bg-white rounded p-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)] animate-fade-up [animation-delay:0.3s]">
          <h2 className="font-serif text-[22px] font-semibold text-navy mb-1.5">Évaluez votre dossier</h2>
          <p className="text-[13px] text-[#8A9BB0] mb-7">Consultation gratuite en 24h</p>
          
          <div className="flex flex-col gap-4">
            <div className="form-field">
              <label className="block text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase mb-1.5">Prénom & Nom</label>
              <input type="text" placeholder="ex: Jean Dupont" className="w-full px-4 py-3 border-2 border-slate-100 rounded-md bg-cream focus:bg-white focus:border-gold outline-none transition-all text-[14px]" />
            </div>
            <div className="form-field">
              <label className="block text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase mb-1.5">Email</label>
              <input type="email" placeholder="votre@email.com" className="w-full px-4 py-3 border-2 border-slate-100 rounded-md bg-cream focus:bg-white focus:border-gold outline-none transition-all text-[14px]" />
            </div>
            <div className="form-field">
              <label className="block text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase mb-1.5">Service souhaité</label>
              <select className="w-full px-4 py-3 border-2 border-slate-100 rounded-md bg-cream focus:bg-white focus:border-gold outline-none transition-all text-[14px]">
                <option value="">— Choisir un programme —</option>
                <option>Visa Visiteur / Touriste</option>
                <option>Permis d'Études</option>
                <option>Permis de Travail</option>
                <option>Résidence Permanente</option>
                <option>Visa Entrepreneur / Investissement</option>
                <option>Regroupement Familial</option>
                <option>NIE / TIE</option>
                <option>Autre</option>
              </select>
            </div>
            <button className="w-full py-3.5 bg-navy text-gold text-[13px] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-gold hover:text-navy transition-all mt-2 flex items-center justify-center gap-2">
              Demander une Évaluation →
            </button>
            <p className="text-[11px] text-[#8A9BB0] text-center mt-3.5 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3" /> Vos données sont protégées et confidentielles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
