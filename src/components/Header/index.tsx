import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children?: any;
}

const Header = (props: Props) => {

  return <div className='authlite-d1-header'>
    {props.children}
  </div >;
};

export default Header;
