import React from 'react';

const Home = ({ user, setUser, setRoute }) => {

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => {
                    setUser({
                        id: "",
                        firstname: "",
                        lastname: "",
                        email: "",
                        numApps: "",
                        lastAppDate: ""
                    })
                    setRoute('SignIn');
                }
                }
                    className='f2 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>


            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.email}</p>
            <p>{user.numApps}</p>
            <p>{user.lastAppDate}</p>
        </div>
    )

}

export default Home;