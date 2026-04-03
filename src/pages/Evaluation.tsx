import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Toast from '../components/Toast';
import { 
  Mail, Phone, ChevronRight, Send, CheckCircle2, 
  User, Globe, Briefcase, FileText, Landmark, FileCheck, RefreshCw, MessageCircle
} from 'lucide-react';

// List of common countries for the select inputs
const countries = [
  "Afghanistan", "Afrique du Sud", "Algérie", "Allemagne", "Angola", "Arabie Saoudite", "Argentine", "Australie", "Autriche",
  "Belgique", "Bénin", "Brésil", "Bulgarie", "Burkina Faso", "Burundi",
  "Cameroun", "Canada", "Chili", "Chine", "Colombie", "Congo (Brazzaville)", "Congo (Kinshasa)", "Corée du Sud", "Côte d'Ivoire",
  "Danemark", "Djibouti",
  "Égypte", "Émirats Arabes Unis", "Espagne", "États-Unis", "Éthiopie",
  "France",
  "Gabon", "Gambie", "Ghana", "Grèce", "Guinée", "Guinée Équatoriale",
  "Haïti",
  "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Italie",
  "Japon", "Jordanie",
  "Kenya",
  "Liban", "Libéria", "Libye", "Luxembourg",
  "Madagascar", "Malaisie", "Mali", "Maroc", "Maurice", "Mauritanie", "Mexique", "Monaco",
  "Niger", "Nigéria", "Norvège",
  "Oman", "Ouganda",
  "Pakistan", "Palestine", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal",
  "Qatar",
  "République Centrafricaine", "République Dominicaine", "Roumanie", "Royaume-Uni", "Russie", "Rwanda",
  "Sénégal", "Seychelles", "Sierra Leone", "Singapour", "Somalie", "Soudan", "Suède", "Suisse", "Syrie",
  "Tchad", "Thaïlande", "Togo", "Tunisie", "Turquie",
  "Ukraine", "Uruguay",
  "Venezuela", "Vietnam",
  "Yémen",
  "Zambie", "Zimbabwe"
];

