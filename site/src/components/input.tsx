import React from "react";
import { cn } from "@/lib/utils";
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
    <div className={cn("", className)} {...props}>
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
    <div
      className={cn("border border-border rounded-2xl p-2", className)}
      {...props}
    >
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
    <div className={cn("border border-muted", className)} {...props}>
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
    <label className={cn("block", className)} {...props}>
      {children}
    </label>
  );
};
interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
}
export const Input = ({ className, ...props }: InputProps) => {
  return <input className={cn("block outline-none", className)} {...props} />;
};
interface TextAreaProps extends React.ComponentProps<"textarea"> {
  className?: string;
  value?: string;
}
export const TextArea = ({ className, value, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={cn("outline-none p-2 rounded-xl mb-2", className)}
      value={value}
      {...props}
    ></textarea>
  );
};
