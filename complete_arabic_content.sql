-- Complete Arabic Content Setup
-- This script adds comprehensive Arabic content to the database

-- Clear existing Arabic content to start fresh
DELETE FROM multilingual_content WHERE language = 'ar';
DELETE FROM multilingual_resource_cards WHERE language = 'ar';
DELETE FROM multilingual_blog_posts WHERE language = 'ar';

-- Insert complete Arabic website content
INSERT INTO multilingual_content (section, field, language, value) VALUES
-- Hero Section
('hero', 'title', 'ar', 'استوديو إيجل نيبولا للشركات الناشئة'),
('hero', 'subtitle', 'ar', 'حيث يتم إنشاء رواد الأعمال المتحمسين'),
('hero', 'description', 'ar', 'في الفضاء، سديم النسر هو المكان الذي تُخلق فيه النجوم.\nفي استوديونا، هو المكان الذي يُخلق فيه رواد الأعمال المتحمسون.\nنحن لا نوجهك فقط... بل نشاركك في التأسيس.\nنبني الشركات الناشئة السعودية معاً—من الشرارة الأولى إلى الإطلاق.'),
('hero', 'applyButton', 'ar', 'تقدم للانضمام'),
('hero', 'learnButton', 'ar', 'اعرف المزيد'),

-- Who We Are Section
('who-we-are', 'title', 'ar', 'من نحن'),
('who-we-are', 'description', 'ar', 'يعتقد معظم الناس أن بدء عمل تجاري يعني اكتشافه بمفردك—أو الانضمام إلى حاضنة تعلم النظرية فقط.\n\nاستوديو الشركات الناشئة مختلف.\nإنه مصنع للشركات الناشئة حيث تصبح الأفكار شركات جنباً إلى جنب مع رواد الأعمال ذوي الخبرة.\n\nحيث نتميز: العديد من الحاضنات والمعجلات وشركات رأس المال المغامر تطارد الأرقام فقط—مخططات النمو، عدد المستخدمين، رسوم بيانية للإيرادات. يعاملون الشغف كـ \"شيء جميل\" ويتجاهلون الموجة الجديدة من المؤسسين: منشئي المحتوى، رواد الأعمال المستقلين، المستقلين، المؤثرين، المبدعين، المدربين، العلامات التجارية الشخصية—أشخاص يبنون بطرق جديدة تماماً.\n\nفي إيجل نيبولا، نبدأ معك. نصمم عملاً تجارياً حول شغفك، مهاراتك، والطريقة التي تعمل بها بأفضل شكل—ثم نشاركك في التأسيس.\n\nمن اليوم الأول أنت داخل منهجية \"صمم عملك التجاري بالذكاء الاصطناعي\"، مدعوماً بمجتمع من المؤسسين المتشابهين في التفكير، المدربين ذوي الخبرة، وشريك مؤسس مستثمر في نجاحك.\n\nنحن لا نوجه فقط.\nنحن نشارك في الخلق، والتملك، والإطلاق.'),

-- Focus Section
('focus', 'title', 'ar', 'من نعمل معهم'),
('focus', 'subtitle', 'ar', 'تركيزنا'),
('focus', 'description', 'ar', 'في إيجل نيبولا، نحن لا نبحث عن أي مؤسس.\nنحن نبحث عن رواد الأعمال المتحمسين—أشخاص مدفوعون ليس فقط بالربح، ولكن بالرغبة في خلق شيء مهم حقاً بالنسبة لهم.'),
('focus', 'founders', 'ar', 'قد تكون مؤثراً، منشئ محتوى، مبدع، فنان، مدرب، معلم، رائد أعمال مستقل، علامة تجارية شخصية، أو مستقل.\nالتسمية لا تهم—ما يهم هو أن لديك الشغف، الدافع، والرغبة في البناء.\n\nنحن لا نعمل مع أشخاص يطاردون الاتجاه التالي دون الاهتمام إذا كان يناسبهم.\nنحن نعمل مع أولئك الذين يريدون تصميم عمل تجاري من الداخل إلى الخارج، بدءاً بشغفهم—وبناؤه إلى شيء قابل للتطوير، مؤثر، وحقاً ملكهم.\n\nإذا كان هذا أنت، فأنت تنتمي هنا.'),

