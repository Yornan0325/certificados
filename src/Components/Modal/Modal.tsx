import { X } from "lucide-react";
import { useUserStore } from "../../Context/context";

interface ModalProps {
    children: React.ReactNode;
    title:string
  }

  const Modal: React.FC<ModalProps> = ({children,title}) => {
    const { isModalOpen, closeModal } = useUserStore();
    if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
