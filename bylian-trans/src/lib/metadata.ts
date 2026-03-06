import { Metadata } from "next";

type MetaProps = {
    title: string;
    description: string;
    image?: string;
    noIndex?: boolean;
};

const defaultDescription = "Pesan tiket bus Bylian Trans dari Tegal ke seluruh Indonesia. Armada lengkap AC, tepat waktu, aman. Beli tiket online mudah via website atau WA.";

/**
 * Generate standard SEO Metadata dynamically for any page
 */
export function constructMetadata({
    title,
    description = defaultDescription,
    image = "/images/og-image.jpg",
    noIndex = false,
}: MetaProps): Metadata {
    return {
        title: `${title} | PT Bylian Trans`,
        description,
        openGraph: {
            title: `${title} | PT Bylian Trans`,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | PT Bylian Trans`,
            description,
            images: [image],
            creator: "@byliantrans",
        },
        icons: "/images/logo/favicon.ico",
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://bylientrans.co.id"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