-- Methodology Section
('methodology', 'title', 'ar', 'صمم عملك التجاري بالذكاء الاصطناعي'),
('methodology', 'subtitle', 'ar', 'منهجيتنا'),
('methodology', 'description', 'ar', '(نظام التشغيل لإيجل نيبولا)\n\nمعظم المؤسسين يبدأون من الخارج: \"ما هو رائج؟ ما هو مربح؟\"\nنحن نعكس ذلك. ابدأ من الداخل—مع ملاءمة المؤسس—ثم ابني للخارج. عندما يناسب المؤسس السوق، يصبح المنتج واضحاً.\n\nالركائز الخمس:\n• ما تحبه – أساس شغفك. الوقود الذي يبقيك مستمراً.\n• ما لديك – المهارات، الخبرة، العلاقات، والأصول الموجودة بالفعل في يديك.\n• أفضل طريقة لك للعمل – كيف تعمل بأفضل شكل (الوتيرة، الدور، البيئة، فردي/فريق).\n• ما تريد تحقيقه – أهدافك، النتائج، والحياة التي تبني نحوها.\n• مساعد الذكاء الاصطناعي الخاص بك – ميزة السرعة التي تجعل الرحلة أسهل وأسرع (اختبار الأفكار، المحتوى، البحث، الأتمتة، العمليات).\n\nالنقطة الحلوة: حيث تتداخل جميع الخمسة.\nتحبه. أنت مجهز له. يناسب أسلوبك. يحركك نحو أهدافك. والذكاء الاصطناعي يجعل البناء أسهل وأسرع من أي وقت مضى.\n\nهذا ليس دورة. إنه نظام بناء—يُستخدم مباشرة، في الاستوديو، لتحويل الحمض النووي للمؤسس إلى شركة.'),

-- What You Get Section
('what-you-get', 'title', 'ar', 'ما تحصل عليه عندما نشاركك في التأسيس'),
('what-you-get', 'description', 'ar', '• مشروع مصمم حولك (وليس قالب)\n• ملكية مشتركة: نبنيها معاً ونربح معاً\n• دليل عملي ونظام مدعوم بـ \"صمم عملك التجاري بالذكاء الاصطناعي\"\n• التحقق، المحتوى، والعمليات المدعومة بالذكاء الاصطناعي من اليوم الأول\n• الوصول إلى شبكتنا، المدربين، الأدوات، والمشغلين العمليين الذين يحبون مرحلة الصفر إلى واحد'),

-- Journey Section
('journey', 'title', 'ar', 'رحلتك معنا'),
('journey', 'description', 'ar', 'الخطوة 1 — تقدم: أخبرنا من أنت، قصتك، وما يثيرك. لا نحتاج فكرة مثالية—نحتاج شرارة.\n\nالخطوة 2 — الاكتشاف: نقوم بتشغيل عملية \"صمم عملك التجاري بالذكاء الاصطناعي\" لرسم ملف المؤسس الخاص بك (الحب، الأصول، أسلوب العمل، الأهداف). أنت مركز التصميم.\n\nالخطوة 3 — سباق المشاركة في التأسيس: نجلس على نفس الطاولة ونبني: العصف الذهني، التحقق، التسمية، الموضع، النموذج الأولي—باستخدام الذكاء الاصطناعي لاختبار وتنفيذ أسرع.\n\nالخطوة 4 — نظام إيجل نيبولا البيئي: انضم إلى مجتمع داعم من المؤسسين السعوديين المتحمسين، المدربين، والمشغلين. شارك الانتصارات، اطرح أسئلة حقيقية، احصل على إجابات حقيقية.\n\nالخطوة 5 — الإطلاق والنمو: نطلق معاً. نقف معك في العمليات، المحتوى، والنمو. نشارك المخاطر—والمكافأة.'),

