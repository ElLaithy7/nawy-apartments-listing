import { ReactNode } from "react";

import { AnimatePresence } from "framer-motion";
import ErrorMessage from "@/components/alerts/ErrorMessage";
import { Label } from "../label";

type Props = {
  children: ReactNode;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  loading?: boolean;
};

function InputContainer({
  children,
  label,
  description,
  error,
  required = false,
  loading = false,
}: Props) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="space-y-1.5 flex flex-col">
        {label && (
          <div className="flex gap-1">
            <Label>{label}</Label>
            {!required && (
              <span className="text-muted-foreground text-xs">(optional)</span>
            )}
          </div>
        )}
        {children}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <AnimatePresence>
        {error && <ErrorMessage message={error} />}
      </AnimatePresence>
    </div>
  );
}

export default InputContainer;
