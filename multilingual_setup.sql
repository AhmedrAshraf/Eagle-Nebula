-- Multilingual Content Setup for Eagle Nebula
-- Run this in your Supabase SQL editor

-- Add language column to website_content table
ALTER TABLE website_content 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';

-- Create index for language-based queries
CREATE INDEX IF NOT EXISTS idx_website_content_language ON website_content(language);

-- Update existing content to have language 'en'
UPDATE website_content 
SET language = 'en' 
WHERE language IS NULL;

-- Create multilingual content table for better organization
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

-- Create indexes for multilingual_content
CREATE INDEX IF NOT EXISTS idx_multilingual_content_section ON multilingual_content(section);
CREATE INDEX IF NOT EXISTS idx_multilingual_content_language ON multilingual_content(language);
CREATE INDEX IF NOT EXISTS idx_multilingual_content_section_language ON multilingual_content(section, language);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_multilingual_content_updated_at
    BEFORE UPDATE ON multilingual_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Migrate existing content to multilingual_content table
INSERT INTO multilingual_content (section, field, language, value, created_at, updated_at)
SELECT section, field, language, value, created_at, updated_at
FROM website_content
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = EXCLUDED.updated_at;

-- Add language support to resource_cards table
ALTER TABLE resource_cards 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';

-- Update existing resource cards to have language 'en'
UPDATE resource_cards 
SET language = 'en' 
WHERE language IS NULL;

-- Create multilingual resource cards table
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

-- Create indexes for multilingual_resource_cards
CREATE INDEX IF NOT EXISTS idx_multilingual_resource_cards_original_id ON multilingual_resource_cards(original_id);
CREATE INDEX IF NOT EXISTS idx_multilingual_resource_cards_language ON multilingual_resource_cards(language);

-- Create trigger for multilingual_resource_cards
CREATE TRIGGER update_multilingual_resource_cards_updated_at
    BEFORE UPDATE ON multilingual_resource_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add language support to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';

-- Update existing blog posts to have language 'en'
UPDATE blog_posts 
SET language = 'en' 
WHERE language IS NULL;

-- Create multilingual blog posts table
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

-- Create indexes for multilingual_blog_posts
CREATE INDEX IF NOT EXISTS idx_multilingual_blog_posts_original_id ON multilingual_blog_posts(original_id);
CREATE INDEX IF NOT EXISTS idx_multilingual_blog_posts_language ON multilingual_blog_posts(language);

-- Create trigger for multilingual_blog_posts
CREATE TRIGGER update_multilingual_blog_posts_updated_at
    BEFORE UPDATE ON multilingual_blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert Arabic translations for website content
INSERT INTO multilingual_content (section, field, language, value) VALUES
-- Hero Section
('hero', 'title', 'ar', 'استوديو إيجل نيبولا للشركات الناشئة'),
('hero', 'subtitle', 'ar', 'حيث يتم إنشاء رواد الأعمال المتحمسين'),
('hero', 'description', 'ar', 'في الفضاء، سديم النسر هو المكان الذي تُخلق فيه النجوم.\nفي استوديونا، هو المكان الذي يُخلق فيه رواد الأعمال المتحمسون.\nنحن لا نوجهك فقط... بل نشاركك في التأسيس.\nنبني الشركات الناشئة السعودية معاً—من الشرارة الأولى إلى الإطلاق.'),

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
('blogs', 'blogsTitle', 'ar', 'أحدث المقالات والتحديثات')
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Verify the setup
SELECT 'Multilingual setup completed successfully' as status;
SELECT COUNT(*) as english_content_count FROM multilingual_content WHERE language = 'en';
SELECT COUNT(*) as arabic_content_count FROM multilingual_content WHERE language = 'ar';
