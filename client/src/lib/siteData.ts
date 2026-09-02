// Noir Atelier style reminder: keep content modular, editorial, concise, and anchored by warm ivory, charcoal, and restrained Atelier Gold.

import {
  Baby,
  CircleDot,
  Droplets,
  Scissors,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "I Cut Hair Grooming Studio",
  shortName: "I CUT",
  tagline: "Precision cuts. Confident style.",
  eyebrow: "Premium Grooming Studio • Muvattupuzha",
  description:
    "Expert haircuts, beard styling, and modern grooming in a studio built around your individual style.",
  address: "Mudavoor, near Scrub A Dubb Car Wash",
  locality: "Muvattupuzha, Kerala 686669",
  phone: "07902833507",
  phoneDisplay: "+91 79028 33507",
  instagram: "https://www.instagram.com/its.me._.arun/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=I+Cut+Hair+Grooming+Studio%2C+Mudavoor%2C+near+Scrub+A+Dubb+Car+Wash%2C+Muvattupuzha%2C+Kerala+686669",
  mapsEmbed:
    "https://www.google.com/maps?q=I+Cut+Hair+Grooming+Studio%2C+Mudavoor%2C+near+Scrub+A+Dubb+Car+Wash%2C+Muvattupuzha%2C+Kerala+686669&output=embed",
  reviewCount: 35,
  rating: "5.0",
  availability: "Contact the salon for today’s availability.",
  assets: {
    hero: "/manus-storage/icut-hero_15d4fcda.jpg",
    mark: "/manus-storage/icut-mark_7dcf6da4.png",
    cut: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85",
    beard: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85",
    tools: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85",
  },
} as const;

export type Service = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    name: "Signature Haircut",
    description: "A considered cut shaped around your features, texture, and everyday rhythm.",
    icon: Scissors,
  },
  {
    name: "Hair Styling",
    description: "Polished styling for a sharper finish, from understated texture to occasion-ready form.",
    icon: Sparkles,
  },
  {
    name: "Beard Trim & Styling",
    description: "Clean lines, balanced shape, and a finish that lets your beard work with your face.",
    icon: CircleDot,
  },
  {
    name: "Hair & Beard Combo",
    description: "The complete grooming reset: hair, beard, and finishing details in one appointment.",
    icon: Waves,
  },
  {
    name: "Hair Wash & Finish",
    description: "A refreshing wash followed by a clean, wearable finish that keeps its shape.",
    icon: Droplets,
  },
  {
    name: "Kids’ Haircut",
    description: "Patient, precise grooming for younger guests in a calm studio setting.",
    icon: Baby,
  },
];

export const features = [
  {
    number: "01",
    title: "Expert Grooming",
    text: "Every service begins with attention to proportion, texture, and the details that make a cut feel like yours.",
  },
  {
    number: "02",
    title: "Personalised Style",
    text: "We take the time to understand your routine, then shape the finish around how you actually live.",
  },
  {
    number: "03",
    title: "Relaxed Experience",
    text: "A focused studio atmosphere, thoughtful pacing, and a little room to slow down between appointments.",
  },
];

export const reasons = [
  "Skilled and precise service",
  "Clean and comfortable studio",
  "Modern grooming techniques",
  "Personal attention",
  "Excellent customer satisfaction",
  "Convenient Mudavoor location",
];

export const gallery = [
  {
    id: "precision-cut",
    src: siteConfig.assets.cut,
    alt: "Close-up of a precise haircut being shaped with scissors",
    label: "Precision",
    size: "tall",
  },
  {
    id: "beard-craft",
    src: siteConfig.assets.beard,
    alt: "Barber carefully shaping a short beard with a comb and trimmer",
    label: "Beard craft",
    size: "standard",
  },
  {
    id: "studio-light",
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85",
    alt: "Bright modern salon interior with styling stations and mirrors",
    label: "The studio",
    size: "wide",
  },
  {
    id: "the-details",
    src: siteConfig.assets.tools,
    alt: "Grooming tools arranged on a charcoal stone counter",
    label: "The details",
    size: "standard",
  },
  {
    id: "in-the-chair",
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
    alt: "Barber working on a client's haircut in a dark studio",
    label: "In the chair",
    size: "standard",
  },
  {
    id: "finish",
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85",
    alt: "Close-up view of classic barber tools and a finished haircut",
    label: "Finish",
    size: "tall",
  },
] as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;
