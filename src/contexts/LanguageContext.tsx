import React, { createContext, useContext, useState, useCallback } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navbar
    play: 'Play', leaderboard: 'Leaderboard', profile: 'Profile', admin: 'Admin',
    getStarted: 'Get Started',
    // Landing
    heroTitle: 'Learn Smarter with', heroDesc: 'AI-powered quizzes that adapt to your knowledge level. Compete with friends, earn badges, and climb the leaderboard.',
    startPlaying: 'Start Playing', viewLeaderboard: 'View Leaderboard',
    questionsGenerated: 'Questions Generated', activePlayers: 'Active Players', quizCategories: 'Quiz Categories', uptime: 'Uptime',
    whyQuizAI: 'Why', howItWorks: 'How It', works: 'Works', readyTo: 'Ready to', levelUp: 'Level Up',
    aiPowered: 'AI-Powered Questions', instantFeedback: 'Instant Feedback', competeClimb: 'Compete & Climb', multipleCategories: 'Multiple Categories',
    createAccount: 'Create Account', startQuiz: 'Start a Quiz', learnCompete: 'Learn & Compete',
    getStartedFree: 'Get Started Free', signIn: 'Sign In', allRightsReserved: 'All rights reserved. Built by',
    // Quiz
    signInToPlay: 'Sign in to Play', signInToPlayDesc: 'Create an account to start your quiz journey.',
    chooseCategory: 'Choose a Category', selectTopic: 'Select a topic and test your knowledge',
    tapToStart: 'Tap to start', generatingAI: 'Generating questions with AI...',
    quizComplete: 'Quiz Complete!', accuracy: 'Accuracy', totalTime: 'total',
    xpEarned: 'XP earned', playAgain: 'Play Again', submitAnswer: 'Submit Answer',
    seeResults: 'See Results', nextQuestion: 'Next Question', question: 'Question',
    // Profile
    player: 'Player', level: 'Level', xpLabel: 'XP', xpToLevel: 'XP to Level',
    quizzes: 'Quizzes', streak: 'Streak', bestStreak: 'Best Streak',
    badges: 'Badges', noBadges: 'No badges earned yet. Keep playing!',
    // Auth
    welcomeBack: 'Welcome Back', joinQuizAI: 'Join QuizAI',
    signInDesc: 'Sign in to continue your quiz journey', signUpDesc: 'Create an account to start playing',
    forgotPassword: 'Forgot Password', forgotPasswordDesc: 'Enter your email and we\'ll send you a reset link',
    sendResetLink: 'Send Reset Link', sending: 'Sending...', backToSignIn: 'Back to Sign In',
    loading: 'Loading...', createAccountBtn: 'Create Account',
    noAccount: "Don't have an account? Sign up", haveAccount: 'Already have an account? Sign in',
    forgotPasswordLink: 'Forgot Password?',
    email: 'Email', password: 'Password', displayName: 'Display Name',
    // Leaderboard
    leaderboardTitle: 'Leaderboard', topPlayers: 'Top players ranked by experience points',
    rankings: 'Rankings', noPlayers: 'No players yet. Be the first!',
    anonymous: 'Anonymous',
  },
  es: {
    play: 'Jugar', leaderboard: 'Clasificación', profile: 'Perfil', admin: 'Admin',
    getStarted: 'Empezar',
    heroTitle: 'Aprende más rápido con', heroDesc: 'Cuestionarios impulsados por IA que se adaptan a tu nivel de conocimiento.',
    startPlaying: 'Empezar a jugar', viewLeaderboard: 'Ver clasificación',
    questionsGenerated: 'Preguntas generadas', activePlayers: 'Jugadores activos', quizCategories: 'Categorías', uptime: 'Disponibilidad',
    whyQuizAI: 'Por qué', howItWorks: 'Cómo', works: 'funciona', readyTo: 'Listo para', levelUp: 'subir de nivel',
    aiPowered: 'Preguntas con IA', instantFeedback: 'Retroalimentación instantánea', competeClimb: 'Compite y sube', multipleCategories: 'Múltiples categorías',
    createAccount: 'Crear cuenta', startQuiz: 'Iniciar quiz', learnCompete: 'Aprende y compite',
    getStartedFree: 'Empezar gratis', signIn: 'Iniciar sesión', allRightsReserved: 'Todos los derechos reservados. Creado por',
    signInToPlay: 'Inicia sesión para jugar', signInToPlayDesc: 'Crea una cuenta para comenzar tu viaje de quiz.',
    chooseCategory: 'Elige una categoría', selectTopic: 'Selecciona un tema y pon a prueba tu conocimiento',
    tapToStart: 'Toca para comenzar', generatingAI: 'Generando preguntas con IA...',
    quizComplete: '¡Quiz completado!', accuracy: 'Precisión', totalTime: 'total',
    xpEarned: 'XP ganados', playAgain: 'Jugar de nuevo', submitAnswer: 'Enviar respuesta',
    seeResults: 'Ver resultados', nextQuestion: 'Siguiente pregunta', question: 'Pregunta',
    player: 'Jugador', level: 'Nivel', xpLabel: 'XP', xpToLevel: 'XP para Nivel',
    quizzes: 'Quizzes', streak: 'Racha', bestStreak: 'Mejor racha',
    badges: 'Insignias', noBadges: 'Aún no tienes insignias. ¡Sigue jugando!',
    welcomeBack: 'Bienvenido de nuevo', joinQuizAI: 'Únete a QuizAI',
    signInDesc: 'Inicia sesión para continuar tu viaje', signUpDesc: 'Crea una cuenta para empezar a jugar',
    forgotPassword: 'Olvidé mi contraseña', forgotPasswordDesc: 'Ingresa tu email y te enviaremos un enlace',
    sendResetLink: 'Enviar enlace', sending: 'Enviando...', backToSignIn: 'Volver a iniciar sesión',
    loading: 'Cargando...', createAccountBtn: 'Crear cuenta',
    noAccount: '¿No tienes cuenta? Regístrate', haveAccount: '¿Ya tienes cuenta? Inicia sesión',
    forgotPasswordLink: '¿Olvidaste tu contraseña?',
    email: 'Email', password: 'Contraseña', displayName: 'Nombre',
    leaderboardTitle: 'Clasificación', topPlayers: 'Mejores jugadores por puntos de experiencia',
    rankings: 'Rankings', noPlayers: 'No hay jugadores aún. ¡Sé el primero!',
    anonymous: 'Anónimo',
  },
  fr: {
    play: 'Jouer', leaderboard: 'Classement', profile: 'Profil', admin: 'Admin',
    getStarted: 'Commencer',
    heroTitle: 'Apprenez mieux avec', heroDesc: 'Des quiz alimentés par l\'IA qui s\'adaptent à votre niveau.',
    startPlaying: 'Commencer à jouer', viewLeaderboard: 'Voir le classement',
    questionsGenerated: 'Questions générées', activePlayers: 'Joueurs actifs', quizCategories: 'Catégories', uptime: 'Disponibilité',
    whyQuizAI: 'Pourquoi', howItWorks: 'Comment ça', works: 'marche', readyTo: 'Prêt à', levelUp: 'monter de niveau',
    aiPowered: 'Questions IA', instantFeedback: 'Retour instantané', competeClimb: 'Rivalisez et montez', multipleCategories: 'Plusieurs catégories',
    createAccount: 'Créer un compte', startQuiz: 'Lancer un quiz', learnCompete: 'Apprenez et rivalisez',
    getStartedFree: 'Commencer gratuitement', signIn: 'Se connecter', allRightsReserved: 'Tous droits réservés. Créé par',
    signInToPlay: 'Connectez-vous pour jouer', signInToPlayDesc: 'Créez un compte pour commencer.',
    chooseCategory: 'Choisissez une catégorie', selectTopic: 'Sélectionnez un sujet et testez vos connaissances',
    tapToStart: 'Appuyez pour commencer', generatingAI: 'Génération de questions par IA...',
    quizComplete: 'Quiz terminé !', accuracy: 'Précision', totalTime: 'total',
    xpEarned: 'XP gagnés', playAgain: 'Rejouer', submitAnswer: 'Soumettre',
    seeResults: 'Voir les résultats', nextQuestion: 'Question suivante', question: 'Question',
    player: 'Joueur', level: 'Niveau', xpLabel: 'XP', xpToLevel: 'XP pour Niveau',
    quizzes: 'Quiz', streak: 'Série', bestStreak: 'Meilleure série',
    badges: 'Badges', noBadges: 'Pas encore de badges. Continuez à jouer !',
    welcomeBack: 'Bon retour', joinQuizAI: 'Rejoindre QuizAI',
    signInDesc: 'Connectez-vous pour continuer', signUpDesc: 'Créez un compte pour commencer à jouer',
    forgotPassword: 'Mot de passe oublié', forgotPasswordDesc: 'Entrez votre email pour recevoir un lien',
    sendResetLink: 'Envoyer le lien', sending: 'Envoi...', backToSignIn: 'Retour à la connexion',
    loading: 'Chargement...', createAccountBtn: 'Créer un compte',
    noAccount: "Pas de compte ? Inscrivez-vous", haveAccount: 'Déjà un compte ? Connectez-vous',
    forgotPasswordLink: 'Mot de passe oublié ?',
    email: 'Email', password: 'Mot de passe', displayName: 'Nom d\'affichage',
    leaderboardTitle: 'Classement', topPlayers: 'Meilleurs joueurs par points d\'expérience',
    rankings: 'Classement', noPlayers: 'Pas encore de joueurs. Soyez le premier !',
    anonymous: 'Anonyme',
  },
  hi: {
    play: 'खेलें', leaderboard: 'लीडरबोर्ड', profile: 'प्रोफ़ाइल', admin: 'एडमिन',
    getStarted: 'शुरू करें',
    heroTitle: 'स्मार्ट सीखें', heroDesc: 'AI-संचालित क्विज़ जो आपके ज्ञान स्तर के अनुसार अनुकूलित होते हैं।',
    startPlaying: 'खेलना शुरू करें', viewLeaderboard: 'लीडरबोर्ड देखें',
    questionsGenerated: 'प्रश्न उत्पन्न', activePlayers: 'सक्रिय खिलाड़ी', quizCategories: 'क्विज़ श्रेणियाँ', uptime: 'अपटाइम',
    whyQuizAI: 'क्यों', howItWorks: 'कैसे', works: 'काम करता है', readyTo: 'तैयार हैं', levelUp: 'आगे बढ़ने के लिए',
    aiPowered: 'AI-संचालित प्रश्न', instantFeedback: 'तुरंत प्रतिक्रिया', competeClimb: 'प्रतिस्पर्धा करें', multipleCategories: 'कई श्रेणियाँ',
    createAccount: 'खाता बनाएं', startQuiz: 'क्विज़ शुरू करें', learnCompete: 'सीखें और प्रतिस्पर्धा करें',
    getStartedFree: 'मुफ़्त शुरू करें', signIn: 'साइन इन', allRightsReserved: 'सर्वाधिकार सुरक्षित। निर्माता',
    signInToPlay: 'खेलने के लिए साइन इन करें', signInToPlayDesc: 'अपनी क्विज़ यात्रा शुरू करने के लिए खाता बनाएं।',
    chooseCategory: 'श्रेणी चुनें', selectTopic: 'एक विषय चुनें और अपना ज्ञान परखें',
    tapToStart: 'शुरू करने के लिए टैप करें', generatingAI: 'AI से प्रश्न उत्पन्न हो रहे हैं...',
    quizComplete: 'क्विज़ पूरा!', accuracy: 'सटीकता', totalTime: 'कुल',
    xpEarned: 'XP अर्जित', playAgain: 'फिर से खेलें', submitAnswer: 'उत्तर जमा करें',
    seeResults: 'परिणाम देखें', nextQuestion: 'अगला प्रश्न', question: 'प्रश्न',
    player: 'खिलाड़ी', level: 'स्तर', xpLabel: 'XP', xpToLevel: 'XP स्तर के लिए',
    quizzes: 'क्विज़', streak: 'स्ट्रीक', bestStreak: 'सर्वश्रेष्ठ स्ट्रीक',
    badges: 'बैज', noBadges: 'अभी तक कोई बैज नहीं। खेलते रहें!',
    welcomeBack: 'वापसी पर स्वागत', joinQuizAI: 'QuizAI से जुड़ें',
    signInDesc: 'अपनी यात्रा जारी रखने के लिए साइन इन करें', signUpDesc: 'खेलना शुरू करने के लिए खाता बनाएं',
    forgotPassword: 'पासवर्ड भूल गए', forgotPasswordDesc: 'अपना ईमेल दर्ज करें और हम आपको एक लिंक भेजेंगे',
    sendResetLink: 'रीसेट लिंक भेजें', sending: 'भेज रहे हैं...', backToSignIn: 'साइन इन पर वापस',
    loading: 'लोड हो रहा है...', createAccountBtn: 'खाता बनाएं',
    noAccount: 'खाता नहीं है? साइन अप करें', haveAccount: 'पहले से खाता है? साइन इन करें',
    forgotPasswordLink: 'पासवर्ड भूल गए?',
    email: 'ईमेल', password: 'पासवर्ड', displayName: 'प्रदर्शन नाम',
    leaderboardTitle: 'लीडरबोर्ड', topPlayers: 'अनुभव अंकों द्वारा शीर्ष खिलाड़ी',
    rankings: 'रैंकिंग', noPlayers: 'अभी तक कोई खिलाड़ी नहीं। पहले बनें!',
    anonymous: 'अनाम',
  },
  ar: {
    play: 'العب', leaderboard: 'لوحة المتصدرين', profile: 'الملف الشخصي', admin: 'المشرف',
    getStarted: 'ابدأ',
    heroTitle: 'تعلم بذكاء مع', heroDesc: 'اختبارات مدعومة بالذكاء الاصطناعي تتكيف مع مستوى معرفتك.',
    startPlaying: 'ابدأ اللعب', viewLeaderboard: 'عرض المتصدرين',
    questionsGenerated: 'أسئلة مولدة', activePlayers: 'لاعبون نشطون', quizCategories: 'فئات', uptime: 'وقت التشغيل',
    whyQuizAI: 'لماذا', howItWorks: 'كيف', works: 'يعمل', readyTo: 'مستعد', levelUp: 'للتقدم',
    aiPowered: 'أسئلة AI', instantFeedback: 'تغذية راجعة فورية', competeClimb: 'تنافس وتقدم', multipleCategories: 'فئات متعددة',
    createAccount: 'إنشاء حساب', startQuiz: 'ابدأ الاختبار', learnCompete: 'تعلم وتنافس',
    getStartedFree: 'ابدأ مجاناً', signIn: 'تسجيل الدخول', allRightsReserved: 'جميع الحقوق محفوظة. بناء',
    signInToPlay: 'سجل دخولك للعب', signInToPlayDesc: 'أنشئ حساباً لبدء رحلتك.',
    chooseCategory: 'اختر فئة', selectTopic: 'اختر موضوعاً واختبر معرفتك',
    tapToStart: 'اضغط للبدء', generatingAI: 'جاري توليد الأسئلة بالذكاء الاصطناعي...',
    quizComplete: 'اكتمل الاختبار!', accuracy: 'الدقة', totalTime: 'إجمالي',
    xpEarned: 'نقاط خبرة', playAgain: 'العب مجدداً', submitAnswer: 'إرسال الإجابة',
    seeResults: 'عرض النتائج', nextQuestion: 'السؤال التالي', question: 'سؤال',
    player: 'لاعب', level: 'المستوى', xpLabel: 'XP', xpToLevel: 'XP للمستوى',
    quizzes: 'اختبارات', streak: 'سلسلة', bestStreak: 'أفضل سلسلة',
    badges: 'شارات', noBadges: 'لا شارات بعد. استمر باللعب!',
    welcomeBack: 'مرحباً بعودتك', joinQuizAI: 'انضم إلى QuizAI',
    signInDesc: 'سجل دخولك لمتابعة رحلتك', signUpDesc: 'أنشئ حساباً لبدء اللعب',
    forgotPassword: 'نسيت كلمة المرور', forgotPasswordDesc: 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً',
    sendResetLink: 'إرسال الرابط', sending: 'جاري الإرسال...', backToSignIn: 'العودة لتسجيل الدخول',
    loading: 'جاري التحميل...', createAccountBtn: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟ سجل', haveAccount: 'لديك حساب بالفعل؟ سجل دخولك',
    forgotPasswordLink: 'نسيت كلمة المرور؟',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', displayName: 'اسم العرض',
    leaderboardTitle: 'لوحة المتصدرين', topPlayers: 'أفضل اللاعبين حسب نقاط الخبرة',
    rankings: 'التصنيفات', noPlayers: 'لا يوجد لاعبون بعد. كن الأول!',
    anonymous: 'مجهول',
  },
  zh: {
    play: '开始', leaderboard: '排行榜', profile: '个人资料', admin: '管理',
    getStarted: '开始使用',
    heroTitle: '更聪明地学习', heroDesc: 'AI驱动的测验，适应你的知识水平。',
    startPlaying: '开始游戏', viewLeaderboard: '查看排行榜',
    questionsGenerated: '生成的问题', activePlayers: '活跃玩家', quizCategories: '测验类别', uptime: '正常运行',
    whyQuizAI: '为什么选择', howItWorks: '如何', works: '运作', readyTo: '准备好', levelUp: '升级了吗',
    aiPowered: 'AI驱动问题', instantFeedback: '即时反馈', competeClimb: '竞争攀升', multipleCategories: '多种类别',
    createAccount: '创建账户', startQuiz: '开始测验', learnCompete: '学习竞争',
    getStartedFree: '免费开始', signIn: '登录', allRightsReserved: '保留所有权利。由',
    signInToPlay: '登录开始游戏', signInToPlayDesc: '创建账户开始你的测验之旅。',
    chooseCategory: '选择类别', selectTopic: '选择一个主题来测试你的知识',
    tapToStart: '点击开始', generatingAI: '正在用AI生成问题...',
    quizComplete: '测验完成！', accuracy: '准确率', totalTime: '总计',
    xpEarned: '获得经验值', playAgain: '再玩一次', submitAnswer: '提交答案',
    seeResults: '查看结果', nextQuestion: '下一题', question: '问题',
    player: '玩家', level: '等级', xpLabel: 'XP', xpToLevel: 'XP到等级',
    quizzes: '测验', streak: '连胜', bestStreak: '最佳连胜',
    badges: '徽章', noBadges: '还没有获得徽章。继续加油！',
    welcomeBack: '欢迎回来', joinQuizAI: '加入QuizAI',
    signInDesc: '登录继续你的旅程', signUpDesc: '创建账户开始游戏',
    forgotPassword: '忘记密码', forgotPasswordDesc: '输入你的邮箱，我们会发送重置链接',
    sendResetLink: '发送重置链接', sending: '发送中...', backToSignIn: '返回登录',
    loading: '加载中...', createAccountBtn: '创建账户',
    noAccount: '没有账户？注册', haveAccount: '已有账户？登录',
    forgotPasswordLink: '忘记密码？',
    email: '邮箱', password: '密码', displayName: '显示名称',
    leaderboardTitle: '排行榜', topPlayers: '按经验值排名的顶级玩家',
    rankings: '排名', noPlayers: '还没有玩家。成为第一个！',
    anonymous: '匿名',
  },
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

type LanguageContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
  languages: typeof languages;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(() => localStorage.getItem('quizai-lang') || 'en');

  const handleSetLang = useCallback((l: string) => {
    setLang(l);
    localStorage.setItem('quizai-lang', l);
  }, []);

  const t = useCallback((key: string) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
