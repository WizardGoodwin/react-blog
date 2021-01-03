import React, { FC } from 'react';

interface IProps {
  setMenuOpen(value: boolean): any;
}

const MobileMenu: FC<IProps> = (props) => {
  return (
    <div
      className="container d-md-none"
      onClick={() => props.setMenuOpen(false)}
    >
      {props.children}
    </div>
  );
};

export default MobileMenu;
