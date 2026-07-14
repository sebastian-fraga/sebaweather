import { IconChevronLeft, IconExternalLink } from "@tabler/icons-react";

import { useTranslation } from "react-i18next";

import SlidePanel from "../layout/SlidePanel";

interface PrivacyPanelProps {
    onClose: () => void;
}

export default function PrivacyPanel({ onClose }: PrivacyPanelProps) {
    const { t } = useTranslation()
    return (
        <SlidePanel onClose={onClose}
        >
            <div className="flex flex-col items-start px-4 pt-4 sm:pt-12 sm:px-8 text-white max-w-5xl mx-auto overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-6 mb-8">
                    <button className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4 text-white hover:bg-purple-300/80 cursor-pointer transition-all" aria-label={t("common.backToSettings")} onClick={onClose}>
                        <IconChevronLeft stroke={3} size={24} className="sm:w-8 sm:h-8" />
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white">
                        {t("privacy.title")}
                    </h2>
                </div>
                <div className="flex flex-col gap-8 w-full pb-32">
                    <h3 className="text-sm text-gray-400">
                        {t("privacy.lastUpdate.title")} <span className="text-gray-300">{t("privacy.lastUpdate.date")}</span>
                    </h3>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {t("privacy.startParagraph")}
                    </p>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.firstItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.firstItem.startParagraph")}
                        </p>
                        <ul className="flex flex-col gap-2 text-sm sm:text-base text-gray-300 leading-relaxed pl-1">
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    <span className="font-medium text-white">{t("privacy.firstItem.firstListItem.title")}</span>{' '}
                                    {t("privacy.firstItem.firstListItem.paragraph")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    <span className="font-medium text-white">{t("privacy.firstItem.secondListItem.title")}</span>{' '}
                                    {t("privacy.firstItem.secondListItem.paragraph")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    <span className="font-medium text-white">{t("privacy.firstItem.thirdListItem.title")}</span>{' '}
                                    {t("privacy.firstItem.thirdListItem.paragraph")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    <span className="font-medium text-white">{t("privacy.firstItem.fourthListItem.title")}</span>{' '}
                                    {t("privacy.firstItem.fourthListItem.paragraph")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    <span className="font-medium text-white">{t("privacy.firstItem.fifthListItem.title")}</span>{' '}
                                    {t("privacy.firstItem.fifthListItem.paragraph")}
                                </span>
                            </li>
                        </ul>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.firstItem.lastParagraph")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.secondItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.secondItem.startParagraph")}
                        </p>
                        <ul className="flex flex-col gap-2 text-sm sm:text-base text-gray-300 leading-relaxed pl-1">
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>{t("privacy.secondItem.firstListItem")}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>{t("privacy.secondItem.secondListItem")}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>{t("privacy.secondItem.thirdListItem")}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>{t("privacy.secondItem.fourthListItem")}</span>
                            </li>
                        </ul>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.secondItem.lastParagraph")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.thirdItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.thirdItem.startParagraph")}{' '}
                            <span className="font-medium text-white">Firebase Firestore</span>{' '}
                            {t("privacy.thirdItem.firstSpan")}{' '}
                            <span className="font-medium text-white">Firebase Cloud Messaging (FCM)</span>{' '}
                            {t("privacy.thirdItem.secondSpan")}{' '}

                            <a

                                href="https://cron-job.org/"
                                className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-0.5"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                cron-job.org
                                <IconExternalLink size={14} />
                            </a>
                        </p>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.thirdItem.lastParagraph")}{' '}
                            <a

                                href="https://policies.google.com/privacy"
                                className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                policies.google.com/privacy
                                <IconExternalLink size={14} />
                            </a>
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.fourthItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.fourthItem.paragraph")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.fifthItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.fifthItem.startParagraph")}
                        </p>
                        <ul className="flex flex-col gap-2 text-sm sm:text-base text-gray-300 leading-relaxed pl-1">
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    {t("privacy.fifthItem.firstItem")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    {t("privacy.fifthItem.secondItem")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    {t("privacy.fifthItem.thirdItem")}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-300 mt-1">•</span>
                                <span>
                                    {t("privacy.fifthItem.fourthItem")}
                                    {' '}
                                    <a
                                        href="mailto:fragasebastian1@gmail.com"
                                        className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors"
                                    >
                                        fragasebastian1@gmail.com
                                    </a>{' '}
                                    {t("privacy.fifthItem.fourthItem.cont")}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.sixthItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.sixthItem.paragraph")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-300">
                            {t("privacy.seventhItem.title")}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            {t("privacy.seventhItem.paragraph")}
                            {' '}
                            <a
                                href="mailto:fragasebastian1@gmail.com"
                                className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors"
                            >
                                fragasebastian1@gmail.com
                            </a>.
                        </p>
                    </div>
                </div>
            </div >
        </SlidePanel >
    );
}
