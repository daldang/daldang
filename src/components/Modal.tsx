/* eslint-disable */
import React, { useRef } from "react";

import { useOnClickOutside } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
  open: boolean;
  disableClickOutside?: boolean;
  onClose(): void;
};

const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      onClose();
    }
  });

  return (
    <div className={`modal${open ? " modal-open" : ""}`}>
      <div
        className="modal-box w-full rounded-none bg-transparent p-0 shadow-none"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
