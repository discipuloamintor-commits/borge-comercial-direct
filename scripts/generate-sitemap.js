import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env if running locally
dotenv.config();

// We need the Supabase URL and key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DOMAIN = "https://www.borgescomercial.com";
const OUTPUT_FILE = path.resolve(process.cwd(), 'dist/sitemap.xml'); // Writing to dist/ folder since this runs post-build
const PUBLIC_DIR_FILE = path.resolve(process.cwd(), 'public/sitemap.xml');

// Helper to sanitize ampersands and other XML special characters
const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

async function generateSitemap() {
    console.log("Generating sitemap...");

    try {
        // Fetch categories to get category slugs if needed
        const { data: categories, error: catError } = await supabase.from('categories').select('slug');
        if (catError) throw catError;

        // Fetch products
        const { data: products, error: prodError } = await supabase.from('products').select('slug, name, image');
        if (prodError) throw prodError;

        let sitemapItems = '';
        const today = new Date().toISOString().split('T')[0];

        // Static Routes
        const staticRoutes = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/produtos', priority: '0.9', changefreq: 'daily' },
            { url: '/sobre', priority: '0.7', changefreq: 'monthly' },
            { url: '/contacto', priority: '0.7', changefreq: 'monthly' },
            { url: '/encomendar', priority: '0.9', changefreq: 'weekly' },
        ];

        staticRoutes.forEach(route => {
            sitemapItems += `
  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
        });

        // Dynamic Product Routes
        products.forEach(product => {
            const productUrl = `${DOMAIN}/produto/${product.slug}`;
            const imageUrl = product.image && product.image.startsWith('http')
                ? escapeXml(product.image)
                : product.image
                    ? escapeXml(`${DOMAIN}${product.image}`)
                    : escapeXml(`${DOMAIN}/placeholder.svg`);

            const productName = escapeXml(product.name || 'Produto Borges Comercial');

            sitemapItems += `
  <url>
    <loc>${productUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${productName}</image:title>
    </image:image>
  </url>`;
        });

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapItems}
</urlset>`;

        // Ensure dist directory exists just in case (though postbuild it should)
        const distDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // Write to both dist (for immediate deployment) and public (for repo)
        fs.writeFileSync(OUTPUT_FILE, sitemapXml, 'utf8');
        fs.writeFileSync(PUBLIC_DIR_FILE, sitemapXml, 'utf8');

        console.log(`Sitemap successfully generated at ${OUTPUT_FILE} and ${PUBLIC_DIR_FILE}`);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        process.exit(1);
    }
}

generateSitemap();
