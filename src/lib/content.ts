/**
 * Every fact on the site comes from motiontheagency.com (scraped September 2026).
 * Copy was tightened where the audit found problems (price-led headlines, duplicated
 * tip text, "What are sizzle reel?"), but no numbers, clients or quotes were invented.
 */

export const site = {
  name: "Motion The Agency",
  url: "https://the-motion-redesign.vercel.app",
  email: "hello@motiontheagency.com",
  address: "42-44 Bishopsgate, London, United Kingdom, EC2N 4AH",
  description:
    "We bring ideas to life with bold motion graphics, 2D/3D animation, UI Design, and Lottie Animations. Helping tech & SaaS brands stand out.",
  showreel: "https://youtu.be/Bmr_1de_pvA",
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/@motiontheagency" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/motion-the-agency/" },
    { label: "Behance", href: "https://www.behance.net/motiontheagency" },
  ],
};

/** Two actions, two labels, everywhere (audit finding 07). No contact page in this preview, so both open email. */
export const cta = {
  sample: {
    label: "Get free sample",
    href: `mailto:${site.email}?subject=${encodeURIComponent("Free sample request")}`,
  },
  call: {
    label: "Book a call",
    href: `mailto:${site.email}?subject=${encodeURIComponent("Book a call")}`,
  },
};

export const announcement = [
  "14-Day Money Back Policy",
  "Fast Turnaround Solution",
  "Global Clients - USA, UK, AUS + more",
];

export const nav = {
  home: { label: "Home", href: "/" },
  services: {
    label: "Services",
    href: "/services",
    items: [
      {
        label: "All services",
        href: "/services",
        description: "Video, animation and design, from explainer videos to brand identity.",
        image: "/img/stories/ui-design-cover.avif",
      },
      {
        label: "Sizzle reels",
        href: "/services/sizzle-reels",
        description: "Showcase your business with fast, easy-to-digest visual highlights.",
        image: "/img/posters/sizzle.webp",
      },
    ],
  },
};

/** Footer mirrors the live structure. Link lists stay empty until the pages exist. */
export const footerColumns: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: "Animation services", links: [] },
  { heading: "Design services", links: [] },
  { heading: "Pricing", links: [] },
  { heading: "For whom", links: [] },
  { heading: "Resources", links: [] },
  { heading: "Company", links: [] },
];

export const stats = [
  { value: 500, suffix: "+", label: "Projects done" },
  { value: 145, suffix: "+", label: "Clients" },
  { value: 35, suffix: "+", label: "Countries" },
];

export const heroLogos = [
  { src: "/img/logos/logo-2.avif", alt: "ClickUp" },
  { src: "/img/logos/logo.avif", alt: "OPEN" },
  { src: "/img/logos/logo-1.avif", alt: "HackerRank" },
  { src: "/img/logos/logo-3.avif", alt: "Apollo.io" },
  { src: "/img/logos/logo-4.avif", alt: "Venly" },
  { src: "/img/logos/logo-5.avif", alt: "vidIQ" },
  { src: "/img/logos-white/logo.svg", alt: "GotPhoto" },
  { src: "/img/logos-white/logo-1.svg", alt: "AI Engineer World's Fair" },
  { src: "/img/logos-white/logo-2.svg", alt: "Agent Lunar" },
  { src: "/img/logos-white/logo-4.svg", alt: "SparkLoop" },
  { src: "/img/logos-white/logo-5.svg", alt: "DoveHero" },
];

