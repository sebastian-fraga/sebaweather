export async function getCityImage(cityName: string, width = 800): Promise<string | null> {
    const tryFetch = async (lang: "es" | "en") => {
        try {
            const params = new URLSearchParams({
                action: "query",
                format: "json",
                origin: "*",
                prop: "pageimages|coordinates|pageprops",
                piprop: "thumbnail",
                pithumbsize: String(width),
                titles: cityName,
                redirects: "1",
            });

            const res = await fetch(
                `https://${lang}.wikipedia.org/w/api.php?${params}`
            );
            if (!res.ok) return null;

            const data = await res.json();
            const pages = data.query?.pages;
            if (!pages) return null;

            const page = Object.values(pages)[0] as {
                thumbnail?: { source: string };
                coordinates?: { lat: number; lon: number }[];
                pageprops?: { disambiguation?: string };
            };

            if (!page.coordinates || page.coordinates.length === 0) return null;

            if (page.pageprops?.disambiguation) return null;

            return page.thumbnail?.source ?? null;
        } catch {
            return null;
        }
    };

    return (await tryFetch("es")) ?? (await tryFetch("en"));
}