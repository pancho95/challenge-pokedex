import { useEffect } from "react";
import { ToastContainer, ProgressBar } from "./Toast.styles";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContainer>
      <p>{message}</p>
      <ProgressBar $isError={type === "error"} />
    </ToastContainer>
  );
}
