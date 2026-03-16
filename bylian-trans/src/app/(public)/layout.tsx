import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 relative pb-16 md:pb-0">
            <AnnouncementBar />
            <Navbar />

            <main className="flex-1 w-full flex flex-col max-w-[100vw] overflow-x-hidden bg-slate-50 relative z-0">
                {children}
            </main>

            <Footer />
            <WhatsAppBubble />
            <MobileBottomNav />
        </div>
    );
}
