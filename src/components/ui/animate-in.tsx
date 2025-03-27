import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "left" | "right" | "top";
}

export const AnimateIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  from = "bottom"
}: AnimateInProps) => {
  const directions = {
    bottom: { y: 10, x: 0 },
    left: { x: -10, y: 0 },
    right: { x: 10, y: 0 },
    top: { y: -10, x: 0 },
  };

  return (
    <motion.div
      initial={{ 
        ...directions[from],
        opacity: 0 
      }}
      animate={{ 
        x: 0,
        y: 0,
        opacity: 1 
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}; 