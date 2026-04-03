import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageCircle, Briefcase, Camera, Play, Star, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer: React.FC = () => {
  const [siteSettings, setSiteSettings] = React.useState({
    site_email: '',
    site_phone: '',
    site_address: ''
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('tolito_espagne_immigration_site_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setSiteSettings({
          site_email: data.site_email || '',
          site_phone: data.site_phone || '',
          site_address: data.site_address || ''
        });
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-navy pt-[70px]">
      <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-14 border-b border-white/8">
        <div className="flex flex-col gap-5">
           <Link to="/" className="flex items-center gap-3.5 no-underline group">
              <div className="w-[46px] h-[46px] bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative overflow-hidden transition-all group-hover:bg-white/10">
                 <div className="absolute bottom-0 inset-x-0 h-[40%] bg-spain-red" />
                 <Star className="text-gold w-5 h-5 relative z-[2] fill-gold" />
              </div>
              <div className="flex flex-col leading-[1.1]">
                <span className="font-serif text-[22px] font-semibold text-white tracking-[0.02em]">España Immigration</span>
                <span className="text-[10px] font-medium text-gold tracking-[0.18em] uppercase">Cabinet d'Immigration · Espagne</span>
              </div>
            </Link>
            <p className="text-[13.5px] text-white/50 leading-[1.75]">
              Cabinet d'immigration professionnel spécialisé dans l'accompagnement des personnes souhaitant s'établir en Espagne. Expertise, transparence et résultats.
            </p>
            <div className="flex gap-2.5">
               {[MessageCircle, Briefcase, Camera, Play].map((Icon, i) => (
                <Link key={i} to="#" className="w-[38px] h-[38px] border border-white/15 rounded-[3px] flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all">
                   <Icon className="w-4 h-4" />
                </Link>
               ))}
            </div>
        </div>

        <div>
           <div className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase mb-5">Résidence Temporaire</div>
           <ul className="flex flex-col gap-2.5">
              {[
                { id: 'visa-visiteur', label: 'Visa Visiteur' },
                { id: 'visa-touriste', label: 'Visa Touriste' },
                { id: 'permis-etudes', label: 'Permis d\'Études' },
                { id: 'permis-travail', label: 'Permis de Travail' },
                { id: 'sejour-temporaire', label: 'Séjour Temporaire' }
              ].map(l => (
                <li key={l.id}>
                  <Link to={`/service/${l.id}`} className="flex items-center gap-1.5 text-[13.5px] text-white/50 hover:text-white hover:pl-1 transition-all">
                     <ChevronRight className="w-3 h-3 text-gold" /> {l.label}
                  </Link>
                </li>
              ))}
           </ul>
        </div>

        <div>
           <div className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase mb-5">Résidence Permanente</div>
           <ul className="flex flex-col gap-2.5">
              {[
                { id: 'programme-national', label: 'Programme National' },
                { id: 'programme-regional', label: 'Programme Régional' },
                { id: 'regroupement-familial', label: 'Regroupement Familial' },
                { id: 'retraites', label: 'Visa Retraités' }
              ].map(l => (
                <li key={l.id}>
                  <Link to={`/service/${l.id}`} className="flex items-center gap-1.5 text-[13.5px] text-white/50 hover:text-white hover:pl-1 transition-all">
                     <ChevronRight className="w-3 h-3 text-gold" /> {l.label}
                  </Link>
                </li>
              ))}
           </ul>
           <div className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase mt-6 mb-5">Affaires</div>
           <ul className="flex flex-col gap-2.5">
              <Link to="/service/visa-entrepreneur" className="flex items-center gap-1.5 text-[13.5px] text-white/50 hover:text-white hover:pl-1 transition-all">
                 <ChevronRight className="w-3 h-3 text-gold" /> Visa Entrepreneur
              </Link>
              <Link to="/service/visa-investissement" className="flex items-center gap-1.5 text-[13.5px] text-white/50 hover:text-white hover:pl-1 transition-all">
                 <ChevronRight className="w-3 h-3 text-gold" /> Visa Investissement
              </Link>
           </ul>
        </div>

        <div className="flex flex-col gap-4">
           <div className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase mb-5">Contact</div>
            <div className="flex gap-3 items-start">
               <MapPin className="text-gold w-4 h-4 mt-0.5 shrink-0" />
               <div className="text-[13.5px] text-white/50 leading-relaxed">
                  <strong className="block text-white/80 text-[12px] tracking-wide mb-1 uppercase">Adresse</strong>
                  {siteSettings.site_address}
               </div>
            </div>
            <div className="flex gap-3 items-start">
               <Phone className="text-gold w-4 h-4 mt-0.5 shrink-0" />
               <div className="text-[13.5px] text-white/50 leading-relaxed">
                  <strong className="block text-white/80 text-[12px] tracking-wide mb-1 uppercase">Téléphone</strong>
                  {siteSettings.site_phone}
               </div>
            </div>
            <div className="flex gap-3 items-start">
               <Mail className="text-gold w-4 h-4 mt-0.5 shrink-0" />
               <div className="text-[13.5px] text-white/50 leading-relaxed">
                  <strong className="block text-white/80 text-[12px] tracking-wide mb-1 uppercase">Email</strong>
                  {siteSettings.site_email}
               </div>
            </div>
           <div className="flex gap-3 items-start">
              <Clock className="text-gold w-4 h-4 mt-0.5 shrink-0" />
              <div className="text-[13.5px] text-white/50 leading-relaxed">
                 <strong className="block text-white/80 text-[12px] tracking-wide mb-1 uppercase">Horaires</strong>
                 Lun-Ven 9h–18h · Sam 10h–14h
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-10 py-[22px] flex flex-col sm:flex-row justify-between items-center gap-3">
         <div className="text-[12.5px] text-white/35">
            © 2025 España Immigration. Tous droits réservés. <Link to="#" className="text-gold-light hover:underline ml-1">Confidentialité</Link>
         </div>
         <div className="flex gap-6 text-[12.5px] text-white/35">
            <Link to="/about" className="hover:text-gold-light transition-colors">À propos</Link>
            <Link to="#" className="hover:text-gold-light transition-colors">Mentions légales</Link>
            <Link to="/contacts" className="hover:text-gold-light transition-colors">Contact</Link>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
