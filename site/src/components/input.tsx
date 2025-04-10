import React from "react";

interface InputContainerProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const InputContainer = ({
  className,
  children,
  ...props
}: InputContainerProps) => {
  return (
    <div className={`${className ?? ""} `} {...props}>
      {children}
    </div>
  );
};
interface InputGroupProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const InputGroup = ({
  className,
  children,
  ...props
}: InputGroupProps) => {
  return (
    <div className={`${className ?? ""} `} {...props}>
      {children}
    </div>
  );
};
interface InputFieldProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const InputField = ({
  className,
  children,
  ...props
}: InputFieldProps) => {
  return (
    <div className={`${className ?? ""} `} {...props}>
      {children}
    </div>
  );
};
interface LabelProps extends React.ComponentProps<"label"> {
  className?: string;
  children: React.ReactNode;
}
export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label className={`${className ?? ""} block`} {...props}>
      {children}
    </label>
  );
};
interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
}
export const Input = ({ className, children, ...props }: InputProps) => {
  return (
    <input className={`${className ?? ""} block outline-none`} {...props} />
  );
};
