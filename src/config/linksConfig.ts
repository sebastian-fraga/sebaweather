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
    href: string;
    external?: boolean;
    wip?: boolean;
}

export const linksConfig: LinkField[] = [
    {
        key: "privacy",
        icon: IconShieldLock,
        href: "",
        wip: true,
    },
    {
        key: "about",
        icon: IconInfoCircle,
        href: "",
        wip: true,
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