import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogOut, Settings, FileText, ChevronLeft, Save, RefreshCw, Search, Menu, X, Check, ChevronRight, Plus, Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';

// Types
interface PaymentItem {
  title: string;
  amount: number;
  description?: string;
}

interface Evaluation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  status: string;
  created_at: string;
  nationality: string;
  residence_country: string;
  age?: number;
  situation?: string;
  has_criminal_record?: string;
  financial_status?: string;
  employment_status?: string;
  degree_level?: string;
  invest_amount?: string;
  message?: string;
  checked_documents?: string[];
  paid_amount: number;
  payment_plan: PaymentItem[];
}

interface WhatsAppConfig {
  id?: string;
  phone_number: string;
  message_template_study: string;
  message_template_processing: string;
}

interface SiteSettings {
  id?: string;
  site_email: string;
  site_phone: string;
  site_address: string;
  company_name: string;
}

const Admin: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'evaluations' | 'settings'>('evaluations');
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const handleToggleRow = (id: string) => {
    if (expandedId === id && dirtyIds.has(id)) {
      if (!window.confirm("Vos modifications du bilan financier n'ont pas été enregistrées.\nVoulez-vous vraiment fermer le dossier sans sauvegarder ?")) {
        return;
      }
    }
    setExpandedId(expandedId === id ? null : id);
  };

  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>({
    phone_number: '',
    message_template_study: "Bonjour, je viens de remplir le formulaire de dossier sur le site et je souhaiterais connaître les frais d'étude.",
    message_template_processing: "Votre dossier a été transmis à nos experts. Pour finaliser votre demande et régler les frais d'étude et d'accompagnement, veuillez nous contacter directement sur WhatsApp."
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    site_email: '',
    site_phone: '',
    site_address: '',
    company_name: 'ESPAGNE IMMIGRATION'
  });

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/login');
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const { data: evals } = await supabase.from('tolito_espagne_immigration_evaluations').select('*').order('created_at', { ascending: false });
      setEvaluations(evals || []);
      
      const { data: waData } = await supabase.from('tolito_espagne_immigration_whatsapp_config').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle();
      console.log('Admin: WhatsApp data from DB:', waData);
      if (waData) setWhatsAppConfig(waData);
      
      const { data: siteData } = await supabase.from('tolito_espagne_immigration_site_settings').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle();
      if (siteData) setSiteSettings(siteData);
    } catch (err) {
      setToast({ message: 'Erreur de chargement des données', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const { id: waId, ...waData } = whatsAppConfig;
      let newWaConfig = { ...whatsAppConfig };
      if (waId) {
        const { error } = await supabase.from('tolito_espagne_immigration_whatsapp_config').update(waData).eq('id', waId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('tolito_espagne_immigration_whatsapp_config').insert([waData]).select().single();
        if (error) throw error;
        if (data) newWaConfig = data;
      }
      const { id: sId, ...sData } = siteSettings;
      let newSiteSettings = { ...siteSettings };
      if (sId) {
        const { error } = await supabase.from('tolito_espagne_immigration_site_settings').update(sData).eq('id', sId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('tolito_espagne_immigration_site_settings').insert([sData]).select().single();
        if (error) throw error;
        if (data) newSiteSettings = data;
      }
      setWhatsAppConfig(newWaConfig);
      setSiteSettings(newSiteSettings);
      setToast({ message: 'Configurations enregistrées avec succès', type: 'success' });
    } catch (err: any) {
      setToast({ message: 'Échec de l\'enregistrement', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setSaving(true);
    try {
      const { error } = await supabase.from('tolito_espagne_immigration_evaluations').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      setEvaluations(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      setToast({ message: `Statut mis à jour`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Erreur mise à jour statut', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFinance = async (id: string, paidAmount: number, paymentPlan: any[]) => {
    setSaving(true);
    try {
      const { error } = await supabase.from('tolito_espagne_immigration_evaluations').update({ 
        paid_amount: paidAmount,
        payment_plan: paymentPlan
      }).eq('id', id);
      if (error) throw error;
      setEvaluations(prev => prev.map(e => e.id === id ? { ...e, paid_amount: paidAmount, payment_plan: paymentPlan } : e));
      setDirtyIds(prev => { const n = new Set(prev); n.delete(id); return n; });
      setToast({ message: `Finances enregistrées`, type: 'success' });
    } catch (err: any) {
      setToast({ message: 'Erreur enregistrement finances', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const getRequiredDocuments = (service: string) => {
    switch (service) {
      case 'visa-visiteur': return ['Passeport à jour', 'Justificatif de logement', 'Assurance voyage', 'Preuve de fonds financiers'];
      case 'permis-etudes': return ['Lettre d\'admission', 'Preuve de fonds (1000€/mois)', 'Assurance médicale complète', 'Derniers diplômes obtenus'];
      case 'permis-travail': return ['Contrat de travail espagnol', 'Diplômes traduits/apostillés', 'Casier judiciaire vierge', 'Certificat d\'aptitude'];
      case 'visa-entrepreneur': case 'visa-investissement': case 'golden-visa': return ['Business Plan détaillé', 'Justificatif origine des fonds', 'Assurance santé privée', 'Certificat investissement'];
      case 'regroupement-familial': return ['Actes de naissance/mariage', 'Preuve logement adéquat', 'Titres de séjour du regroupant', 'Preuve de revenus stables'];
      default: return ['Passeport valide', 'Casier judiciaire apostillé', 'Assurance médicale', 'Justificatif de domicile'];
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'En attente': 'bg-amber-100 text-amber-700',
      'En cours': 'bg-blue-100 text-blue-700',
      'Accepté': 'bg-emerald-100 text-emerald-700',
      'Payé': 'bg-[#C9A84C]/10 text-[#C9A84C]',
      'Refusé': 'bg-rose-100 text-rose-700'
    };
    return styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-700';
  };

  const filteredEvaluations = evaluations.filter(e => 
    `${e.first_name} ${e.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const paginatedEvaluations = filteredEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderFinanceBlock = (e: any) => (
    <div className="bg-white p-5 lg:p-6 border border-black/5 rounded-sm space-y-6 shadow-sm">
       <div>
          <div className="text-[10px] font-bold uppercase text-black/40 mb-2 flex justify-between items-center">
             <span>Statut du Dossier</span>
             {saving && <RefreshCw size={12} className="animate-spin text-[#0D1B2A]/40" />}
          </div>
          <select disabled={saving} value={e.status} onChange={ev=>handleUpdateStatus(e.id, ev.target.value)} className="w-full bg-[#0D1B2A] text-[#C9A84C] py-3 px-4 rounded-sm text-[12px] font-bold uppercase tracking-widest outline-none shadow-md disabled:opacity-50">
             {[
               {v:'En attente', l:'En attente'},
               {v:'En cours', l:'Etude en cours'},
               {v:'Accepté', l:'Dossier Accepté'},
               {v:'Payé', l:'Frais Réglés'},
               {v:'Refusé', l:'Dossier Refusé'}
             ].map(s=><option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
       </div>

       <div className="space-y-4 pt-4 border-t border-black/5">
         <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase text-black/40 tracking-widest">Acomptes Reçus</div>
            <button 
              onClick={() => {
                const newPlan = [...(e.payment_plan || []), { title: 'Frais de ...', amount: 0 }];
                setEvaluations(prev => prev.map(ev => ev.id === e.id ? { ...ev, payment_plan: newPlan } : ev));
                setDirtyIds(prev => new Set(prev).add(e.id));
              }}
              className="text-[10px] font-bold text-[#C9A84C] flex items-center gap-1 hover:underline active:scale-95 transition-transform"
            >
              <Plus size={12} /> AJOUTER
            </button>
         </div>
         <div className="space-y-3">
            {(e.payment_plan || []).map((p: any, pIdx: number) => (
              <div key={pIdx} className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-sm border border-black/5">
                 <input 
                   disabled={saving}
                   className="flex-1 min-w-0 bg-transparent border-none text-[12px] font-bold text-[#0D1B2A] outline-none disabled:opacity-50"
                   value={p.title} 
                   onChange={(evt) => {
                     const newPlan = [...e.payment_plan];
                     newPlan[pIdx].title = evt.target.value;
                     setEvaluations(prev => prev.map(ev => ev.id === e.id ? { ...ev, payment_plan: newPlan } : ev));
                     setDirtyIds(prev => new Set(prev).add(e.id));
                   }}
                 />
                 <div className="relative w-20 sm:w-24 shrink-0">
                   <input 
                     type="number" 
                     disabled={saving}
                     value={p.amount}
                     onChange={(evt) => {
                       const newPlan = [...e.payment_plan];
                       newPlan[pIdx].amount = parseFloat(evt.target.value) || 0;
                       setEvaluations(prev => prev.map(ev => ev.id === e.id ? { ...ev, payment_plan: newPlan } : ev));
                       setDirtyIds(prev => new Set(prev).add(e.id));
                     }}
                     className="w-full bg-white border border-black/5 px-2 py-1 text-[12px] font-bold text-[#0D1B2A] text-right rounded-sm outline-none disabled:opacity-50"
                   />
                   <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] text-black/20 font-bold">€</span>
                 </div>
                 <button 
                   disabled={saving}
                   onClick={() => {
                     const newPlan = e.payment_plan.filter((_: any, i: number) => i !== pIdx);
                     setEvaluations(prev => prev.map(ev => ev.id === e.id ? { ...ev, payment_plan: newPlan } : ev));
                     setDirtyIds(prev => new Set(prev).add(e.id));
                   }}
                   className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors disabled:opacity-50 shrink-0"
                 >
                    <Trash2 size={12} />
                 </button>
              </div>
            ))}
         </div>
       </div>

       <div className="pt-4 border-t border-black/5 space-y-4">
         <div>
           <div className="text-[10px] font-bold uppercase text-black/40 mb-2">Montant Total Fixé pour le Service (€)</div>
           <input type="number" value={e.paid_amount} onChange={ev=>{const val=parseFloat(ev.target.value)||0; setEvaluations(prev=>prev.map(it=>it.id===e.id?{...it,paid_amount:val}:it)); setDirtyIds(prev => new Set(prev).add(e.id));}} className="w-full border border-black/5 py-3 px-4 rounded-sm text-[16px] font-bold outline-none focus:border-[#C9A84C] transition-colors" />
         </div>

         <div className="p-4 bg-rose-50 rounded-sm border border-rose-100 flex justify-between items-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase text-rose-700">Reste à percevoir</span>
            <span className="text-[18px] sm:text-[20px] font-bold text-rose-800">
              {Math.max(0, (e.paid_amount || 0) - (e.payment_plan || []).reduce((acc: any, curr: any) => acc + curr.amount, 0))} €
            </span>
         </div>
       </div>

       <button disabled={saving} onClick={()=>handleUpdateFinance(e.id,e.paid_amount,e.payment_plan || [])} className="w-full bg-[#C9A84C] text-[#0D1B2A] py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {saving ? <><RefreshCw size={14} className="animate-spin" /> ENREGISTREMENT...</> : 'Enregistrer le Bilan Financier'}
       </button>
    </div>
  );

  const renderSkeletonMobile = () => (
    <div className="animate-pulse p-8 space-y-6 border-b border-black/[0.1]">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-slate-200 rounded-sm w-3/4"></div>
          <div className="h-3 bg-slate-100 rounded-sm w-1/4"></div>
        </div>
        <div className="h-6 bg-slate-100 rounded-full w-16"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-100 rounded-sm w-1/2"></div>
        <div className="h-3 bg-slate-50 rounded-sm w-1/3"></div>
      </div>
    </div>
  );

  const renderSkeletonDesktop = () => (
    <tr className="animate-pulse">
      <td className="px-10 py-8">
        <div className="h-5 bg-slate-200 rounded-sm w-32 mb-2"></div>
        <div className="h-3 bg-slate-100 rounded-sm w-20"></div>
      </td>
      <td className="px-10 py-8"><div className="h-4 bg-slate-100 rounded-sm w-24"></div></td>
      <td className="px-10 py-8"><div className="h-4 bg-slate-100 rounded-sm w-24"></div></td>
      <td className="px-10 py-8"><div className="h-4 bg-slate-50 rounded-sm w-28"></div></td>
      <td className="px-10 py-8"><div className="h-8 bg-slate-100 rounded-full w-24 mx-auto"></div></td>
      <td className="px-10 py-8 text-right"><div className="h-10 bg-slate-50 rounded-sm w-10 ml-auto"></div></td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row antialiased text-[#0D1B2A]">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="lg:hidden bg-[#0D1B2A] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
         <h1 className="text-white font-serif text-[18px]">ESPAGNE IMMIGRATION</h1>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      <aside className={`fixed lg:sticky lg:top-0 lg:h-screen shrink-0 inset-y-0 left-0 w-[280px] bg-[#0D1B2A] text-white flex flex-col z-[100] transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-10 border-b border-white/5 hidden lg:block">
           <h1 className="font-serif text-[20px]">ESPAGNE IMMIGRATION</h1>
        </div>
        <nav className="flex-1 px-6 py-10 space-y-2">
          <button onClick={() => { setActiveTab('evaluations'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm ${activeTab === 'evaluations' ? 'bg-[#C9A84C] text-[#0D1B2A] font-bold' : 'text-white/40'}`}>
             <FileText size={18} /> <span className="text-[12px] uppercase tracking-widest">DOSSIERS</span>
          </button>
          <button onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm ${activeTab === 'settings' ? 'bg-[#C9A84C] text-[#0D1B2A] font-bold' : 'text-white/40'}`}>
             <Settings size={18} /> <span className="text-[12px] uppercase tracking-widest">SYSTÈME</span>
          </button>
          <Link to="/" className="flex items-center gap-4 px-6 py-10 text-white/20 text-[11px] uppercase tracking-widest"><ChevronLeft size={16} /> Retour Site</Link>
        </nav>
        <div className="p-8 border-t border-white/5 mt-auto">
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-4 text-white/30 text-[11px] font-bold uppercase tracking-widest"><LogOut size={16} /> Déconnexion</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="bg-white px-6 lg:px-10 py-6 border-b border-black/[0.05] sticky top-0 z-40">
           {activeTab === 'evaluations' ? (
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-x-auto whitespace-nowrap">
                 <div className="flex items-center gap-6 divide-x divide-black/10 text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-[#0D1B2A]">Total: {evaluations.length}</span>
                    <span className="pl-6 text-amber-700">Attente: {evaluations.filter(e => e.status === 'En attente' || e.status === 'pending').length}</span>
                    <span className="pl-6 text-emerald-700 font-bold">Payés: {evaluations.filter(e => e.status === 'Payé' || e.status === 'paid').length}</span>
                 </div>
                 <div className="flex items-center gap-8 min-w-0 flex-1 lg:flex-none lg:w-[400px]">
                    <div className="relative group w-full">
                       <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                       <input 
                         type="text" placeholder="RECHERCHER DOSSIER..." value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-8 py-2 bg-transparent text-[14px] outline-none text-[#0D1B2A] font-semibold border-b border-transparent focus:border-[#C9A84C] transition-all"
                       />
                    </div>
                 </div>
              </div>
           ) : (
              <div className="flex items-center justify-between">
                 <div className="text-[12px] font-bold uppercase tracking-widest text-[#0D1B2A]">Configurations Système</div>
                 <button onClick={handleSaveSettings} disabled={saving} className="bg-[#0D1B2A] text-[#C9A84C] px-8 py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-3 transition-transform active:scale-95">
                    {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} SYNC CLOUD
                 </button>
              </div>
           )}
        </div>

        <div className="flex-1 p-0 lg:p-10">
          <AnimatePresence mode="wait">
             {activeTab === 'evaluations' ? (
               <div className="space-y-0 lg:space-y-6">
                  {/* MOBILE LIST */}
                  <div className="lg:hidden divide-y divide-black/[0.1]">
                     {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                          <React.Fragment key={i}>
                            {renderSkeletonMobile()}
                          </React.Fragment>
                        ))
                     ) : paginatedEvaluations.map((e) => (
                         <div key={e.id} onClick={() => handleToggleRow(e.id)} className="p-8 space-y-5 bg-white active:bg-slate-50 border-b border-black/[0.1] transition-colors cursor-pointer">
                            <div className="flex items-center justify-between">
                               <div className="font-bold text-[20px] text-[#0D1B2A] leading-tight">{e.first_name} {e.last_name}</div>
                               <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-black/5 ${getStatusBadge(e.status)}`}>{e.status}</span>
                            </div>
                            <div className="space-y-3">
                               <div className="text-[14px] text-[#C9A84C] font-bold uppercase tracking-[0.1em]">{e.service_type.replace('-', ' ')}</div>
                               <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-black/50 font-bold uppercase tracking-tighter">
                                  <span>{e.nationality}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30 shrink-0"></span>
                                  <span>Réside en {e.residence_country}</span>
                               </div>
                            </div>
                            {expandedId === e.id && (
                             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-6 border-t border-black/5 space-y-8" onClick={(ev) => ev.stopPropagation()}>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-[15px] pb-6">
                                   {[
                                     {l: 'Email', v: e.email}, {l: 'WhatsApp', v: e.phone},
                                     {l: 'Nation.', v: e.nationality}, {l: 'Résidence', v: e.residence_country},
                                     {l: 'Âge', v: e.age ? `${e.age} ans` : '--'}, {l: 'Casier', v: e.has_criminal_record === 'oui' ? 'Signalé' : 'Vierge'},
                                     ...(e.degree_level ? [{l: "Études", v: e.degree_level}] : []),
                                     ...(e.financial_status ? [{l: 'Finances', v: e.financial_status}] : []),
                                     ...(e.employment_status ? [{l: 'Emploi', v: e.employment_status}] : []),
                                     ...(e.invest_amount ? [{l: 'Invest.', v: `${e.invest_amount} €`}] : []),
                                     ...(e.situation ? [{l: 'Situation', v: e.situation, fw: true}] : []),
                                     ...(e.message ? [{l: 'Notes/Message', v: e.message, fw: true}] : [])
                                   ].map((item, idx) => (
                                     <div key={idx} className={`border-b border-black/[0.03] pb-2 ${item.fw ? 'col-span-2' : ''}`}>
                                       <div className="text-[11px] font-bold uppercase text-black/40 mb-0.5">{item.l}</div>
                                       <div className="font-bold text-[#0D1B2A] break-words whitespace-pre-wrap">{item.v || '--'}</div>
                                     </div>
                                   ))}
                                </div>

                                <div className="space-y-4 mb-4">
                                   <div className="text-[10px] font-bold uppercase text-black/30 tracking-widest">État des Documents</div>
                                   <div className="flex flex-col gap-2">
                                      {getRequiredDocuments(e.service_type).map((doc: string, dIdx: number) => {
                                        const isChecked = e.checked_documents?.includes(doc);
                                        return (
                                          <div key={dIdx} className="flex items-center gap-2.5">
                                            {isChecked ? <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center shrink-0"><Check size={12} className="text-emerald-700" /></div> : <div className="w-5 h-5 rounded bg-rose-50 flex items-center justify-center shrink-0"><X size={12} className="text-rose-500" /></div>}
                                            <span className={`text-[12px] ${isChecked ? "font-bold text-[#0D1B2A]" : "font-medium text-rose-600 line-through opacity-80"}`}>{doc}</span>
                                          </div>
                                        );
                                      })}
                                   </div>
                                </div>
                                 <div className="space-y-4 mb-4">
                                    <div className="text-[10px] font-bold uppercase text-black/30 tracking-widest">Gestion & Finances</div>
                                    {renderFinanceBlock(e)}
                                 </div>
                             </motion.div>
                            )}
                         </div>
                     ))}
                  </div>

                  {/* DESKTOP TABLE */}
                  <div className="hidden lg:block overflow-x-auto">
                     <table className="w-full text-left bg-white border-y border-black/[0.08]">
                        <thead className="bg-slate-50/80 text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 border-b border-black/[0.05]">
                           <tr>
                              <th className="px-10 py-6">Client / Dossier</th>
                              <th className="px-10 py-6">Nationalité</th>
                              <th className="px-10 py-6">Résidence</th>
                              <th className="px-10 py-6">Service</th>
                              <th className="px-10 py-6 text-center">Statut</th>
                              <th className="px-10 py-6 text-right">Détails</th>
                           </tr>
                        </thead>
                         <tbody className="divide-y divide-black/[0.05]">
                            {loading ? (
                               Array.from({ length: 8 }).map((_, i) => (
                                 <React.Fragment key={i}>
                                   {renderSkeletonDesktop()}
                                 </React.Fragment>
                               ))
                            ) : paginatedEvaluations.map((e) => (
                               <React.Fragment key={e.id}>
                                 <tr onClick={() => handleToggleRow(e.id)} className={`hover:bg-slate-50 group transition-colors cursor-pointer ${expandedId === e.id ? 'bg-slate-50' : ''}`}>
                                    <td className="px-10 py-8">
                                       <div className="font-bold text-[17px] text-[#0D1B2A]">{e.first_name} {e.last_name}</div>
                                       <div className="text-[11px] text-black/30 font-bold uppercase tracking-widest mt-1">Ref: {e.id.slice(0, 8).toUpperCase()}</div>
                                    </td>
                                    <td className="px-10 py-8 text-[15px] font-semibold uppercase">{e.nationality}</td>
                                    <td className="px-10 py-8 text-[15px] font-semibold uppercase">{e.residence_country}</td>
                                    <td className="px-10 py-8 text-[15px] text-[#C9A84C] font-bold uppercase">{e.service_type.replace('-', ' ')}</td>
                                    <td className="px-10 py-8 text-center"><span className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border border-black/5 ${getStatusBadge(e.status)}`}>{e.status}</span></td>
                                    <td className="px-10 py-8 text-right"><button className={`p-3 bg-slate-100 rounded transition-transform ${expandedId === e.id ? 'rotate-180' : ''}`}><ChevronLeft className="-rotate-90 text-[#0D1B2A]/40" size={20} /></button></td>
                                 </tr>
                                 {expandedId === e.id && (
                                   <tr>
                                     <td colSpan={6} className="bg-slate-50/50 px-10 py-16">
                                        <div className="grid grid-cols-3 gap-12">
                                           <div className="space-y-8">
                                              <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/30">Fiche Client</h4>
                                              <div className="grid grid-cols-2 gap-4">
                                                 {[
                                                   {l:'Email',v:e.email},{l:'WhatsApp',v:e.phone},{l:'Âge',v:e.age ? `${e.age} ans` : '--'},
                                                   {l:'Nationalité',v:e.nationality},{l:'Résidence',v:e.residence_country},
                                                   {l:'Casier',v:e.has_criminal_record === 'oui' ? 'Signalé' : 'Vierge'},
                                                   ...(e.degree_level ? [{l: "Études", v: e.degree_level}] : []),
                                                   ...(e.financial_status ? [{l: 'Finances', v: e.financial_status}] : []),
                                                   ...(e.employment_status ? [{l: 'Emploi', v: e.employment_status}] : []),
                                                   ...(e.invest_amount ? [{l: 'Investissement', v: `${e.invest_amount} €`}] : []),
                                                   ...(e.situation ? [{l: 'Situation Actuelle', v: e.situation, fw: true}] : []),
                                                   ...(e.message ? [{l: 'Message / Notes', v: e.message, fw: true}] : [])
                                                 ].map((it,i)=>(
                                                   <div key={i} className={`bg-white p-4 rounded-sm border border-black/5 shadow-sm space-y-1 ${it.fw ? 'col-span-2' : ''}`}>
                                                      <div className="text-[9px] font-bold uppercase text-black/40">{it.l}</div>
                                                      <div className="text-[13px] font-bold text-[#0D1B2A] break-words whitespace-pre-wrap">{it.v}</div>
                                                   </div>
                                                 ))}
                                              </div>
                                           </div>
                                           <div className="space-y-8">
                                              <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/30">Dossier & Documents</h4>
                                              <div className="space-y-4">
                                                 {getRequiredDocuments(e.service_type).map((doc,i)=>{
                                                   const isChecked = e.checked_documents?.includes(doc);
                                                   return (
                                                     <div key={i} className="flex items-center gap-3">
                                                        {isChecked ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-rose-500" />}
                                                        <span className={`text-[14px] ${isChecked ? 'font-bold text-[#0D1B2A]' : 'text-rose-600 line-through'}`}>{doc}</span>
                                                     </div>
                                                   )
                                                 })}
                                              </div>
                                           </div>
                                           <div className="space-y-8">
                                              <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/30">Gestion & Finances</h4>
                                              <div className="pt-2">
                                                 {renderFinanceBlock(e)}
                                              </div>
                                           </div>
                                        </div>
                                     </td>
                                   </tr>
                                 )}
                               </React.Fragment>
                            ))}
                         </tbody>
                     </table>
                  </div>

                  {/* PAGINATION STYLE FACTURE */}
                  {!loading && filteredEvaluations.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-black/[0.05] bg-white px-6 py-4 sm:px-10 mt-4 gap-4">
                      <div className="w-full sm:w-auto flex justify-between sm:justify-start items-center gap-4">
                        <p className="text-[13px] text-gray-700">
                          <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> à <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredEvaluations.length)}</span> sur <span className="font-medium">{filteredEvaluations.length}</span>
                        </p>
                        <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
                        <select 
                           value={itemsPerPage} 
                           onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           className="hidden sm:block text-[13px] text-gray-700 bg-transparent outline-none cursor-pointer font-medium"
                        >
                           <option value={5}>5 par page</option>
                           <option value={10}>10 par page</option>
                           <option value={20}>20 par page</option>
                           <option value={50}>50 par page</option>
                        </select>
                      </div>
                      
                      <div className="w-full sm:w-auto flex justify-center">
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <button
                            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Précédent</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const page = i + 1;
                            const range = window.innerWidth < 640 ? 0 : 1;
                            
                            if (page === 1 || page === totalPages || (page >= currentPage - range && page <= currentPage + range)) {
                              return (
                                <button
                                  key={page}
                                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                    page === currentPage
                                      ? 'bg-[#0D1B2A] text-[#C9A84C] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            } else if ((page === currentPage - range - 1 && page > 1) || (page === currentPage + range + 1 && page < totalPages)) {
                              return (
                                <span key={page} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          })}

                          <button
                            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Suivant</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  )}
               </div>
             ) : (
               <div className="max-w-4xl mx-auto p-10 space-y-12">
                  <div className="space-y-8">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0D1B2A]/50">Informations Cabinet</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[{l:'Nom',v:siteSettings.company_name,f:(v:string)=>setSiteSettings({...siteSettings,company_name:v})},{l:'Email',v:siteSettings.site_email,f:(v:string)=>setSiteSettings({...siteSettings,site_email:v})},{l:'Mobile',v:siteSettings.site_phone,f:(v:string)=>setSiteSettings({...siteSettings,site_phone:v})},{l:'Adresse',v:siteSettings.site_address,f:(v:string)=>setSiteSettings({...siteSettings,site_address:v})}].map((f,i)=>(
                           <div key={i} className="space-y-2">
                              <label className="text-[9px] font-bold uppercase text-black/40 tracking-widest">{f.l}</label>
                              <input value={f.v} onChange={e=>f.f(e.target.value)} className="w-full bg-white border border-black/[0.08] px-4 py-3 text-[14px] font-medium outline-none focus:border-[#C9A84C] text-[#0D1B2A] transition-colors rounded-sm" />
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-8">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0D1B2A]/50">WhatsApp Template</h3>
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <label className="text-[9px] font-bold uppercase text-black/50 tracking-widest">WhatsApp Numéro</label>
                           <input value={whatsAppConfig.phone_number} onChange={e=>setWhatsAppConfig({...whatsAppConfig,phone_number:e.target.value})} className="w-full bg-white border border-black/[0.08] px-5 py-3 text-[14px] font-bold text-[#0D1B2A] outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-bold uppercase text-black/50 tracking-widest">Message Étude de Dossier</label>
                           <textarea value={whatsAppConfig.message_template_study} onChange={e=>setWhatsAppConfig({...whatsAppConfig,message_template_study:e.target.value})} rows={3} className="w-full bg-white border border-black/[0.08] px-5 py-3 text-[14px] font-medium text-[#0D1B2A] outline-none focus:border-[#C9A84C] transition-colors rounded-sm" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-bold uppercase text-black/50 tracking-widest">Message Travail en cours</label>
                           <textarea value={whatsAppConfig.message_template_processing} onChange={e=>setWhatsAppConfig({...whatsAppConfig,message_template_processing:e.target.value})} rows={3} className="w-full bg-white border border-black/[0.08] px-5 py-3 text-[14px] font-medium text-[#0D1B2A] outline-none focus:border-[#C9A84C] transition-colors rounded-sm" />
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Admin;