-- CTA Section
('cta', 'title', 'ar', 'مستعد لبدء رحلتك؟'),
('cta', 'description', 'ar', 'يمكنك مطاردة الاتجاه التالي والأمل في أن يناسبك…\nأو يمكنك تصميم الشركة التي تناسبك—وبناؤها مع شريك مؤسس ملتزم تماماً.\n\nتقدم للانضمام إلى استوديو إيجل نيبولا للشركات الناشئة اليوم.\nأفضل وقت لبناء عملك التجاري المتحمس هو الآن.'),
('cta', 'applyButton', 'ar', 'تقدم للانضمام'),
('cta', 'learnButton', 'ar', 'اعرف المزيد'),

-- Resources Section
('resources', 'heroTitle', 'ar', 'الموارد والهدايا'),
('resources', 'heroDescription', 'ar', 'أدوات حصرية، أطر عمل، وموارد لتسريع رحلتك الريادية. من مجموعات أدوات مدعومة بالذكاء الاصطناعي إلى تقييمات شاملة—كل ما تحتاجه لتصميم وبناء عملك التجاري المتحمس.'),
('resources', 'resourcesTitle', 'ar', 'جميع الموارد والمواد'),
('resources', 'ctaTitle', 'ar', 'مستعد لبناء عملك التجاري المتحمس؟'),
('resources', 'ctaDescription', 'ar', 'هذه الموارد هي مجرد البداية. انضم إلى استوديو إيجل نيبولا للشركات الناشئة واحصل على دعم عملي بينما نشاركك في تأسيس مشروعك.'),
('resources', 'ctaApplyButton', 'ar', 'تقدم للانضمام إلى الاستوديو'),
('resources', 'ctaLearnButton', 'ar', 'اعرف المزيد عنا'),
('resources', 'footerCopyright', 'ar', '© 2025 إيجل نيبولا! جميع الحقوق محفوظة.'),
('resources', 'footerBlogsButton', 'ar', 'المدونة والأخبار'),

-- Blogs Section
('blogs', 'heroTitle', 'ar', 'المدونة والأخبار'),
('blogs', 'heroDescription', 'ar', 'ابق محدثاً بأحدث الرؤى، الاتجاهات، والقصص من عالم ريادة الأعمال وبناء الأعمال التجارية المدعوم بالذكاء الاصطناعي.'),
('blogs', 'blogsTitle', 'ar', 'أحدث المقالات والتحديثات'),
('blogs', 'readMore', 'ar', 'اقرأ المزيد'),
('blogs', 'featured', 'ar', 'مميز'),
('blogs', 'categoriesAll', 'ar', 'جميع الفئات'),
('blogs', 'categoriesAiTechnology', 'ar', 'الذكاء الاصطناعي والتكنولوجيا'),
('blogs', 'categoriesBusinessStrategy', 'ar', 'استراتيجية الأعمال'),
('blogs', 'categoriesIndustryNews', 'ar', 'أخبار الصناعة'),
('blogs', 'categoriesCaseStudies', 'ar', 'دراسات الحالة'),

-- UI Elements
('ui', 'logout', 'ar', 'تسجيل الخروج'),
('ui', 'settings', 'ar', 'الإعدادات'),
('ui', 'menu', 'ar', 'القائمة'),
('ui', 'help', 'ar', 'مساعدة'),
('ui', 'profile', 'ar', 'الملف الشخصي'),
('ui', 'dashboard', 'ar', 'لوحة التحكم'),
('ui', 'notifications', 'ar', 'الإشعارات'),
('ui', 'messages', 'ar', 'الرسائل'),
('ui', 'favorites', 'ar', 'المفضلة'),
('ui', 'history', 'ar', 'السجل'),
('ui', 'preferences', 'ar', 'التفضيلات'),
('ui', 'language', 'ar', 'اللغة'),
('ui', 'theme', 'ar', 'المظهر'),
('ui', 'darkMode', 'ar', 'الوضع المظلم'),
('ui', 'lightMode', 'ar', 'الوضع المضيء'),
('ui', 'autoMode', 'ar', 'الوضع التلقائي'),

