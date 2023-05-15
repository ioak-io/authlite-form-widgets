import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
  heading: string;
  children: any;
}

const SignupSuccessPage = (props: Props) => {
  return <div>
    {props.children}
  </div>;
};

export default SignupSuccessPage;
