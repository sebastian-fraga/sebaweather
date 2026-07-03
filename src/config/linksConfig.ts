import {
    IconShieldLock,
    IconInfoCircle,
    IconBrandGithub,
    IconTipJar
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

export interface LinkField {
    key: string;
    label: string;
    icon: Icon;
    href: string;
    external?: boolean;
}

export const linksConfig: LinkField[] = [
    {
        key: "privacy",
        label: "Privacidad🚧",
        icon: IconShieldLock,
        href: "",
    },
    {
        key: "about",
        label: "Acerca de🚧",
        icon: IconInfoCircle,
        href: "",
    },
    {
        key: "github",
        label: "GitHub",
        icon: IconBrandGithub,
        href: "https://github.com/sebastian-fraga/sebaweather",
        external: true,
    },
    {
        key: "donate",
        label: "Donar",
        icon: IconTipJar,
        href: "https://ko-fi.com/sebastianfraga",
        external: true,
    },
];