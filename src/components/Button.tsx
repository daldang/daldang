export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary = (props: ButtonProps) => {
  return (
    <button className="btn-accent btn text-white" {...props}>
      {props.children}
    </button>
  );
};

export const ButtonSecondary = (props: ButtonProps) => {
  return (
    <button className="btn-outline btn-primary btn text-white" {...props}>
      {props.children}
    </button>
  );
};
