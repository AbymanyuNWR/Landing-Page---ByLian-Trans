import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
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
        <>
            <HeroSection />
            <MarqueeSection />
            <SearchWidgetWrapper />
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
        </>
    );
}

// Small Wrapper to place search box slightly overlapping Hero
import { SearchBoxSection } from "@/components/sections/SearchBoxSection";

function SearchWidgetWrapper() {
    return (
        <section className="relative z-20 -mt-16 sm:-mt-24 px-4 sm:px-6 lg:px-8 mb-20 max-w-7xl mx-auto w-full">
            <div className="bg-white rounded-3xl p-2 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <SearchBoxSection />
            </div>
        </section>
    );
}
