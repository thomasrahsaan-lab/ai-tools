// ============================================
// AI Solutions Finder V2 - Progressive UI
// ============================================

// Progressive UI State
const progressiveState = {
  currentStep: 1,
  selectedCareer: null,
  selectedCategory: null,
  selectedPriority: null,
  isComplete: false
};

// Favorites System (localStorage)
const favorites = {
  items: JSON.parse(localStorage.getItem('ai-finder-favorites') || '[]'),

  add(toolId) {
    if (!this.items.includes(toolId)) {
      this.items.push(toolId);
      this.save();
    }
  },

  remove(toolId) {
    this.items = this.items.filter(id => id !== toolId);
    this.save();
  },

  toggle(toolId) {
    if (this.items.includes(toolId)) {
      this.remove(toolId);
    } else {
      this.add(toolId);
    }
  },

  has(toolId) {
    return this.items.includes(toolId);
  },

  save() {
    localStorage.setItem('ai-finder-favorites', JSON.stringify(this.items));
  }
};

// ============================================
// AI Tools Database
// ============================================
const aiTools = [
  {
    id: 1,
    name: 'ChatGPT',
    category: 'Writing & Communication',
    icon: '💬',
    description: 'Advanced conversational AI for writing, coding, analysis, and creative tasks. Powered by GPT-4.',
    website: 'https://chat.openai.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier available, Plus at $20/mo',
    rating: 4.8,
    reviewCount: 15420,
    ethical: 4.2,
    ethicalDetails: 'Good privacy policy, some data usage concerns',
    performance: 4.9,
    performanceDetails: 'Fast response, high accuracy',
    easeOfUse: 4.9,
    features: 4.8,
    featuresList: ['Text generation', 'Code assistance', 'Analysis', 'Plugins', 'Custom GPTs'],
    support: 4.5,
    supportDetails: 'Extensive documentation, community support',
    useCases: ['Content Creator', 'Software Developer', 'Marketing Professional', 'Student', 'Researcher'],
    integrations: ['API', 'Mobile apps', 'Web interface'],
    affiliateLink: null // Placeholder for future affiliate link
  },
  {
    id: 2,
    name: 'Midjourney',
    category: 'Image Generation',
    icon: '🎨',
    description: 'Premium AI art generator creating stunning, high-quality images from text prompts.',
    website: 'https://www.midjourney.com',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Starting at $10/mo',
    rating: 4.7,
    reviewCount: 8930,
    ethical: 4.0,
    ethicalDetails: 'Artist compensation concerns, good privacy',
    performance: 4.8,
    performanceDetails: 'High quality output, moderate speed',
    easeOfUse: 4.3,
    features: 4.9,
    featuresList: ['Text-to-image', 'Style variations', 'Upscaling', 'Image remix', 'Advanced parameters'],
    support: 4.4,
    supportDetails: 'Discord community, documentation',
    useCases: ['Content Creator', 'Graphic Designer', 'Marketing Professional', 'Artist'],
    integrations: ['Discord', 'Web interface'],
    creditSystem: {
      hasCredits: true,
      unit: 'fast hours',
      plans: [
        { name: 'Basic', price: 10, fastHours: 3.3, imagesPerMonth: 200 },
        { name: 'Standard', price: 30, fastHours: 15, imagesPerMonth: 900, relaxedUnlimited: true },
        { name: 'Pro', price: 60, fastHours: 30, imagesPerMonth: 1800, relaxedUnlimited: true }
      ],
      costPerImage: 0.033, // Based on Standard plan
      imagesPerDollar: 30,
      costPerVideo: null
    }
  },
  {
    id: 3,
    name: 'Claude',
    category: 'Writing & Communication',
    icon: '🤖',
    description: 'Anthropic\'s AI assistant focused on helpful, harmless, and honest conversations with strong reasoning.',
    website: 'https://claude.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $20/mo',
    rating: 4.7,
    reviewCount: 6240,
    ethical: 4.8,
    ethicalDetails: 'Strong privacy focus, ethical AI principles',
    performance: 4.8,
    performanceDetails: 'Excellent reasoning, fast responses',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Long context', 'Document analysis', 'Coding', 'Creative writing', 'Research'],
    support: 4.6,
    supportDetails: 'Good documentation, responsive support',
    useCases: ['Content Creator', 'Software Developer', 'Researcher', 'Writer', 'Student'],
    integrations: ['API', 'Web interface', 'Mobile apps']
  },
  {
    id: 4,
    name: 'Runway',
    category: 'Video Generation',
    icon: '🎬',
    description: 'AI-powered video editing and generation platform with text-to-video, image-to-video, and advanced editing tools.',
    website: 'https://runwayml.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Standard at $12/mo',
    rating: 4.6,
    reviewCount: 4580,
    ethical: 4.1,
    ethicalDetails: 'Moderate privacy, content moderation',
    performance: 4.5,
    performanceDetails: 'Good quality, processing time varies',
    easeOfUse: 4.4,
    features: 4.8,
    featuresList: ['Text-to-video', 'Image-to-video', 'Video editing', 'Motion tracking', 'Green screen'],
    support: 4.3,
    supportDetails: 'Tutorials, community forum',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional', 'Filmmaker'],
    integrations: ['Web interface', 'Adobe plugins'],
    creditSystem: {
      hasCredits: true,
      unit: 'credits',
      plans: [
        { name: 'Standard', price: 12, credits: 625, videoSeconds: 125 },
        { name: 'Pro', price: 28, credits: 2250, videoSeconds: 450 },
        { name: 'Unlimited', price: 76, credits: 'Unlimited', videoSeconds: 'Unlimited' }
      ],
      costPerImage: null,
      imagesPerDollar: null,
      costPerVideo: 0.096, // per second
      videosPerDollar: 10.4 // seconds per dollar
    }
  },
  {
    id: 5,
    name: 'Notion AI',
    category: 'Productivity',
    icon: '📝',
    description: 'AI writing assistant integrated into Notion for brainstorming, writing, and organizing your work.',
    website: 'https://www.notion.so/product/ai',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: '$10/mo (add-on to Notion)',
    rating: 4.5,
    reviewCount: 7120,
    ethical: 4.3,
    ethicalDetails: 'Good privacy, transparent data usage',
    performance: 4.6,
    performanceDetails: 'Fast, reliable integration',
    easeOfUse: 4.9,
    features: 4.4,
    featuresList: ['Writing assistance', 'Summarization', 'Translation', 'Brainstorming', 'Action items'],
    support: 4.7,
    supportDetails: 'Excellent documentation, support team',
    useCases: ['Content Creator', 'Project Manager', 'Student', 'Writer', 'Entrepreneur'],
    integrations: ['Notion workspace']
  },
  {
    id: 6,
    name: 'DALL-E 3',
    category: 'Image Generation',
    icon: '🖼️',
    description: 'OpenAI\'s latest image generation model with improved accuracy and creative capabilities.',
    website: 'https://openai.com/dall-e-3',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Pay per generation or ChatGPT Plus',
    rating: 4.6,
    reviewCount: 5890,
    ethical: 4.2,
    ethicalDetails: 'Artist attribution, content policy',
    performance: 4.7,
    performanceDetails: 'High accuracy, good speed',
    easeOfUse: 4.8,
    features: 4.6,
    featuresList: ['Text-to-image', 'Prompt understanding', 'Style control', 'Variations', 'Editing'],
    support: 4.5,
    supportDetails: 'OpenAI documentation, community',
    useCases: ['Content Creator', 'Graphic Designer', 'Marketing Professional', 'Artist'],
    integrations: ['ChatGPT', 'API', 'Bing Image Creator'],
    creditSystem: {
      hasCredits: true,
      unit: 'credits',
      plans: [
        { name: 'Pay-as-you-go', price: 15, credits: 115, imagesPerMonth: 115 }
      ],
      costPerImage: 0.13,
      imagesPerDollar: 7.7,
      costPerVideo: null
    }
  },
  {
    id: 7,
    name: 'GitHub Copilot',
    category: 'Development',
    icon: '👨‍💻',
    description: 'AI pair programmer that suggests code and entire functions in real-time within your editor.',
    website: 'https://github.com/features/copilot',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: '$10/mo individual, $19/mo business',
    rating: 4.5,
    reviewCount: 12340,
    ethical: 3.8,
    ethicalDetails: 'Code licensing concerns, privacy questions',
    performance: 4.7,
    performanceDetails: 'Fast suggestions, high accuracy',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Code completion', 'Function generation', 'Multi-language', 'Context-aware', 'Chat interface'],
    support: 4.6,
    supportDetails: 'GitHub support, documentation',
    useCases: ['Software Developer', 'Data Scientist', 'Student'],
    integrations: ['VS Code', 'JetBrains', 'Neovim', 'Visual Studio']
  },
  {
    id: 8,
    name: 'Jasper',
    category: 'Writing & Communication',
    icon: '✍️',
    description: 'AI content platform for marketing teams to create on-brand content at scale.',
    website: 'https://www.jasper.ai',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Starting at $39/mo',
    affiliateLink: 'https://www.jasper.ai/partners?authuser=0', // REPLACE THIS WITH YOUR PARTNERSTACK LINK
    rating: 4.4,
    reviewCount: 3210,
    ethical: 4.1,
    ethicalDetails: 'Good privacy, business-focused',
    performance: 4.5,
    performanceDetails: 'Reliable, consistent output',
    easeOfUse: 4.6,
    features: 4.5,
    featuresList: ['Marketing copy', 'SEO content', 'Brand voice', 'Templates', 'Team collaboration'],
    support: 4.7,
    supportDetails: 'Dedicated support, training resources',
    useCases: ['Marketing Professional', 'Content Creator', 'Copywriter', 'Entrepreneur'],
    integrations: ['Chrome extension', 'Surfer SEO', 'Grammarly']
  },
  {
    id: 9,
    name: 'Stable Diffusion',
    category: 'Image Generation',
    icon: '🌌',
    description: 'Open-source image generation model that can run locally with full control and customization.',
    website: 'https://stability.ai/stable-diffusion',
    price: 'Free',
    priceValue: 1,
    pricingDetails: 'Free and open-source',
    rating: 4.3,
    reviewCount: 9870,
    ethical: 4.9,
    ethicalDetails: 'Open-source, full privacy, community-driven',
    performance: 4.2,
    performanceDetails: 'Varies by hardware, customizable',
    easeOfUse: 3.5,
    features: 4.8,
    featuresList: ['Text-to-image', 'Image-to-image', 'Inpainting', 'Custom models', 'Full control'],
    support: 4.0,
    supportDetails: 'Community forums, extensive documentation',
    useCases: ['Graphic Designer', 'Artist', 'Software Developer', 'Researcher'],
    integrations: ['Local installation', 'Web UIs', 'APIs', 'Plugins'],
    creditSystem: {
      hasCredits: false,
      unit: 'unlimited',
      plans: [
        { name: 'Free (Local)', price: 0, imagesPerMonth: 'Unlimited' }
      ],
      costPerImage: 0.00,
      imagesPerDollar: Infinity,
      costPerVideo: null,
      note: 'Free when run locally, costs vary for cloud services'
    }
  },
  {
    id: 10,
    name: 'Descript',
    category: 'Video & Audio Editing',
    icon: '🎙️',
    description: 'AI-powered video and podcast editing with transcription, voice cloning, and text-based editing.',
    website: 'https://www.descript.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Creator at $12/mo',
    rating: 4.6,
    reviewCount: 4120,
    ethical: 4.3,
    ethicalDetails: 'Good privacy, voice cloning ethics',
    performance: 4.6,
    performanceDetails: 'Fast transcription, smooth editing',
    easeOfUse: 4.7,
    features: 4.7,
    featuresList: ['Transcription', 'Voice cloning', 'Text-based editing', 'Filler word removal', 'Screen recording'],
    support: 4.5,
    supportDetails: 'Good documentation, tutorials',
    useCases: ['Content Creator', 'Podcaster', 'Video Editor', 'Marketing Professional'],
    integrations: ['Desktop app', 'Cloud sync']
  },
  {
    id: 11,
    name: 'Canva AI',
    category: 'Design',
    icon: '🎨',
    description: 'AI-powered design tools integrated into Canva for quick graphics, presentations, and social media content.',
    website: 'https://www.canva.com/ai-image-generator/',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $13/mo',
    rating: 4.7,
    reviewCount: 18920,
    ethical: 4.4,
    ethicalDetails: 'Good privacy, creator compensation program',
    performance: 4.7,
    performanceDetails: 'Fast, reliable cloud platform',
    easeOfUse: 4.9,
    features: 4.6,
    featuresList: ['Magic Design', 'Background remover', 'Text-to-image', 'Templates', 'Brand kit'],
    support: 4.8,
    supportDetails: 'Excellent tutorials, support team',
    useCases: ['Content Creator', 'Marketing Professional', 'Graphic Designer', 'Entrepreneur', 'Student'],
    integrations: ['Web app', 'Mobile apps', 'Desktop app', 'Integrations']
  },
  {
    id: 12,
    name: 'Perplexity AI',
    category: 'Research',
    icon: '🔍',
    description: 'AI-powered search engine that provides accurate answers with cited sources for research and learning.',
    website: 'https://www.perplexity.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $20/mo',
    rating: 4.6,
    reviewCount: 3450,
    ethical: 4.5,
    ethicalDetails: 'Transparent sourcing, good privacy',
    performance: 4.7,
    performanceDetails: 'Fast search, accurate citations',
    easeOfUse: 4.8,
    features: 4.5,
    featuresList: ['AI search', 'Source citations', 'Follow-up questions', 'Collections', 'Mobile app'],
    support: 4.4,
    supportDetails: 'Documentation, email support',
    useCases: ['Researcher', 'Student', 'Writer', 'Content Creator'],
    integrations: ['Web interface', 'Mobile apps', 'Browser extension']
  },
  {
    id: 13,
    name: 'ElevenLabs',
    category: 'Voice & Audio',
    icon: '🎤',
    description: 'Advanced AI voice generation and cloning for realistic text-to-speech and voice-over work.',
    website: 'https://elevenlabs.io',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Starter at $5/mo',
    rating: 4.7,
    reviewCount: 5670,
    ethical: 4.0,
    ethicalDetails: 'Voice cloning ethics, consent required',
    performance: 4.8,
    performanceDetails: 'High quality, natural voices',
    easeOfUse: 4.6,
    features: 4.7,
    featuresList: ['Text-to-speech', 'Voice cloning', 'Multi-language', 'Voice library', 'API access'],
    support: 4.5,
    supportDetails: 'Documentation, Discord community',
    useCases: ['Content Creator', 'Podcaster', 'Video Editor', 'Audiobook Creator'],
    integrations: ['API', 'Web interface']
  },
  {
    id: 14,
    name: 'Copy.ai',
    category: 'Writing & Communication',
    icon: '📄',
    description: 'AI copywriting tool for marketing content, social media posts, and business communications.',
    website: 'https://www.copy.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $36/mo',
    rating: 4.3,
    reviewCount: 2890,
    ethical: 4.2,
    ethicalDetails: 'Standard privacy policy, business focus',
    performance: 4.4,
    performanceDetails: 'Fast generation, consistent quality',
    easeOfUse: 4.7,
    features: 4.3,
    featuresList: ['Marketing copy', 'Social posts', 'Email templates', 'Blog posts', 'Workflows'],
    support: 4.4,
    supportDetails: 'Knowledge base, email support',
    useCases: ['Marketing Professional', 'Copywriter', 'Entrepreneur', 'Content Creator'],
    integrations: ['Chrome extension', 'Web app']
  },
  {
    id: 15,
    name: 'Synthesia',
    category: 'Video Generation',
    icon: '🎥',
    description: 'AI video creation platform with AI avatars for training videos, presentations, and marketing content.',
    website: 'https://www.synthesia.io',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Starting at $22/mo',
    rating: 4.4,
    reviewCount: 2340,
    ethical: 4.1,
    ethicalDetails: 'Avatar consent, moderate privacy',
    performance: 4.5,
    performanceDetails: 'Good quality, processing time varies',
    easeOfUse: 4.6,
    features: 4.6,
    featuresList: ['AI avatars', 'Text-to-video', 'Multi-language', 'Templates', 'Screen recording'],
    support: 4.6,
    supportDetails: 'Dedicated support, tutorials',
    useCases: ['Marketing Professional', 'Training & Education', 'Content Creator', 'Entrepreneur'],
    integrations: ['Web platform', 'API']
  },
  {
    id: 16,
    name: 'Grammarly',
    category: 'Writing & Communication',
    icon: '📝',
    description: 'AI writing assistant for grammar, spelling, tone, and clarity improvements across all your writing.',
    website: 'https://www.grammarly.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Premium at $12/mo',
    rating: 4.6,
    reviewCount: 24560,
    ethical: 4.4,
    ethicalDetails: 'Good privacy policy, transparent',
    performance: 4.7,
    performanceDetails: 'Real-time, fast suggestions',
    easeOfUse: 4.9,
    features: 4.5,
    featuresList: ['Grammar check', 'Tone detection', 'Plagiarism check', 'Style suggestions', 'Generative AI'],
    support: 4.7,
    supportDetails: 'Extensive help center, support team',
    useCases: ['Writer', 'Student', 'Content Creator', 'Marketing Professional', 'Everyone'],
    integrations: ['Browser extension', 'Desktop app', 'Mobile keyboard', 'MS Office']
  },
  {
    id: 17,
    name: 'Adobe Firefly',
    category: 'Design',
    icon: '🔥',
    description: 'Adobe\'s generative AI for creative workflows, integrated into Creative Cloud apps.',
    website: 'https://www.adobe.com/products/firefly.html',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Premium with Creative Cloud',
    rating: 4.5,
    reviewCount: 6780,
    ethical: 4.6,
    ethicalDetails: 'Trained on licensed content, creator-friendly',
    performance: 4.6,
    performanceDetails: 'High quality, Adobe integration',
    easeOfUse: 4.5,
    features: 4.7,
    featuresList: ['Text-to-image', 'Generative fill', 'Text effects', 'Recolor', 'Creative Cloud integration'],
    support: 4.8,
    supportDetails: 'Adobe support, extensive tutorials',
    useCases: ['Graphic Designer', 'Content Creator', 'Marketing Professional', 'Artist'],
    integrations: ['Photoshop', 'Illustrator', 'Express', 'Web interface']
  },
  {
    id: 18,
    name: 'Pika Labs',
    category: 'Video Generation',
    icon: '⚡',
    description: 'AI video generation platform for creating and editing videos from text and images.',
    website: 'https://pika.art',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Standard at $10/mo',
    rating: 4.3,
    reviewCount: 1890,
    ethical: 4.0,
    ethicalDetails: 'Emerging platform, standard policies',
    performance: 4.4,
    performanceDetails: 'Good quality, improving rapidly',
    easeOfUse: 4.4,
    features: 4.5,
    featuresList: ['Text-to-video', 'Image-to-video', 'Video editing', 'Camera controls', 'Extend video'],
    support: 4.2,
    supportDetails: 'Discord community, documentation',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional', 'Artist'],
    integrations: ['Discord', 'Web interface']
  },
  {
    id: 19,
    name: 'Higgsfield',
    category: 'Video Generation',
    icon: '🎬',
    description: 'AI-powered cinematic video creation with professional camera controls, crash zooms, and dynamic motion.',
    website: 'https://higgsfield.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro plans available',
    rating: 4.5,
    reviewCount: 850,
    ethical: 4.0,
    ethicalDetails: 'Standard AI content policies',
    performance: 4.6,
    performanceDetails: 'Fast turbo model, high-quality cinematic output',
    easeOfUse: 4.4,
    features: 4.8,
    featuresList: ['Text-to-video', 'Image-to-video', 'Cinematic camera controls', '50+ camera presets', 'Mobile workflow'],
    support: 4.2,
    supportDetails: 'Documentation and tutorials available',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional', 'Filmmaker'],
    integrations: ['Web interface', 'Mobile app']
  },
  {
    id: 20,
    name: 'Hedra',
    category: 'Video Generation',
    icon: '🗣️',
    description: 'AI-powered talking and singing avatars. Create lifelike character videos with perfect lip-sync from text and images.',
    website: 'https://hedra.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Basic at $8/mo',
    rating: 4.6,
    reviewCount: 1240,
    ethical: 4.1,
    ethicalDetails: 'Voice cloning requires consent',
    performance: 4.7,
    performanceDetails: 'Excellent lip-sync, natural facial expressions',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Talking avatars', 'Singing characters', 'Voice cloning', 'Text-to-speech', 'Custom characters'],
    support: 4.3,
    supportDetails: 'Documentation, email support',
    useCases: ['Content Creator', 'Marketing Professional', 'Video Editor', 'Educator'],
    integrations: ['Web interface', 'API']
  },
  {
    id: 21,
    name: 'Kling AI',
    category: 'Video Generation',
    icon: '🎥',
    description: 'Advanced AI video generation with studio-quality output, fluid motion, and up to 2-minute videos with native audio.',
    website: 'https://klingai.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, paid plans from $10/mo',
    rating: 4.7,
    reviewCount: 2100,
    ethical: 4.0,
    ethicalDetails: 'Content moderation, standard policies',
    performance: 4.8,
    performanceDetails: 'High quality, realistic motion, native audio sync',
    easeOfUse: 4.5,
    features: 4.8,
    featuresList: ['Text-to-video', 'Image-to-video', 'Native audio', '1080p output', 'Multiple aspect ratios'],
    support: 4.4,
    supportDetails: 'App support, documentation',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional', 'Filmmaker'],
    integrations: ['Web interface', 'Mobile app'],
    creditSystem: {
      hasCredits: true,
      unit: 'credits',
      plans: [
        { name: 'Pro', price: 10, videosPerMonth: 200 },
        { name: 'Premium', price: 35, videosPerMonth: 1000 }
      ],
      costPerImage: null,
      imagesPerDollar: null,
      costPerVideo: 0.05,
      videosPerDollar: 20
    }
  },
  {
    id: 22,
    name: 'Luma AI',
    category: 'Video Generation',
    icon: '✨',
    description: 'Dream Machine and Ray3 technology for creating stunning, cinematic videos with HDR capabilities and precise control.',
    website: 'https://lumalabs.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Plus at $30/mo',
    rating: 4.7,
    reviewCount: 3200,
    ethical: 4.2,
    ethicalDetails: 'Transparent AI policies',
    performance: 4.8,
    performanceDetails: 'Fast generation, HDR support, high quality',
    easeOfUse: 4.6,
    features: 4.9,
    featuresList: ['Text-to-video', 'Image-to-video', 'HDR video', 'Keyframe control', 'Character reference'],
    support: 4.5,
    supportDetails: 'Documentation, community support',
    useCases: ['Content Creator', 'Video Editor', 'Filmmaker', 'Marketing Professional'],
    integrations: ['Web interface', 'iOS app', 'API'],
    creditSystem: {
      hasCredits: true,
      unit: 'generations',
      plans: [
        { name: 'Plus', price: 30, generationsPerMonth: 120 }
      ],
      costPerImage: null,
      imagesPerDollar: null,
      costPerVideo: 0.25,
      videosPerDollar: 4
    }
  },
  {
    id: 23,
    name: 'Sora',
    category: 'Video Generation',
    icon: '🌟',
    description: 'OpenAI\'s advanced text-to-video model creating highly realistic videos with synchronized audio and deep understanding of physics.',
    website: 'https://openai.com/sora',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'ChatGPT Plus/Pro subscription required',
    rating: 4.8,
    reviewCount: 4500,
    ethical: 4.3,
    ethicalDetails: 'Watermarked output, safety features',
    performance: 4.9,
    performanceDetails: 'Unmatched realism, physics understanding, 1080p',
    easeOfUse: 4.7,
    features: 4.9,
    featuresList: ['Text-to-video', 'Image-to-video', 'Audio sync', 'Up to 1 min videos', 'Video API'],
    support: 4.6,
    supportDetails: 'OpenAI support, documentation',
    useCases: ['Filmmaker', 'Content Creator', 'Marketing Professional', 'Artist'],
    integrations: ['ChatGPT', 'API', 'Web interface'],
    creditSystem: {
      hasCredits: true,
      unit: 'videos',
      plans: [
        { name: 'ChatGPT Plus', price: 20, videosPerMonth: 50 }
      ],
      costPerImage: null,
      imagesPerDollar: null,
      costPerVideo: 0.40,
      videosPerDollar: 2.5,
      note: 'Requires ChatGPT Plus or Pro subscription'
    }
  },
  {
    id: 24,
    name: 'HeyGen',
    category: 'Video Generation',
    icon: '👤',
    description: 'Interactive AI avatars for creating professional videos from scripts without filming equipment. Perfect for training and marketing.',
    website: 'https://heygen.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Creator at $24/mo',
    rating: 4.7,
    reviewCount: 5600,
    ethical: 4.2,
    ethicalDetails: 'Avatar consent required, good privacy',
    performance: 4.7,
    performanceDetails: 'High-quality avatars, fast generation',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['AI avatars', 'Script-to-video', 'Multi-language', 'Custom avatars', 'Voice cloning'],
    support: 4.7,
    supportDetails: 'Excellent support, tutorials',
    useCases: ['Marketing Professional', 'Training & Education', 'Content Creator', 'Entrepreneur'],
    integrations: ['Web platform', 'API', 'Zapier'],
    creditSystem: {
      hasCredits: true,
      unit: 'video minutes',
      plans: [
        { name: 'Creator', price: 24, videoMinutes: 10 },
        { name: 'Business', price: 72, videoMinutes: 30 }
      ],
      costPerImage: null,
      imagesPerDollar: null,
      costPerVideo: 2.40, // per minute
      videosPerDollar: 0.42 // minutes per dollar
    }
  },
  {
    id: 25,
    name: 'Ideogram',
    category: 'Image Generation',
    icon: '🔤',
    description: 'AI image generator with superior text rendering capabilities. Perfect for logos, posters, and designs with readable text.',
    website: 'https://ideogram.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Plus at $8/mo',
    rating: 4.6,
    reviewCount: 2800,
    ethical: 4.3,
    ethicalDetails: 'Good privacy, transparent policies',
    performance: 4.7,
    performanceDetails: 'Excellent text accuracy, fast generation',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Text-to-image', 'Accurate text rendering', 'Logo creation', 'Poster design', 'Style control'],
    support: 4.4,
    supportDetails: 'Documentation, community',
    useCases: ['Graphic Designer', 'Marketing Professional', 'Content Creator', 'Entrepreneur'],
    integrations: ['Web interface', 'API'],
    creditSystem: {
      hasCredits: true,
      unit: 'priority generations',
      plans: [
        { name: 'Plus', price: 8, imagesPerMonth: 400 },
        { name: 'Pro', price: 20, imagesPerMonth: 1000 }
      ],
      costPerImage: 0.02,
      imagesPerDollar: 50,
      costPerVideo: null
    }
  },
  {
    id: 26,
    name: 'Leonardo AI',
    category: 'Image Generation',
    icon: '🎮',
    description: 'AI image generation optimized for game assets, character design, and consistent multi-angle variants.',
    website: 'https://leonardo.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Apprentice at $10/mo',
    rating: 4.5,
    reviewCount: 3400,
    ethical: 4.2,
    ethicalDetails: 'Standard AI policies',
    performance: 4.6,
    performanceDetails: 'Fast, consistent output',
    easeOfUse: 4.6,
    features: 4.7,
    featuresList: ['Text-to-image', 'Game assets', 'Character design', 'Multi-angle variants', 'Style consistency'],
    support: 4.5,
    supportDetails: 'Good documentation, community',
    useCases: ['Graphic Designer', 'Game Developer', 'Artist', 'Content Creator'],
    integrations: ['Web interface', 'API'],
    creditSystem: {
      hasCredits: true,
      unit: 'tokens',
      plans: [
        { name: 'Apprentice', price: 10, tokens: 8500, imagesPerMonth: 850 },
        { name: 'Artisan', price: 24, tokens: 25000, imagesPerMonth: 2500 }
      ],
      costPerImage: 0.012,
      imagesPerDollar: 85,
      costPerVideo: null
    }
  },
  {
    id: 27,
    name: 'Cursor',
    category: 'Development',
    icon: '⌨️',
    description: 'AI-powered code editor built for pair programming with AI. Write, edit, and debug code faster with intelligent assistance.',
    website: 'https://cursor.sh',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $20/mo',
    rating: 4.8,
    reviewCount: 8900,
    ethical: 4.1,
    ethicalDetails: 'Code privacy concerns, improving',
    performance: 4.8,
    performanceDetails: 'Fast, intelligent suggestions',
    easeOfUse: 4.9,
    features: 4.8,
    featuresList: ['AI code completion', 'Chat with codebase', 'Multi-file editing', 'Bug detection', 'Refactoring'],
    support: 4.6,
    supportDetails: 'Documentation, Discord community',
    useCases: ['Software Developer', 'Data Scientist', 'Student'],
    integrations: ['VS Code fork', 'Git', 'Terminal']
  },
  {
    id: 28,
    name: 'Replit AI',
    category: 'Development',
    icon: '🔧',
    description: 'AI-powered collaborative coding platform. Build, deploy, and host apps with AI assistance in the browser.',
    website: 'https://replit.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Hacker at $7/mo',
    rating: 4.6,
    reviewCount: 12000,
    ethical: 4.3,
    ethicalDetails: 'Good privacy, educational focus',
    performance: 4.5,
    performanceDetails: 'Fast cloud IDE, instant deployment',
    easeOfUse: 4.9,
    features: 4.6,
    featuresList: ['AI code generation', 'Collaborative coding', 'Instant deployment', 'Multi-language', 'Database hosting'],
    support: 4.7,
    supportDetails: 'Excellent community, documentation',
    useCases: ['Software Developer', 'Student', 'Educator', 'Entrepreneur'],
    integrations: ['Web IDE', 'GitHub', 'Database', 'Hosting']
  },
  {
    id: 29,
    name: 'Gemini',
    category: 'Writing & Communication',
    icon: '💎',
    description: 'Google\'s advanced AI assistant with multimodal capabilities, long context, and deep integration with Google services.',
    website: 'https://gemini.google.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Advanced at $20/mo',
    rating: 4.7,
    reviewCount: 18000,
    ethical: 4.4,
    ethicalDetails: 'Google privacy policies, transparent',
    performance: 4.8,
    performanceDetails: 'Fast, multimodal, excellent reasoning',
    easeOfUse: 4.8,
    features: 4.8,
    featuresList: ['Text generation', 'Image understanding', 'Code assistance', 'Google integration', 'Long context'],
    support: 4.7,
    supportDetails: 'Google support, extensive documentation',
    useCases: ['Content Creator', 'Software Developer', 'Researcher', 'Student', 'Everyone'],
    integrations: ['Google Workspace', 'Android', 'Web interface']
  },
  {
    id: 30,
    name: 'Anthropic Claude',
    category: 'Writing & Communication',
    icon: '🧠',
    description: 'Advanced AI assistant with industry-leading context window, strong reasoning, and ethical AI principles.',
    website: 'https://claude.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $20/mo',
    rating: 4.8,
    reviewCount: 9500,
    ethical: 4.9,
    ethicalDetails: 'Industry-leading ethical AI, strong privacy',
    performance: 4.9,
    performanceDetails: 'Excellent reasoning, 200K context',
    easeOfUse: 4.8,
    features: 4.8,
    featuresList: ['Long context (200K)', 'Document analysis', 'Coding', 'Vision', 'Artifacts'],
    support: 4.7,
    supportDetails: 'Good documentation, responsive support',
    useCases: ['Content Creator', 'Software Developer', 'Researcher', 'Writer', 'Analyst'],
    integrations: ['API', 'Web interface', 'Mobile apps']
  },
  {
    id: 31,
    name: 'Flux Pro',
    category: 'Image Generation',
    icon: '⚡',
    description: 'High-performance open-source image generation with exceptional quality and speed. Great for professional workflows.',
    website: 'https://blackforestlabs.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro API access available',
    rating: 4.7,
    reviewCount: 4200,
    ethical: 4.5,
    ethicalDetails: 'Open-source, transparent',
    performance: 4.9,
    performanceDetails: 'Extremely fast, high quality',
    easeOfUse: 4.4,
    features: 4.8,
    featuresList: ['Text-to-image', 'High resolution', 'Fast generation', 'Style control', 'Open-source'],
    support: 4.3,
    supportDetails: 'Community support, documentation',
    useCases: ['Graphic Designer', 'Artist', 'Content Creator', 'Software Developer'],
    integrations: ['API', 'Replicate', 'Hugging Face'],
    creditSystem: {
      hasCredits: true,
      unit: 'API calls',
      plans: [
        { name: 'API', price: null, costPerImage: 0.05 }
      ],
      costPerImage: 0.05,
      imagesPerDollar: 20,
      costPerVideo: null,
      note: 'Pay-per-use API pricing'
    }
  },
  {
    id: 32,
    name: 'Krea AI',
    category: 'Image Generation',
    icon: '🎨',
    description: 'Real-time AI image generation with instant visual feedback. Draw and see AI interpretations in real-time.',
    website: 'https://krea.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $24/mo',
    rating: 4.6,
    reviewCount: 2100,
    ethical: 4.2,
    ethicalDetails: 'Standard policies',
    performance: 4.7,
    performanceDetails: 'Real-time generation, fast',
    easeOfUse: 4.7,
    features: 4.7,
    featuresList: ['Real-time generation', 'Canvas drawing', 'Style transfer', 'Upscaling', 'Video generation'],
    support: 4.4,
    supportDetails: 'Documentation, Discord',
    useCases: ['Graphic Designer', 'Artist', 'Content Creator', 'UI/UX Designer'],
    integrations: ['Web interface']
  },
  {
    id: 33,
    name: 'Otter.ai',
    category: 'Productivity',
    icon: '🦦',
    description: 'AI meeting assistant with real-time transcription, automated summaries, and action item extraction.',
    website: 'https://otter.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $10/mo',
    rating: 4.5,
    reviewCount: 15000,
    ethical: 4.4,
    ethicalDetails: 'Good privacy for business tool',
    performance: 4.6,
    performanceDetails: 'Accurate transcription, real-time',
    easeOfUse: 4.8,
    features: 4.6,
    featuresList: ['Live transcription', 'Meeting summaries', 'Action items', 'Speaker identification', 'Integrations'],
    support: 4.6,
    supportDetails: 'Good support, documentation',
    useCases: ['Project Manager', 'Entrepreneur', 'Student', 'Researcher', 'Everyone'],
    integrations: ['Zoom', 'Google Meet', 'Teams', 'Mobile apps']
  },
  {
    id: 34,
    name: 'Gamma',
    category: 'Productivity',
    icon: '📊',
    description: 'AI-powered presentation and document creation. Generate beautiful slides and docs from simple prompts.',
    website: 'https://gamma.app',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Plus at $8/mo',
    rating: 4.7,
    reviewCount: 8700,
    ethical: 4.3,
    ethicalDetails: 'Standard privacy policies',
    performance: 4.6,
    performanceDetails: 'Fast generation, good templates',
    easeOfUse: 4.9,
    features: 4.7,
    featuresList: ['AI presentations', 'Document creation', 'Templates', 'Collaboration', 'Export options'],
    support: 4.5,
    supportDetails: 'Good documentation, support',
    useCases: ['Marketing Professional', 'Entrepreneur', 'Student', 'Content Creator', 'Educator'],
    integrations: ['Web interface', 'Export to PDF/PPT']
  },
  {
    id: 35,
    name: 'Recraft',
    category: 'Design',
    icon: '🖌️',
    description: 'AI design tool for creating consistent brand assets, vector graphics, and illustrations with style control.',
    website: 'https://recraft.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $12/mo',
    rating: 4.5,
    reviewCount: 1800,
    ethical: 4.2,
    ethicalDetails: 'Standard policies',
    performance: 4.6,
    performanceDetails: 'Fast, consistent style',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Vector generation', 'Brand consistency', 'Style control', 'Icon creation', 'Illustrations'],
    support: 4.4,
    supportDetails: 'Documentation, email support',
    useCases: ['Graphic Designer', 'Marketing Professional', 'Entrepreneur', 'Content Creator'],
    integrations: ['Web interface', 'Export SVG/PNG']
  },
  {
    id: 36,
    name: 'Captions.ai',
    category: 'Video & Audio Editing',
    icon: '📹',
    description: 'AI-powered video editing with automatic captions, eye contact correction, and video enhancement for creators.',
    website: 'https://captions.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $20/mo',
    rating: 4.6,
    reviewCount: 3200,
    ethical: 4.2,
    ethicalDetails: 'Standard privacy policies',
    performance: 4.7,
    performanceDetails: 'Fast processing, accurate captions',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Auto captions', 'Eye contact fix', 'Video enhancement', 'AI editing', 'Multi-language'],
    support: 4.5,
    supportDetails: 'Good support, tutorials',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional', 'Social Media Manager'],
    integrations: ['Mobile app', 'Web interface']
  },
  {
    id: 37,
    name: 'OpusClip',
    category: 'Video & Audio Editing',
    icon: '✂️',
    description: 'AI video clipper that turns long videos into viral short clips with automatic editing and captions.',
    website: 'https://opus.pro',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Starter at $9/mo',
    rating: 4.7,
    reviewCount: 4100,
    ethical: 4.1,
    ethicalDetails: 'Standard content policies',
    performance: 4.6,
    performanceDetails: 'Fast clip generation, smart editing',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Auto clipping', 'Viral score', 'Auto captions', 'B-roll', 'Multi-platform export'],
    support: 4.6,
    supportDetails: 'Excellent tutorials, support',
    useCases: ['Content Creator', 'Video Editor', 'Podcaster', 'Marketing Professional'],
    integrations: ['Web interface', 'YouTube', 'Social media']
  },
  {
    id: 38,
    name: 'Pictory',
    category: 'Video Generation',
    icon: '🎞️',
    description: 'AI video creation from text, articles, and scripts. Perfect for marketing and social media content.',
    website: 'https://pictory.ai',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Standard at $19/mo',
    rating: 4.5,
    reviewCount: 2800,
    ethical: 4.2,
    ethicalDetails: 'Standard policies',
    performance: 4.5,
    performanceDetails: 'Good quality, reasonable speed',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Text-to-video', 'Article-to-video', 'Auto captions', 'Stock footage', 'Templates'],
    support: 4.6,
    supportDetails: 'Good support, knowledge base',
    useCases: ['Marketing Professional', 'Content Creator', 'Entrepreneur', 'Social Media Manager'],
    integrations: ['Web interface', 'Stock libraries']
  },
  {
    id: 39,
    name: 'Writesonic',
    category: 'Writing & Communication',
    icon: '✏️',
    description: 'AI writing assistant for articles, blog posts, ads, and marketing copy with SEO optimization.',
    website: 'https://writesonic.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Unlimited at $20/mo',
    rating: 4.4,
    reviewCount: 5600,
    ethical: 4.2,
    ethicalDetails: 'Standard privacy policies',
    performance: 4.5,
    performanceDetails: 'Fast generation, good quality',
    easeOfUse: 4.7,
    features: 4.5,
    featuresList: ['Article writing', 'SEO optimization', 'Ad copy', 'Landing pages', 'Chatbot'],
    support: 4.5,
    supportDetails: 'Good documentation, support',
    useCases: ['Marketing Professional', 'Content Creator', 'Copywriter', 'Entrepreneur'],
    integrations: ['Web interface', 'Chrome extension', 'API']
  },
  {
    id: 40,
    name: 'QuillBot',
    category: 'Writing & Communication',
    icon: '🪶',
    description: 'AI paraphrasing and rewriting tool with grammar checking, summarization, and citation generation.',
    website: 'https://quillbot.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Premium at $10/mo',
    rating: 4.5,
    reviewCount: 18000,
    ethical: 4.3,
    ethicalDetails: 'Academic integrity focus',
    performance: 4.6,
    performanceDetails: 'Fast, accurate paraphrasing',
    easeOfUse: 4.8,
    features: 4.5,
    featuresList: ['Paraphrasing', 'Grammar check', 'Summarizer', 'Citation generator', 'Plagiarism check'],
    support: 4.6,
    supportDetails: 'Good support, extensive help',
    useCases: ['Student', 'Writer', 'Researcher', 'Content Creator'],
    integrations: ['Web interface', 'Chrome extension', 'Word plugin']
  },
  {
    id: 41,
    name: 'Fireflies.ai',
    category: 'Productivity',
    icon: '🔥',
    description: 'AI meeting assistant with transcription, summaries, and searchable meeting notes across all platforms.',
    website: 'https://fireflies.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $10/mo',
    rating: 4.6,
    reviewCount: 8900,
    ethical: 4.4,
    ethicalDetails: 'Enterprise-grade security',
    performance: 4.7,
    performanceDetails: 'Accurate transcription, fast',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Meeting transcription', 'AI summaries', 'Action items', 'CRM integration', 'Search'],
    support: 4.7,
    supportDetails: 'Excellent support, documentation',
    useCases: ['Project Manager', 'Sales Professional', 'Entrepreneur', 'Everyone'],
    integrations: ['Zoom', 'Teams', 'Meet', 'Slack', 'CRM']
  },
  {
    id: 42,
    name: 'Murf.ai',
    category: 'Voice & Audio',
    icon: '🎙️',
    description: 'Professional AI voiceover studio with 120+ voices in 20+ languages for videos, podcasts, and presentations.',
    website: 'https://murf.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Basic at $19/mo',
    rating: 4.6,
    reviewCount: 3400,
    ethical: 4.2,
    ethicalDetails: 'Voice licensing, consent-based',
    performance: 4.7,
    performanceDetails: 'High-quality voices, natural',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['120+ voices', 'Voice cloning', 'Multi-language', 'Video sync', 'Collaboration'],
    support: 4.6,
    supportDetails: 'Good support, tutorials',
    useCases: ['Content Creator', 'Podcaster', 'Video Editor', 'Marketing Professional'],
    integrations: ['Web interface', 'Video editors']
  },
  {
    id: 43,
    name: 'Play.ht',
    category: 'Voice & Audio',
    icon: '▶️',
    description: 'AI text-to-speech with ultra-realistic voices, voice cloning, and API for developers.',
    website: 'https://play.ht',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Creator at $31/mo',
    rating: 4.5,
    reviewCount: 2100,
    ethical: 4.1,
    ethicalDetails: 'Voice consent required',
    performance: 4.7,
    performanceDetails: 'Ultra-realistic, fast generation',
    easeOfUse: 4.6,
    features: 4.7,
    featuresList: ['Ultra-realistic voices', 'Voice cloning', 'Multi-language', 'API access', 'Podcast hosting'],
    support: 4.5,
    supportDetails: 'Good documentation, API support',
    useCases: ['Content Creator', 'Developer', 'Podcaster', 'Audiobook Creator'],
    integrations: ['API', 'Web interface', 'WordPress']
  },
  {
    id: 44,
    name: 'Consensus',
    category: 'Research',
    icon: '🔬',
    description: 'AI research assistant that searches and summarizes scientific papers with cited answers.',
    website: 'https://consensus.app',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Premium at $9/mo',
    rating: 4.7,
    reviewCount: 1800,
    ethical: 4.6,
    ethicalDetails: 'Academic integrity, cited sources',
    performance: 4.6,
    performanceDetails: 'Fast search, accurate summaries',
    easeOfUse: 4.8,
    features: 4.6,
    featuresList: ['Paper search', 'AI summaries', 'Citations', 'Consensus meter', 'Research synthesis'],
    support: 4.5,
    supportDetails: 'Good documentation, support',
    useCases: ['Researcher', 'Student', 'Academic', 'Writer'],
    integrations: ['Web interface', 'Browser extension']
  },
  {
    id: 45,
    name: 'Framer AI',
    category: 'Design',
    icon: '🌐',
    description: 'AI website builder that generates complete, responsive websites from simple text prompts.',
    website: 'https://framer.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Mini at $5/mo',
    rating: 4.6,
    reviewCount: 4200,
    ethical: 4.3,
    ethicalDetails: 'Standard policies',
    performance: 4.7,
    performanceDetails: 'Fast generation, high quality',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['AI website generation', 'Responsive design', 'CMS', 'Animations', 'SEO'],
    support: 4.7,
    supportDetails: 'Excellent documentation, community',
    useCases: ['Web Designer', 'Entrepreneur', 'Marketing Professional', 'Freelancer'],
    integrations: ['Web platform', 'Custom domain', 'Analytics']
  },
  {
    id: 46,
    name: 'Looka',
    category: 'Design',
    icon: '🎯',
    description: 'AI logo maker and brand kit generator. Create professional logos and complete brand identity in minutes.',
    website: 'https://looka.com',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Logo from $20, Brand Kit $96',
    rating: 4.5,
    reviewCount: 12000,
    ethical: 4.3,
    ethicalDetails: 'Standard policies',
    performance: 4.6,
    performanceDetails: 'Fast generation, good variety',
    easeOfUse: 4.9,
    features: 4.5,
    featuresList: ['Logo generation', 'Brand kit', 'Business cards', 'Social media', 'Marketing materials'],
    support: 4.6,
    supportDetails: 'Good support, tutorials',
    useCases: ['Entrepreneur', 'Small Business', 'Marketing Professional', 'Freelancer'],
    integrations: ['Web interface', 'Download files']
  },
  {
    id: 47,
    name: 'Uizard',
    category: 'Design',
    icon: '📱',
    description: 'AI UI/UX design tool that transforms sketches and screenshots into editable designs and prototypes.',
    website: 'https://uizard.io',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Pro at $12/mo',
    rating: 4.4,
    reviewCount: 2400,
    ethical: 4.2,
    ethicalDetails: 'Standard policies',
    performance: 4.5,
    performanceDetails: 'Fast conversion, good accuracy',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Sketch-to-design', 'Screenshot-to-design', 'AI templates', 'Prototyping', 'Collaboration'],
    support: 4.5,
    supportDetails: 'Good documentation, support',
    useCases: ['UI/UX Designer', 'Product Manager', 'Developer', 'Entrepreneur'],
    integrations: ['Web interface', 'Figma export']
  },
  {
    id: 48,
    name: 'Mem.ai',
    category: 'Productivity',
    icon: '🧠',
    description: 'AI-powered note-taking that auto-organizes, surfaces insights, and connects your knowledge.',
    website: 'https://mem.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Mem+ at $15/mo',
    rating: 4.5,
    reviewCount: 1600,
    ethical: 4.4,
    ethicalDetails: 'Privacy-focused, encrypted',
    performance: 4.6,
    performanceDetails: 'Fast search, smart organization',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Auto-organization', 'AI search', 'Knowledge graph', 'Smart write', 'Integrations'],
    support: 4.5,
    supportDetails: 'Good support, documentation',
    useCases: ['Knowledge Worker', 'Researcher', 'Writer', 'Entrepreneur'],
    integrations: ['Web', 'Mobile', 'Slack', 'Email']
  },
  {
    id: 49,
    name: 'Wordtune',
    category: 'Writing & Communication',
    icon: '🎵',
    description: 'AI writing companion that rewrites, rephrases, and improves your writing with tone control.',
    website: 'https://wordtune.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Premium at $10/mo',
    rating: 4.6,
    reviewCount: 9200,
    ethical: 4.3,
    ethicalDetails: 'Privacy-focused',
    performance: 4.7,
    performanceDetails: 'Fast suggestions, accurate',
    easeOfUse: 4.9,
    features: 4.6,
    featuresList: ['Rewriting', 'Tone adjustment', 'Summarization', 'Expansion', 'Spices (facts)'],
    support: 4.6,
    supportDetails: 'Good support, help center',
    useCases: ['Writer', 'Student', 'Content Creator', 'Professional'],
    integrations: ['Chrome extension', 'Edge', 'Word', 'Gmail']
  },
  {
    id: 50,
    name: 'Fliki',
    category: 'Video Generation',
    icon: '🎬',
    description: 'AI text-to-video and text-to-speech platform with realistic voices and stock media library.',
    website: 'https://fliki.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier, Standard at $28/mo',
    affiliateLink: 'https://fliki.ai/?via=rahsaan',
    rating: 4.6,
    reviewCount: 3800,
    ethical: 4.2,
    ethicalDetails: 'Standard content policies',
    performance: 4.6,
    performanceDetails: 'Fast generation, good quality',
    easeOfUse: 4.8,
    features: 4.7,
    featuresList: ['Text-to-video', 'AI voices', 'Stock library', 'Multi-language', 'Blog-to-video'],
    support: 4.6,
    supportDetails: 'Good support, tutorials',
    useCases: ['Content Creator', 'Marketing Professional', 'Educator', 'Social Media Manager'],
    integrations: ['Web interface', 'Stock libraries']
  },
  {
    id: 52,
    name: 'OpenArt.ai',
    category: 'Image Generation',
    additionalCategories: ['Video Generation'],
    icon: '🎨',
    description: 'Advanced AI art platform for professional creators. Features include model training, creative upscaler, and precise image editing.',
    website: 'https://openart.ai/',
    affiliateLink: 'https://openart.ai/home/?via=rahsaan',
    price: 'Freemium',
    priceValue: 2,

    rating: 4.7,
    reviewCount: 5400,
    ethical: 4.3,
    ethicalDetails: 'Clear commercial usage rights on paid plans',
    performance: 4.8,
    performanceDetails: 'High quality with parallel generation capabilities',
    easeOfUse: 4.6,
    features: 4.9,
    featuresList: ['Model Training', 'Creative Upscaler', 'Inpainting', 'Magic Brush', 'Sketch-to-Image'],
    support: 4.4,
    supportDetails: 'Community Discord and documentation',
    useCases: ['Graphic Designer', 'Artist', 'Content Creator', 'Marketing Professional'],
    integrations: ['Web interface', 'API access']
  },
  {
    id: 53,
    name: 'Hostinger',
    category: 'Website Builder',
    icon: '🌐',
    description: 'AI-powered website builder that generates professional, responsive websites in minutes with built-in hosting.',
    website: 'https://www.hostinger.com/web-hosting',
    price: 'Paid',
    priceValue: 3,
    affiliateLink: 'https://hostinger.com?REFERRALCODE=DW5RAHSAAQFK',
    rating: 4.8,
    reviewCount: 22100,
    ethical: 4.6,
    ethicalDetails: 'Data protection compliant, transparent pricing',
    performance: 4.8,
    performanceDetails: 'Fast loading sites, 99.9% uptime',
    easeOfUse: 4.9,
    features: 4.7,
    featuresList: ['AI website generation', 'Drag-and-drop editor', 'SEO optimization', 'eCommerce tools', 'Free domain'],
    support: 4.8,
    supportDetails: '24/7 live chat support',
    useCases: ['Entrepreneur', 'Content Creator', 'Marketing Professional', 'Student', 'Writer'],
    integrations: ['WordPress', 'eCommerce payments', 'Google Analytics', 'Marketing tools']
  },
  {
    id: 54,
    name: 'Wix AI',
    category: 'Website Builder',
    icon: '✨',
    description: 'Comprehensive AI site generator with text-to-site, image generation, and customization.',
    website: 'https://www.wix.com/ai-website-builder',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free plan available, Combo starts ~$17/mo',
    rating: 4.7,
    reviewCount: 45000,
    ethical: 4.5,
    ethicalDetails: 'Privacy focused, transparent AI usage',
    performance: 4.8,
    performanceDetails: 'Reliable hosting with 99.9% uptime',
    easeOfUse: 4.8,
    features: 4.9,
    featuresList: ['Text-to-Website', 'AI Image Creator', 'AI Text Generator', 'SEO Wiz', 'Built-in Marketing'],
    support: 4.7,
    supportDetails: '24/7 support & Help Center',
    useCases: ['Entrepreneur', 'Marketing Professional', 'Content Creator'],
    integrations: ['Wix App Market', 'Social Media', 'Google Analytics']
  },
  {
    id: 55,
    name: '10Web',
    category: 'Website Builder',
    icon: '🚀',
    description: 'AI-powered WordPress platform that builds or recreates any website in minutes.',
    website: 'https://10web.io',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Plans start ~$10/mo',
    rating: 4.6,
    reviewCount: 3200,
    ethical: 4.4,
    ethicalDetails: 'Standard data practices',
    performance: 4.9,
    performanceDetails: 'Google Cloud hosting, 90+ PageSpeed score',
    easeOfUse: 4.5,
    features: 4.8,
    featuresList: ['AI Builder', 'AI Recreator', 'Automated Hosting', 'PageSpeed Booster', 'Ecommerce'],
    support: 4.6,
    supportDetails: 'Live chat, Facebook community',
    useCases: ['Entrepreneur', 'Software Developer', 'Marketing Professional'],
    integrations: ['WordPress Plugins', 'WooCommerce']
  },
  {
    id: 56,
    name: 'Framer',
    category: 'Website Builder',
    icon: '🎨',
    description: 'Design-focused builder where you can design and publish with AI. Great for high-fidelity visuals.',
    website: 'https://www.framer.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free site plan, Mini starts ~$5/mo',
    rating: 4.8,
    reviewCount: 1500,
    ethical: 4.5,
    ethicalDetails: 'Good privacy controls',
    performance: 4.9,
    performanceDetails: 'Fast global hosting, optimized for visuals',
    easeOfUse: 4.2,
    features: 4.7,
    featuresList: ['AI Layouts', 'Figma Import', 'Interactive Components', 'CMS', 'Localization'],
    support: 4.5,
    supportDetails: 'Community Discord, tutorials',
    useCases: ['Graphic Designer', 'Content Creator', 'Marketing Professional'],
    integrations: ['Figma', 'Typeform', 'HubSpot']
  },
  {
    id: 57,
    name: 'Durable',
    category: 'Website Builder',
    icon: '⚡',
    description: 'Generates a fully designed website with copy, images, and a contact form in under 30 seconds.',
    website: 'https://durable.co',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Starter at $12/mo',
    rating: 4.5,
    reviewCount: 1800,
    ethical: 4.3,
    ethicalDetails: 'Standard policies',
    performance: 4.7,
    performanceDetails: 'Fast generation, reliable hosting',
    easeOfUse: 5.0,
    features: 4.4,
    featuresList: ['Instant Generation', 'AI CRM', 'Invoicing', 'AI Blog Builder', 'Analytics'],
    support: 4.6,
    supportDetails: 'Email access support',
    useCases: ['Entrepreneur', 'Marketing Professional', 'Content Creator'],
    integrations: ['Zapier', 'Google Analytics']
  },
  {
    id: 58,
    name: 'Relume',
    category: 'Website Builder',
    icon: '🏗️',
    description: 'AI-powered wireframing and sitemap tool. Exports to Figma and Webflow.',
    website: 'https://www.relume.io',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free plan active, Pro starts $32/mo',
    rating: 4.8,
    reviewCount: 950,
    ethical: 4.5,
    ethicalDetails: 'Respects design IP',
    performance: 4.8,
    performanceDetails: 'Fast export logic',
    easeOfUse: 4.6,
    features: 4.8,
    featuresList: ['AI Sitemap', 'AI Wireframes', 'Figma Export', 'Webflow Export', 'Component Library'],
    support: 4.7,
    supportDetails: 'Slack Community, University',
    useCases: ['Graphic Designer', 'Software Developer', 'Marketing Professional'],
    integrations: ['Figma', 'Webflow']
  },
  {
    id: 59,
    name: 'Higgsfield',
    category: 'Video Generation',
    additionalCategories: ['Image Generation'],
    icon: '🎬',
    description: 'Generative video platform for creators. Create cinematic, controllable videos from text or images. Known for its "Diffuse" mobile app.',
    website: 'https://higgsfield.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free credits available, Paid tiers for more',
    rating: 4.6,
    reviewCount: 850,
    ethical: 4.4,
    ethicalDetails: 'Focus on creator control',
    performance: 4.8,
    performanceDetails: 'High quality localized motion',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Text-to-Video', 'Image-to-Video', 'Cinematic Camera Control', 'Mobile App (Diffuse)', 'Character Animation'],
    support: 4.5,
    supportDetails: 'Community Discord',
    useCases: ['Content Creator', 'Video Editor', 'Marketing Professional'],
    integrations: ['Mobile', 'Discord']
  },
  {
    id: 60,
    name: 'Meshy',
    category: '3D Generation',
    additionalCategories: ['Image Generation', '2D to 3D'],
    icon: '🧊',
    description: 'Fast 3D model generator. Create 3D assets from text or images. Features AI texturing and smart remeshing.',
    website: 'https://www.meshy.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free credits/mo, Pro from $16/mo',
    rating: 4.8,
    reviewCount: 1200,
    ethical: 4.5,
    ethicalDetails: 'Respects copyright, clear terms',
    performance: 4.7,
    performanceDetails: 'Production-ready meshes',
    easeOfUse: 4.6,
    features: 4.8,
    featuresList: ['Text-to-3D', 'Image-to-3D', 'AI Texturing', 'Remeshing', 'GLB/FBX Export'],
    support: 4.5,
    supportDetails: 'Discord & Email',
    useCases: ['3D Artist', 'Game Developer', 'Designer'],
    integrations: ['Unity', 'Unreal', 'Blender']
  },
  {
    id: 61,
    name: 'Spline AI',
    category: '3D Generation',
    additionalCategories: ['Design'],
    icon: '🔮',
    description: 'Web-based 3D design tool with AI integration. Generate scenes, textures, and objects via prompts.',
    website: 'https://spline.design/ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free basic, Pro from $24/mo',
    rating: 4.7,
    reviewCount: 3500,
    ethical: 4.4,
    ethicalDetails: 'Standard creative tool policies',
    performance: 4.6,
    performanceDetails: 'Real-time web interactive',
    easeOfUse: 4.5,
    features: 4.7,
    featuresList: ['Text-to-3D', 'Style Transfer', 'Interactive Web Export', 'Collaboration', 'Physics'],
    support: 4.6,
    supportDetails: 'Community, Docs, Tutorials',
    useCases: ['3D Artist', 'Designer', 'Web Developer'],
    integrations: ['React', 'Webflow', 'Next.js']
  },
  {
    id: 62,
    name: 'Luma Genie',
    category: '3D Generation',
    additionalCategories: ['Video Generation'],
    icon: '🧞',
    description: 'High-quality text-to-3D generation research preview by Luma AI. Known for fast and coherent outputs.',
    website: 'https://lumalabs.ai/genie',
    price: 'Free',
    priceValue: 1,
    pricingDetails: 'Currently free research preview',
    rating: 4.5,
    reviewCount: 950,
    ethical: 4.3,
    ethicalDetails: 'Research-focused',
    performance: 4.6,
    performanceDetails: 'Fast generation (seconds)',
    easeOfUse: 4.8,
    features: 4.4,
    featuresList: ['Text-to-3D', 'Discord Bot', 'Web Interface', 'GLB Export'],
    support: 4.2,
    supportDetails: 'Discord Community',
    useCases: ['3D Artist', 'Game Developer', 'Hobbyist'],
    integrations: ['Discord', 'Web']
  },
  {
    id: 63,
    name: 'Tripo AI',
    category: '3D Generation',
    additionalCategories: ['2D to 3D'],
    icon: '⚡',
    description: 'Extremely fast API and web tool for generated 3D models. Great for prototyping and high-volume asset creation.',
    website: 'https://www.tripo3d.ai',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free web usage, API usage paid',
    rating: 4.4,
    reviewCount: 600,
    ethical: 4.2,
    ethicalDetails: 'Standard commercial rights',
    performance: 4.8,
    performanceDetails: 'Sub-minute generation',
    easeOfUse: 4.7,
    features: 4.3,
    featuresList: ['Text-to-3D', 'Image-to-3D', 'Draft Quality (Fast)', 'API Access'],
    support: 4.3,
    supportDetails: 'Discord, Email',
    useCases: ['3D Artist', 'Game Developer', 'Developer'],
    integrations: ['API']
  },
  {
    id: 64,
    name: 'Masterpiece X',
    category: '3D Generation',
    additionalCategories: ['2D to 3D'],
    icon: '🧗',
    description: 'Generate complete 3D assets including mesh, textures, and animations. Focuses on game-ready characters/creatures.',
    website: 'https://www.masterpiecex.com',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free credits, subscription plans',
    rating: 4.5,
    reviewCount: 450,
    ethical: 4.4,
    ethicalDetails: 'Creator-focused',
    performance: 4.5,
    performanceDetails: 'Includes animation data',
    easeOfUse: 4.6,
    features: 4.7,
    featuresList: ['Text-to-3D', 'Auto-Rigging', 'Animation', 'Game Ready Export'],
    support: 4.4,
    supportDetails: 'Help Center',
    useCases: ['3D Artist', 'Game Developer', 'Animator'],
    integrations: ['Unity', 'Unreal', 'Blender']
  },
  {
    id: 65,
    name: 'Rodin (Hyper)',
    category: '3D Generation',
    additionalCategories: ['2D to 3D'],
    icon: '🗿',
    description: 'Advanced generative 3D model by Hyperhuman. Focuses on realistic topology and geometry suitable for pro workflows.',
    website: 'https://hyperhuman.deemos.com/rodin',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Paid credits/subscription',
    rating: 4.6,
    reviewCount: 300,
    ethical: 4.5,
    ethicalDetails: 'Professional licensing',
    performance: 4.9,
    performanceDetails: 'High-fidelity geometry',
    easeOfUse: 4.2,
    features: 4.6,
    featuresList: ['Text-to-3D', 'Image-to-3D', 'Quad Mesh Topology', 'PBR Materials'],
    support: 4.5,
    supportDetails: 'Professional Support',
    useCases: ['3D Artist', 'Game Developer', 'VFX Artist'],
    integrations: ['3D Software suites']
  },
  {
    id: 66,
    name: 'Kaedim',
    category: '2D to 3D',
    additionalCategories: ['3D Generation'],
    icon: '🔷',
    description: 'Production-ready AI that turns 2D images into high-fidelity 3D models. Capable of hard surface and organic shapes.',
    website: 'https://www.kaedim3d.com',
    price: 'Paid',
    priceValue: 4,
    pricingDetails: 'Startup/Studio plans',
    rating: 4.7,
    reviewCount: 400,
    ethical: 4.5,
    ethicalDetails: 'Professional data handling',
    performance: 4.9,
    performanceDetails: 'Production-ready topology',
    easeOfUse: 4.4,
    features: 4.8,
    featuresList: ['Image-to-3D', 'UV Unwrapping', 'Automatic Texturing', 'Quad Topology'],
    support: 4.8,
    supportDetails: 'Dedicated Support',
    useCases: ['3D Artist', 'Game Developer', 'VFX Artist'],
    integrations: ['Blender', 'Unity', 'Unreal']
  },
  {
    id: 67,
    name: 'Alpha3D',
    category: '2D to 3D',
    additionalCategories: ['3D Generation'],
    icon: '🅰️',
    description: 'Generative AI for 3D game assets. Text and Image to 3D focused on AR/VR and gaming pipelines.',
    website: 'https://www.alpha3d.io',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free credits, subscription',
    rating: 4.5,
    reviewCount: 350,
    ethical: 4.3,
    ethicalDetails: 'Assets usage rights',
    performance: 4.6,
    performanceDetails: 'Optimized for Real-time',
    easeOfUse: 4.7,
    features: 4.5,
    featuresList: ['Image-to-3D', 'Text-to-3D', 'GLB download', 'Game Ready'],
    support: 4.4,
    supportDetails: 'Community',
    useCases: ['Game Developer', '3D Artist', 'AR/VR Dev'],
    integrations: ['Unity', 'Snap AR', 'NVIDIA Omniverse']
  },
  {
    id: 68,
    name: 'Grok',
    category: 'Writing & Communication',
    additionalCategories: ['Image Generation'],
    icon: '𝕏',
    description: 'xAI\'s clever and rebellious conversational assistant. Features real-time knowledge from X and advanced image generation via Flux.',
    website: 'https://grok.com/',
    price: 'Paid',
    priceValue: 3,
    pricingDetails: 'Requires X Premium or Premium+',
    rating: 4.6,
    reviewCount: 1200,
    ethical: 3.9,
    ethicalDetails: 'Privacy policies linked to X/Twitter data usage',
    performance: 4.8,
    performanceDetails: 'Fast real-time knowledge and high-quality image gen',
    easeOfUse: 4.7,
    features: 4.6,
    featuresList: ['Real-time search', 'Image Generation', 'Creative Writing', 'Rebellious mode', 'X integration'],
    support: 4.2,
    supportDetails: 'Online documentation and community',
    useCases: ['Content Creator', 'Marketing Professional', 'Entrepreneur', 'Researcher'],
    integrations: ['X (formerly Twitter)', 'Web interface']
  },
  {
    id: 69,
    name: 'GeminiGen',
    category: 'Image Generation',
    additionalCategories: ['Design'],
    icon: '✨',
    description: 'Advanced AI image generation platform powered by Google\'s Gemini models. Focused on high-fidelity, high-speed visual creation.',
    website: 'https://geminigen.ai/',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free tier and Pro plans',
    rating: 4.5,
    reviewCount: 450,
    ethical: 4.3,
    ethicalDetails: 'Google standards for AI safety and content',
    performance: 4.7,
    performanceDetails: 'Rapid generation, high cinematic results',
    easeOfUse: 4.8,
    features: 4.5,
    featuresList: ['Text-to-Image', 'Image-to-Image', 'Cinematic Styles', 'Batch generation'],
    support: 4.3,
    supportDetails: 'Help center and community',
    useCases: ['Graphic Designer', 'Content Creator', 'Marketing Professional'],
    integrations: ['Web interface']
  },
  {
    id: 70,
    name: 'MindVideo',
    category: 'Video Generation',
    additionalCategories: ['Video & Audio Editing'],
    icon: '🧠',
    description: 'AI-driven video generation tool focusing on translating complex thoughts and prompts into fluid cinematics and animations.',
    website: 'https://www.mindvideo.ai/',
    price: 'Freemium',
    priceValue: 2,
    pricingDetails: 'Free trial and paid subscriptions',
    rating: 4.4,
    reviewCount: 200,
    ethical: 4.1,
    ethicalDetails: 'Standard AI content moderation policies',
    performance: 4.5,
    performanceDetails: 'Smooth transitions and high-res output',
    easeOfUse: 4.5,
    features: 4.6,
    featuresList: ['Text-to-Video', 'Prompt expansion', 'Cinematic motions', 'Style transfer'],
    support: 4.0,
    supportDetails: 'Email support and documentation',
    useCases: ['Video Editor', 'Content Creator', 'Filmmaker'],
    integrations: ['Web interface']
  }
];

