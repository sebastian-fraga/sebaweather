import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { IconChevronRight, IconExternalLink } from '@tabler/icons-react';

import { settingsConfig, type SettingField } from "../config/settingsConfig";
import { linksConfig } from '../config/linksConfig';
import { useApp } from '../context/AppContext';

import NavBar from '../components/ui/NavBar';
import SettingsModal from '../components/ui/SettingsModal';
import SettingsSection from '../components/ui/SettingsSection';
import NotificationsPanel from '../components/ui/NotificationsPanel';

import "../styles/backgrounds.css";

export default function SettingsPage() {
    const { t } = useTranslation();
    const { state, dispatch } = useApp();
    const { preferences } = state;
    const navigate = useNavigate();

    const [openField, setOpenField] = useState<string | null>(null);
    const [modalField, setModalField] = useState<
        Extract<SettingField, { type: "select" }> | null
    >(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

    const handleFieldClick = (field: (typeof settingsConfig)[number]) => {
        if (field.type === "navigate" && field.key === "notificationsEnabled") {
            setNotificationsPanelOpen(true);
        } else if (field.type === "select") {
            setModalField(field);
            setOpenField(field.key);
        } else if (field.type === "action") {
            if (field.key === "clearFavorites") setConfirmDelete(true);
        }
    };

    const handleLinkClick = (link: (typeof linksConfig)[number]) => {
        if (link.external) {
            const a = document.createElement("a");
            a.href = link.href;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            navigate(link.href);
        }
    };

    const closeModal = () => setOpenField(null);

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <main className="min-h-[90vh] flex flex-col items-center justify-center gap-6 px-8 pb-32">
                    <h2 className="text-4xl font-semibold text-white self-center text-center">
                        {t("settings.title")}
                    </h2>

                    <SettingsSection title={t("settings.sections.preferences")}>
                        {settingsConfig.map((field, i) => (
                            <motion.div
                                key={field.key}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => handleFieldClick(field)}
                                className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer hover:bg-black/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <field.icon
                                        size={32}
                                        stroke={1.75}
                                        className={`p-1.5 rounded-xl ${field.type === "action" && field.destructive
                                            ? "text-red-100 bg-red-500"
                                            : "text-black/90 bg-white/90"
                                            }`}
                                    />
                                    <div>
                                        <p className={`font-medium ${field.type === "action" && field.destructive ? "text-red-100" : "text-white"}`}>
                                            {t(`settings.${field.key}.label`)}
                                            {field.wip ? " 🚧" : ""}
                                        </p>
                                        {"hasDescription" in field && field.hasDescription && (
                                            <p className="text-sm text-white/80">
                                                {t(`settings.${field.key}.description`)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {field.type === "navigate" && (
                                    <IconChevronRight size={20} className="text-white/80" />
                                )}

                                {field.type === "select" && (
                                    <div className="flex items-center gap-1 text-white/80">
                                        <span className="text-sm">
                                            {t(`settings.${field.key}.options.${preferences[field.key as keyof typeof preferences]}`)}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: openField === field.key ? 90 : 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        >
                                            <IconChevronRight size={18} />
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </SettingsSection>

                    <SettingsSection title={t("settings.sections.links")}>
                        {linksConfig.map((link, i) => (
                            <motion.div
                                key={link.key}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (settingsConfig.length + i) * 0.05 }}
                                onClick={() => handleLinkClick(link)}
                                className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer hover:bg-black/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon
                                        size={32}
                                        stroke={1.75}
                                        className="text-black/90 p-1.5 bg-white/90 rounded-xl"
                                    />
                                    <p className="font-medium text-white">
                                        {t(`settings.${link.key}.label`)}
                                        {link.wip ? " 🚧" : ""}
                                    </p>
                                </div>
                                {link.external ? (
                                    <IconExternalLink size={18} className="text-white/80" />
                                ) : (
                                    <IconChevronRight size={18} className="text-white/80" />
                                )}
                            </motion.div>
                        ))}
                    </SettingsSection>
                </main>
            </motion.div>
            <NavBar />

            {modalField && modalField.type === "select" && (
                <SettingsModal
                    isOpen={!!openField}
                    onClose={closeModal}
                    title={t(`settings.${modalField.key}.label`)}
                    options={modalField.options.map((opt) => ({
                        value: opt.value,
                        label: t(`settings.${modalField.key}.options.${opt.value}`),
                    }))}
                    selected={preferences[modalField.key as keyof typeof preferences]}
                    onSelect={(value) =>
                        dispatch({
                            type: "SET_PREFERENCE",
                            payload: {
                                key: modalField.key,
                                value,
                            } as never,
                        })
                    }
                />
            )}

            <SettingsModal
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                title={t("settings.clearFavorites.label")}
                options={[
                    {
                        value: true,
                        label: t("settings.clearFavorites.confirm"),
                        isDestructive: true
                    },
                    {
                        value: false,
                        label: t("settings.clearFavorites.cancel")
                    },
                ]}
                selected={null}
                onSelect={(value) => {
                    if (value) dispatch({ type: "CLEAR_FAVORITES" });
                }}
            />

            <AnimatePresence>
                {notificationsPanelOpen && (
                    <NotificationsPanel onClose={() => setNotificationsPanelOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}