-- Fix Multilingual Issues - Comprehensive Solution
-- Run this in your Supabase SQL editor to fix language switching problems

-- Step 1: Ensure all tables exist and have proper structure
-- Create multilingual_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS multilingual_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    field VARCHAR(100) NOT NULL,
    language VARCHAR(2) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, field, language)
);

-- Create multilingual_resource_cards table if it doesn't exist
CREATE TABLE IF NOT EXISTS multilingual_resource_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_id UUID REFERENCES resource_cards(id) ON DELETE CASCADE,
    language VARCHAR(2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    button_text VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(original_id, language)
);

-- Create multilingual_blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS multilingual_blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    language VARCHAR(2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(original_id, language)
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_multilingual_content_section ON multilingual_content(section);
CREATE INDEX IF NOT EXISTS idx_multilingual_content_language ON multilingual_content(language);
CREATE INDEX IF NOT EXISTS idx_multilingual_content_section_language ON multilingual_content(section, language);

CREATE INDEX IF NOT EXISTS idx_multilingual_resource_cards_original_id ON multilingual_resource_cards(original_id);
CREATE INDEX IF NOT EXISTS idx_multilingual_resource_cards_language ON multilingual_resource_cards(language);

CREATE INDEX IF NOT EXISTS idx_multilingual_blog_posts_original_id ON multilingual_blog_posts(original_id);
CREATE INDEX IF NOT EXISTS idx_multilingual_blog_posts_language ON multilingual_blog_posts(language);

-- Step 3: Clear all existing content to start fresh
DELETE FROM multilingual_content;
DELETE FROM multilingual_resource_cards;
DELETE FROM multilingual_blog_posts;

-- Step 4: Insert English content first (ensure it exists)
INSERT INTO multilingual_content (section, field, language, value) VALUES
-- Hero Section (English)
('hero', 'title', 'en', 'Eagle Nebula Startup Studio'),
('hero', 'subtitle', 'en', 'Where Passionate Entrepreneurs Are Created'),
('hero', 'description', 'en', 'In space, the Eagle Nebula is where stars are created.\nIn our studio, it''s where passionate entrepreneurs are created.\nWe don''t just coach you… we co‑found with you.\nWe build Saudi startups together—from the first spark to launch.'),
('hero', 'applyButton', 'en', 'Apply to Join the Studio'),
('hero', 'learnButton', 'en', 'Learn More'),

-- Who We Are Section (English)
('who-we-are', 'title', 'en', 'Who We Are'),
('who-we-are', 'description', 'en', 'Most people think starting a business means figuring it out alone—or joining an incubator that only teaches theory.\n\nA startup studio is different.\nIt''s a startup factory where ideas become companies side‑by‑side with experienced entrepreneurs.\n\nWhere we stand apart: many incubators, accelerators, and VCs chase numbers only—growth charts, user counts, revenue graphs. They treat passion as "nice to have" and ignore the new wave of founders: content creators, solopreneurs, freelancers, influencers, creatives, coaches, personal brands —people building in completely new ways.\n\nAt Eagle Nebula, we start with you. We design a business around your passion, your skills, and the way you work best—then co‑found it with you.\n\nFrom day one you''re inside our Design Your Business with AI methodology, supported by a community of like‑minded founders, seasoned coaches, and a co‑founder who''s invested in your success.\n\nWe don''t just coach.\nWe co‑create, co‑own, and co‑launch.'),

-- Focus Section (English)
('focus', 'title', 'en', 'Who We Work With'),
('focus', 'subtitle', 'en', 'Our Focus'),
('focus', 'description', 'en', 'At Eagle Nebula, we''re not looking for just any founder.\nWe''re looking for passionate entrepreneurs — people who are driven not only by profit, but by the desire to create something that truly matters to them.'),
('focus', 'founders', 'en', 'You might be an influencer, content creator, creative, artist, coach, educator, solopreneur, personal brand, or freelancer.\nThe label doesn''t matter — what matters is that you have the passion, the drive, and the willingness to build.\n\nWe don''t work with people chasing the next trend without caring if it fits them.\nWe work with those who want to design a business from the inside out, starting with their passion — and build it into something scalable, impactful, and truly theirs.\n\nIf that''s you, you belong here.'),

-- Methodology Section (English)
('methodology', 'title', 'en', 'Design Your Business with AI'),
('methodology', 'subtitle', 'en', 'Our Methodology'),
('methodology', 'description', 'en', '(The operating system of Eagle Nebula)\n\nMost founders start from the outside: "What''s trending? What''s profitable?"\nWe flip it. Start from inside—with founder fit—and then build outward. When the founder fits the market, the product becomes clear.\n\nThe Five Pillars:\n• What You Love – Your passion foundation. The fuel that keeps you going.\n• What You Have – Skills, experience, relationships, and assets already in your hands.\n• Your Best Way to Work – How you operate at peak performance (pace, role, environment, solo/team).\n• What You Want to Achieve – Your goals, outcomes, and the life you''re building toward.\n• Your AI Co-Builder – Your speed advantage that makes everything easier (testing ideas, content, research, automation, operations).\n\nThe Sweet Spot: Where all five overlap.\nYou love it. You''re equipped for it. It fits your style. It moves you toward your goals. And AI makes building easier and faster than ever.\n\nThis isn''t a course. It''s a building system—used directly, in the studio, to turn founder DNA into a company.'),

-- What You Get Section (English)
('what-you-get', 'title', 'en', 'What You Get When We Co-Found With You'),
('what-you-get', 'description', 'en', '• A business designed around you (not a template)\n• Co-ownership: We build it together and profit together\n• A practical guide and system powered by "Design Your Business with AI"\n• AI-powered validation, content, and operations from day one\n• Access to our network, coaches, tools, and operators who love zero-to-one'),

-- Journey Section (English)
('journey', 'title', 'en', 'Your Journey With Us'),
('journey', 'description', 'en', 'Step 1 — Apply: Tell us who you are, your story, and what excites you. We don''t need a perfect idea—we need a spark.\n\nStep 2 — Discovery: We run the Design Your Business with AI process to map your founder profile. You''re the center of the design.\n\nStep 3 — Co‑Founding Sprint: We sit at the same table and build: brainstorm, validate, name, position, prototype—using AI for faster testing.\n\nStep 4 — Ecosystem & Launch: Join our community of passionate Saudi founders. We launch together and share the risk—and the reward.\n\nStep 5 — The Eagle Nebula Ecosystem: Join a supportive community of passionate Saudi founders, coaches, and operators. Share wins, ask real questions, get real answers.'),

-- CTA Section (English)
('cta', 'title', 'en', 'Ready to Start Your Journey?'),
('cta', 'description', 'en', 'You can chase the next trend and hope it fits you…\nOr you can design the company that fits you—and build it with a co-founder who''s fully committed.\n\nApply to join Eagle Nebula Startup Studio today.\nThe best time to build your passionate business is now.'),
('cta', 'applyButton', 'en', 'Apply to Join the Studio'),
('cta', 'learnButton', 'en', 'Learn More About Us'),

-- Resources Section (English)
('resources', 'heroTitle', 'en', 'Resources & Gifts'),
('resources', 'heroDescription', 'en', 'Exclusive tools, frameworks, and resources to accelerate your entrepreneurial journey. From AI-powered toolkits to comprehensive assessments—everything you need to design and build your passionate business.'),
('resources', 'resourcesTitle', 'en', 'All Resources & Materials'),
('resources', 'ctaTitle', 'en', 'Ready to Build Your Passionate Business?'),
('resources', 'ctaDescription', 'en', 'These resources are just the beginning. Join Eagle Nebula Startup Studio and get hands-on support as we co-found your venture.'),
('resources', 'ctaApplyButton', 'en', 'Apply to Join the Studio'),
('resources', 'ctaLearnButton', 'en', 'Learn More About Us'),
('resources', 'footerCopyright', 'en', '© 2025 EAGLE NEBULA!. All rights reserved.'),
('resources', 'footerBlogsButton', 'en', 'Blogs & News'),

-- Blogs Section (English)
('blogs', 'heroTitle', 'en', 'Blogs & News'),
('blogs', 'heroDescription', 'en', 'Stay updated with the latest insights, trends, and stories from the world of entrepreneurship and AI-powered business building.'),
('blogs', 'blogsTitle', 'en', 'Latest Articles & Updates'),
('blogs', 'readMore', 'en', 'Read More'),
('blogs', 'featured', 'en', 'Featured'),
('blogs', 'categoriesAll', 'en', 'All Categories'),
('blogs', 'categoriesAiTechnology', 'en', 'AI & Technology'),
('blogs', 'categoriesBusinessStrategy', 'en', 'Business Strategy'),
('blogs', 'categoriesIndustryNews', 'en', 'Industry News'),
('blogs', 'categoriesCaseStudies', 'en', 'Case Studies');

-- Step 5: Insert Arabic content
INSERT INTO multilingual_content (section, field, language, value) VALUES
-- Hero Section (Arabic)
('hero', 'title', 'ar', 'استوديو إيجل نيبولا للشركات الناشئة'),
('hero', 'subtitle', 'ar', 'حيث يتم إنشاء رواد الأعمال المتحمسين'),
('hero', 'description', 'ar', 'في الفضاء، سديم النسر هو المكان الذي تُخلق فيه النجوم.\nفي استوديونا، هو المكان الذي يُخلق فيه رواد الأعمال المتحمسون.\nنحن لا نوجهك فقط... بل نشاركك في التأسيس.\nنبني الشركات الناشئة السعودية معاً—من الشرارة الأولى إلى الإطلاق.'),
('hero', 'applyButton', 'ar', 'تقدم للانضمام'),
('hero', 'learnButton', 'ar', 'اعرف المزيد'),

-- Who We Are Section (Arabic)
('who-we-are', 'title', 'ar', 'من نحن'),
('who-we-are', 'description', 'ar', 'يعتقد معظم الناس أن بدء عمل تجاري يعني اكتشافه بمفردك—أو الانضمام إلى حاضنة تعلم النظرية فقط.\n\nاستوديو الشركات الناشئة مختلف.\nإنه مصنع للشركات الناشئة حيث تصبح الأفكار شركات جنباً إلى جنب مع رواد الأعمال ذوي الخبرة.\n\nحيث نتميز: العديد من الحاضنات والمعجلات وشركات رأس المال المغامر تطارد الأرقام فقط—مخططات النمو، عدد المستخدمين، رسوم بيانية للإيرادات. يعاملون الشغف كـ "شيء جميل" ويتجاهلون الموجة الجديدة من المؤسسين: منشئي المحتوى، رواد الأعمال المستقلين، المستقلين، المؤثرين، المبدعين، المدربين، العلامات التجارية الشخصية—أشخاص يبنون بطرق جديدة تماماً.\n\nفي إيجل نيبولا، نبدأ معك. نصمم عملاً تجارياً حول شغفك، مهاراتك، والطريقة التي تعمل بها بأفضل شكل—ثم نشاركك في التأسيس.\n\nمن اليوم الأول أنت داخل منهجية "صمم عملك التجاري بالذكاء الاصطناعي"، مدعوماً بمجتمع من المؤسسين المتشابهين في التفكير، المدربين ذوي الخبرة، وشريك مؤسس مستثمر في نجاحك.\n\nنحن لا نوجه فقط.\nنحن نشارك في الخلق، والتملك، والإطلاق.'),

-- Focus Section (Arabic)
('focus', 'title', 'ar', 'من نعمل معهم'),
('focus', 'subtitle', 'ar', 'تركيزنا'),
('focus', 'description', 'ar', 'في إيجل نيبولا، نحن لا نبحث عن أي مؤسس.\nنحن نبحث عن رواد الأعمال المتحمسين—أشخاص مدفوعون ليس فقط بالربح، ولكن بالرغبة في خلق شيء مهم حقاً بالنسبة لهم.'),
('focus', 'founders', 'ar', 'قد تكون مؤثراً، منشئ محتوى، مبدع، فنان، مدرب، معلم، رائد أعمال مستقل، علامة تجارية شخصية، أو مستقل.\nالتسمية لا تهم—ما يهم هو أن لديك الشغف، الدافع، والرغبة في البناء.\n\nنحن لا نعمل مع أشخاص يطاردون الاتجاه التالي دون الاهتمام إذا كان يناسبهم.\nنحن نعمل مع أولئك الذين يريدون تصميم عمل تجاري من الداخل إلى الخارج، بدءاً بشغفهم—وبناؤه إلى شيء قابل للتطوير، مؤثر، وحقاً ملكهم.\n\nإذا كان هذا أنت، فأنت تنتمي هنا.'),

-- Methodology Section (Arabic)
('methodology', 'title', 'ar', 'صمم عملك التجاري بالذكاء الاصطناعي'),
('methodology', 'subtitle', 'ar', 'منهجيتنا'),
('methodology', 'description', 'ar', '(نظام التشغيل لإيجل نيبولا)\n\nمعظم المؤسسين يبدأون من الخارج: "ما هو رائج؟ ما هو مربح؟"\nنحن نعكس ذلك. ابدأ من الداخل—مع ملاءمة المؤسس—ثم ابني للخارج. عندما يناسب المؤسس السوق، يصبح المنتج واضحاً.\n\nالركائز الخمس:\n• ما تحبه – أساس شغفك. الوقود الذي يبقيك مستمراً.\n• ما لديك – المهارات، الخبرة، العلاقات، والأصول الموجودة بالفعل في يديك.\n• أفضل طريقة لك للعمل – كيف تعمل بأفضل شكل (الوتيرة، الدور، البيئة، فردي/فريق).\n• ما تريد تحقيقه – أهدافك، النتائج، والحياة التي تبني نحوها.\n• مساعد الذكاء الاصطناعي الخاص بك – ميزة السرعة التي تجعل الرحلة أسهل وأسرع (اختبار الأفكار، المحتوى، البحث، الأتمتة، العمليات).\n\nالنقطة الحلوة: حيث تتداخل جميع الخمسة.\nتحبه. أنت مجهز له. يناسب أسلوبك. يحركك نحو أهدافك. والذكاء الاصطناعي يجعل البناء أسهل وأسرع من أي وقت مضى.\n\nهذا ليس دورة. إنه نظام بناء—يُستخدم مباشرة، في الاستوديو، لتحويل الحمض النووي للمؤسس إلى شركة.'),

-- What You Get Section (Arabic)
('what-you-get', 'title', 'ar', 'ما تحصل عليه عندما نشاركك في التأسيس'),
('what-you-get', 'description', 'ar', '• مشروع مصمم حولك (وليس قالب)\n• ملكية مشتركة: نبنيها معاً ونربح معاً\n• دليل عملي ونظام مدعوم بـ "صمم عملك التجاري بالذكاء الاصطناعي"\n• التحقق، المحتوى، والعمليات المدعومة بالذكاء الاصطناعي من اليوم الأول\n• الوصول إلى شبكتنا، المدربين، الأدوات، والمشغلين العمليين الذين يحبون مرحلة الصفر إلى واحد'),

-- Journey Section (Arabic)
('journey', 'title', 'ar', 'رحلتك معنا'),
('journey', 'description', 'ar', 'الخطوة 1 — تقدم: أخبرنا من أنت، قصتك، وما يثيرك. لا نحتاج فكرة مثالية—نحتاج شرارة.\n\nالخطوة 2 — الاكتشاف: نقوم بتشغيل عملية "صمم عملك التجاري بالذكاء الاصطناعي" لرسم ملف المؤسس الخاص بك (الحب، الأصول، أسلوب العمل، الأهداف). أنت مركز التصميم.\n\nالخطوة 3 — سباق المشاركة في التأسيس: نجلس على نفس الطاولة ونبني: العصف الذهني، التحقق، التسمية، الموضع، النموذج الأولي—باستخدام الذكاء الاصطناعي لاختبار وتنفيذ أسرع.\n\nالخطوة 4 — نظام إيجل نيبولا البيئي: انضم إلى مجتمع داعم من المؤسسين السعوديين المتحمسين، المدربين، والمشغلين. شارك الانتصارات، اطرح أسئلة حقيقية، احصل على إجابات حقيقية.\n\nالخطوة 5 — الإطلاق والنمو: نطلق معاً. نقف معك في العمليات، المحتوى، والنمو. نشارك المخاطر—والمكافأة.'),

-- CTA Section (Arabic)
('cta', 'title', 'ar', 'مستعد لبدء رحلتك؟'),
('cta', 'description', 'ar', 'يمكنك مطاردة الاتجاه التالي والأمل في أن يناسبك…\nأو يمكنك تصميم الشركة التي تناسبك—وبناؤها مع شريك مؤسس ملتزم تماماً.\n\nتقدم للانضمام إلى استوديو إيجل نيبولا للشركات الناشئة اليوم.\nأفضل وقت لبناء عملك التجاري المتحمس هو الآن.'),
('cta', 'applyButton', 'ar', 'تقدم للانضمام'),
('cta', 'learnButton', 'ar', 'اعرف المزيد'),

-- Resources Section (Arabic)
('resources', 'heroTitle', 'ar', 'الموارد والهدايا'),
('resources', 'heroDescription', 'ar', 'أدوات حصرية، أطر عمل، وموارد لتسريع رحلتك الريادية. من مجموعات أدوات مدعومة بالذكاء الاصطناعي إلى تقييمات شاملة—كل ما تحتاجه لتصميم وبناء عملك التجاري المتحمس.'),
('resources', 'resourcesTitle', 'ar', 'جميع الموارد والمواد'),
('resources', 'ctaTitle', 'ar', 'مستعد لبناء عملك التجاري المتحمس؟'),
('resources', 'ctaDescription', 'ar', 'هذه الموارد هي مجرد البداية. انضم إلى استوديو إيجل نيبولا للشركات الناشئة واحصل على دعم عملي بينما نشاركك في تأسيس مشروعك.'),
('resources', 'ctaApplyButton', 'ar', 'تقدم للانضمام إلى الاستوديو'),
('resources', 'ctaLearnButton', 'ar', 'اعرف المزيد عنا'),
('resources', 'footerCopyright', 'ar', '© 2025 إيجل نيبولا! جميع الحقوق محفوظة.'),
('resources', 'footerBlogsButton', 'ar', 'المدونة والأخبار'),

-- Blogs Section (Arabic)
('blogs', 'heroTitle', 'ar', 'المدونة والأخبار'),
('blogs', 'heroDescription', 'ar', 'ابق محدثاً بأحدث الرؤى، الاتجاهات، والقصص من عالم ريادة الأعمال وبناء الأعمال التجارية المدعوم بالذكاء الاصطناعي.'),
('blogs', 'blogsTitle', 'ar', 'أحدث المقالات والتحديثات'),
('blogs', 'readMore', 'ar', 'اقرأ المزيد'),
('blogs', 'featured', 'ar', 'مميز'),
('blogs', 'categoriesAll', 'ar', 'جميع الفئات'),
('blogs', 'categoriesAiTechnology', 'ar', 'الذكاء الاصطناعي والتكنولوجيا'),
('blogs', 'categoriesBusinessStrategy', 'ar', 'استراتيجية الأعمال'),
('blogs', 'categoriesIndustryNews', 'ar', 'أخبار الصناعة'),
('blogs', 'categoriesCaseStudies', 'ar', 'دراسات الحالة');

-- Step 6: Insert English resource cards (if they exist)
INSERT INTO multilingual_resource_cards (original_id, language, title, description, button_text)
SELECT 
    rc.id,
    'en',
    rc.title,
    rc.description,
    rc."buttonText"
FROM resource_cards rc
WHERE rc.language = 'en' OR rc.language IS NULL
ON CONFLICT (original_id, language) DO NOTHING;

-- Step 7: Insert Arabic resource cards
INSERT INTO multilingual_resource_cards (original_id, language, title, description, button_text)
SELECT 
    rc.id,
    'ar',
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
    END,
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
    END,
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
    END
FROM resource_cards rc
WHERE rc.language = 'en' OR rc.language IS NULL
ON CONFLICT (original_id, language) DO NOTHING;

-- Step 8: Insert English blog posts (if they exist)
INSERT INTO multilingual_blog_posts (original_id, language, title, excerpt, content)
SELECT 
    bp.id,
    'en',
    bp.title,
    bp.excerpt,
    bp.content
FROM blog_posts bp
WHERE bp.language = 'en' OR bp.language IS NULL
ON CONFLICT (original_id, language) DO NOTHING;

-- Step 9: Insert Arabic blog posts
INSERT INTO multilingual_blog_posts (original_id, language, title, excerpt, content)
SELECT 
    bp.id,
    'ar',
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'مستقبل الذكاء الاصطناعي في ريادة الأعمال السعودية'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'بناء عملك التجاري حول الشغف: إطار عمل'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'رؤية 2030 وثورة الشركات الناشئة'
        WHEN bp.title = 'From Idea to MVP: The Co-Founding Process' THEN 'من الفكرة إلى المنتج الأولي: عملية المشاركة في التأسيس'
        ELSE bp.title
    END,
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'اكتشف كيف يغير الذكاء الاصطناعي نظام الشركات الناشئة السعودي ويخلق فرصاً جديدة لرواد الأعمال المتحمسين.'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'تعلم منهجيتنا المثبتة لتصميم الأعمال التجارية التي تتماشى مع شغفك الشخصي، مهاراتك، وأهدافك طويلة المدى.'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'كيف تخلق رؤية السعودية 2030 فرصاً غير مسبوقة للشركات الناشئة المبتكرة ورواد الأعمال المتحمسين.'
        WHEN bp.title = 'From Idea to MVP: The Co-Founding Process' THEN 'خذ نظرة خلف الكواليس حول كيفية عملنا مع المؤسسين لتحويل الأفكار إلى منتجات وأعمال تجارية قابلة للحياة.'
        ELSE bp.excerpt
    END,
    CASE 
        WHEN bp.title = 'The Future of AI in Saudi Entrepreneurship' THEN 'مشهد ريادة الأعمال في المملكة العربية السعودية يتطور بسرعة، مع لعب الذكاء الاصطناعي دوراً محورياً في هذا التحول. من عمليات الأعمال المؤتمتة إلى تحليل السوق المدعوم بالذكاء الاصطناعي، الفرص للشركات الناشئة المبتكرة غير مسبوقة.'
        WHEN bp.title = 'Building Your Business Around Passion: A Framework' THEN 'معظم رواد الأعمال يبدأون باتجاهات السوق ويحاولون ملاءمة أنفسهم مع الفرص. نحن نؤمن بالبدء بالمؤسس - فهم مزيجك الفريد من الشغف، المهارات، والرؤية لخلق عمل تجاري يناسبك حقاً.'
        WHEN bp.title = 'Vision 2030 and the Startup Revolution' THEN 'رؤية السعودية 2030 فتحت أبواباً لرواد الأعمال كما لم يحدث من قبل. من نيوم إلى مشروع البحر الأحمر، المملكة تدعم بنشاط الشركات الناشئة المبتكرة التي تتماشى مع أهدافها الطموحة.'
        WHEN bp.title = 'From Idea to MVP: The Co-Founding Process' THEN 'الرحلة من الفكرة إلى المنتج الأولي حاسمة لأي شركة ناشئة. في إيجل نيبولا، صقلنا هذه العملية لمساعدة رواد الأعمال المتحمسين على البناء بشكل أسرع وأذكى.'
        ELSE bp.content
    END
FROM blog_posts bp
WHERE bp.language = 'en' OR bp.language IS NULL
ON CONFLICT (original_id, language) DO NOTHING;

-- Step 10: Verify the setup
SELECT '=== MULTILINGUAL SETUP COMPLETED ===' as status;
SELECT 'English content count:' as info, COUNT(*) as count FROM multilingual_content WHERE language = 'en';
SELECT 'Arabic content count:' as info, COUNT(*) as count FROM multilingual_content WHERE language = 'ar';
SELECT 'English resource cards:' as info, COUNT(*) as count FROM multilingual_resource_cards WHERE language = 'en';
SELECT 'Arabic resource cards:' as info, COUNT(*) as count FROM multilingual_resource_cards WHERE language = 'ar';
SELECT 'English blog posts:' as info, COUNT(*) as count FROM multilingual_blog_posts WHERE language = 'en';
SELECT 'Arabic blog posts:' as info, COUNT(*) as count FROM multilingual_blog_posts WHERE language = 'ar';
SELECT 'Available languages:' as info, STRING_AGG(DISTINCT language, ', ') as languages FROM multilingual_content;
