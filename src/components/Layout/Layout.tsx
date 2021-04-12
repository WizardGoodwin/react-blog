import React, { FC } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';


const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container row mx-auto mb-5">
        <div className="col-lg-9">{children}</div>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
