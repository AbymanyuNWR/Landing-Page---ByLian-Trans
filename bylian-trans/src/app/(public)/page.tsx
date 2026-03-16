import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { SearchBoxSection } from "@/components/sections/SearchBoxSection";
import { KeunggulanSection } from "@/components/sections/KeunggulanSection";
import { RuteUnggulanSection } from "@/components/sections/RuteUnggulanSection";
import { CaraPesanSection } from "@/components/sections/CaraPesanSection";
import { ArmadaSection } from "@/components/sections/ArmadaSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrackingPreviewSection } from "@/components/sections/TrackingPreviewSection";
import { TestimoniSection } from "@/components/sections/TestimoniSection";
import { GaleriPreviewSection } from "@/components/sections/GaleriPreviewSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            
            {/* Search Widget - Floating over hero */}
            <section className="relative z-20 -mt-20 sm:-mt-24 px-4 sm:px-6 lg:px-8 mb-12 max-w-7xl mx-auto w-full">
                <SearchBoxSection />
            </section>

            <div className="mb-16">
                <MarqueeSection />
            </div>

            <KeunggulanSection />
            <RuteUnggulanSection />
            <CaraPesanSection />
            <ArmadaSection />
            <StatsSection />
            <TrackingPreviewSection />
            <TestimoniSection />
            <GaleriPreviewSection />
            <BlogPreviewSection />
            <CTASection />
        </main>
    );
}

