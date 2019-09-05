import React, { FunctionComponent, ReactChildren } from 'react';

interface IProps {
  setMenuOpen(value: boolean): any;
  children: ReactChildren;
}

const MobileMenu: FunctionComponent<IProps> = (props) => {
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
