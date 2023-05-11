import React, { useEffect, useState } from 'react';
import './style.css';
import LoginForm from './LoginForm';

interface Props {
}

const DesignOne = (props: Props) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSignin = (event: any) => {
    event.preventDefault();

  }

  return <div className='authlite-d1'>
    <div className="authlite-d1__left" />
    <div className="authlite-d1__right">
      <div className="authlite-d1__right__overlay">
        <LoginForm />
      </div>
    </div>
  </div >;
};

export default DesignOne;
