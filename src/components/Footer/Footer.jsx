import React from 'react';
import Brand from '../Header/Brand/Brand';

const Footer = () => {
  return (
    <div className="bg-secondary">
      <div className="container d-flex justify-content-between align-items-center">
        <Brand />
        <div className="text-white py-3">Copyright @2019</div>
      </div>
    </div>
  );
};

export default Footer;
