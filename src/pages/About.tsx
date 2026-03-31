import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Gavel, Globe2, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      {/* INNER HERO */}
      <section 
        className="relative py-28 bg-navy overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(13,27,42,0.97), rgba(13,27,42,0.8)), url('https://images.unsplash.com/photo-1551038247-3d935278282c?w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-10 relative z-10">
          <nav className="flex items-center gap-2 mb-6">
            <Link to="/" className="text-white/40 text-[12px] hover:text-gold-light transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3 text-gold" />
            <span className="text-white/40 text-[12px]">À propos</span>
          </nav>
          
          <h1 className="font-serif text-[42px] lg:text-[64px] text-white font-normal leading-[1.1] mb-5">
            Qui sommes-nous ?<br />
            <em className="text-gold-light italic not-italic">España Immigration</em>
          </h1>
          <p className="text-[17px] text-white/70 max-w-[620px] leading-relaxed">
            Cabinet d'immigration spécialisé, fondé par des experts du droit espagnol et de l'immigration internationale. Nous transformons vos rêves en réalité.
          </p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="py-24 relative bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20">
            <div className="bg-transparent">
               <h2 className="font-serif text-[36px] text-navy mb-6 font-normal">Notre histoire & notre vision</h2>
               <div className="flex flex-col gap-5 text-[15.5px] text-[#3D4B5C] leading-[1.85]">
                  <p>España Immigration est un cabinet d'immigration professionnel fondé par des juristes et consultants passionnés par l'accompagnement des personnes souhaitant s'établir en Espagne. Depuis notre création, nous avons accompagné plus de 1 500 clients de plus de 42 nationalités différentes dans leurs démarches administratives et juridiques.</p>
                  <p>Notre équipe est composée d'avocats, de consultants en immigration accrédités et d'experts administratifs qui maîtrisent parfaitement les procédures espagnoles. Nous travaillons en étroite collaboration avec les autorités compétentes pour garantir des résultats optimaux à nos clients.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                  <div className="flex flex-col gap-4">
                     <h3 className="font-serif text-[24px] text-navy border-b border-gold/30 pb-2.5">Notre Mission</h3>
                     <p className="text-[14.5px] text-[#3D4B5C] leading-relaxed">Accompagner chaque client à chaque étape de son processus d'immigration vers l'Espagne grâce à des services professionnels, transparents et adaptés à leur réalité personnelle et professionnelle.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <h3 className="font-serif text-[24px] text-navy border-b border-gold/30 pb-2.5">Notre Vision</h3>
                     <p className="text-[14.5px] text-[#3D4B5C] leading-relaxed">Transformer chaque projet d'immigration en une histoire de succès humain, en guidant nos clients avec intégrité, respect et excellence.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-20">
                  {[
                    { i: 'JM', n: 'Juan M. Rodriguez', r: 'Directeur & Fondateur', d: 'Avocat spécialisé en droit des étrangers avec 15 ans d\'expérience. Accrédité par le Barreau de Madrid.' },
                    { i: 'SC', n: 'Sofia C. Martínez', r: 'Consultante Senior', d: 'Experte en résidence permanente et regroupement familial. Trilingue (FR/ES/EN).' },
                    { i: 'AB', n: 'Ahmed B. Oumarou', r: 'Conseiller Afrique', d: 'Spécialiste des dossiers provenant d\'Afrique francophone. Liaison entre clients et autorités.' }
                  ].map((p, i) => (
                    <div key={i} className="bg-white rounded-sm overflow-hidden text-center border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all p-6 py-10 group">
                      <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center text-gold font-serif text-[32px] mx-auto mb-6 relative overflow-hidden transition-all group-hover:bg-gold group-hover:text-navy">
                         <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent" />
                         {p.i}
                      </div>
                      <h4 className="font-serif text-[20px] font-bold text-navy mb-1">{p.n}</h4>
                      <div className="text-[11px] font-bold text-gold uppercase tracking-[0.1em] mb-4">{p.r}</div>
                      <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{p.d}</p>
                    </div>
                  ))}
               </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="bg-white rounded p-[30px] border border-black/5 shadow-sm">
                <h4 className="font-serif text-[20px] text-navy mb-6 pb-3.5 border-b-2 border-gold font-semibold uppercase tracking-wider">Nos Certifications</h4>
                <ul className="flex flex-col gap-4">
                   {[
                     { icon: <Award />, t: "Accrédité par le Ministère de l'Intérieur" },
                     { icon: <Gavel />, t: "Membres du Barreau de Madrid" },
                     { icon: <Globe2 />, t: "Partenaires officiels de l'ICEX" },
                     { icon: <CheckCircle />, t: "Certifiés ISO 9001 — Qualité" }
                   ].map((c, i) => (
                    <li key={i} className="flex gap-3 text-[13.5px] text-[#3D4B5C] items-start p-3 bg-cream/30 rounded border-l-2 border-gold">
                       <span className="text-gold shrink-0 mt-0.5">{c.icon}</span> {c.t}
                    </li>
                   ))}
                </ul>
              </div>

              <div className="bg-white rounded p-[30px] border border-black/5 shadow-sm">
                <h4 className="font-serif text-[20px] text-navy mb-6 pb-3.5 border-b-2 border-gold font-semibold uppercase tracking-wider">Services Rapides</h4>
                <div className="flex flex-col gap-2">
                   {['Visa Visiteur', 'Permis d\'Études', 'Permis de Travail', 'Résidence Permanente'].map((s, i) => (
                    <Link key={i} to="/contacts" className="flex items-center gap-2 p-[10px_14px] text-[13.5px] text-[#3D4B5C] hover:bg-cream hover:text-navy hover:pl-5 transition-all">
                       <span className="text-gold text-lg">›</span> {s}
                    </Link>
                   ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
