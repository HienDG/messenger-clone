"use client";

import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      <Fragment>
         <Fragment>{children}</Fragment>
         <Toaster />
      </Fragment>
   );
};
export default ToasterProvider;
