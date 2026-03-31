import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import { Link } from 'react-router-dom';
import { Plane, Home as HomeIcon, Briefcase, GraduationCap, HardHat, Scale, Quote, Phone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen">
      <Hero />
      <TrustBar />

      {/* WHY US */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative rounded overflow-hidden h-[520px] group">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                  alt="Madrid Espagne" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-[-20px] right-[-20px] w-[200px] h-[200px] bg-gold/12 rounded z-[-1]" />
                <div className="absolute top-[30px] -right-5 bg-navy text-white p-[20px_24px] rounded shadow-2xl text-center">
                  <div className="font-serif text-[42px] text-gold font-semibold leading-none">98%</div>
                  <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider">Taux de succès</div>
                </div>
             </div>

             <div>
                <div className="section-label">Pourquoi nous choisir ?</div>
                <h2 className="section-title">Des professionnels au service de <em className="italic text-gold-dark not-italic">votre projet</em></h2>
                <p className="section-desc">Depuis plus de 12 ans, España Immigration accompagne des milliers de personnes dans leur parcours migratoire vers l'Espagne. Notre expertise couvre tous les programmes et visas disponibles.</p>
                
                <div className="flex flex-col gap-7 mt-9">
                   {[
                     { icon: <Scale />, title: "Consultants accrédités", desc: "Notre équipe est composée de juristes et consultants agréés par les autorités espagnoles compétentes." },
                     { icon: <Briefcase />, title: "Suivi personnalisé", desc: "Un conseiller dédié suit votre dossier de A à Z, vous informant de chaque avancement en temps réel." },
                     { icon: <Briefcase />, title: "Stratégie sur mesure", desc: "Chaque situation est unique. Nous élaborons la stratégie d'immigration la plus adaptée à votre profil." }
                   ].map((f, i) => (
                    <div key={i} className="flex gap-[18px] p-[22px_24px] bg-cream rounded border-l-3 border-gold transition-all hover:bg-cream-dark hover:translate-x-1">
                       <div className="w-11 h-11 bg-navy rounded-sm flex items-center justify-center text-gold text-xl shrink-0">{f.icon}</div>
                       <div>
                          <div className="text-[14px] font-bold text-navy mb-1">{f.title}</div>
                          <div className="text-[13px] text-[#3D4B5C] leading-normal">{f.desc}</div>
                       </div>
                    </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-cream" id="services">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-14">
             <div className="section-label">Choisissez un service</div>
             <h2 className="section-title">Nos services <em className="italic text-gold-dark not-italic">d'immigration espagnole</em></h2>
             <p className="section-desc mx-auto text-center">Certifiés et autorisés, nous vous offrons un accompagnement complet pour tous vos besoins en matière d'immigration en Espagne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
             {[
               { id: 'visa-visiteur', icon: <Plane />, cat: 'Résidence Temporaire', title: 'Visa & Séjour Temporaire', desc: 'Visa visiteur, touriste, étudiant, travailleur saisonnier. Nous gérons votre séjour.', img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80' },
               { id: 'programme-national', icon: <HomeIcon />, cat: 'Résidence Permanente', title: 'Résidence Permanente', desc: 'Obtenez votre résidence permanente via programmes nationaux ou familiaux.', img: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&q=80' },
               { id: 'visa-entrepreneur', icon: <Briefcase />, cat: 'Immigration Affaires', title: 'Visa Entrepreneur & Investissement', desc: 'Créez ou développez votre entreprise en Espagne. Accompagnement Golden Visa.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
               { id: 'permis-etudes', icon: <GraduationCap />, cat: 'Études', title: 'Permis d\'Études', desc: 'Étudiez dans les meilleures universités espagnoles. Nous facilitons tout.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80' },
               { id: 'permis-travail', icon: <HardHat />, cat: 'Travail', title: 'Permis de Travail', desc: 'Accédez au marché du travail espagnol avec notre expertise en procédures RH.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' },
               { id: 'nie-tie', icon: <Scale />, cat: 'Autres Services', title: 'Asile, NIE/TIE & Citoyenneté', desc: 'Demande d\'asile, obtention du NIE/TIE, citoyenneté espagnole.', img: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=600&q=80' }
             ].map((s, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden group border border-black/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl relative">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="h-[200px] relative overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 text-[10px] font-bold tracking-[0.16em] uppercase text-gold-light">{s.cat}</div>
                </div>
                <div className="p-6.5">
                  <div className="w-10 h-10 bg-navy rounded-sm flex items-center justify-center text-gold text-lg mb-4">{s.icon}</div>
                  <h3 className="font-serif text-[20px] font-semibold text-navy mb-2.5">{s.title}</h3>
                  <p className="text-[13.5px] text-[#3D4B5C] leading-relaxed mb-5">{s.desc}</p>
                  <Link to={`/service/${s.id}`} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-gold-dark hover:gap-2.5 hover:text-navy transition-all uppercase tracking-wider">
                    Découvrir →
                  </Link>
                </div>
              </div>
             ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-navy">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-14">
             <div className="section-label">Comment ça marche</div>
             <h2 className="section-title text-white">Un processus <em className="italic text-gold-light not-italic">simple et transparent</em></h2>
             <p className="section-desc mx-auto text-center" style={{color:'rgba(255,255,255,0.6)'}}>Nous vous guidons étape par étape vers l'obtention de votre visa ou permis de résidence en Espagne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mt-14 relative before:absolute before:top-9 before:left-[12.5%] before:right-[12.5%] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/30 before:to-transparent lg:before:block before:hidden">
             {[
               { n: '01', t: 'Consultation Initiale', d: 'Évaluation gratuite de votre profil et de votre éligibilité.' },
               { n: '02', t: 'Stratégie Personnalisée', d: 'Élaboration d\'un plan d\'immigration sur mesure adapté à vos objectifs.' },
               { n: '03', t: 'Constitution du Dossier', d: 'Préparation et vérification rigoureuse de tous les documents requis.' },
               { n: '04', t: 'Suivi & Approbation', d: 'Soumission officielle et suivi en temps réel jusqu\'à l\'obtention.' }
             ].map((step, i) => (
              <div key={i} className="text-center px-5 relative group">
                <div className="w-[72px] h-[72px] border-2 border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 font-serif text-[28px] text-gold font-semibold bg-navy transition-all group-hover:bg-gold group-hover:text-navy group-hover:border-gold relative z-10">
                  {step.n}
                </div>
                <h4 className="text-[15px] font-bold text-white mb-3">{step.t}</h4>
                <p className="text-[13px] text-white/50 leading-relaxed">{step.d}</p>
              </div>
             ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-14">
             <div className="section-label">España Immigration en chiffres</div>
             <h2 className="section-title text-center">La confiance de <em className="italic text-gold-dark not-italic">nos clients</em></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-black/10 border border-black/10 rounded overflow-hidden">
             {[
               { n: '1500+', l: 'Dossiers traités avec succès' },
               { n: '98%', l: 'Taux de réussite global' },
               { n: '12+', l: 'Années d\'expérience' },
               { n: '42+', l: 'Nationalités accompagnées' }
             ].map((stat, i) => (
              <div key={i} className="text-center py-12 px-7 transition-colors hover:bg-cream">
                 <div className="font-serif text-[52px] font-semibold text-navy leading-none mb-2">{stat.n}</div>
                 <div className="text-[13px] text-[#8A9BB0] tracking-[0.04em]">{stat.l}</div>
              </div>
             ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-cream-dark/50">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-14">
             <div className="section-label">Ils nous font confiance</div>
             <h2 className="section-title">Ce que disent <em className="italic text-gold-dark not-italic">nos clients</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
             {[
               { a: 'Amara Diallo', m: 'Résidence Permanente · Sénégal', t: 'Grâce à España Immigration, ma famille et moi vivons enfin notre rêve en Espagne. Un accompagnement professionnel, transparent et bienveillant.' },
               { a: 'Mohamed Belkacem', m: 'Permis de Travail · Algérie', t: 'Cabinet ultra professionnel. J\'ai été suivi à chaque étape de mon permis de travail. Je recommande vivement España Immigration.' },
               { a: 'Fatou Ndiaye', m: 'Permis d\'Études · Côte d\'Ivoire', t: 'Excellente entreprise. Sérieux, efficaces et toujours disponibles. Mon visa étudiant a été obtenu en un temps record.' }
             ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-sm relative border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all">
                <Quote className="text-gold-light w-12 h-12 opacity-60 mb-4" />
                <p className="text-[14px] text-[#3D4B5C] leading-loose italic mb-6">"{t.t}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-gold font-serif text-lg font-bold shrink-0">{t.a[0]}</div>
                  <div>
                    <div className="text-[14px] font-bold text-navy">{t.a}</div>
                    <div className="text-[12px] text-[#8A9BB0]">{t.m}</div>
                  </div>
                </div>
              </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-navy to-navy-mid relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[10%] w-[600px] h-[600px] border border-gold/12 rounded-full pointer-events-none" />
        <div className="absolute -bottom-[60%] -left-[5%] w-[400px] h-[400px] border border-gold/8 rounded-full pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-10 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div>
            <div className="section-label">Prêt à commencer ?</div>
            <h2 className="section-title text-white">Votre <em className="italic text-gold-light not-italic">projet d'immigration</em><br />commence ici</h2>
            <p className="text-white/60 text-[15px]">Obtenez une évaluation gratuite de votre dossier sous 24 heures.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link to="/evaluation" className="btn-primary">Consultation Gratuite</Link>
            <a href="tel:+34600000000" className="btn-outline flex items-center gap-2">
              <Phone className="w-4 h-4" /> +34 600 000 000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
