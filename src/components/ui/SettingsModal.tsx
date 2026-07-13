import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface SettingsModalProps<T extends string | boolean> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: { value: T; label: string; isDestructive?: boolean }[];
    selected: T | null;
    onSelect: (value: T) => void;
}

export default function SettingsModal<T extends string | boolean>({
    isOpen,
    onClose,
    title,
    options,
    selected,
    onSelect,
}: SettingsModalProps<T>) {

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

    const {t} = useTranslation()
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/50"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="fixed bottom-0 left-0 right-0 z-60 mx-auto max-w-md rounded-t-2xl bg-white p-4 pb-8"
                    >
                        <button
                            className="
                                absolute right-4 top-3 cursor-pointer rounded-full p-1
                                transition-all hover:bg-gray-700/10 hover:text-red-600
                            "
                            onClick={onClose}
                            aria-label={t("common.closeMenu")}
                        >
                            <IconX />
                        </button>

                        <p className="mb-8 text-center text-lg font-semibold text-black/80">
                            {title}
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-2">
                            {options.map((opt, index) => {
                                const isSelected = selected === opt.value;
                                const isLast = index === options.length - 1;

                                let buttonStyles: string;

                                if (isSelected) {
                                    buttonStyles = "border-purple-500 bg-purple-500 text-white";
                                } else if (opt.isDestructive) {
                                    buttonStyles = "bg-red-600 text-white hover:bg-red-700";
                                } else {
                                    buttonStyles = "bg-white text-black border border-black/10 hover:bg-purple-100 hover:border-purple-400/10";
                                }

                                return (
                                    <motion.button
                                        key={String(opt.value)}
                                        whileHover={{ scale: 1.015 }}
                                        whileTap={{ scale: 0.985 }}
                                        onClick={() => {
                                            onSelect(opt.value);
                                            onClose();
                                        }}
                                        className={`
                                            relative flex h-14 items-center justify-center
                                            rounded-xl border cursor-pointer transition-all

                                            ${isLast ? "col-start-2 col-span-2" : ""}
                                            ${buttonStyles}
                                        `}
                                    >
                                        <span className="font-medium">
                                            {opt.label}
                                        </span>

                                        {isSelected && (
                                            <IconCheck
                                                size={16}
                                                className="absolute right-2 top-2"
                                                stroke={3}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}