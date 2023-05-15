import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children: any;
}

const InfoPageDescription = (props: Props) => {
  return <div className='authlite-infopage-description'>
    {props.children}
  </div>;
};

export default InfoPageDescription;
