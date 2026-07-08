import { motion } from "framer-motion";
import { IconCheck, IconX } from "@tabler/icons-react";

type StatusAlertProps = {
    type: "success" | "error";
    message: string;
};

export function NotificationToggleStatus({ type, message }: StatusAlertProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`
                fixed
                right-3
                top-30
                md:top-12
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-white
                shadow-lg
                backdrop-blur-md
                border
                ${type === "success"
                    ? "bg-green-500/50 border-green-400/30"
                    : "bg-red-500/50 border-red-400/30"
                }
            `}
        >
            <div
                className={`
                    flex items-center justify-center
                    w-8 h-8
                    rounded-full
                    ${type === "success"
                        ? "bg-green-500/30"
                        : "bg-red-500/30"
                    }
                `}
            >
                {type === "success" ? (
                    <IconCheck size={18} />
                ) : (
                    <IconX size={18} />
                )}
            </div>

            <span className="text-sm font-medium">
                {message}
            </span>
        </motion.div>
    );
}