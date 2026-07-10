import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "node:fs";

const sitemap = new SitemapStream({
    hostname: "https://sebaweather.vercel.app",
});

const routes = ["/", "/home", "/locations", "/settings"];

const writeStream = createWriteStream("./public/sitemap.xml");

sitemap.pipe(writeStream);

routes.forEach((url) => {
    sitemap.write({
        url,
        changefreq: "daily",
        priority: url === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
    });
});

sitemap.end();

await streamToPromise(sitemap);

console.log("Sitemap generado");
