import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  title?: string;
  subtitle?: string;
}

const Tagline = (props: Props) => {
  return <div className='authlite-d1-tagline'>
    {props.title && <div className="authlite-d1-tagline__title">{props.title}</div>}
    {props.subtitle && <div className="authlite-d1-tagline__subtitle">{props.subtitle}</div>}
  </div >;
};

export default Tagline;
