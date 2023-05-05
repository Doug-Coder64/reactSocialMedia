import React from "react";
import Header from "./Header";
import Head from "next/head";
interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='root'>
      <Head>
        <title>React Social Media</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='hidden'></div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