// ============================================
// Priority Presets
// ============================================
const priorityPresets = {
  balanced: { price: 3, rating: 3, ethical: 3, performance: 3, easeOfUse: 3, features: 3, support: 3 },
  budgetFriendly: { price: 5, rating: 2, ethical: 2, performance: 2, easeOfUse: 3, features: 2, support: 1 },
  topRated: { price: 1, rating: 5, ethical: 3, performance: 4, easeOfUse: 3, features: 4, support: 3 },
  ethical: { price: 2, rating: 3, ethical: 5, performance: 3, easeOfUse: 2, features: 3, support: 2 },
  powerUser: { price: 2, rating: 3, ethical: 2, performance: 5, easeOfUse: 2, features: 5, support: 3 },
  beginner: { price: 3, rating: 3, ethical: 2, performance: 2, easeOfUse: 5, features: 3, support: 4 }
};

// ============================================
// Career-Specific Category Mappings
// ============================================
const careerCategories = {
  'Content Creator': ['Writing & Communication', 'Image Generation', 'Video Generation', 'Video & Audio Editing', 'Voice & Audio', 'Design', 'Website Builder'],
  'Video Editor': ['Video Generation', 'Video & Audio Editing', 'Voice & Audio'],
  'Graphic Designer': ['Image Generation', 'Design', 'Website Builder'],
  'Software Developer': ['Development', 'Writing & Communication', 'Productivity', 'Website Builder', 'Video & Audio Editing'],
  'Marketing Professional': ['Writing & Communication', 'Image Generation', 'Video Generation', 'Design', 'Website Builder'],
  'Writer': ['Writing & Communication', 'Research', 'Productivity', 'Website Builder'],
  'Student': ['Writing & Communication', 'Research', 'Productivity', 'Website Builder', 'Design'],
  'Researcher': ['Research', 'Writing & Communication', 'Productivity'],
  'Entrepreneur': ['Writing & Communication', 'Design', 'Productivity', 'Video Generation', 'Website Builder', 'Development'],
  '3D Artist': ['3D Generation', '2D to 3D', 'Image Generation', 'Design', 'Video Generation']
};

