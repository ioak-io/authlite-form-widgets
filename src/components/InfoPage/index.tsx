import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  heading: string;
  children: any;
}

const InfoPage = (props: Props) => {

  return <div className='authlite-infopage'>
    <h1>{props.heading}</h1>
    <div>
      {props.children}
    </div>
  </div >;
};

export default InfoPage;