export const clutchBadges = [
  { src: "/img/clutch/top-clutch-video-production-company-software-as-a-service-2026-1-.avif", alt: "Clutch Top Video Production Company, Software as a Service, 2026" },
  { src: "/img/clutch/top-clutch-corporate-video-production-company-united-kingdom-2026.avif", alt: "Clutch Top Corporate Video Production Company, United Kingdom, 2026" },
  { src: "/img/clutch/top-clutch-explainer-video-company-united-kingdom-2026-1-.avif", alt: "Clutch Top Explainer Video Company, United Kingdom, 2026" },
  { src: "/img/clutch/top-clutch-2d-animation-company-england-2026.avif", alt: "Clutch Top 2D Animation Company, England, 2026" },
  { src: "/img/clutch/top-clutch-motion-graphics-company-london-2026.avif", alt: "Clutch Top Motion Graphics Company, London, 2026" },
  { src: "/img/clutch/top-clutch-storyboarding-company-united-kingdom-2026.avif", alt: "Clutch Top Storyboarding Company, United Kingdom, 2026" },
];

const cdn = "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34%2F";

export type Service = {
  title: string;
  body: string;
  group: "Video" | "Animation" | "Design";
  poster: string;
  video?: string;
  href?: string;
};

export const services: Service[] = [
  { title: "2D animation", group: "Animation", body: "2D animation videos come in many forms and are ideal for all kinds of digital advertising and social media. They're a fast and efficient way of standing out.", poster: "/img/posters/2d-animation.webp", video: `${cdn}6721160c8e78c6d45c543b01_2D%20Animation-transcode.webm` },
  { title: "3D animation", group: "Animation", body: "3D animations provide realistic depth that allows the viewer to see into spaces, notice the movement of light as well as communicate complex ideas.", poster: "/img/posters/3d-animation.webp", video: `${cdn}67211624e0c72214bafb959e_3D%20Animation-transcode.webm` },
  { title: "Branded motion graphics", group: "Animation", body: "Perfect for videography or video footage. These graphics are perfect for intros, outros, and transitions allowing customers to instantly recognise your content.", poster: "/img/posters/branded-motion.webp", video: `${cdn}67211637aba01614862ec6f9_Branded%20Motion-transcode.webm` },
  { title: "Social media content", group: "Video", body: "We create captivating content that grabs attention, builds connections, and makes your message unforgettable. From viral shorts to compelling brand stories.", poster: "/img/posters/vidiq.webp", video: `${cdn}67508e1fd43379db9e5b3a43_VidIQ-transcode.webm` },
  { title: "Training video", group: "Video", body: "We craft engaging training video productions that capture attention and significantly boost knowledge retention, creating learning experiences that are both impactful and unforgettable for your team.", poster: "/img/posters/flight-health.webp", video: `${cdn}675301cdb1c44be7ea749b28_Flight%20Health-transcode.webm` },
  { title: "Sizzle reels", group: "Video", body: "Ideal to showcase the unique features and benefits of your products, highlighting what sets them apart from the competition and building an emotional connection with potential customers.", poster: "/img/posters/smg.webp", video: `${cdn}67508b77f6b137ab4ebc5b3a_SMG-transcode.webm`, href: "/services/sizzle-reels" },
  { title: "UI animation", group: "Animation", body: "Used by UX/UI and web designers to improve customer experience. UI animations are a personalised way to bring your digital product to life.", poster: "/img/posters/ui-animation.webp", video: `${cdn}6721151fb6c30e4af18a1fb0_UI%20Animation-transcode.webm` },
  { title: "Product video", group: "Video", body: "Product animation is perfect for bringing your product to life and can use a combination of 2D and 3D techniques. They can be used to educate, entertain and convert customers.", poster: "/img/posters/product-animation.webp", video: `${cdn}6721164d1fdd7f2433b50788_Product%20Animation-transcode.webm` },
  { title: "Corporate videos", group: "Video", body: "Specializing in both B2C and B2B markets. Our approach combines creativity with strategy, crafting compelling narratives that elevate your brand and deliver measurable results.", poster: "/img/posters/cisilion.webp", video: `${cdn}6752cb67afac317d3638fd1d_Cisilion-transcode.webm` },
  { title: "Lottie animation", group: "Animation", body: "Say goodbye to bulky GIFs and choppy animations. Lottie delivers crisp, fluid motion while keeping your site fast and responsive.", poster: "/img/posters/ui-anim.webp" },
  { title: "UI design", group: "Design", body: "UI design that goes beyond aesthetics, crafted for usability, engagement, and seamless user experiences.", poster: "/img/stories/ui-design-cover.avif" },
  { title: "Brand design", group: "Design", body: "We create powerful brand identities and robust design systems that elevate your business across all touchpoints. Our expertise in digital asset management ensures your brand assets are always accessible and consistent.", poster: "/img/stories/brand-design-cover.avif" },
];

