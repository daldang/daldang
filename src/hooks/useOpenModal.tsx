import { useState } from "react";

export default function useOpenModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const clickModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = "unset";
  };

  return { isOpenModal, clickModal, closeModal };
}
