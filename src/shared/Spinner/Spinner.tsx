import React, { FC } from 'react';

import SpinnerImage from '../../assets/images/Spinner.svg';

const Spinner: FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'middle'
    }}>
      <img src={SpinnerImage} alt="Loading..." />
    </div>
  );
};

export default Spinner;