/** Home shows the six that lead the live homepage. */
export const homeServices = ["UI animation", "2D animation", "3D animation", "Branded motion graphics", "Sizzle reels", "Product video"]
  .map((t) => services.find((s) => s.title === t)!);

export const work = [
  { src: "/img/work/hackerrank---thumbnail.avif", alt: "HackerRank video thumbnail" },
  { src: "/img/work/duro---thumbnail.avif", alt: "Duro Labs video thumbnail" },
  { src: "/img/work/futurefit-thumbnail.avif", alt: "FutureFit video thumbnail" },
  { src: "/img/work/oper---thumbnail.avif", alt: "Oper video thumbnail" },
  { src: "/img/work/bonsai---thumbnail.avif", alt: "Bonsai video thumbnail" },
  { src: "/img/work/qrone---thumbnail.avif", alt: "Qrone video thumbnail" },
  { src: "/img/work/venly---thumbnail.avif", alt: "Venly video thumbnail" },
  { src: "/img/work/sparkloop---thumbnail.avif", alt: "SparkLoop video thumbnail" },
  { src: "/img/work/sisoma---thumbnail.avif", alt: "Sisoma video thumbnail" },
  { src: "/img/work/apollo---thumbnail.avif", alt: "Apollo.io video thumbnail" },
  { src: "/img/work/lightyear---thumbnail.avif", alt: "Lightyear video thumbnail" },
  { src: "/img/work/attio---thumbnail.avif", alt: "Attio video thumbnail" },
  { src: "/img/work/attraction-thumbnail-2-.avif", alt: "Attractions.io video thumbnail" },
  { src: "/img/work/secondshelf---thumbnail.avif", alt: "SecondShelf video thumbnail" },
  { src: "/img/work/ask-philip---thumbnail.avif", alt: "Ask Philip video thumbnail" },
  { src: "/img/work/pixsoul-media---thumbnail.avif", alt: "Pixsoul Media video thumbnail" },
];