// Video Editor specific subcategories
const videoEditorSubcategories = {
  'Shorts': ['Pika Labs', 'Runway', 'Descript'],
  'Full Feature': ['Runway', 'Descript', 'Synthesia'],
  'Social Media': ['Pika Labs', 'Runway', 'Canva AI', 'Synthesia']
};

// ============================================
// State Management
// ============================================
const state = {
  priorities: { ...priorityPresets.balanced },
  selectedCareer: null,
  selectedPreset: 'balanced',
  filters: {
    category: 'all',
    subcategory: 'all',
    priceRange: 'all',
    search: ''
  },
  comparisonItems: [],
  batterUpItem: null,
  sortBy: 'score'
};

// ============================================
// Progressive UI Control Functions
// ============================================

function showStep(stepNumber) {
  // Hide all steps
  for (let i = 1; i <= 3; i++) {
    const step = document.getElementById(`step-${i}`);
    if (step) {
      if (i === stepNumber) {
        step.classList.remove('step-hidden');
      } else if (i < stepNumber) {
        // Keep completed steps visible but collapsed
        step.classList.add('step-hidden');
      } else {
        step.classList.add('step-hidden');
      }
    }
  }

  progressiveState.currentStep = stepNumber;
}

function editStep(stepNumber) {
  progressiveState.currentStep = stepNumber;
  progressiveState.isComplete = false;

  // Hide results section
  document.getElementById('results-section').classList.add('step-hidden');

  // Show the step being edited
  showStep(stepNumber);

  // Reset selections after this step
  if (stepNumber === 1) {
    progressiveState.selectedCareer = null;
    progressiveState.selectedCategory = null;
    progressiveState.selectedPriority = null;
    document.getElementById('career-select').value = '';
  } else if (stepNumber === 2) {
    progressiveState.selectedCategory = null;
    progressiveState.selectedPriority = null;
    document.getElementById('category-select').value = '';
  } else if (stepNumber === 3) {
    progressiveState.selectedPriority = null;
    document.getElementById('priority-select').value = '';
  }
}


