// Noir Atelier style reminder: use an editorial, asymmetrical rhythm with tactile charcoal surfaces, warm ivory type, gold rules, and quiet motion throughout.

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { gallery, navItems, reasons, services, siteConfig } from "@/lib/siteData";

type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } },
};

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className={align === "right" ? "section-kicker justify-end" : "section-kicker"}>{eyebrow}</div>
      <h2 className="display-font mt-5 max-w-2xl text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-[#F5F0E8] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {body ? <p className="mt-6 max-w-xl text-sm leading-7 text-[#A8A8A8] sm:text-base">{body}</p> : null}
    </div>
  );
}

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label={siteConfig.name}>
      <span className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#C6A15B] ${small ? "h-8 w-8" : "h-10 w-10"}`}>
        <span className="display-font text-sm font-semibold tracking-[-0.08em] text-[#C6A15B]">IC</span>
      </span>
      <span className={`display-font font-semibold tracking-[0.2em] text-[#F5F0E8] ${small ? "text-lg" : "text-xl"}`}>I CUT</span>
    </span>
  );
}

function StarRow({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={compact ? "h-3.5 w-3.5 fill-[#C6A15B] text-[#C6A15B]" : "h-4 w-4 fill-[#C6A15B] text-[#C6A15B]"} />
      ))}
    </span>
  );
}