export const stories = [
  { id: 1, title: "ClickUp", tags: ["Product demo", "Logo animations"], body: "ClickUp needed video that could keep pace with a fast-moving product. Here's how we built a process that delivers consistent quality at scale.", image: "/img/stories/clickup-cover-section.avif" },
  { id: 2, title: "TaskNet", tags: ["Brand identity", "Website design", "Explainer video"], body: "We rebuilt TaskNet's brand, website, and explainer video from scratch, and made it actually stand out.", image: "/img/stories/banner-cover-tasknet.avif" },
  { id: 3, title: "Kuberno", tags: ["Explainer video", "Product demo"], body: "How do you sell complex governance software? See how Kuberno worked with Motion to turn dense product detail into a story that converts.", image: "/img/stories/cover-section.avif" },
  { id: 4, title: "Planful", tags: ["Video marketing plan", "100+ assets"], body: "Motion partnered with Planful on a 12-month creative subscription, creating a video marketing plan and 100+ assets across four brands.", image: "/img/stories/333b01f97a984f25ee39ec53d1207c19_planful-case-study-cover.avif" },
  { id: 5, title: "Primer", tags: ["Product launch", "Animation video"], body: "Primer, a VC-backed payments platform, returned to Motion across 3 projects to turn their product launches into animated videos.", image: "/img/stories/cover-component.avif" },
  { id: 6, title: "Obrizum", tags: ["Animation video", "Internal content"], body: "Motion partnered with Obrizum to power both client-facing and internal content, delivering hundreds of animations.", image: "/img/stories/obrizum-section-cover.avif" },
  { id: 7, title: "Open Money", tags: ["Lottie animation", "UI animation"], body: "Lightweight UI animations that boost UX without slowing the site, built with Lottie and a design subscription workflow.", image: "/img/stories/thumb.avif" },
  { id: 8, title: "Mirakl", tags: ["Explainer video"], body: "Mirakl needed to explain real product value, fast. The video addresses the audience's pain point first, then makes the solution easy to trust.", image: "/img/stories/cover-mirakl-component.avif" },
  { id: 9, title: "GotPhoto", tags: ["Multilingual videos", "Social media"], body: "GotPhoto needed daily content support across platforms and languages, delivered through the subscription model.", image: "/img/stories/widget-cover.avif" },
  { id: 10, title: "Y Combinator", tags: ["Product launch", "Motion graphic"], body: "Videos for multiple YC-backed startups in just two weeks, ready for Demo Day.", image: "/img/stories/57a9664b93ef6206641caf1c2e21bf30_cover.avif" },
  { id: 11, title: "Dove Hero", tags: ["Brand identity", "Website design"], body: "A subscription covering everything from brand identity to a seamless website experience.", image: "/img/stories/card-home.avif" },
  { id: 12, title: "Sharpish", tags: ["Website redesign", "Brand redesign"], body: "A monthly subscription that includes website redesign, style guidelines, and brand revitalization.", image: "/img/stories/sharpish-2.avif" },
  { id: 13, title: "Sealit", tags: ["Explainer video", "UI animation"], body: "Sealit's explainer video and UI animations, with a flexible workflow that fit their needs.", image: "/img/stories/cover-components.avif" },
  { id: 14, title: "AI Engineer", tags: ["30+ Ultrawide speaker intros", "Opening videos"], body: "Event video content for AI Engineer that captures attention and enhances the experience.", image: "/img/stories/case-study-cover---ai-engineering-1-.avif" },
  { id: 15, title: "Luniate", tags: ["Website redesign", "Style guidelines"], body: "A comprehensive monthly subscription that includes website redesign, style guidelines, and brand revitalization.", image: "/img/stories/case-study-cover---luniate-2-1-.avif" },
];

export const testimonials = [
  { name: "Ellen Kasinopoulou", role: "Head of Marketing", company: "Attractions.io", youtube: "O5xibKNNL1w" },
  { name: "Kurt Jones", role: "Product Marketing Manager", company: "HackerRank", youtube: "PyZz16CtX-0" },
  { name: "Matthew Springer", role: "Chief Revenue Officer", company: "Navatar", youtube: "G0ZHbVIleu4" },
  { name: "Carlos Morales", role: "Operations Lead", company: "StockRX", youtube: "AqWlk4iItX4" },
  { name: "Oscar Forshaw-Swift", role: "Head of Content & Content Strategy", company: "Obrizum Group", youtube: "9DGNgQ-reDc" },
  { name: "Vanlizza Chau", role: "Product Marketing", company: "Gem", youtube: "5JOb8IlK_m8" },
];

export const process = [
  { step: "01", title: "Free sample", body: "We believe that the best way to see our work is to experience it for yourself. This way, you can decide if we're a good fit for your needs.", image: "/img/misc/66f53bfc-frame-1707478607.avif", tag: "Try our service for free" },
  { step: "02", title: "Planning & collaboration", body: "Once you're happy with our sample, we'll move on to the storyboard planning stage. This is where we'll work with you to create a detailed plan for your video.", image: "/img/misc/66f53bfc-frame-1707478608.avif", tag: "Project planning" },
  { step: "03", title: "Final delivery", body: "Once the storyboard is approved, we'll start producing the video, and work with you to make sure it matches your expectations.", image: "/img/misc/66f53bfc-frame-1707478584.avif", tag: "Swift & easy access" },
];

