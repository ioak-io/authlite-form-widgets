import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children: any;
}

const Placeholder = (props: Props) => {
  return <div className='authlite-placeholder'>
    {props.children}
  </div >;
};

export default Placeholder;
