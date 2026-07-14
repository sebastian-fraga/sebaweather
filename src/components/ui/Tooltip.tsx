/* eslint-disable react-hooks/refs */
import { cloneElement, isValidElement, useState, type ReactElement, type RefAttributes } from "react";
import {
    useFloating,
    useHover,
    useInteractions,
    offset,
    flip,
    shift,
    FloatingPortal,
    autoUpdate,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
    label: string;
    children: ReactElement<RefAttributes<HTMLElement>>;
    position?: "top" | "bottom";
}

function Tooltip({ label, children, position = "top" }: TooltipProps) {
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: position,
        whileElementsMounted: autoUpdate,
        middleware: [offset(12), flip(), shift({ padding: 8 })],
    });

    const hover = useHover(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    if (!isValidElement(children)) return children;

    return (
        <>
            {cloneElement(children, {
                ref: refs.setReference,
                ...getReferenceProps(),
            })}

            <FloatingPortal>
                <AnimatePresence>
                    {open && (
                        <motion.span
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="hidden sm:block pointer-events-none whitespace-nowrap rounded-lg bg-white px-3 py-1 text-sm text-black z-9999"
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </>
    );
}

export default Tooltip;