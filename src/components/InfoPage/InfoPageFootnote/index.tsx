import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  children: any;
}

const InfoPageFootnote = (props: Props) => {
  return <div className='authlite-infopage-footnote'>
    {props.children}
  </div>;
};

export default InfoPageFootnote;
