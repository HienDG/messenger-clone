import React from "react";

import Sidebar from "./components/Sidebar";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
   return <Sidebar>{children}</Sidebar>;
};
export default MainLayout;
