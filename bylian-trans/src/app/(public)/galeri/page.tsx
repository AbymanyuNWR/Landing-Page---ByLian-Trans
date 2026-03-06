import { generateMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/features/gallery/GalleryGrid";

export const metadata = generateMetadata({
    title: "Galeri Foto",
    description: "Koleksi foto armada bus, fasilitas, interior, dan kegiatan PT Bylian Trans.",
    path: "/galeri",
});

const DUMMY_IMAGES = [
    { id: "g1", url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", category: "EXTERIOR" as const, alt: "Bylian Trans Eksekutif Tampak Samping" },
    { id: "g2", url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop", category: "EXTERIOR" as const, alt: "Armada Pariwisata di Rest Area" },
    { id: "g3", url: "https://images.unsplash.com/photo-1627705149303-aefe4515eeae?q=80&w=800&auto=format&fit=crop", category: "INTERIOR" as const, alt: "Kabih Dalam Kelas Super Eksekutif (2-1)" },
    { id: "g4", url: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop", category: "FASILITAS" as const, alt: "Legrest dan Bantal Berkualitas Ekspor" },
    { id: "g5", url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop", category: "INTERIOR" as const, alt: "Toilet Bersih Dalam Bus" },
    { id: "g6", url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop", category: "EXTERIOR" as const, alt: "Kopdar Bylianmania di Tegal" },
];

export default function GaleriPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Galeri Kami</h1>
                    <p className="text-lg text-slate-600">
                        Intip kemewahan interior dan gagahnya eksterior armada bus PT Bylian Trans melalui jepretan kamera pilihan kami.
                    </p>
                </div>

                <GalleryGrid images={DUMMY_IMAGES} />
            </div>
        </div>
    );
}