function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof gallery)[number] | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage, menuOpen]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please add a phone number.";
    if (!form.service) nextErrors.service = "Please choose a service.";
    if (!form.date) nextErrors.date = "Please choose a preferred date.";
    if (!form.time) nextErrors.time = "Please choose a preferred time.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const motionProps = prefersReducedMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.18 } };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0B0B]/94 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#home" onClick={() => setMenuOpen(false)} className="shrink-0">
            <BrandMark small />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={`nav-link ${activeSection === item.href.slice(1) ? "is-active" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href={`tel:+91${siteConfig.phone.slice(1)}`} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#A8A8A8] transition-colors hover:text-[#F5F0E8]" aria-label={`Call ${siteConfig.name}`}>
              <Phone className="h-3.5 w-3.5 text-[#C6A15B]" />
              {siteConfig.phoneDisplay}
            </a>
            <a className="gold-button !min-h-0 !px-4 !py-3" href="#appointment">Book appointment</a>
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-[#F5F0E8] lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#0B0B0B]/96 px-6 py-6 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between">
              <BrandMark small />
              <button className="inline-flex h-11 w-11 items-center justify-center border border-white/15" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-20 flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }} className="display-font border-b border-white/10 pb-4 text-4xl font-semibold text-[#F5F0E8]">
                  <span className="mr-3 text-sm font-sans font-bold tracking-[0.2em] text-[#C6A15B]">0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <a href="#appointment" onClick={() => setMenuOpen(false)} className="gold-button mt-12 w-full">Book an appointment <ArrowUpRight className="h-4 w-4" /></a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="home" className="relative isolate flex min-h-[740px] items-end overflow-hidden pb-16 pt-32 sm:min-h-screen sm:pb-20 lg:items-center lg:pb-12">
          <img className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-center" src={siteConfig.assets.hero} alt="Dark, refined grooming studio interior with a barber chair and brass-framed mirror" />
          <div className="hero-vignette absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_42%,rgba(198,161,91,0.15),transparent_28%)]" />
          <div className="container relative w-full">
            <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              <motion.div initial={prefersReducedMotion ? false : "hidden"} animate={prefersReducedMotion ? undefined : "visible"} variants={stagger} className="max-w-3xl">
                <motion.div variants={reveal} transition={{ duration: 0.6 }} className="eyebrow">{siteConfig.eyebrow}</motion.div>
                <motion.h1 variants={reveal} transition={{ duration: 0.7, delay: 0.1 }} className="display-font mt-6 max-w-3xl text-[4rem] font-semibold leading-[0.83] tracking-[-0.055em] text-[#F5F0E8] sm:text-[6.1rem] lg:text-[7.7rem]">
                  Precision cuts.<br /><em className="font-medium text-[#C6A15B]">Confident style.</em>
                </motion.h1>
                <motion.p variants={reveal} transition={{ duration: 0.65, delay: 0.22 }} className="mt-7 max-w-lg text-sm leading-7 text-[#D2D0CA] sm:text-base">{siteConfig.description}</motion.p>
                <motion.div variants={reveal} transition={{ duration: 0.65, delay: 0.31 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#appointment" className="gold-button">Book an appointment <ArrowUpRight className="h-4 w-4" /></a>
                  <a href={siteConfig.maps} target="_blank" rel="noreferrer" className="ghost-button">Get directions <MapPin className="h-4 w-4 text-[#C6A15B]" /></a>
                </motion.div>
              </motion.div>
              <motion.div variants={reveal} initial={prefersReducedMotion ? false : "hidden"} whileInView={prefersReducedMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65, delay: 0.42 }} className="lg:justify-self-end">
                <div className="glass-surface flex max-w-[300px] items-center gap-4 px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="display-font text-4xl font-semibold leading-none text-[#F5F0E8]">{siteConfig.rating}</span>
                    <StarRow compact />
                  </div>
                  <div className="h-12 w-px bg-[#C6A15B]/50" />
                  <p className="max-w-[130px] text-xs leading-5 text-[#A8A8A8]">Based on {siteConfig.reviewCount} five-star reviews</p>
                </div>
              </motion.div>
            </div>
            <div className="mt-20 hidden items-center gap-4 text-[0.63rem] font-bold uppercase tracking-[0.18em] text-[#A8A8A8] sm:flex lg:absolute lg:bottom-[-8rem] lg:left-8">
              <span className="h-10 w-px bg-[#C6A15B]" />
              <span>Scroll to explore</span>
              <ArrowDown className="h-3.5 w-3.5 text-[#C6A15B]" />
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden bg-[#0B0B0B] py-24 sm:py-32 lg:py-40">
          <div className="container">
            <motion.div {...motionProps} variants={stagger} className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-28">
              <motion.div variants={reveal} transition={{ duration: 0.6 }} className="relative pl-8 lg:pt-20">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#C6A15B] via-[#C6A15B]/25 to-transparent" />
                <span className="display-font text-[9rem] font-semibold leading-none text-white/[0.045] sm:text-[12rem]">01</span>
                <div className="image-frame -mt-14 ml-10 aspect-[4/5] max-w-[250px] sm:max-w-[300px] lg:ml-16">
                  <img src={siteConfig.assets.tools} alt="Grooming tools arranged on a charcoal stone counter" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#F5F0E8]"><Scissors className="h-3.5 w-3.5 text-[#C6A15B]" /> The details matter</div>
                </div>
              </motion.div>
              <motion.div variants={reveal} transition={{ duration: 0.65 }} className="lg:pt-8">
                <SectionHeading eyebrow="The I Cut approach" title="More than just a haircut" body="I Cut Hair Grooming Studio is a modern local destination for people who care about the details. Expect precise work, thoughtful styling, and a comfortable space designed to make time in the chair feel considered." />
                <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:mt-20">
                  {[
                    { number: "01", title: "Expert Grooming", text: "Precision work that respects your texture, proportions, and routine." },
                    { number: "02", title: "Personalised Style", text: "A finish shaped around the way you want to show up every day." },
                    { number: "03", title: "Relaxed Experience", text: "A calm studio rhythm with space to slow down and reset." },
                  ].map((feature) => (
                    <div key={feature.number} className="border-t border-white/15 pt-4">
                      <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.16em] text-[#C6A15B]">{feature.number}</span><ChevronRight className="h-4 w-4 text-white/30" /></div>
                      <h3 className="display-font mt-7 text-2xl font-semibold text-[#F5F0E8]">{feature.title}</h3>
                      <p className="mt-3 text-xs leading-6 text-[#A8A8A8]">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="border-y border-white/[0.08] bg-[#151515] py-24 sm:py-32">
          <div className="container">
            <motion.div {...motionProps} variants={stagger}>
              <motion.div variants={reveal} transition={{ duration: 0.6 }} className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <SectionHeading eyebrow="The menu" title="Grooming, considered" body="Choose the service that fits the moment. We’ll take care of the details from there." />
                <p className="max-w-[210px] border-l border-[#C6A15B] pl-4 text-xs leading-6 text-[#A8A8A8] lg:mb-2">Every service is tailored to your preferred finish. Contact the studio for pricing and today’s availability.</p>
              </motion.div>
              <div className="mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.article key={service.name} variants={reveal} transition={{ duration: 0.5, delay: index * 0.05 }} className={`group relative bg-[#151515] p-6 transition-colors duration-300 hover:bg-[#1c1c1c] sm:p-8 ${index === 0 || index === 5 ? "lg:col-span-2" : "lg:col-span-1"}`}>
                      <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center border border-[#C6A15B]/55 text-[#C6A15B]"><Icon className="h-5 w-5" strokeWidth={1.5} /></span><span className="text-[0.62rem] font-bold tracking-[0.16em] text-[#767676]">0{index + 1}</span></div>
                      <h3 className="display-font mt-12 text-3xl font-semibold text-[#F5F0E8]">{service.name}</h3>
                      <p className="mt-3 min-h-[70px] text-sm leading-6 text-[#A8A8A8]">{service.description}</p>
                      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-[0.63rem] font-bold uppercase tracking-[0.14em] text-[#C6A15B]">Contact for price</span><a href="#appointment" className="inline-flex items-center gap-1 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-[#F5F0E8] transition-colors group-hover:text-[#C6A15B]">Book now <ArrowUpRight className="h-3.5 w-3.5" /></a></div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0B0B0B] py-24 sm:py-32">
          <div className="container">
            <motion.div {...motionProps} variants={stagger} className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-28">
              <motion.div variants={reveal} transition={{ duration: 0.6 }}>
                <div className="section-kicker">Why I Cut</div>
                <h2 className="display-font mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-6xl">Good grooming<br /><em className="font-medium text-[#C6A15B]">is personal.</em></h2>
                <p className="mt-7 max-w-md text-sm leading-7 text-[#A8A8A8]">From the first consultation to the final finish, the studio is built around clear details, modern technique, and making the experience feel easy.</p>
                <div className="mt-12 flex items-end gap-5"><span className="display-font text-7xl font-semibold leading-none text-[#F5F0E8]">35</span><span className="mb-1 max-w-[130px] text-xs leading-5 text-[#A8A8A8]">five-star reviews from happy customers</span></div>
              </motion.div>
              <motion.div variants={reveal} transition={{ duration: 0.65 }} className="grid border-t border-white/15 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <div key={reason} className="flex items-center gap-4 border-b border-white/10 py-5 sm:pr-8"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C6A15B] text-[#C6A15B]"><Check className="h-3.5 w-3.5" /></span><span className="text-sm text-[#D2D0CA]">{reason}</span><span className="ml-auto text-[0.65rem] text-white/25">0{index + 1}</span></div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="border-y border-white/[0.08] bg-[#111111] py-24 sm:py-32">
          <div className="container">
            <motion.div {...motionProps} variants={stagger}>
              <motion.div variants={reveal} transition={{ duration: 0.6 }} className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><SectionHeading eyebrow="The studio, in focus" title="A closer look" body="Craft lives in the small things: the tools, the texture, the quiet moment before the finish." /><a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="ghost-button shrink-0 self-start sm:mb-1">See more on Instagram <Instagram className="h-4 w-4 text-[#C6A15B]" /></a></motion.div>
              <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 lg:mt-20 lg:auto-rows-[240px] lg:grid-cols-12">
                {gallery.map((item, index) => (
                  <motion.button key={item.src} variants={reveal} transition={{ duration: 0.5, delay: index * 0.045 }} onClick={() => setSelectedImage(item)} className={`image-frame group text-left ${item.size === "tall" ? "row-span-2" : ""} ${index === 0 ? "col-span-2 lg:col-span-6" : index === 1 ? "lg:col-span-3" : index === 2 ? "col-span-2 lg:col-span-3" : index === 3 ? "lg:col-span-3" : index === 4 ? "lg:col-span-3" : "col-span-2 lg:col-span-6"}`} aria-label={`View larger image: ${item.label}`}>
                    <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1 items-end justify-between bg-gradient-to-t from-[#0B0B0B]/85 to-transparent px-4 pb-4 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5F0E8]">{item.label}</span><ArrowUpRight className="h-4 w-4 text-[#C6A15B]" /></div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="reviews" className="border-y border-[#C6A15B]/30 bg-[#171717] py-20 text-[#F5F0E8] sm:py-28">
          <div className="container">
            <motion.div {...motionProps} variants={reveal} transition={{ duration: 0.7 }} className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
              <div><div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A15B]"><span className="display-font text-sm font-semibold tracking-[-0.08em] text-[#C6A15B]">IC</span></div><div className="flex items-baseline gap-4"><span className="display-font text-8xl font-semibold leading-none text-[#F5F0E8] sm:text-9xl">{siteConfig.rating}</span><Star className="h-8 w-8 fill-[#C6A15B] text-[#C6A15B]" /></div><div className="mt-4"><StarRow /></div></div>
              <div className="border-l border-white/20 pl-6 sm:pl-10"><p className="eyebrow !text-[#C6A15B]">The word on the studio</p><h2 className="display-font mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-6xl">A rating built on showing up for the details.</h2><p className="mt-5 text-sm leading-7 text-[#A8A8A8]">{`Based on ${siteConfig.reviewCount} five-star reviews.`} We don’t invent the words behind the rating — we let the quality of the experience speak for itself.</p></div>
            </motion.div>
          </div>
        </section>

        <section id="appointment" className="bg-[#151515] py-24 sm:py-32">
          <div className="container">
            <motion.div {...motionProps} variants={stagger} className="grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-24">
              <motion.div variants={reveal} transition={{ duration: 0.6 }}>
                <div className="section-kicker">Start the conversation</div>
                <h2 className="display-font mt-5 max-w-lg text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-7xl">Make time for a sharper you.</h2>
                <p className="mt-7 max-w-md text-sm leading-7 text-[#A8A8A8]">Send through your preferred details and we’ll help you take it from there. Your request is not confirmed until you contact the studio.</p>
                <div className="mt-12 border-t border-white/15 pt-5"><div className="flex items-center gap-3 text-sm text-[#F5F0E8]"><Clock3 className="h-4 w-4 text-[#C6A15B]" />{siteConfig.availability}</div><div className="mt-4 flex items-center gap-3 text-sm text-[#F5F0E8]"><Phone className="h-4 w-4 text-[#C6A15B]" /><a href={`tel:+91${siteConfig.phone.slice(1)}`} className="transition-colors hover:text-[#C6A15B]">{siteConfig.phoneDisplay}</a></div></div>
              </motion.div>
              <motion.div variants={reveal} transition={{ duration: 0.65 }} className="surface p-6 sm:p-9">
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A15B] text-[#C6A15B]"><Check className="h-6 w-6" /></span><p className="eyebrow mt-8">Request ready</p><h3 className="display-font mt-3 max-w-md text-5xl font-semibold leading-[0.92] text-[#F5F0E8]">Your details are ready.</h3><p className="mt-5 max-w-md text-sm leading-7 text-[#A8A8A8]">Please contact the salon to confirm your booking. We’ve kept your request here so you have everything in one place.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={`tel:+91${siteConfig.phone.slice(1)}`} className="gold-button">Call the studio <Phone className="h-4 w-4" /></a><button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="ghost-button">Start again</button></div></div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Full name <span className="text-[#C6A15B]">*</span></span><input className={`input-field ${errors.name ? "input-error" : ""}`} value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" autoComplete="name" />{errors.name ? <span className="mt-1 block text-xs text-[#D58B78]">{errors.name}</span> : null}</label>
                      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Phone number <span className="text-[#C6A15B]">*</span></span><input className={`input-field ${errors.phone ? "input-error" : ""}`} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Your phone number" autoComplete="tel" inputMode="tel" />{errors.phone ? <span className="mt-1 block text-xs text-[#D58B78]">{errors.phone}</span> : null}</label>
                      <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Preferred service <span className="text-[#C6A15B]">*</span></span><select className={`input-field ${errors.service ? "input-error" : ""}`} value={form.service} onChange={(event) => updateField("service", event.target.value)}><option value="">Choose a service</option>{services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}</select>{errors.service ? <span className="mt-1 block text-xs text-[#D58B78]">{errors.service}</span> : null}</label>
                      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Preferred date <span className="text-[#C6A15B]">*</span></span><input type="date" min={today} className={`input-field ${errors.date ? "input-error" : ""}`} value={form.date} onChange={(event) => updateField("date", event.target.value)} />{errors.date ? <span className="mt-1 block text-xs text-[#D58B78]">{errors.date}</span> : null}</label>
                      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Preferred time <span className="text-[#C6A15B]">*</span></span><input type="time" className={`input-field ${errors.time ? "input-error" : ""}`} value={form.time} onChange={(event) => updateField("time", event.target.value)} />{errors.time ? <span className="mt-1 block text-xs text-[#D58B78]">{errors.time}</span> : null}</label>
                      <label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#A8A8A8]">Optional message</span><textarea className="input-field min-h-28 resize-y" value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Anything you’d like us to know?" /></label>
                    </div>
                    <button type="submit" className="gold-button mt-7 w-full sm:w-auto">Prepare appointment request <ArrowUpRight className="h-4 w-4" /></button>
                    <p className="mt-4 text-xs leading-5 text-[#767676]">No payment is taken and no appointment is confirmed by this form. We’ll ask you to contact the studio to confirm.</p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="bg-[#0B0B0B] py-24 sm:py-32">
          <div className="container">
            <motion.div {...motionProps} variants={stagger} className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <motion.div variants={reveal} transition={{ duration: 0.6 }}><div className="section-kicker">Find the studio</div><h2 className="display-font mt-5 text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-7xl">Meet us in<br /><em className="font-medium text-[#C6A15B]">Mudavoor.</em></h2><div className="mt-12 space-y-6 border-t border-white/15 pt-6"><div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#C6A15B]" /><address className="not-italic text-sm leading-7 text-[#D2D0CA]">{siteConfig.address}<br />{siteConfig.locality}</address></div><div className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-[#C6A15B]" /><a href={`tel:+91${siteConfig.phone.slice(1)}`} className="text-sm text-[#D2D0CA] transition-colors hover:text-[#C6A15B]">{siteConfig.phoneDisplay}</a></div><div className="flex gap-4"><Instagram className="mt-1 h-5 w-5 shrink-0 text-[#C6A15B]" /><a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="text-sm text-[#D2D0CA] transition-colors hover:text-[#C6A15B]">Follow @its.me._.arun</a></div></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={siteConfig.maps} target="_blank" rel="noreferrer" className="gold-button">Open in Google Maps <MapPin className="h-4 w-4" /></a><a href="#appointment" className="ghost-button">Book a visit <CalendarDays className="h-4 w-4 text-[#C6A15B]" /></a></div></motion.div>
              <motion.div variants={reveal} transition={{ duration: 0.65 }} className="image-frame min-h-[360px] lg:min-h-[500px]"><iframe title="Map showing I Cut Hair Grooming Studio in Mudavoor, Muvattupuzha" src={siteConfig.mapsEmbed} className="h-full min-h-[360px] w-full grayscale invert-[0.88] opacity-80 lg:min-h-[500px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="pointer-events-none absolute inset-0 bg-[#C6A15B]/[0.06] mix-blend-color" /></motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#151515] pb-28 pt-14 sm:pb-8">
        <div className="container">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
            <div><BrandMark /><p className="mt-6 max-w-xs text-sm leading-7 text-[#A8A8A8]">A sharper ritual, made personal. Premium haircuts and modern grooming in Muvattupuzha.</p></div>
            <div><p className="eyebrow">Explore</p><nav className="mt-5 flex flex-col gap-3 text-sm text-[#A8A8A8]">{navItems.map((item) => <a key={item.href} href={item.href} className="transition-colors hover:text-[#C6A15B]">{item.label}</a>)}</nav></div>
            <div><p className="eyebrow">Visit</p><p className="mt-5 text-sm leading-7 text-[#A8A8A8]">{siteConfig.address}<br />{siteConfig.locality}</p><a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[#F5F0E8] transition-colors hover:text-[#C6A15B]"><Instagram className="h-4 w-4" /> Instagram</a></div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#767676] sm:flex-row sm:items-center"><span>© {new Date().getFullYear()} I Cut Hair Grooming Studio</span><a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-[#F5F0E8]">Back to top <ArrowDown className="h-3.5 w-3.5 rotate-180" /></a></div>
        </div>
      </footer>

      <div className="fixed inset-x-4 bottom-4 z-40 grid grid-cols-2 gap-2 sm:hidden"><a href="#appointment" className="gold-button shadow-[0_10px_30px_rgba(0,0,0,0.28)]">Book <CalendarDays className="h-4 w-4" /></a><a href={siteConfig.maps} target="_blank" rel="noreferrer" className="ghost-button bg-[#151515]/95 shadow-[0_10px_30px_rgba(0,0,0,0.28)]">Directions <MapPin className="h-4 w-4 text-[#C6A15B]" /></a></div>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0B0B0B]/95 p-4 backdrop-blur-md sm:p-10" role="dialog" aria-modal="true" aria-label={`${selectedImage.label} image viewer`} onClick={() => setSelectedImage(null)}>
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[82vh] max-w-full object-contain" />
              <div className="mt-4 flex items-center justify-between gap-5"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#A8A8A8]">{selectedImage.label}</span><button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8]" onClick={() => setSelectedImage(null)}>Close <X className="h-4 w-4 text-[#C6A15B]" /></button></div>
            </motion.div>
            <button className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F5F0E8]" onClick={() => setSelectedImage(null)} aria-label="Close image viewer"><X className="h-5 w-5" /></button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HairSalon",
        name: siteConfig.name,
        description: siteConfig.description,
        telephone: siteConfig.phone,
        image: siteConfig.assets.hero,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Muvattupuzha",
          addressRegion: "Kerala",
          postalCode: "686669",
          addressCountry: "IN",
        },
        sameAs: [siteConfig.instagram],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteConfig.rating,
          reviewCount: siteConfig.reviewCount,
          bestRating: "5",
        },
      }) }} />
    </div>
  );
}

export default Home;
