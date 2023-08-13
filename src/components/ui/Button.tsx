"use client";

import React from "react";

import { merge } from "@src/utils";

type ButtonVariant =
   | "neutral"
   | "primary"
   | "secondary"
   | "accent"
   | "info"
   | "success"
   | "warning"
   | "error"
   | "ghost";

interface ButtonProps
   extends React.PropsWithChildren,
      React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: ButtonVariant;
   isOutline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   children,
   className,
   variant,
   isOutline,
   ...restProps
}) => {
   return (
      <button
         className={merge("btn", className, {
            ["btn-outline"]: isOutline,
            ["btn-primary"]: variant === "primary",
            ["btn-secondary"]: variant === "secondary",
            ["btn-neutral"]: variant === "neutral",
            ["btn-accent"]: variant === "accent",
            ["btn-info"]: variant === "info",
            ["btn-success"]: variant === "success",
            ["btn-warning"]: variant === "warning",
            ["btn-error"]: variant === "error",
            ["btn-ghost"]: variant === "ghost",
         })}
         {...restProps}
      >
         {children}
      </button>
   );
};
export default Button;