export const promises = [
  { title: "Fast turnaround", body: "We understand the importance of speed in today's fast-paced marketing landscape. That's why we've streamlined our creative process to deliver projects efficiently without compromising quality." },
  { title: "Expert teams", body: "Our team members are highly skilled in their respective fields, with a proven track record of crafting impactful visuals and user experiences." },
  { title: "Flexible and scalable", body: "Having a large team of designers on hand means that we can allocate different teams to different tasks, and operate efficiently to tight deadlines." },
];

export const fixedPrice = {
  from: "$3,480",
  unit: "/video",
  title: "Fixed price package",
  body: "Get amazing motion graphics at a clear, upfront price. With our project-based packages, you'll know exactly what you're paying for. No surprises, just great videos tailored to your needs.",
  features: ["Fast turnaround", "2D & 3D motion design", "Storyboard planning", "Transparent pricing", "Source file available", "Commercial rights"],
  note: "No card required. Zero commitment.",
};

export const subscription = {
  title: "Subscription",
  body: "Our subscription model gives you access to a dedicated team of designers and is an incredibly efficient option for larger projects.",
  features: ["Dedicated team of designers", "Video, motion and design assets", "Efficient for larger projects"],
};

export const guarantees = [
  { title: "14 Day return policy", body: "We want you to feel confident. You can try our service absolutely risk-free." },
  { title: "Upfront pricing", body: "Fast responses and meticulous attention to detail ensure our customers are always impressed." },
  { title: "Fast turnaround", body: "If you choose to request a video sample we will deliver this within 48 hours." },
  { title: "Global working hours", body: "We're a UK-registered business servicing clients across the world in multiple time zones." },
];

export const calculatorHref = "https://www.motiontheagency.com/resources/video-cost-calculator";

/* ---------- Sizzle reel page ---------- */