function goBack(currentStep) {
  if (currentStep === 2) {
    document.getElementById('step-2').classList.add('step-hidden');
    document.getElementById('step-1').classList.remove('step-hidden');
  } else if (currentStep === 3) {
    document.getElementById('step-3').classList.add('step-hidden');
    document.getElementById('step-2').classList.remove('step-hidden');
  } else if (currentStep === 4) {
    document.getElementById('results-section').classList.add('step-hidden');
    document.getElementById('step-3').classList.remove('step-hidden');

    // Reset completeness if going back from results
    progressiveState.isComplete = false;
  }
}

function resetAll() {
  progressiveState.currentStep = 1;
  progressiveState.selectedCareer = null;
  progressiveState.selectedCategory = null;
  progressiveState.selectedPriority = null;
  progressiveState.isComplete = false;

  document.getElementById('career-select').value = '';
  document.getElementById('category-select').value = '';
  document.getElementById('priority-select').value = '';

  document.getElementById('results-section').classList.add('step-hidden');
  showStep(1);
}

function handleCareerSelection(career) {
  progressiveState.selectedCareer = career;
  state.selectedCareer = career;

  // Update completion badge
  document.getElementById('career-complete-text').textContent = `I am a ${career}`;

  // Update category options based on career
  updateCategoryOptions(career);

  // Show step 2
  showStep(2);
}

