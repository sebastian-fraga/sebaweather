import { motion } from "framer-motion";
import { IconCheck, IconX } from "@tabler/icons-react";

type StatusAlertProps = {
    type: "success" | "error";
    title: string;
    message: string;
    index?: number;
};

export function NotificationToggleStatus({
    type,
    title,
    message,
    index = 0
}: StatusAlertProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{
                top: `${24 + index * 75}px`
            }}
            className={`fixed right-7 flex items-center gap-3 pl-3 pr-5 py-3 min-w-70 max-w-95 rounded-xl text-white shadow-lg backdrop-blur-md border
                ${type === "success"
                    ? "bg-green-500/50 border-green-400/30"
                    : "bg-red-500/50 border-red-400/30"
                }
            `}
            >
            <div
                className={`
                    flex items-center justify-center w-8 h-8 rounded-full shrink-0
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

            <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold">
                    {title}
                </span>

                <span className="text-sm font-light wrap-break-word">
                    {message}
                </span>
            </div>
        </motion.div >
    );
}
