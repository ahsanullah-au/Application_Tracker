//Component to handle Register functionality

import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface RegisterProps {
  route: string,
  setRoute: Function,
  setUser: Function
}

const Register = ({ route, setRoute, setUser }: RegisterProps) => {
  const [registerState, setRegisterState] = useState({//State to hold Register info
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  //Functions to store input changes in State
  const onFirstNameChange = (event: ChangeEvent) => {
    setRegisterState({
      firstname: (event.target as HTMLTextAreaElement).value,
      lastname: registerState.lastname,
      email: registerState.email,
      password: registerState.password,
    });
  };

  const onLastNameChange = (event: ChangeEvent) => {
    setRegisterState({
      firstname: registerState.firstname,
      lastname: (event.target as HTMLTextAreaElement).value,
      email: registerState.email,
      password: registerState.password,
    });
  };

  const onEmailChange = (event: ChangeEvent) => {
    setRegisterState({
      firstname: registerState.firstname,
      lastname: registerState.lastname,
      email: (event.target as HTMLTextAreaElement).value,
      password: registerState.password,
    });
  };
  const onPasswordChange = (event: ChangeEvent) => {
    setRegisterState({
      firstname: registerState.firstname,
      lastname: registerState.lastname,
      email: registerState.email,
      password: (event.target as HTMLTextAreaElement).value,
    });
  };

  //Submits new account if all values are given and email doesnt already exist
  const onSubmitRegister = (event: MouseEvent) => {
    event.preventDefault();
    if (registerState.firstname && registerState.lastname && registerState.email && registerState.password) {
      fetch('https://obscure-dusk-24459.herokuapp.com/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: registerState.firstname,
          lastname: registerState.lastname,
          email: registerState.email,
          password: registerState.password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            setUser(user);
            setRoute('Home');
          }
          else {
            alert("Email already exists")
          }
        });

    }
    else {
      alert("Please fill out all info")
    }

  };


  return (

    <article className="pa4 black-80">
      <form action="sign-up_submit" acceptCharset="utf-8" method="post">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="firstname">First Name</label>
            <input
              className="pa2 input-reset ba bg-transparent"
              type="text"
              name="firstname"
              id="firstname"
              onChange={(evt) => onFirstNameChange(evt)}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email-address">Last Name</label>
            <input
              className="pa2 input-reset ba bg-transparent"
              type="text"
              name="lastname"
              id="lastname"
              onChange={(evt) => onLastNameChange(evt)}
            />

          </div>
          <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="email"
              name="email-address"
              id="email-address"
              onChange={(evt) => onEmailChange(evt)}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent w-100 measure"
              type="password"
              name="password"
              id="password"
              onChange={(evt) => onPasswordChange(evt)}
            />
          </div>
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Sign Up"
            onClick={(evt) => onSubmitRegister(evt)}
          />
        </div>
        <div className="lh-copy mt3">
          <a
            href="#0"
            className="f6 link dim black db"
            onClick={() => setRoute('SignIn')}
          >
            Already have an account?
          </a>
        </div>
      </form>
    </article>
  );
};

export default Register;
