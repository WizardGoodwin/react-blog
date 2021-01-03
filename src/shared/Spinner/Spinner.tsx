import React, { FC } from 'react';

import SpinnerImage from '../../assets/images/Spinner.svg';

const Spinner: FC = () => {
  return <img src={SpinnerImage} alt="Loading..." />;
};

export default Spinner;
