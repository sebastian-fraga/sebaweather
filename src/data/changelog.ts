export interface ChangelogEntry {
    version: string;
    date: string;
    items: string[];
}

export const changelog: ChangelogEntry[] = [
    {
        version: "1.0.1",
        date: "2026-07",
        items: ["about.changelog.v1_0_1.item1"],
    },
    {
        version: "1.0.0",
        date: "2026-07",
        items: ["about.changelog.v1_0_0.item1"],
    },
];

export const latestVersion = changelog[0].version;
