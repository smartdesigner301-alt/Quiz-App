import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BarChart3, Plus, FolderPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { isAdmin } = useAuth();
  const [playerCount, setPlayerCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [newCategory, setNewCategory] = useState('');
  const [newIcon, setNewIcon] = useState('📝');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;

    supabase.from('profiles').select('id', { count: 'exact', head: true }).then(({ count }) => setPlayerCount(count || 0));
    supabase.from('scores').select('id', { count: 'exact', head: true }).then(({ count }) => setQuizCount(count || 0));
    supabase.from('scores').select('score').then(({ data }) => {
      if (data?.length) {
        const avg = data.reduce((sum, s) => sum + s.score, 0) / data.length;
        setAvgScore(Math.round(avg));
      }
    });
    supabase.from('categories').select('*').then(({ data }) => { if (data) setCategories(data); });
  }, [isAdmin]);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const { error } = await supabase.from('categories').insert({ name: newCategory, icon: newIcon });
    if (error) {
      toast.error('Failed to add category');
    } else {
      toast.success('Category added!');
      setNewCategory('');
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Total Players', value: playerCount },
    { icon: BarChart3, label: 'Total Quizzes Played', value: quizCount },
    { icon: LayoutDashboard, label: 'Avg Score', value: avgScore },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="card-shadow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-primary" /> Manage Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Icon emoji"
                value={newIcon}
                onChange={e => setNewIcon(e.target.value)}
                className="w-20"
              />
              <Input
                placeholder="Category name"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addCategory} className="gradient-primary text-primary-foreground gap-2">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-display font-medium">{cat.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
