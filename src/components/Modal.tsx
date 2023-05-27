interface IProps {
  children?: any;
  closeModal?: () => void;
}

const Modal = ({ children, closeModal }: IProps) => {
  return (
    <div
      id="modalWrap"
      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
    >
      <div
        id="modalContainer"
        className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center overflow-auto"
      >
        {children}
      </div>
      <div
        id="modalBackground"
        className="fixed left-0 right-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
        onClick={closeModal}
      />
    </div>
  );
};

export default Modal;
