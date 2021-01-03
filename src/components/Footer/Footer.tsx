import React, { FC } from 'react';
import Brand from '../Header/Brand/Brand';

const Footer: FC = () => {
  return (
    <div className="fixed-bottom bg-secondary">
      <div className="container d-flex justify-content-between align-items-center">
        <Brand />
        <div className="text-white py-3">Copyright @2019</div>
      </div>
    </div>
  );
};

export default Footer;
