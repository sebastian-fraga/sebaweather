import { useDragControls, motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SlidePanelProps = PropsWithChildren<{
    onClose?: () => void;
}>;

export default function SlidePanel({ children, onClose }: SlidePanelProps) {

    const dragControls = useDragControls();
    return (
        <motion.div
            drag="x"
            dragListener={false}
            dragControls={dragControls}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.08}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
                if (info.offset.x > 120 || info.velocity.x > 600) {
                    onClose?.();
                }
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ touchAction: "pan-y" }}
            className="fixed inset-0 h-dvh flex flex-col bg-linear-150 from-purple-950 via-indigo-950 to-black overflow-hidden"
        >
            <div
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute inset-y-0 left-0 w-4 z-10 touch-none flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <div className="w-1 h-22 rounded-full bg-white/20" />
            </div>
            {children}
        </motion.div>
    );
}