-- Form Elements
('ui', 'firstName', 'ar', 'الاسم الأول'),
('ui', 'lastName', 'ar', 'اسم العائلة'),
('ui', 'email', 'ar', 'البريد الإلكتروني'),
('ui', 'password', 'ar', 'كلمة المرور'),
('ui', 'confirmPassword', 'ar', 'تأكيد كلمة المرور'),
('ui', 'phone', 'ar', 'رقم الهاتف'),
('ui', 'address', 'ar', 'العنوان'),
('ui', 'city', 'ar', 'المدينة'),
('ui', 'country', 'ar', 'البلد'),
('ui', 'zipCode', 'ar', 'الرمز البريدي'),
('ui', 'company', 'ar', 'الشركة'),
('ui', 'position', 'ar', 'المنصب'),
('ui', 'website', 'ar', 'الموقع الإلكتروني'),
('ui', 'bio', 'ar', 'نبذة شخصية'),
('ui', 'message', 'ar', 'الرسالة'),
('ui', 'subject', 'ar', 'الموضوع'),

-- Button Elements
('ui', 'submit', 'ar', 'إرسال'),
('ui', 'reset', 'ar', 'إعادة تعيين'),
('ui', 'confirm', 'ar', 'تأكيد'),
('ui', 'reject', 'ar', 'رفض'),
('ui', 'approve', 'ar', 'موافقة'),
('ui', 'publish', 'ar', 'نشر'),
('ui', 'draft', 'ar', 'مسودة'),
('ui', 'preview', 'ar', 'معاينة'),
('ui', 'share', 'ar', 'مشاركة'),
('ui', 'like', 'ar', 'إعجاب'),
('ui', 'comment', 'ar', 'تعليق'),
('ui', 'follow', 'ar', 'متابعة'),
('ui', 'unfollow', 'ar', 'إلغاء المتابعة'),
('ui', 'subscribe', 'ar', 'اشتراك'),
('ui', 'unsubscribe', 'ar', 'إلغاء الاشتراك'),

-- Status Elements
('ui', 'success', 'ar', 'نجح'),
('ui', 'error', 'ar', 'خطأ'),
('ui', 'warning', 'ar', 'تحذير'),
('ui', 'info', 'ar', 'معلومات'),
('ui', 'pending', 'ar', 'قيد الانتظار'),
('ui', 'approved', 'ar', 'موافق عليه'),
('ui', 'rejected', 'ar', 'مرفوض'),
('ui', 'published', 'ar', 'منشور'),
('ui', 'archived', 'ar', 'مؤرشف'),
('ui', 'deleted', 'ar', 'محذوف'),
('ui', 'active', 'ar', 'نشط'),
('ui', 'inactive', 'ar', 'غير نشط'),
('ui', 'online', 'ar', 'متصل'),
('ui', 'offline', 'ar', 'غير متصل'),