function updateCategoryOptions(career) {
  const categorySelect = document.getElementById('category-select');
  const categories = careerCategories[career] || [
    'Writing & Communication',
    'Image Generation',
    'Video Generation',
    'Video & Audio Editing',
    'Development',
    'Design',
    'Productivity',
    'Research',
    'Voice & Audio'
  ];

  categorySelect.innerHTML = '<option value="">Select a category</option>' +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

function handleCategorySelection(category) {
  progressiveState.selectedCategory = category;
  state.filters.category = category;

  // Update completion badge
  document.getElementById('category-complete-text').textContent = `looking for ${category}`;

  // Show step 3
  showStep(3);
}

function handlePrioritySelection(priority) {
  progressiveState.selectedPriority = priority;
  state.selectedPreset = priority;

  // Apply priority preset
  applyPriorityPreset(priority);

  // Update summary
  updateSelectionSummary();

  // Show results section
  progressiveState.isComplete = true;
  document.getElementById('results-section').classList.remove('step-hidden');

  // Hide step 3
  document.getElementById('step-3').classList.add('step-hidden');

  // Render products
  renderProducts();
}

function updateSelectionSummary() {
  const priorityNames = {
    balanced: 'Balanced',
    budgetFriendly: 'Budget-Friendly',
    topRated: 'Top-Rated',
    ethical: 'Ethical & Privacy',
    powerUser: 'Power User',
    beginner: 'Beginner-Friendly'
  };

  document.getElementById('summary-career').textContent = progressiveState.selectedCareer || '';
  document.getElementById('summary-category').textContent = progressiveState.selectedCategory || '';
  document.getElementById('summary-priority').textContent = priorityNames[progressiveState.selectedPriority] || '';
}

// Newsletter handling
async function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput.value;
  const form = document.getElementById('newsletter-form');
  const btn = form.querySelector('button');
  const originalText = btn.textContent;

  // Visual feedback
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/rahsaanthepoet@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        _subject: "New AI Tools Newsletter Subscriber!",
        _captcha: "false"
      })
    });

    if (response.ok) {
      // Store in localStorage to prevent repeat prompts
      localStorage.setItem('ai-finder-newsletter', email);

      // Show success message
      document.getElementById('newsletter-success').classList.add('show');
      form.style.display = 'none';

      console.log('Newsletter signup sent for:', email);
    } else {
      console.error('FormSubmit error');
      alert('Something went wrong. Please try again.');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert('Network error. Please try again.');
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// Export comparison function
function exportComparison() {
  // Simple print-to-PDF solution
  window.print();

  // For image export, you would use html2canvas:
  // html2canvas(document.querySelector('.comparison-grid')).then(canvas => {
  //   const link = document.createElement('a');
  //   link.download = 'ai-tools-comparison.png';
  //   link.href = canvas.toDataURL();
  //   link.click();
  // });
}

// Toggle favorite
function toggleFavorite(toolId) {
  favorites.toggle(toolId);
  renderProducts();
}

// ============================================
// Scoring Algorithm
// ============================================
function calculateScore(tool) {
  const weights = state.priorities;
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);

  if (totalWeight === 0) return 0;

  const priceScore = (4 - tool.priceValue) / 3;

  const score = (
    (priceScore * weights.price) +
    (tool.rating / 5 * weights.rating) +
    (tool.ethical / 5 * weights.ethical) +
    (tool.performance / 5 * weights.performance) +
    (tool.easeOfUse / 5 * weights.easeOfUse) +
    (tool.features / 5 * weights.features) +
    (tool.support / 5 * weights.support)
  ) / totalWeight;

  return score;
}

