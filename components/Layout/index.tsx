import React from "react";
import Header from "./Header/Header";
interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='root'>
      <div className='hidden'></div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
