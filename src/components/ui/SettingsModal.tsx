import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconCheck } from "@tabler/icons-react";

interface SettingsModalProps<T extends string | boolean> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: { value: T; label: string }[];
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
                        className="fixed bottom-0 left-0 right-0 z-100 mx-auto max-w-md rounded-t-2xl bg-white p-4 pb-8"
                    >
                        <button className="absolute right-4 top-3 transition-all cursor-pointer hover:bg-gray-700/10 hover:text-red-600 rounded-4xl p-1"
                            onClick={() => {
                                onClose();
                            }}>
                            <IconX />
                        </button>
                        <p className="mb-4 text-center text-lg font-semibold text-black/80">{title}</p>
                        <div className="space-y-0.5">
                            {options.map((opt) => (
                                <button
                                    key={String(opt.value)}
                                    onClick={() => {
                                        onSelect(opt.value);
                                        onClose();
                                    }}
                                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-black/5 cursor-pointer transition-all"
                                >
                                    <span className="text-black/80">{opt.label}</span>
                                    {selected === opt.value && (
                                        <IconCheck size={22} stroke={4} className="text-white bg-purple-500 rounded-4xl p-1" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}