"use client";

import React from 'react';
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
