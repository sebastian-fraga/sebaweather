import {
    IconShieldLock,
    IconInfoCircle,
    IconBrandGithub,
    IconTipJar
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

export interface LinkField {
    key: string;
    icon: Icon;
    href?: string;
    external?: boolean;
}

export const linksConfig: LinkField[] = [
    {
        key: "privacy",
        icon: IconShieldLock,
    },
    {
        key: "about",
        icon: IconInfoCircle,
    },
    {
        key: "github",
        icon: IconBrandGithub,
        href: "https://github.com/sebastian-fraga/sebaweather",
        external: true,
    },
    {
        key: "donate",
        icon: IconTipJar,
        href: "https://ko-fi.com/sebastianfraga",
        external: true,
    },
];