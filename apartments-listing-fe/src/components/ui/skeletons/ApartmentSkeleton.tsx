import { ReactNode } from "react";
import { Skeleton } from "../skeleton";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  loading: boolean;
  children: ReactNode;
  className?: string;
  count?: number;
};

function ApartmentSkeleton({ loading, children, className, count = 8 }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {loading ? <Skeleton className="w-40 h-40" /> : children}
      </motion.div>
    </AnimatePresence>
  );
}

export default ApartmentSkeleton;
