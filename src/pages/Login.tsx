import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      if (data.user) {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C9A84C] opacity-5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C9A84C] opacity-5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-md w-full bg-white rounded-sm shadow-2xl p-10 relative z-10 border border-white/10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F8F4EE] rounded-full mb-6 border border-[#C9A84C]/20 shadow-inner">
            <ShieldCheck size={40} className="text-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-[32px] text-[#0D1B2A] mb-2">Espace <em className="italic text-[#C9A84C] not-serif">Admin</em></h1>
          <p className="text-[#5A677D] text-[15px]">Accédez à la gestion des évaluations Tolito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[11px] font-bold text-[#0D1B2A] tracking-[0.1em] uppercase">
              Email Professionnel
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-12"
                placeholder="admin@tolito.com"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C9A84C]" size={20} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[11px] font-bold text-[#0D1B2A] tracking-[0.1em] uppercase">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pl-12"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#C9A84C]" size={20} />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-[13px] font-medium flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0"></span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full shadow-[0_15px_30px_rgba(201,168,76,0.15)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[13px]"
          >
            {loading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <a href="/" className="text-[12px] font-bold text-[#5A677D] hover:text-[#C9A84C] transition-colors uppercase tracking-widest">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