// ============================================
// Value Calculation Functions
// ============================================
function getCostPerUse(tool) {
  if (!tool.creditSystem) return null;

  if (tool.category.includes('Image')) {
    return tool.creditSystem.costPerImage;
  } else if (tool.category.includes('Video')) {
    return tool.creditSystem.costPerVideo;
  }
  return null;
}

function getUsesPerDollar(tool) {
  if (!tool.creditSystem) return null;

  if (tool.category.includes('Image')) {
    return tool.creditSystem.imagesPerDollar;
  } else if (tool.category.includes('Video')) {
    return tool.creditSystem.videosPerDollar;
  }
  return null;
}

function calculateValueScore(tool) {
  const costPerUse = getCostPerUse(tool);

  if (costPerUse === null || costPerUse === undefined) return null;
  if (costPerUse === 0) return 5.0; // Free tools get max value score
  if (costPerUse === Infinity) return 0;

  // Lower cost = higher value score
  // Scale: $0.01 = 5.0, $0.50 = 1.0
  const valueScore = Math.max(0, Math.min(5, 5 - (costPerUse * 8)));
  return valueScore;
}

function getValueBadge(tool) {
  const valueScore = calculateValueScore(tool);
  if (valueScore === null) return null;

  if (valueScore >= 4.5) return { text: '🏆 Best Value', class: 'badge-best-value' };
  if (valueScore >= 3.5) return { text: '💎 Great Value', class: 'badge-great-value' };
  if (valueScore >= 2.5) return { text: '👍 Good Value', class: 'badge-good-value' };
  return null;
}

