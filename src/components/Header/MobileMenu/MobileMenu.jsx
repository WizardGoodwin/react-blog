import React from 'react';

const MobileMenu = (props) => {
  return (
    <div className="container d-md-none" onClick={() => props.setMenuOpen(false)}>
      { props.children }
    </div>
  )
};

export default MobileMenu;