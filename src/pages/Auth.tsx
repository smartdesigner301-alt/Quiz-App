import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type AuthView = 'login' | 'signup' | 'forgot';

export default function Auth() {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'login') {
        await signIn(email, password);
        toast.success(t('welcomeBack') + '!');
        navigate('/quiz');
      } else if (view === 'signup') {
        await signUp(email, password, displayName);
        toast.success('Account created! Check your email to verify.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset link sent! Check your email.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  if (view === 'forgot') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="w-full max-w-md card-shadow border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="font-display text-2xl">{t('forgotPassword')}</CardTitle>
              <CardDescription>{t('forgotPasswordDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                  {loading ? t('sending') : t('sendResetLink')}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button onClick={() => setView('login')} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> {t('backToSignIn')}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md card-shadow border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary animate-pulse-glow">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">
              {view === 'login' ? t('welcomeBack') : t('joinQuizAI')}
            </CardTitle>
            <CardDescription>
              {view === 'login' ? t('signInDesc') : t('signUpDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {view === 'signup' && (
                  <motion.div key="name" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder={t('displayName')} value={displayName} onChange={e => setDisplayName(e.target.value)} className="pl-10" required />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required minLength={6} />
              </div>
              {view === 'login' && (
                <div className="text-right">
                  <button type="button" onClick={() => setView('forgot')} className="text-sm text-primary hover:text-primary/80 transition-colors">
                    {t('forgotPasswordLink')}
                  </button>
                </div>
              )}
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                {loading ? t('loading') : view === 'login' ? t('signIn') : t('createAccountBtn')}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {view === 'login' ? t('noAccount') : t('haveAccount')}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
