import React from "react";

type UseModalHook<T = boolean, U = any> = (
  initialState?: T,
  initialData?: U
) => {
  isOpen: T;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  data: U;
  setData: React.Dispatch<React.SetStateAction<U>>;
};

const useModal: UseModalHook = (initialState = false, initialData = null) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  const [data, setData] = React.useState(initialData);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    setData(initialData);
  }, []);

  const toggleModal = React.useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    data,
    setData,
  };
};

export default useModal;
