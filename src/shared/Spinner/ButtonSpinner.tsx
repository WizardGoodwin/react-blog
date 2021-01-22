import React, { FC } from 'react';

import SpinnerImage from '../../assets/images/Spinner.svg';


interface IProps {
  className?: string;
}

const ButtonSpinner: FC<IProps> = ({ className }) => {
  return (
      <img width={50} src={SpinnerImage} alt="Loading..." className={className} />
  );
};

export default ButtonSpinner;
