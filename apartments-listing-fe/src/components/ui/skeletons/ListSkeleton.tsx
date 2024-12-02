import { ReactNode } from "react";
import { Skeleton } from "../skeleton";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  loading: boolean;
  children: ReactNode;
  className?: string;
  count?: number;
};

function ListSkeleton({ loading, children, className, count = 8 }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {loading ? (
          <div className="space-y-default border rounded-md p-2">
            <div className="flex mb-4">
              <Skeleton className="w-40 h-9 me-auto" />
            </div>
            <div
              className="grid grid-rows-5 p-3 gap-x-5 gap-y-6"
              style={{
                gridTemplateColumns: `repeat(${4}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${10}, minmax(0, 1fr));`,
              }}
            >
              {Array.from({ length: count }).map((_, index) => (
                <Skeleton key={index} className="w-full h-10" />
              ))}
            </div>
          </div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default ListSkeleton;
