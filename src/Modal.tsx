import React, { useRef } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const modalContentRef = useRef(null);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalContentRef.current && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center px-4 py-8'
      onClick={handleBackdropClick}
    >
      <div
        ref={modalContentRef}
        className='bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg w-4/5 max-h-[80vh] mx-auto my-8 overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className='mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-150 ease-in-out'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
