import React from 'react';

const MobileMenu = (props) => {
  return (
    <div className="container d-md-none">
      { props.children }
    </div>
  )
};

export default MobileMenu;