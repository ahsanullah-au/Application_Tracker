import React, { useState } from 'react';



const Register = ({ route, setRoute }) => {

    const [registerState, setRegisterState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })


    const onFirstNameChange = (event) => {
        setRegisterState({
            firstname: event.target.value,
            lastname: registerState.lastname,
            email: registerState.email,
            password: registerState.password
        })
    }

    const onLastNameChange = (event) => {
        setRegisterState({
            firstname: registerState.firstname,
            lastname: event.target.value,
            email: registerState.email,
            password: registerState.password
        })
    }

    const onEmailChange = (event) => {
        setRegisterState({
            firstname: registerState.firstname,
            lastname: registerState.lastname,
            email: event.target.value,
            password: registerState.password
        })
    }
    const onPasswordChange = (event) => {
        setRegisterState({
            firstname: registerState.firstname,
            lastname: registerState.lastname,
            email: registerState.email,
            password: event.target.value
        })
    }


    return (
        <article className="pa4 black-80">
            <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="firstname">First Name</label>
                        <input className="pa2 input-reset ba bg-transparent"
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={(evt) => onFirstNameChange(evt)}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Last Name</label>
                        <input className="pa2 input-reset ba bg-transparent"
                            type="text"
                            name="lastname"
                            id="lastname"
                            onChange={(evt) => onLastNameChange(evt)}
                        />

                    </div>
                    <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={(evt) => onEmailChange(evt)}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent w-100 measure"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(evt) => onPasswordChange(evt)}
                        />
                    </div>
                </fieldset>
                <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                    type="submit"
                    value="Sign Up"
                    onClick={(evt) => {
                        console.log(registerState);
                        evt.preventDefault();
                    }}
                />
                </div>
                <div className="lh-copy mt3">
                    <a href="#0"
                        className="f6 link dim black db"
                        onClick={() => setRoute("SignIn")} >Already have an account?</a>
                </div>
            </form>
        </article>
    )

}

export default Register;