function formatCostPerUse(tool) {
  const cost = getCostPerUse(tool);
  if (cost === null || cost === undefined) return null;
  if (cost === 0) return 'Free';
  if (cost === Infinity) return 'N/A';

  const unit = tool.category.includes('Image') ? 'image' :
    tool.category.includes('Video') ? (tool.creditSystem.unit === 'video minutes' ? 'min' : 'video') :
      'use';

  return `$${cost.toFixed(cost < 0.01 ? 3 : 2)}/${unit}`;
}

function formatUsesPerDollar(tool) {
  const uses = getUsesPerDollar(tool);
  if (uses === null || uses === undefined) return null;
  if (uses === Infinity) return 'Unlimited';
  if (uses === 0) return 'N/A';

  const unit = tool.category.includes('Image') ? 'images' :
    tool.category.includes('Video') ? (tool.creditSystem.unit === 'video minutes' ? 'min' : 'videos') :
      'uses';

  return `${Math.round(uses)} ${unit}/$`;
}

// ============================================
// Filtering Logic
// ============================================
function filterTools() {
  let filtered = [...aiTools];

  if (state.selectedCareer) {
    filtered = filtered.filter(tool =>
      tool.useCases.includes(state.selectedCareer)
    );
  }

  if (state.filters.category !== 'all') {
    filtered = filtered.filter(tool =>
      tool.category === state.filters.category ||
      (tool.additionalCategories && tool.additionalCategories.includes(state.filters.category))
    );
  }

  if (state.filters.priceRange !== 'all') {
    const priceMap = { 'free': 1, 'freemium': 2, 'paid': 3 };
    filtered = filtered.filter(tool =>
      tool.priceValue === priceMap[state.filters.priceRange]
    );
  }

  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase();
    filtered = filtered.filter(tool =>
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.category.toLowerCase().includes(searchLower) ||
      tool.featuresList.some(f => f.toLowerCase().includes(searchLower))
    );
  }

  // Free tier filter
  const freeTierToggle = document.getElementById('free-tier-toggle');
  if (freeTierToggle && freeTierToggle.checked) {
    filtered = filtered.filter(tool => tool.hasFreeTier || tool.price === 'Free');
  }

  // Favorites filter
  const favoritesToggle = document.getElementById('favorites-toggle');
  if (favoritesToggle && favoritesToggle.checked) {
    filtered = filtered.filter(tool => favorites.has(tool.id));
  }

  return filtered;
}

// ============================================
// Sorting Logic
// ============================================
function sortTools(tools) {
  const sorted = [...tools];

  switch (state.sortBy) {
    case 'score':
      sorted.sort((a, b) => calculateScore(b) - calculateScore(a));
      break;
    case 'value':
      sorted.sort((a, b) => {
        const valueA = calculateValueScore(a) || -1;
        const valueB = calculateValueScore(b) || -1;
        return valueB - valueA;
      });
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-low':
      sorted.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return sorted;
}

// ============================================
// Dynamic Category Options
// ============================================
function getCategoryOptions() {
  if (!state.selectedCareer || !careerCategories[state.selectedCareer]) {
    return ['all', 'Writing & Communication', 'Image Generation', 'Video Generation', 'Video & Audio Editing', 'Development', 'Design', 'Productivity', 'Research', 'Voice & Audio', 'Website Builder'];
  }

  return ['all', ...careerCategories[state.selectedCareer]];
}

// ============================================
// Render Functions
// ============================================
function renderPrioritySliders() {
  const container = document.getElementById('priority-sliders');
  const priorities = [
    { key: 'price', label: 'Price', icon: '💰' },
    { key: 'rating', label: 'Rating', icon: '⭐' },
    { key: 'ethical', label: 'Ethical', icon: '🌱' },
    { key: 'performance', label: 'Performance', icon: '🚀' },
    { key: 'easeOfUse', label: 'Ease of Use', icon: '🎨' },
    { key: 'features', label: 'Features', icon: '🔧' },
    { key: 'support', label: 'Support', icon: '🏢' }
  ];

  container.innerHTML = priorities.map(p => `
    <div class="priority-item">
      <div class="priority-header">
        <div class="priority-label">
          <span class="priority-icon">${p.icon}</span>
          <span>${p.label}</span>
        </div>
        <span class="priority-value" id="${p.key}-value">${state.priorities[p.key]}/5</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="5" 
        value="${state.priorities[p.key]}" 
        class="priority-slider"
        id="${p.key}-slider"
        data-priority="${p.key}"
      >
    </div>
  `).join('');

  priorities.forEach(p => {
    const slider = document.getElementById(`${p.key}-slider`);
    const valueDisplay = document.getElementById(`${p.key}-value`);

    slider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      state.priorities[p.key] = value;
      state.selectedPreset = 'custom';
      document.getElementById('priority-preset').value = 'custom';
      valueDisplay.textContent = `${value}/5`;
      renderProducts();
    });
  });
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  const countDisplay = document.getElementById('results-count');

  const filtered = filterTools();
  const sorted = sortTools(filtered);

  countDisplay.textContent = `${sorted.length} AI tool${sorted.length !== 1 ? 's' : ''} found`;

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No tools found</h3>
        <p>Try adjusting your filters or priorities</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sorted.map((tool, index) => {
    const score = calculateScore(tool);
    const isInComparison = state.comparisonItems.some(item => item.id === tool.id);
    const isBatterUp = state.batterUpItem && state.batterUpItem.id === tool.id;

    return `
      <div class="product-card ${isInComparison ? 'selected' : ''} ${isBatterUp ? 'batter-up' : ''}" style="animation-delay: ${index * 0.05}s" data-tool-id="${tool.id}">
        <div class="product-header">
          <div class="product-icon">${tool.icon}</div>
          <button class="favorite-btn ${favorites.has(tool.id) ? 'favorite-active' : ''}" onclick="toggleFavorite(${tool.id})" title="Add to favorites">
            ${favorites.has(tool.id) ? '❤️' : '🤍'}
          </button>
        </div>
        
        <h3 class="product-title">${tool.name}</h3>
        <div class="product-category">${tool.category}</div>
        
        <p class="product-description">${tool.description}</p>
        
        <div class="product-score">Match Score: ${(score * 100).toFixed(0)}%</div>
        
        ${tool.creditSystem ? `
          <div class="product-value-metrics">
            <div class="value-metric-header">💎 Value Metrics</div>
            ${formatCostPerUse(tool) ? `<div class="value-metric">Cost: ${formatCostPerUse(tool)}</div>` : ''}
            ${formatUsesPerDollar(tool) ? `<div class="value-metric">Volume: ${formatUsesPerDollar(tool)}</div>` : ''}
          </div>
        ` : ''}
        
        <div class="product-badges">
          ${tool.badges?.isNew ? '<span class="badge badge-new">🆕 NEW</span>' : ''}
          ${tool.badges?.isTrending ? '<span class="badge badge-trending">🔥 TRENDING</span>' : ''}
          ${tool.badges?.isUpdated ? '<span class="badge badge-updated">⚡ UPDATED</span>' : ''}
          ${tool.hasFreeTier ? '<span class="badge badge-free-tier">🆓 Free Tier</span>' : ''}
          ${(() => {
        const valueBadge = getValueBadge(tool);
        return valueBadge ? `<span class="badge ${valueBadge.class}">${valueBadge.text}</span>` : '';
      })()}
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary" onclick="viewDetails(${tool.id})">Visit Website</button>
          <button class="btn btn-secondary" onclick="toggleComparison(${tool.id})">
            ${isInComparison ? 'Remove' : isBatterUp ? 'Batter Up ⚾' : 'Compare'}
          </button>
        </div>
        
        ${tool.lastUpdated ? `<div class="product-updated">✓ Updated ${tool.lastUpdated}</div>` : ''}
      </div>
    `;
  }).join('');
}

