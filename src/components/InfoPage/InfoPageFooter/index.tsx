import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children: any;
}

const InfoPageFooter = (props: Props) => {
  return <div className='authlite-infopage-footer'>
    {props.children}
  </div>;
};

export default InfoPageFooter;
