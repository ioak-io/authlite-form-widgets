import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children: any;
}

const InfoPageBody = (props: Props) => {
  return <div className='authlite-infopage-body'>
    {props.children}
  </div>;
};

export default InfoPageBody;