-- Time Elements
('ui', 'now', 'ar', 'الآن'),
('ui', 'today', 'ar', 'اليوم'),
('ui', 'yesterday', 'ar', 'أمس'),
('ui', 'tomorrow', 'ar', 'غداً'),
('ui', 'thisWeek', 'ar', 'هذا الأسبوع'),
('ui', 'lastWeek', 'ar', 'الأسبوع الماضي'),
('ui', 'nextWeek', 'ar', 'الأسبوع القادم'),
('ui', 'thisMonth', 'ar', 'هذا الشهر'),
('ui', 'lastMonth', 'ar', 'الشهر الماضي'),
('ui', 'nextMonth', 'ar', 'الشهر القادم'),
('ui', 'thisYear', 'ar', 'هذا العام'),
('ui', 'lastYear', 'ar', 'العام الماضي'),
('ui', 'nextYear', 'ar', 'العام القادم')
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Insert Arabic resource cards
INSERT INTO multilingual_resource_cards (original_id, language, title, description, button_text) 
SELECT 
    rc.id,
    'ar' as language,
    CASE 
        WHEN rc.title = 'Business Design Framework' THEN 'إطار عمل تصميم الأعمال التجارية'
        WHEN rc.title = 'AI Co-Builder Toolkit' THEN 'مجموعة أدوات مساعد الذكاء الاصطناعي'
        WHEN rc.title = 'Founder Fit Assessment' THEN 'تقييم ملاءمة المؤسس'
        WHEN rc.title = 'Startup Validation Checklist' THEN 'قائمة التحقق من صحة الشركة الناشئة'
        WHEN rc.title = 'Saudi Market Insights Report' THEN 'تقرير رؤى السوق السعودي'
        WHEN rc.title = 'Investor Pitch Template' THEN 'قالب عرض المستثمر'
        WHEN rc.title = 'Financial Planning Model' THEN 'نموذج التخطيط المالي'
        WHEN rc.title = 'Exclusive Community Access' THEN 'الوصول الحصري للمجتمع'
        ELSE rc.title
    END as title,
    CASE 
        WHEN rc.title = 'Business Design Framework' THEN 'إطار عملنا الكامل لتصميم عملك التجاري حول ملف المؤسس الفريد الخاص بك. يتضمن أوراق عمل مفصلة، أدلة خطوة بخطوة، وتلميحات الذكاء الاصطناعي لمساعدتك في اكتشاف نقطتك الحلوة.'
        WHEN rc.title = 'AI Co-Builder Toolkit' THEN 'أدوات الذكاء الاصطناعي والتلميحات الأساسية لبحث السوق، إنشاء المحتوى، التحقق من الأعمال التجارية، والعمليات. وفر شهور من العمل مع مجموعتنا المختارة من المساعدين بالذكاء الاصطناعي.'
        WHEN rc.title = 'Founder Fit Assessment' THEN 'اكتشف ملف المؤسس الفريد الخاص بك مع تقييمنا الشامل. افهم نقاط قوتك، أسلوب عملك، ونموذج عملك التجاري المثالي قبل البناء.'
        WHEN rc.title = 'Startup Validation Checklist' THEN 'قائمة تحقق خطوة بخطوة للتحقق من فكرة عملك التجاري قبل استثمار وقت ومال كبير. تجنب الأخطاء الشائعة وابنِ بثقة.'
        WHEN rc.title = 'Saudi Market Insights Report' THEN 'رؤى حصرية في نظام الشركات الناشئة السعودي، الاتجاهات الناشئة، مشهد التمويل، والفرص. ابق متقدماً على المنحنى.'
        WHEN rc.title = 'Investor Pitch Template' THEN 'قالب عرض احترافي مصمم خصيصاً لرواد الأعمال المتحمسين. يتضمن أطر عمل رواية القصص ومبادئ التصميم.'
        WHEN rc.title = 'Financial Planning Model' THEN 'قالب نموذج مالي شامل لـ Excel/Google Sheets للشركات الناشئة. يتضمن توقعات الإيرادات، التدفق النقدي، وتخطيط السيناريوهات.'
        WHEN rc.title = 'Exclusive Community Access' THEN 'انضم إلى مجتمعنا الخاص من رواد الأعمال السعوديين المتحمسين، المدربين ذوي الخبرة، والمشغلين الناجحين. تواصل، تعلم، ونم معاً.'
        ELSE rc.description
    END as description,
    CASE 
        WHEN rc.title = 'Business Design Framework' THEN 'تحميل الإطار'
        WHEN rc.title = 'AI Co-Builder Toolkit' THEN 'تحميل مجموعة الأدوات'
        WHEN rc.title = 'Founder Fit Assessment' THEN 'خذ التقييم'
        WHEN rc.title = 'Startup Validation Checklist' THEN 'تحميل قائمة التحقق'
        WHEN rc.title = 'Saudi Market Insights Report' THEN 'تحميل التقرير'
        WHEN rc.title = 'Investor Pitch Template' THEN 'تحميل القالب'
        WHEN rc.title = 'Financial Planning Model' THEN 'تحميل النموذج'
        WHEN rc.title = 'Exclusive Community Access' THEN 'انضم للمجتمع'
        ELSE rc."buttonText"
    END as button_text
FROM resource_cards rc
WHERE rc.language = 'en'
ON CONFLICT (original_id, language) 
DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    button_text = EXCLUDED.button_text,
    updated_at = NOW();

