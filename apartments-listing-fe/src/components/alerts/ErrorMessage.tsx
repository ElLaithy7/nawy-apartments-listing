import { motion } from "framer-motion";

type Props = {
  message: string;
  id?: string;
};

function ErrorMessage({ message, id = "error_message" }: Props) {
  return (
    <motion.p
      id={id}
      className="rounded-sm border border-red-300 bg-red-200 px-3 py-1 text-sm font-semibold shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {message}
    </motion.p>
  );
}

export default ErrorMessage;
