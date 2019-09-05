import React, { FunctionComponent } from 'react';

import SpinnerImage from '../../assets/images/Spinner.svg';

const Spinner: FunctionComponent = () => {
  return <img src={SpinnerImage} alt="Loading..." />;
};

export default Spinner;
