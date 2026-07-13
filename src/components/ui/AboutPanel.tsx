import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IconChevronLeft } from "@tabler/icons-react";

import SlidePanel from "../layout/SlidePanel";

interface AboutPanelProps {
    onClose: () => void;
}

export default function AboutPanel({ onClose }: AboutPanelProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <SlidePanel onClose={() => navigate(-1)}
        >
            <div className="flex items-center gap-6 px-4 pt-4 sm:pt-12 sm:px-8">
                <button className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4 text-white hover:bg-purple-300/80 cursor-pointer transition-all" aria-label={t("common.backToSettings")} onClick={(onClose)}>
                    <IconChevronLeft stroke={3} size={24} className="sm:w-8 sm:h-8" />
                </button>

                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-8 mt-6 flex flex-col items-center">
            </div>
        </SlidePanel>
    );
}
