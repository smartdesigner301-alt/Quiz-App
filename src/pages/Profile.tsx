import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { User, Flame, Target, Award, TrendingUp } from 'lucide-react';

type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  earned_at: string;
};

export default function Profile() {
  const { profile, user } = useAuth();
  const { t } = useLanguage();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_badges')
      .select('earned_at, badges(id, name, description, icon)')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) {
          setBadges(data.map((d: any) => ({
            ...d.badges,
            earned_at: d.earned_at,
          })));
        }
      });
  }, [user]);

  if (!profile) return null;

  const xpForNextLevel = profile.level * 100;
  const xpProgress = (profile.xp % 100);
  const accuracy = profile.total_quizzes > 0
    ? Math.round((profile.total_correct / (profile.total_quizzes * 5)) * 100)
    : 0;

  const stats = [
    { icon: Target, label: t('quizzes'), value: profile.total_quizzes },
    { icon: TrendingUp, label: t('accuracy'), value: `${accuracy}%` },
    { icon: Flame, label: t('streak'), value: profile.streak },
    { icon: Award, label: t('bestStreak'), value: profile.best_streak },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
        <Card className="card-shadow">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary text-3xl text-primary-foreground font-display font-bold">
              {profile.display_name?.charAt(0)?.toUpperCase() || <User className="h-8 w-8" />}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold">{profile.display_name || t('player')}</h1>
              <p className="text-muted-foreground">{t('level')} {profile.level}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{profile.xp} {t('xpLabel')}</span>
                  <span>{xpForNextLevel} {t('xpToLevel')} {profile.level + 1}</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="card-shadow text-center">
                <CardContent className="p-4">
                  <stat.icon className="mx-auto h-5 w-5 text-primary mb-2" />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> {t('badges')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {badges.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">{t('noBadges')}</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {badges.map(badge => (
                  <div key={badge.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="font-display text-sm font-semibold">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
