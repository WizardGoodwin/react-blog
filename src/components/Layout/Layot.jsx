import React, { Fragment } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="container row mx-auto mb-5">
        <div className="col-lg-9">{props.children}</div>
        <Sidebar />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
