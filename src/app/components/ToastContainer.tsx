import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = () => {
  toast.success("📋 Copied to clipboard!", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export default function ToastContainerComponent() {
  return <ToastContainer />;
}
