import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';

type LeaderboardEntry = {
  user_id: string;
  display_name: string | null;
  level: number;
  xp: number;
  streak: number;
  total_quizzes: number;
  total_correct: number;
  total_score: number;
  rank: number;
};

const rankIcons = [Crown, Trophy, Medal];

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('user_id, display_name, level, xp, streak, total_quizzes, total_correct')
        .order('xp', { ascending: false })
        .limit(50);

      if (data) {
        setEntries(data.map((d, i) => ({
          ...d,
          total_score: d.xp,
          rank: i + 1,
        })));
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <Trophy className="mx-auto h-10 w-10 text-primary mb-3" />
          <h1 className="font-display text-3xl font-bold">{t('leaderboardTitle')}</h1>
          <p className="text-muted-foreground">{t('topPlayers')}</p>
        </div>

        <Card className="mx-auto max-w-2xl card-shadow">
          <CardHeader>
            <CardTitle className="font-display">{t('rankings')}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t('noPlayers')}</p>
            ) : (
              <div className="space-y-2">
                {entries.map((entry, i) => {
                  const RankIcon = rankIcons[i] || null;
                  return (
                    <motion.div
                      key={entry.user_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${
                        i < 3 ? 'bg-primary/5 border border-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full font-display font-bold">
                        {RankIcon ? (
                          <RankIcon className={`h-6 w-6 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                        ) : (
                          <span className="text-muted-foreground">{entry.rank}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold truncate">{entry.display_name || t('anonymous')}</p>
                        <p className="text-xs text-muted-foreground">{t('level')} {entry.level} · 🔥 {entry.streak} {t('streak').toLowerCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-primary">{entry.xp} XP</p>
                        <p className="text-xs text-muted-foreground">{entry.total_quizzes} {t('quizzes').toLowerCase()}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
