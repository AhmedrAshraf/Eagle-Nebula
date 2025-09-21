-- Arabic Translations Setup for Resource Cards and Blog Posts
-- Run this in your Supabase SQL editor after running multilingual_setup.sql

-- Insert Arabic translations for resource cards
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

-- Insert Arabic translations for blog posts
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
SELECT 'Arabic translations setup completed successfully' as status;
SELECT COUNT(*) as arabic_resource_cards FROM multilingual_resource_cards WHERE language = 'ar';
SELECT COUNT(*) as arabic_blog_posts FROM multilingual_blog_posts WHERE language = 'ar';