export const sizzle = {
  heroImage: "/img/misc/69439f5b-0422de31cc2cb9d722b496cf3dcc866b_sizzle-reel-hero-image.avif",
  whatVideo: `${cdn}672116480f9df4c3614db05b_Sizzle%20Reels-transcode.webm`,
  whatPoster: "/img/posters/sizzle-reels.webp",
  what: [
    "A sizzle reel is a short promotional video that provides a high-energy and captivating overview of a product, service, event, or brand.",
    "Sizzle reels are designed to grab the viewer's attention and generate excitement, showcasing the best features and benefits of the subject in an engaging and entertaining way.",
    "They are typically one to two minutes long and may include footage, music, and sound effects. Our sizzle reels are built with powerful 2D and 3D animation.",
  ],
  reasons: [
    { title: "14-Day money back policy", body: "We're so confident you'll love our work, we offer a 14-day money-back guarantee. Not thrilled? We'll refund you, no questions asked." },
    { title: "Free sample", body: "Curious about what we can do? Let's start with a free custom sample. Send us your toughest concept, and we'll show you how we can bring it to life." },
    { title: "Flexible pricing", body: "Whether you're a startup or a tech giant, our pricing flexes to fit your needs. One-off project or ongoing support, we've got options that grow with your business." },
    { title: "Fast turnaround", body: "In tech, time is money. That's why we deliver top-notch animations at lightning speed, without cutting corners on quality." },
    { title: "High quality design", body: "Your innovative tech deserves equally innovative visuals. We create designs that not only look great but also communicate your message crystal clear." },
    { title: "5 Star review", body: "From boosting engagement to landing investors, our clients' reviews tell the real story of how we help businesses succeed." },
  ],
  benefits: [
    { title: "Showcasing unique features and benefits", body: "Sizzle reels can showcase the unique features and benefits of your products, highlighting what sets them apart and helping to build an emotional connection with potential customers." },
    { title: "Attracting and retaining customers", body: "An effective tool for engaging a target audience, building trust and credibility, and encouraging repeat business. Their memorable nature also helps attract new customers." },
    { title: "Boosting marketing efforts", body: "Sizzle reels can enhance your social media presence, support traditional advertising campaigns, and improve website engagement." },
    { title: "Cost-effective marketing solution", body: "By reusing existing content and reducing dependence on costly marketing materials, you can create engaging marketing without breaking the bank." },
    { title: "Flexibility and scalability", body: "Whether you're just starting out or looking to expand, sizzle reels can be easily adapted to meet changing marketing needs." },
    { title: "Engaging visual storytelling", body: "A visual story about your products and brand is more memorable and impactful than traditional marketing materials." },
    { title: "Improving brand awareness", body: "A strong and consistent brand image helps you establish a recognizable and memorable presence in the minds of your audience." },
    { title: "Measurable results", body: "Sizzle reels can be tracked and measured, so you can see how they perform and make data-driven decisions about your marketing." },
  ],
  types: [
    { label: "Brand launch", image: "/img/posters/superodd-boundless-reel.webp", imageAlt: "Frame from the Superodd Boundless sizzle reel" },
    { label: "Portfolio highlight", image: "/img/posters/askphill-sizzle-reels.webp", imageAlt: "Frame from the Ask Phill sizzle reel" },
    { label: "Product launch", image: "/img/posters/vidiq.webp", imageAlt: "Frame from the vidIQ sizzle reel" },
    { label: "Company achievement", image: "/img/posters/smg.webp", imageAlt: "Frame from the SMG sizzle reel" },
    { label: "Event highlight", image: "/img/posters/millmead.webp", imageAlt: "Frame from the Millmead event sizzle reel" },
    { label: "Product demo", image: "/img/posters/attio.webp", imageAlt: "Frame from the Attio sizzle reel" },
  ],
  tips: [
    { title: "Know your audience", body: "Knowing your audience guides the reel's narrative, imagery, content, and tone. By understanding their needs, you can create a more compelling and engaging experience." },
    { title: "Keep it short", body: "A sizzle reel should only highlight the best parts of your brand, without spending too much time on explanations. We're in, and then we're out." },
    { title: "Make your point", body: "The viewer should leave with a clear understanding of your identity, what your business does, and why they should choose you over your competitors." },
    { title: "Know your rights", body: "Make sure every clip, track and image in the reel is cleared for use, so it can run on any channel without problems later." },
    { title: "Quality production", body: "Competition is high these days, so it's important to meet high standards in all of your deliverables to stay ahead." },
    { title: "End with a strong CTA", body: "Close with one clear next step, so viewers know exactly what to do when the reel ends." },
  ],
  process: [
    { id: "sample", title: "Get free sample", body: "Get a free sizzle reel sample tailored to your brand. No credit card & commitment required to start." },
    { id: "production", title: "Collaborative production", body: "We'll plan and collaborate with you every step of the way, ensuring we're on the same page as your vision evolves." },
    { id: "review", title: "Review & refine", body: "Receive your video within 1-3 business days on average. Love what you see? Subscribe or choose a plan to keep the professional touch coming." },
  ],
  videos: ["MF5yn0Jhg9A", "ys9jizAU9As", "_YolLTl4td0", "kQXnIcX62Wo", "mFTD1t-WIlw", "iej-FvYXLAI"],
  faq: [
    {
      q: "What is a sizzle reel?",
      a: "A sizzle reel is a short promotional video that provides a high-energy and captivating overview of a product, service, event, or brand. They are typically one to two minutes long and may include footage, music, and sound effects, and are often used in advertising, marketing, and entertainment to showcase a product or service's unique selling points.",
    },
    {
      q: "Why is it called a sizzle reel?",
      a: "The term comes from the idea of adding sizzle to a product or service, much like adding spices to a dish to make it more flavorful and appealing. A sizzle reel highlights the most exciting and attention-grabbing aspects, adding a sense of energy to the presentation.",
    },
    {
      q: "How can I integrate branded motion graphics into my marketing strategy?",
      a: "Start by identifying where branded motion graphics can add value, such as explainer videos, social media posts, or website animations. A motion graphics agency can then create custom graphics that align with your brand identity and messaging, and optimise them for different platforms and channels.",
    },
  ],
};
