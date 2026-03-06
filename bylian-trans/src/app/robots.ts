import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/akun/', '/admin/', '/api/', '/pesan/sukses', '/pesan/pembayaran', '/pesan/data-penumpang'],
        },
        sitemap: 'https://bylientrans.co.id/sitemap.xml',
    }
}
