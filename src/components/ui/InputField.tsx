import React, { forwardRef, useMemo, Fragment } from "react";

import Button from "./Button";

import { merge } from "@src/utils";

type Variant = React.ComponentProps<typeof Button>["variant"];

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   labelClassName?: string;
   wrapperClassName?: string;
   variant?: Variant;
   errorMessage?: string;
}

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
   const {
      label,
      labelClassName,
      wrapperClassName,
      className,
      variant,
      errorMessage,
      ...restProps
   } = props;

   const hasError = useMemo(() => !!errorMessage, [errorMessage]);

   return (
      <div className={merge("my-2", wrapperClassName)}>
         <label
            htmlFor={restProps.id}
            className={merge("block text-sm font-semibold ", labelClassName)}
         >
            {label}
         </label>

         <input
            ref={ref}
            className={merge(
               "mt-1 w-full rounded-md  bg-base-100 text-sm  shadow-sm input input-bordered",
               className,
               {
                  ["input-primary"]: variant === "primary",
                  ["input-error"]: variant === "error" || hasError,
                  ["input-secondary"]: variant === "secondary",
                  ["input-ghost"]: variant === "ghost",
                  ["input-info"]: variant === "info",
                  ["input-accent"]: variant === "accent",
                  ["input-neutral"]: variant === "neutral",

                  ["focus:input-primary"]: !variant && !hasError,
               },
            )}
            {...restProps}
         />

         <Fragment>
            {hasError && <p className="mt-1 text-xs text-red-600">{errorMessage}</p>}
         </Fragment>
      </div>
   );
});
export default InputField;
