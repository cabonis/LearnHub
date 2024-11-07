import { useState, useCallback } from 'react';

const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const open = useCallback((message, onConfirm, onCancel) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    close();
  }, [onConfirm, close]);

  const handleCancel = useCallback(() => {
    onCancel();
    close();
  }, [onCancel, close]);

  return {
    isOpen,
    message,
    open,
    close,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirm;