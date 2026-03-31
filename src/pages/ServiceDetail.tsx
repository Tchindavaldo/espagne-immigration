import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData.tsx';
import InfoCardsBAOS from '../components/InfoCardsBAOS';
import { ChevronRight, Check } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const data = id ? servicesData[id] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const relatedServices = Object.values(servicesData)
    .filter(s => s.id !== data.id)
    .slice(0, 5);

  return (
    <div className="bg-cream min-h-screen">
      {/* INNER HERO */}
      <section 
        className="relative py-20 bg-navy overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(13,27,42,0.95), rgba(13,27,42,0.75)), url('${data.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-10 relative z-10">
          <nav className="flex items-center gap-2 mb-5">
            <Link to="/" className="text-white/40 text-[12px] hover:text-gold-light transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3 text-gold" />
            <span className="text-white/40 text-[12px]">{data.subtitle}</span>
            <ChevronRight className="w-3 h-3 text-gold" />
            <span className="text-white/40 text-[12px]">{data.title}</span>
          </nav>
          
          <h1 className="font-serif text-[42px] lg:text-[54px] text-white font-normal leading-[1.1] mb-4">
            {data.title}<br />
            <em className="text-gold-light italic not-italic">{data.subtitle}</em>
          </h1>
          <p className="text-[16px] text-white/60 max-w-[560px]">
            {data.description}
          </p>
        </div>
      </section>

      {/* BAOS INFO SECTION (Conditional) */}
      {data.infoSection && (
        <InfoCardsBAOS 
          mainCard={data.infoSection.mainCard}
          cards={data.infoSection.cards}
          nextSectionBg="bg-cream" // Explicitly matching parent of next section
        />
      )}

      {/* PAGE CONTENT */}
      <section className="py-20 relative bg-cream">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
            <div className="bg-transparent">
               <div 
                 className="prose prose-navy max-w-none 
                   [&>h2]:font-serif [&>h2]:text-[32px] [&>h2]:text-navy [&>h2]:mb-4 [&>h2]:font-normal
                   [&>p]:text-[15px] [&>p]:text-[#3D4B5C] [&>p]:leading-[1.8] [&>p]:mb-5
                   [&>h3]:text-[18px] [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-8 [&>h3]:mb-3"
                 dangerouslySetInnerHTML={{ __html: data.content }} 
               />
               
               <ul className="flex flex-col gap-2.5 mt-7 mb-7">
                 {data.requirements.map((req, i) => (
                   <li key={i} className="flex items-start gap-2.5 p-[12px_16px] bg-white rounded-[3px] border-l-3 border-gold text-[14px] text-[#3D4B5C] shadow-sm">
                     <Check className="w-4 h-4 text-gold shrink-0 mt-[2px]" />
                     {req}
                   </li>
                 ))}
               </ul>

               <p className="text-[15px] text-[#3D4B5C] leading-[1.8] mt-6">
                 Notre équipe d'experts analyse votre dossier et vous propose la meilleure stratégie pour maximiser vos chances d'obtenir votre <strong>{data.title}</strong> en Espagne. N'hésitez pas à nous contacter pour une consultation gratuite.
               </p>
               
               <div className="mt-7">
                 <Link to="/evaluation" className="btn-primary inline-block">Évaluer mon dossier →</Link>
               </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="bg-white rounded p-[30px] border border-black/5 shadow-sm">
                <h4 className="font-serif text-[20px] text-navy mb-5 pb-3.5 border-b-2 border-gold font-semibold uppercase tracking-wider">Consultation Gratuite</h4>
                <p className="text-[13.5px] text-[#3D4B5C] leading-[1.7] mb-5">
                  Vous avez des questions sur ce service ? Contactez-nous pour une évaluation gratuite de votre dossier.
                </p>
                <Link to="/contacts" className="btn-primary block text-center py-3 w-full">Nous Contacter →</Link>
              </div>

              <div className="bg-white rounded p-[30px] border border-black/5 shadow-sm">
                <h4 className="font-serif text-[20px] text-navy mb-5 pb-3.5 border-b-2 border-gold font-semibold uppercase tracking-wider">Services Connexes</h4>
                <ul className="flex flex-col gap-2">
                  {relatedServices.map(link => (
                    <li key={link.id}>
                      <Link to={`/service/${link.id}`} className="flex items-center gap-2 p-[10px_14px] text-[13.5px] text-[#3D4B5C] hover:bg-cream hover:text-navy hover:pl-[18px] transition-all rounded">
                        <span className="text-gold text-lg">›</span> {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
