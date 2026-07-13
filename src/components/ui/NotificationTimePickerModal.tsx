import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import Picker from "react-mobile-picker";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons-react";

interface NotificationTimePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    selected: string;
    onSelect: (time: string) => void;
}

export default function NotificationTimePickerModal({
    isOpen,
    onClose,
    selected,
    onSelect,
}: NotificationTimePickerModalProps) {

    const { t } = useTranslation()

    const [time, setTime] = useState({
        hour: selected?.split(":")[0] || "08",
        minute: selected?.split(":")[1] || "00",
    });

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTime({
                hour: selected.split(":")[0],
                minute: selected.split(":")[1],
            });
        }
    }, [isOpen, selected]);

    const hours = ["06", "07", "08", "09"];
    const minutes = ["00", "15", "30", "45"];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-black/50"
                        onClick={onClose}
                    />

                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="
                            fixed bottom-0 left-0 right-0 z-120
                            mx-auto max-w-md rounded-t-2xl
                            bg-white p-4 pb-8
                        "
                    >
                        <button
                            onClick={onClose}
                            className="
                                absolute right-4 top-3 rounded-full p-1 cursor-pointer transition-colors
                                hover:bg-black/10 hover:text-red-600"
                            aria-label={t("common.closeMenu")}
                        >
                            <IconX />
                        </button>

                        <p className="mb-6 text-center text-lg font-semibold">
                            {t("settings.notificationsPanel.timeLabel")}
                        </p>

                        <Picker value={time} onChange={setTime} wheelMode="natural">
                            <Picker.Column name="hour">
                                {hours.map((hour) => (
                                    <Picker.Item key={hour} value={hour} className="cursor-pointer">
                                        {hour}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>

                            <Picker.Column name="minute">
                                {minutes.map((minute) => (
                                    <Picker.Item key={minute} value={minute} className="cursor-pointer">
                                        {minute}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        </Picker>

                        <button
                            onClick={() => {
                                onSelect(`${time.hour}:${time.minute}`);
                                onClose();
                            }}
                            className="
                                mt-2 w-full rounded-xl
                                bg-purple-500 py-3 text-white cursor-pointer transition-colors hover:bg-purple-600
                            "
                        >
                            {t("settings.notificationsPanel.button")}
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}