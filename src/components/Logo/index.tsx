import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children?: any;
}

const Logo = (props: Props) => {
  return <div className='authlite-d1-logo'>
    {props.children}
  </div >;
};

export default Logo;
