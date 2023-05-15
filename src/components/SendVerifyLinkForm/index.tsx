import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';

interface Props {
  onSignin: any;
  email: string;
}

const SendVerifyLinkForm = (props: Props) => {

  return (
    <form onSubmit={props.onSignin} className="authlite-d1-sendverifylink-form">
      <div>
        Email verification pending. Please click on the link sent to your email address to activate your user account.
      </div>
      <div>
        <FormElementMessage text='Email Address' type='label' />
        <input disabled className="authlite-input" autoComplete='off' name="email" value={props.email} />
      </div>
      <div className="authlite-action-bar">
        <button className="authlite-primary-button" type="submit">Resend email verification link</button>
        <button className="authlite-button" onClick={props.onSignin}>Sign in now</button>
      </div>
    </form>
  )
};

export default SendVerifyLinkForm;