const Evaluation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    residenceCountry: '',
    age: '',
    situation: '',
    hasCriminalRecord: 'non',
    financialStatus: '',
    employmentStatus: '',
    degreeLevel: '',
    investAmount: '',
    message: ''
  });

  const [documents, setDocuments] = useState<string[]>([]);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waConfig, setWaConfig] = useState({ 
    phone: '+34600000000', 
    message: "",
    successText: ""
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchConfig = async () => {
    try {
      const { data } = await supabase.from('tolito_espagne_immigration_whatsapp_config')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setWaConfig({ 
          phone: data.phone_number.replace(/\D/g, ''), 
          message: data.message_template_study || "Bonjour, je viens de remplir le formulaire de dossier sur le site et je souhaiterais connaître les frais d'étude.",
          successText: data.message_template_processing || "Votre dossier a été transmis à nos experts. Pour finaliser votre demande et régler les frais d'étude et d'accompagnement, veuillez nous contacter directement sur WhatsApp."
        });
        return data; // Return data so we can use it right after submission
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la configuration WhatsApp:", err);
    }
    return null;
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleDocument = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  useEffect(() => {
    setCheckedDocs({});
    switch (service) {
      case 'visa-visiteur':
        setDocuments(['Passeport à jour', 'Justificatif de logement', 'Assurance voyage', 'Preuve de fonds financiers']);
        break;
      case 'permis-etudes':
        setDocuments(['Lettre d\'admission', 'Preuve de fonds (1000€/mois)', 'Assurance médicale complète', 'Derniers diplômes obtenus']);
        break;
      case 'permis-travail':
        setDocuments(['Contrat de travail espagnol', 'Diplômes traduits/apostillés', 'Casier judiciaire vierge', 'Certificat d\'aptitude']);
        break;
      case 'visa-entrepreneur':
      case 'visa-investissement':
      case 'golden-visa':
        setDocuments(['Business Plan détaillé', 'Justificatif origine des fonds', 'Assurance santé privée', 'Certificat investissement']);
        break;
      case 'regroupement-familial':
        setDocuments(['Actes de naissance/mariage', 'Preuve logement adéquat', 'Titres de séjour du regroupant', 'Preuve de revenus stables']);
        break;
      default:
        setDocuments(['Passeport valide', 'Casier judiciaire apostillé', 'Assurance médicale', 'Justificatif de domicile']);
    }
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types/selects
    if (errors.includes(name)) {
      setErrors(prev => prev.filter(err => err !== name));
    }
  };

  const validateStep = () => {
    const newErrors: string[] = [];
    
    if (step === 2) {
      if (!formData.nationality) newErrors.push('nationality');
      if (!formData.residenceCountry) newErrors.push('residenceCountry');
      if (!formData.age) newErrors.push('age');
      
      // Conditional validation for EVERY SERVICE choice
      if (service === 'permis-etudes') {
        if (!formData.degreeLevel) newErrors.push('degreeLevel');
        if (!formData.financialStatus) newErrors.push('financialStatus');
      } 
      else if (service === 'visa-entrepreneur' || service === 'golden-visa' || service === 'visa-investissement') {
        if (!formData.investAmount) newErrors.push('investAmount');
        if (!formData.employmentStatus) newErrors.push('employmentStatus');
      }
      else if (service === 'permis-travail') {
        // age already checked, but let's be exhaustive
        if (!formData.age) newErrors.push('age');
      }
      else {
        // generic fallback for others
        if (!formData.situation) newErrors.push('situation');
      }
    }
    
    if (step === 4) {
      if (!formData.firstName) newErrors.push('firstName');
      if (!formData.lastName) newErrors.push('lastName');
      if (!formData.email) newErrors.push('email');
      if (!formData.phone) newErrors.push('phone');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = async () => {
    if (validateStep()) {
      if (step === 4) {
        handleSubmit();
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      service_type: service,
      nationality: formData.nationality,
      residence_country: formData.residenceCountry,
      age: parseInt(formData.age) || null,
      has_criminal_record: formData.hasCriminalRecord,
      financial_status: formData.financialStatus,
      employment_status: formData.employmentStatus,
      degree_level: formData.degreeLevel,
      invest_amount: formData.investAmount,
      situation: formData.situation,
      message: formData.message,
      checked_documents: Object.keys(checkedDocs).filter(key => checkedDocs[key]),
      status: 'En attente' // Use the same label as in admin for consistency
    };

    console.log("SUBMITTING TO SUPABASE:", submissionData);

    try {
      const { error } = await supabase.from('tolito_espagne_immigration_evaluations').insert([submissionData]);
      if (error) {
        console.error("Supabase submission error:", error);
        throw error;
      }
      
      console.log("SUBMISSION SUCCESSFUL! REFTECHING CONFIG...");
      
      // Wait for the latest config from database before stopping the loader
      const latestConfig = await fetchConfig();
      
      if (latestConfig) {
        setWaConfig({ 
          phone: latestConfig.phone_number.replace(/\D/g, ''), 
          message: latestConfig.message_template_study || waConfig.message,
          successText: latestConfig.message_template_processing || waConfig.successText
        });
      }

      setIsSubmitted(true);
      setToast({ message: "Votre dossier a été soumis avec succès.", type: 'success' });
    } catch (err: any) {
      console.error("General submission error:", err);
      setToast({ message: "Échec de l'envoi. Veuillez vérifier votre connexion.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrors([]);
  };

  const renderServiceSpecificFields = () => {
    switch (service) {
      case 'permis-etudes':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Niveau d'études</label>
              <select 
                name="degreeLevel" 
                onChange={handleInputChange} 
                value={formData.degreeLevel}
                className={`input-field px-3 lg:px-4 ${errors.includes('degreeLevel') ? 'error' : ''}`}
              >
                <option value="">Sélection</option>
                <option value="Bac">Bac</option>
                <option value="Licence">Licence</option>
                <option value="Master">Master</option>
                <option value="Doctorat">Doctorat</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Budget Mensuel</label>
              <input 
                type="text" 
                name="financialStatus" 
                placeholder="Ex: 1000€" 
                value={formData.financialStatus}
                onChange={handleInputChange} 
                className={`input-field px-3 lg:px-4 ${errors.includes('financialStatus') ? 'error' : ''}`} 
              />
            </div>
          </motion.div>
        );
      case 'visa-entrepreneur':
      case 'visa-investissement':
      case 'golden-visa':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Montant Investi</label>
              <select 
                name="investAmount" 
                onChange={handleInputChange} 
                value={formData.investAmount}
                className={`input-field px-3 lg:px-4 ${errors.includes('investAmount') ? 'error' : ''}`}
              >
                <option value="">Sélection</option>
                <option value="<100k€">&lt;100k€</option>
                <option value="100-500k">100-500k</option>
                <option value=">500k€">&gt;500k€</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Secteur</label>
              <input 
                type="text" 
                name="employmentStatus" 
                placeholder="Immo, Tech..." 
                value={formData.employmentStatus}
                onChange={handleInputChange} 
                className={`input-field px-3 lg:px-4 ${errors.includes('employmentStatus') ? 'error' : ''}`} 
              />
            </div>
          </motion.div>
        );
      case 'permis-travail':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Offre emploi ?</label>
              <select name="situation" onChange={handleInputChange} className="input-field px-3 lg:px-4">
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
             <div className="flex flex-col gap-1.5">
               <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Expérience (Années)</label>
               <input 
                 type="number" 
                 name="employmentStatus" 
                 placeholder="ex: 5" 
                 value={formData.employmentStatus}
                 onChange={handleInputChange} 
                 className={`input-field px-3 lg:px-4 ${errors.includes('employmentStatus') ? 'error' : ''}`} 
               />
            </div>
          </motion.div>
        );
      case 'visa-visiteur':
      case 'regroupement-familial':
      case 'autres':
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Détails du projet</label>
            <textarea 
              name="situation" 
              placeholder="Décrivez brièvement votre projet d'immigration..." 
              rows={3} 
              value={formData.situation}
              onChange={handleInputChange} 
              className={`input-field resize-none ${errors.includes('situation') ? 'error' : ''}`}
            ></textarea>
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
      
      {/* HERO SECTION - HIDDEN ON MOBILE */}
      <section className="hidden lg:block relative py-6 lg:py-8 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10 flex flex-row items-center justify-between gap-4">
          <div className="text-left">
            <nav className="flex items-center justify-start gap-2 mb-2">
              <Link to="/" className="text-white/40 text-[10px] hover:text-[#C9A84C] transition-colors uppercase tracking-widest font-bold">Accueil</Link>
              <ChevronRight className="w-2.5 h-2.5 text-[#C9A84C]" />
              <span className="text-white text-[10px] uppercase tracking-widest font-bold">Évaluation Dossier</span>
            </nav>
            <h1 className="font-serif text-[28px] text-white font-normal leading-tight">
              Évaluez Votre <em className="text-[#E8C97A] italic not-serif">Éligibilité</em>
            </h1>
          </div>
          <p className="text-[13px] text-white/40 max-w-[400px] leading-relaxed block text-right">
            Analyse experte de votre profil en 24h.
          </p>
        </div>
      </section>

      {/* FORM SECTION - ADJUSTED FOR MOBILE */}
      <section className="py-6 lg:py-12 lg:-mt-4 relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            
            {/* MAIN FORM CARD */}
            <div className="bg-white rounded-[4px] shadow-[0_30px_100px_rgba(13,27,42,0.08)] border border-black/5 overflow-hidden">
              {/* Stepper Header */}
              <div className="flex border-b border-black/5 bg-[#FDFCF9] overflow-x-auto no-scrollbar">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`flex-1 min-w-[80px] py-4 lg:py-5 px-3 lg:px-6 flex items-center justify-center gap-2 lg:gap-3 transition-colors ${step === s ? 'bg-white border-b-2 border-[#C9A84C]' : 'opacity-40'}`}>
                    <span className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[10px] lg:text-[12px] font-bold ${step === s ? 'bg-[#0D1B2A] text-white' : 'bg-slate-200 text-slate-500'}`}>{s}</span>
                    <span className="hidden md:inline text-[11px] font-bold uppercase tracking-[0.15em]">
                      {s === 1 ? 'Service' : s === 2 ? 'Profil' : s === 3 ? 'Dossier' : 'Contact'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 lg:p-14">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="font-serif text-[24px] lg:text-[32px] text-[#0D1B2A] mb-3">Quel service vous intéresse ?</h2>
                        <p className="text-[#5A677D] text-[14px]">Sélectionnez la catégorie principale de votre projet.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 lg:gap-4">
                        {[
                          { id: 'visa-visiteur', name: 'Visiteur / Touriste', icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" /> },
                          { id: 'permis-etudes', name: 'Études Espagne', icon: <Landmark className="w-4 h-4 lg:w-5 lg:h-5" /> },
                          { id: 'permis-travail', name: 'Permis Travail', icon: <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" /> },
                          { id: 'visa-entrepreneur', name: 'Investissement', icon: <Landmark className="w-4 h-4 lg:w-5 lg:h-5" /> },
                          { id: 'regroupement-familial', name: 'Famille', icon: <User className="w-4 h-4 lg:w-5 lg:h-5" /> },
                          { id: 'autres', name: 'Autres (NIE...)', icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" /> },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => { setService(item.id); setStep(2); }}
                            className={`flex flex-col sm:flex-row items-center sm:items-center gap-3 lg:gap-4 p-4 lg:p-5 rounded border-2 transition-all text-center sm:text-left ${service === item.id ? 'border-[#C9A84C] bg-[#FDFCF9] shadow-md' : 'border-slate-100 hover:border-slate-200'}`}
                          >
                            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded shrink-0 flex items-center justify-center ${service === item.id ? 'bg-[#0D1B2A] text-[#C9A84C]' : 'bg-slate-100 text-slate-400'}`}>
                              {item.icon}
                            </div>
                            <span className="text-[12px] lg:text-[14px] font-bold text-[#0D1B2A] leading-tight">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="font-serif text-[32px] text-[#0D1B2A] mb-4">Parlez-nous de vous</h2>
                        <p className="text-[#5A677D] text-[15px]">Ces informations sont nécessaires pour l'étude de votre profil.</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
                         <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Nationalité</label>
                          <select 
                            name="nationality" 
                            value={formData.nationality}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('nationality') ? 'error' : ''}`}
                          >
                            <option value="">Sélection</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Résidence</label>
                          <select 
                            name="residenceCountry" 
                            value={formData.residenceCountry}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('residenceCountry') ? 'error' : ''}`}
                          >
                            <option value="">Sélection</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Âge</label>
                          <input 
                            type="number" 
                            name="age" 
                            placeholder="Âge" 
                            value={formData.age}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('age') ? 'error' : ''}`} 
                          />
                        </div>
                         <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Casier ?</label>
                          <select name="hasCriminalRecord" value={formData.hasCriminalRecord} onChange={handleInputChange} className="input-field px-3 lg:px-4">
                            <option value="non">Aucun</option>
                            <option value="oui">Oui</option>
                          </select>
                        </div>
                      </div>

                      {renderServiceSpecificFields()}

                      <div className="flex gap-4 pt-4 border-t border-black/5">
                        <button onClick={prevStep} className="px-8 py-3.5 border-2 border-slate-200 text-[#0D1B2A] text-[13px] font-bold uppercase rounded hover:bg-slate-50 transition-all">Retour</button>
                        <button onClick={nextStep} className="btn-primary flex-1">Étape suivante →</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="font-serif text-[32px] text-[#0D1B2A] mb-4">Pièces justificatives</h2>
                        <p className="text-[#5A677D] text-[15px]">Cochez les documents que vous possédez déjà pour faciliter l'analyse.</p>
                      </div>

                      <div className="bg-[#FDFCF9] border-2 border-[#C9A84C]/20 rounded p-8">
                         <div className="flex items-center gap-3 mb-6">
                            <FileCheck className="w-6 h-6 text-[#C9A84C]" />
                            <h3 className="font-bold text-[#0D1B2A] text-[16px]">Checklist officielle : {service.replace('-', ' ')}</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                            {documents.map((doc, idx) => (
                              <label
                                key={idx}
                                className={`flex items-center gap-3 p-3 lg:p-4 rounded border transition-all cursor-pointer ${checkedDocs[doc] ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-slate-100 bg-white'}`}
                              >
                                 <input
                                   type="checkbox"
                                   checked={!!checkedDocs[doc]}
                                   onChange={() => toggleDocument(doc)}
                                   className="w-5 h-5 accent-[#C9A84C] cursor-pointer"
                                 />
                                 <span className={`text-[13.5px] leading-tight ${checkedDocs[doc] ? 'text-[#0D1B2A] font-bold' : 'text-[#3D4B5C]'}`}>{doc}</span>
                              </label>
                            ))}
                         </div>
                      </div>

                      <div className="p-6 bg-[#0D1B2A]/5 border border-[#0D1B2A]/10 rounded flex gap-4">
                         <div className="w-6 h-6 bg-[#C9A84C] text-white rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">i</div>
                         <p className="text-[13px] text-[#0D1B2A]/80 leading-relaxed">
                            <strong>Note :</strong> La sélection des documents n'est pas obligatoire pour l'évaluation initiale, mais elle accélère grandement le traitement.
                         </p>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-black/5">
                        <button onClick={prevStep} className="px-8 py-3.5 border-2 border-slate-200 text-[#0D1B2A] text-[13px] font-bold uppercase rounded hover:bg-slate-50 transition-all">Retour</button>
                        <button
                          onClick={() => setStep(4)}
                          className="btn-primary flex-1 shadow-[0_10px_20px_rgba(201,168,76,0.15)]"
                        >
                          Continuer vers le contact →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="font-serif text-[32px] text-[#0D1B2A] mb-4">Informations de contact</h2>
                        <p className="text-[#5A677D] text-[15px]">Comment pouvons-nous vous joindre pour vous envoyer l'évaluation complète ?</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Prénom</label>
                          <input 
                            type="text" 
                            name="firstName" 
                            placeholder="Prénom" 
                            value={formData.firstName}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('firstName') ? 'error' : ''}`} 
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Nom</label>
                          <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Votre nom" 
                            value={formData.lastName}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('lastName') ? 'error' : ''}`} 
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('email') ? 'error' : ''}`} 
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">WhatsApp</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            placeholder="+..." 
                            value={formData.phone}
                            onChange={handleInputChange} 
                            className={`input-field px-3 lg:px-4 ${errors.includes('phone') ? 'error' : ''}`} 
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 col-span-2">
                          <label className="text-[10px] lg:text-[11px] font-bold text-[#3D4B5C] tracking-[0.1em] uppercase">Message (Optionnel)</label>
                          <textarea name="message" placeholder="Détails utiles..." rows={3} value={formData.message} onChange={handleInputChange} className="input-field px-3 lg:px-4 resize-none"></textarea>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-black/5">
                        <button onClick={prevStep} className="px-8 py-3.5 border-2 border-slate-200 text-[#0D1B2A] text-[13px] font-bold uppercase rounded hover:bg-slate-50 transition-all">Retour</button>
                        <button 
                          onClick={nextStep}
                          disabled={isSubmitting}
                          className="btn-primary w-full px-10 py-5 flex items-center justify-center shadow-[0_15px_30px_rgba(201,168,76,0.2)] disabled:opacity-70 disabled:cursor-wait min-h-[64px] rounded-sm transition-all active:scale-95"
                        >
                           <div className="flex items-center gap-4">
                              {isSubmitting ? (
                                <>
                                  <RefreshCw className="w-5 h-5 animate-spin" />
                                  <span className="font-extrabold uppercase tracking-[0.2em] text-[13px] leading-none">Traitement en cours</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5 shrink-0" />
                                  <span className="font-extrabold uppercase tracking-[0.2em] text-[13px] leading-none">Soumettre le dossier</span>
                                </>
                              )}
                           </div>
                        </button>
                      </div>

                      <p className="text-[12px] text-slate-400 text-center">
                         En soumettant ce formulaire, vous acceptez notre politique de confidentialité. Vos données sont traitées avec une confidentialité absolue par nos avocats.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUCCESS MODAL */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-[#0D1B2A]/90 backdrop-blur-md"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-white max-w-md w-full p-10 rounded shadow-2xl text-center space-y-8"
                      >
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                           <CheckCircle2 size={40} />
                        </div>
                        <h2 className="font-serif text-[28px] text-[#0D1B2A]">Demande Reçue</h2>
                        <p className="text-[#5A677D] text-[15px] leading-relaxed">
                          {waConfig.successText}
                        </p>
                        <div className="pt-4 space-y-4">
                           <a 
                             href={`https://wa.me/${waConfig.phone}?text=${encodeURIComponent(waConfig.message)}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-sm flex items-center justify-center gap-3 text-[14px] font-bold uppercase tracking-widest transition-all shadow-xl"
                           >
                              <MessageCircle size={20} /> Continuer sur WhatsApp
                           </a>
                           <Link to="/" className="block text-[12px] font-bold text-slate-400 hover:text-[#0D1B2A] uppercase tracking-widest py-2">Retourner à l'accueil</Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-6">
              <div className="bg-[#0D1B2A] text-white p-8 rounded-sm shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C] opacity-5 -mr-10 -mt-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                 <h4 className="font-serif text-[22px] mb-4 text-[#E8C97A]">Engagement Qualité</h4>
                 <ul className="space-y-4">
                   {[
                     "Analyse de viabilité par un avocat expert",
                     "Vérification des critères légaux 2024",
                     "Économie de temps et frais administratifs",
                     "Réponse sous 24h ouvrables garantie"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-3 text-[13.5px] text-white/80 leading-relaxed">
                       <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
              </div>

              <div className="bg-white p-8 rounded shadow-sm border border-black/5">
                 <h4 className="font-serif text-[20px] mb-4 text-[#0D1B2A]">Besoin d'aide ?</h4>
                 <div className="space-y-5">
                    <a href="tel:+34600000000" className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-all">
                          <Phone className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Appelez-nous</p>
                          <p className="text-[14px] font-bold text-[#0D1B2A]">+34 600 000 000</p>
                       </div>
                    </a>
                    <a href="mailto:evaluation@espana-immigration.com" className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-all">
                          <Mail className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email Direct</p>
                          <p className="text-[14px] font-bold text-[#0D1B2A]">evaluation@espana.es</p>
                       </div>
                    </a>
                 </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Evaluation;
