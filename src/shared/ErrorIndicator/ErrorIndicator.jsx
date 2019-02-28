import React from 'react';
import { Link } from 'react-router-dom';

const ErrorIndicator = () => {
  return (
    <div className="container pt-5">
      <h1 className="mt-5 text-center">Похоже, что-то пошло не так</h1>
      <p className="mt-3 text-center">
        Попробуйте перезагрузить страницу или вернить на главную
      </p>
      <Link className="mt-3 text-center" to="/">
        Перейти на главную
      </Link>
    </div>
  );
};

export default ErrorIndicator;