function renderComparisonBar() {
  const bar = document.getElementById('comparison-bar');
  // Disable comparison bar - using Batter Up modal instead
  if (bar) bar.style.display = 'none';
  return;
}


function renderComparisonModal() {
  const modal = document.getElementById('comparison-modal');
  const grid = document.getElementById('comparison-grid');

  if (state.comparisonItems.length === 0) {
    modal.classList.remove('active');
    return;
  }

  // Combine items: Champions + Challenger (Batter Up)
  let itemsToRender = [...state.comparisonItems];
  if (state.batterUpItem) {
    itemsToRender.push(state.batterUpItem);
  }

  grid.innerHTML = itemsToRender.map((tool, index) => {
    const isBatterUp = state.batterUpItem && tool.id === state.batterUpItem.id;
    const cardClass = isBatterUp ? 'comparison-card challenger-card' : 'comparison-card';
    const statusLabel = isBatterUp ? '<div class="challenger-badge">⚾ Challenger</div>' : '<div class="champion-badge">👑 Champ</div>';

    return `
    <div class="${cardClass}">
      ${statusLabel}
      <div class="comparison-card-header">
        <div class="product-icon-small">${tool.icon}</div>
        <h4>${tool.name}</h4>
      </div>
      
      <div class="comparison-metrics-lean">
        <div class="lean-metric">
          <span class="label">Match</span>
          <span class="value">${(calculateScore(tool) * 100).toFixed(0)}%</span>
        </div>
        
        <div class="lean-metric">
          <span class="label">Price</span>
          <span class="value">${tool.price}</span>
        </div>
        
        <div class="lean-metric">
          <span class="label">Rating</span>
          <span class="value">${tool.rating}/5 ⭐</span>
        </div>

        <div class="lean-metric-description">
           ${tool.description.substring(0, 60)}...
        </div>

        <!-- Action Buttons -->
        ${isBatterUp
        ? `<button disabled class="btn btn-secondary btn-full btn-sm">Waiting...</button>`
        : `<button onclick="toggleComparison(${tool.id})" class="btn btn-warning btn-full btn-sm">Release ❌</button>`
      }
        
        <a href="${tool.website}" target="_blank" rel="noopener noreferrer" class="btn btn-text btn-sm" style="display: block; text-align: center; margin-top: 0.5rem;">
          Visit ↗
        </a>
      </div>
    </div>
  `}).join('');
}

function updateCategoryFilter() {
  const categoryFilter = document.getElementById('category-filter');
  const options = getCategoryOptions();

  categoryFilter.innerHTML = options.map(cat =>
    `<option value="${cat}">${cat === 'all' ? 'All Categories' : cat}</option>`
  ).join('');

  state.filters.category = 'all';
  renderProducts();
}

// ============================================
// Event Handlers
// ============================================
function toggleComparison(toolId) {
  const tool = aiTools.find(t => t.id === toolId);
  const index = state.comparisonItems.findIndex(t => t.id === toolId);

  if (index === -1) {
    // Adding to comparison
    if (state.comparisonItems.length < 2) {
      state.comparisonItems.push(tool);
      // Removed auto-open on 2nd selection as per user request
    } else {
      // 3rd item (Batter Up) - Auto-trigger modal tournament
      state.batterUpItem = tool;
      openComparisonModal();
    }
  } else {
    // Removing an item
    if (state.batterUpItem) {
      // If there's a batter up, and we remove a champion, challenger takes the spot
      state.comparisonItems.splice(index, 1);
      state.comparisonItems.push(state.batterUpItem);
      state.batterUpItem = null;
    } else {
      // If NO batter up and we are removing items, it triggers a FULL reset
      resetComparison();
      return;
    }
  }

  renderProducts();
  if (document.getElementById('comparison-modal').classList.contains('active')) {
    renderComparisonModal();
  }
}

function resetComparison() {
  state.comparisonItems = [];
  state.batterUpItem = null;
  closeComparisonModal();
  renderProducts();
  // Ensure any 'selected' UI states are cleared
}


function removeBatterUp() {
  state.batterUpItem = null;
  renderProducts();
  renderComparisonBar();
}

function swapWithBatterUp(comparisonIndex) {
  if (!state.batterUpItem || comparisonIndex >= state.comparisonItems.length) return;

  const temp = state.comparisonItems[comparisonIndex];
  state.comparisonItems[comparisonIndex] = state.batterUpItem;
  state.batterUpItem = temp;

  renderProducts();
  renderComparisonBar();
}

function viewDetails(toolId) {
  const tool = aiTools.find(t => t.id === toolId);
  if (tool) {
    // Affiliate Link Logic: Prioritize money link, fallback to website
    const targetUrl = tool.affiliateLink || tool.website;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

function openComparisonModal() {
  const modal = document.getElementById('comparison-modal');
  modal.classList.add('active');
  renderComparisonModal();
}

function closeComparisonModal() {
  const modal = document.getElementById('comparison-modal');
  modal.classList.remove('active');
}

function applyPriorityPreset(presetName) {
  if (priorityPresets[presetName]) {
    state.priorities = { ...priorityPresets[presetName] };
    state.selectedPreset = presetName;
    // Don't call renderPrioritySliders - we don't have sliders in V2
    // renderProducts will be called by handlePrioritySelection
  }
}

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize - don't render products yet, wait for user selections
  renderComparisonBar();

  // Check if newsletter already subscribed
  if (localStorage.getItem('ai-finder-newsletter')) {
    document.getElementById('newsletter-success').classList.add('show');
    document.getElementById('newsletter-form').style.display = 'none';
  }

  // Progressive UI - Step 1: Career Selection
  document.getElementById('career-select').addEventListener('change', (e) => {
    if (e.target.value) {
      handleCareerSelection(e.target.value);
    }
  });

  // Progressive UI - Step 2: Category Selection
  document.getElementById('category-select').addEventListener('change', (e) => {
    if (e.target.value) {
      handleCategorySelection(e.target.value);
    }
  });

  // Progressive UI - Step 3: Priority Selection
  document.getElementById('priority-select').addEventListener('change', (e) => {
    if (e.target.value) {
      handlePrioritySelection(e.target.value);
    }
  });

  // Free tier toggle
  const freeTierToggle = document.getElementById('free-tier-toggle');
  if (freeTierToggle) {
    freeTierToggle.addEventListener('change', () => {
      renderProducts();
    });
  }

  // Favorites toggle
  const favoritesToggle = document.getElementById('favorites-toggle');
  if (favoritesToggle) {
    favoritesToggle.addEventListener('change', () => {
      renderProducts();
    });
  }

  // Search
  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.filters.search = e.target.value.trim();

    if (state.filters.search.length > 0) {
      // Immediately show results
      document.getElementById('results-section').classList.remove('step-hidden');
      progressiveState.isComplete = true;
    }

    renderProducts();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Newsletter signup
  document.getElementById('newsletter-form').addEventListener('submit', handleNewsletterSubmit);

  // Comparison modal controls
  document.getElementById('compare-btn').addEventListener('click', openComparisonModal);
  document.getElementById('close-modal').addEventListener('click', closeComparisonModal);

  document.getElementById('comparison-modal').addEventListener('click', (e) => {
    if (e.target.id === 'comparison-modal') {
      closeComparisonModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeComparisonModal();
    }
  });

  // Mobile Modal Adjustment Logic
  const modalOffsetSlider = document.getElementById('modal-offset-slider');
  if (modalOffsetSlider) {
    // Load saved offset or default to 0
    const savedOffset = localStorage.getItem('ai-finder-modal-offset') || '0';
    document.documentElement.style.setProperty('--modal-vertical-offset', savedOffset + 'vh');
    modalOffsetSlider.value = savedOffset;

    // Listen for changes
    modalOffsetSlider.addEventListener('input', (e) => {
      const offset = e.target.value;
      document.documentElement.style.setProperty('--modal-vertical-offset', offset + 'vh');
      localStorage.setItem('ai-finder-modal-offset', offset);
    });
  }
});

// ============================================
// Email Capture Logic (Save My Stack)
// ============================================

function handleSaveStack() {
  // Check if user has already given email
  const userEmail = localStorage.getItem('ai-finder-newsletter');

  if (userEmail) {
    // If email exists, proceed directly to export
    saveStack(userEmail);
  } else {
    // Show modal to capture email
    const modal = document.getElementById('email-modal');
    modal.classList.add('active');
  }
}

function closeEmailModal() {
  const modal = document.getElementById('email-modal');
  modal.classList.remove('active');
}

function handleEmailSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('stack-email');
  const email = emailInput.value;

  if (email) {
    // Save email to localStorage
    localStorage.setItem('ai-finder-newsletter', email);

    // Close modal
    closeEmailModal();

    // Proceed to save stack
    saveStack(email);
  }
}

function saveStack(email) {
  // Simulate API call / PDF generation
  alert(`Success! 🚀\n\nYour AI Stack has been compiled.\nSending PDF to: ${email}`);

  // In a real app, this would trigger:
  // 1. POST request to backend with tool IDs + Email
  // 2. Email trigger via SendGrid/Mailchimp
  console.log('Stack saved for:', email);
  console.log('Tools:', state.comparisonItems.length > 0 ? state.comparisonItems : 'All favorites');
}
