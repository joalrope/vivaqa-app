import React from 'react';
import { Link } from 'react-router-dom';
//import './not-found.scss';

export const NotFound = () => {
  return (
    <section className='page_404'>
      <h1 className='text-center'>Error 404</h1>
      <div className='four_zero_four_bg'></div>
      <div className='contant_box_404'>
        <h3 className='text-center lost'>Parece que estás perdido</h3>
        <p className='text-center unabled'>La página que buscas no está disponible!</p>
        <Link to='/home' className='text-center link_404'>
          Ir a Inicio
        </Link>
      </div>
    </section>
  );
};
