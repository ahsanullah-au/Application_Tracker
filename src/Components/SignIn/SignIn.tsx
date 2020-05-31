import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface SignInProps {
    route: string,
    setRoute: Function,
    setUser: Function
}

const SignIn = ({ route, setRoute, setUser }:SignInProps) => {
  const [signInState, setSignInState] = useState({
    email: '',
    password: '',
  });


  const onEmailChange = (event:ChangeEvent) => {
    setSignInState({
      email: (event.target as HTMLTextAreaElement).value,
      password: signInState.password,
    });
  };
  const onPasswordChange = (event:ChangeEvent) => {
    setSignInState({
      email: signInState.email,
      password: (event.target as HTMLTextAreaElement).value,
    });
  };

  const onSubmitSignin = (event:MouseEvent) => {
    event.preventDefault();
    if (signInState.email && signInState.password) {
      fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInState.email,
          password: signInState.password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            setUser(user);
            setRoute('home');
          }
        });
    }
  };

  return (
    <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              onChange={(evt) => onEmailChange(evt)}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
              onChange={(evt) => onPasswordChange(evt)}
            />
          </div>
        </fieldset>
        <div className="">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
            onClick={(evt) => {
              onSubmitSignin(evt);
            }}
          />
        </div>
        <div className="lh-copy mt3">
          <a href="#0" className="f6 link dim black db" onClick={() => setRoute('Register')}>Register For An Account</a>
          {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
        </div>
      </form>
    </main>
  );
};

export default SignIn;
