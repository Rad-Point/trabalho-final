"use client";
import { cn } from "@/lib/utils";
interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}
const Wrapper = ({ className, children }: WrapperProps) => {
  return (
    <div className={cn("w-full max-w-[1100px] mx-auto p-4", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
