import { useState } from 'react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { IconChevronRight, IconExternalLink } from '@tabler/icons-react';

import { settingsConfig, type SettingField } from "../config/settingsConfig";
import { linksConfig } from '../config/linksConfig';
import { useApp } from '../context/AppContext';

import NavBar from '../components/ui/NavBar';
import SettingsModal from '../components/ui/SettingsModal';
import SettingsSection from '../components/ui/SettingsSection';

import "../styles/backgrounds.css";

export default function SettingsPage() {

    const { state, dispatch } = useApp();
    const { preferences } = state;
    const navigate = useNavigate();

    const [openField, setOpenField] = useState<string | null>(null);
    const [modalField, setModalField] = useState<Extract<SettingField, { type: "select" }> | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleFieldClick = (field: (typeof settingsConfig)[number]) => {
        if (field.type === "toggle" && field.key === "notificationsEnabled") {
            dispatch({
                type: "SET_PREFERENCE",
                payload: { key: field.key, value: !preferences.notificationsEnabled, },
            });
        } else if (field.type === "select") {
            setModalField(field);
            setOpenField(field.key);
        } else if (field.type === "action") {
            if (field.key === "clearFavorites") setConfirmDelete(true);
        }
    };

    const handleLinkClick = (link: (typeof linksConfig)[number]) => {
        if (link.external) {
            window.open(link.href, "_blank", "noopener,noreferrer");
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
                        Configuración
                    </h2>

                    <SettingsSection title="Preferencias">
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
                                            {field.label}
                                        </p>
                                        {"description" in field && field.description && (
                                            <p className="text-sm text-white/80">{field.description}</p>
                                        )}
                                    </div>
                                </div>

                                {field.type === "toggle" && (
                                    <ToggleSwitch checked={preferences[field.key] as boolean} />
                                )}

                                {field.type === "select" && (
                                    <div className="flex items-center gap-1 text-white/80">
                                        <span className="text-sm">
                                            {field.options.find((o) => o.value === preferences[field.key as keyof typeof preferences])?.label}
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

                    <SettingsSection title="Links">
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
                                    <p className="font-medium text-white">{link.label}</p>
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
                    title={modalField.label}
                    options={modalField.options}
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

            {confirmDelete && (
                <SettingsModal
                    isOpen={confirmDelete}
                    onClose={() => setConfirmDelete(false)}
                    title="¿Eliminar favoritos?"
                    options={[
                        { value: true, label: "Eliminar" },
                        { value: false, label: "Cancelar" },
                    ]}
                    selected={null}
                    onSelect={(value) => {
                        if (value) dispatch({ type: "CLEAR_FAVORITES" });
                    }}
                />
            )}
        </>
    );
}

function ToggleSwitch({ checked }: { checked: boolean }) {
    return (
        <div
            className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-indigo-500" : "bg-white/20"}`}
            aria-checked={checked}
            role="switch"
        >
            <motion.span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
                animate={{ left: checked ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </div>
    );
}