-- Insert Arabic blog posts
INSERT INTO multilingual_blog_posts (original_id, language, title, excerpt, content) 
SELECT 
    bp.id,
    'ar' as language,
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'مستقبل الذكاء الاصطناعي في ريادة الأعمال السعودية'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'بناء عملك التجاري حول الشغف: إطار عمل'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'رؤية 2030 وثورة الشركات الناشئة'
        WHEN bp.title = 'From Idea to MVP: Our Co-Founding Process' THEN 'من الفكرة إلى المنتج الأولي: عملية المشاركة في التأسيس'
        ELSE bp.title
    END as title,
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'اكتشف كيف يغير الذكاء الاصطناعي نظام الشركات الناشئة السعودي ويخلق فرصاً جديدة لرواد الأعمال المتحمسين.'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'تعلم منهجيتنا المثبتة لتصميم الأعمال التجارية التي تتماشى مع شغفك الشخصي، مهاراتك، وأهدافك طويلة المدى.'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'كيف تخلق رؤية السعودية 2030 فرصاً غير مسبوقة للشركات الناشئة المبتكرة ورواد الأعمال المتحمسين.'
        WHEN bp.title = 'From Idea to MVP: Our Co-Founding Process' THEN 'خذ نظرة خلف الكواليس حول كيفية عملنا مع المؤسسين لتحويل الأفكار إلى منتجات وأعمال تجارية قابلة للحياة.'
        ELSE bp.excerpt
    END as excerpt,
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'مشهد ريادة الأعمال في المملكة العربية السعودية يتطور بسرعة، مع لعب الذكاء الاصطناعي دوراً محورياً في هذا التحول. من عمليات الأعمال المؤتمتة إلى تحليل السوق المدعوم بالذكاء الاصطناعي، الفرص للشركات الناشئة المبتكرة غير مسبوقة. فريقنا في إيجل نيبولا في طليعة هذه الثورة، يساعد رواد الأعمال المتحمسين على الاستفادة من الذكاء الاصطناعي لبناء أعمال تجارية قابلة للتطوير ومؤثرة.'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'معظم رواد الأعمال يبدأون باتجاهات السوق ويحاولون ملاءمة أنفسهم مع الفرص. نحن نؤمن بالبدء بالمؤسس - فهم مزيجك الفريد من الشغف، المهارات، والرؤية لخلق عمل تجاري يناسبك حقاً. هذا النهج يؤدي إلى مشاريع أكثر استدامة، إشباعاً، ونجاحاً.'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'رؤية السعودية 2030 فتحت أبواباً لرواد الأعمال كما لم يحدث من قبل. من نيوم إلى مشروع البحر الأحمر، المملكة تدعم بنشاط الشركات الناشئة المبتكرة التي تتماشى مع أهدافها الطموحة. هذا هو الوقت المثالي لرواد الأعمال المتحمسين لبناء أعمال تجارية تساهم في مستقبل السعودية.'
        WHEN bp.title = 'From Idea to MVP: Our Co-Founding Process' THEN 'الرحلة من الفكرة إلى المنتج الأولي حاسمة لأي شركة ناشئة. في إيجل نيبولا، صقلنا هذه العملية لمساعدة رواد الأعمال المتحمسين على البناء بشكل أسرع وأذكى. نهج المشاركة في التأسيس يضمن أن المؤسسين لديهم الدعم الذي يحتاجونه في كل خطوة.'
        ELSE bp.content
    END as content
FROM blog_posts bp
WHERE bp.language = 'en'
ON CONFLICT (original_id, language) 
DO UPDATE SET 
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    updated_at = NOW();

-- Verify the setup
SELECT 'Complete Arabic content setup finished successfully' as status;
SELECT COUNT(*) as arabic_content_count FROM multilingual_content WHERE language = 'ar';
SELECT COUNT(*) as arabic_resource_cards FROM multilingual_resource_cards WHERE language = 'ar';
SELECT COUNT(*) as arabic_blog_posts FROM multilingual_blog_posts WHERE language = 'ar';
