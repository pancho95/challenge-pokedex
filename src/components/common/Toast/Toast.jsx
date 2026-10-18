import { useEffect, useRef } from "react";
import { ToastContainer, ProgressBar } from "./Toast.styles";

export default function Toast({ message, type = "success", onClose }) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current?.();
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
