import React from 'react';

const Register = ({route, setRoute}) => {

    return (
        <article class="pa4 black-80">
            <form action="sign-up_submit" method="get" accept-charset="utf-8">
                <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f4 fw6 ph0 mh0">Sign Up</legend>
                    <div class="mt3">
                        <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
                        <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" id="email-address" />
                    </div>
                    <div class="mt3">
                        <label class="db fw4 lh-copy f6" for="password">Password</label>
                        <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up" /></div>
                <div className="lh-copy mt3">
                    <a href="#0" className="f6 link dim black db" onClick = {() => setRoute("SignIn")} >Already have an account?</a>
                </div>
            </form>
        </article>
    )

}

export default Register;