import { useCallback, useState } from 'react';

export const useAppModal = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    onOpen: handleOnOpen,
    onClose: handleOnClose
  };
};