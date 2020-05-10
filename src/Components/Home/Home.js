import React, { useState } from 'react';
import AppEntry from "../AppEntry/AppEntry"

const Home = ({ user, setUser, setRoute }) => {

    const getApplications = () => {

    }

    const addApplication = () => {

    }

    const [appData, setAppData] = useState([
        { appID: "1", appCompany: "Loblaws", appRole: "Product Lead", appLocation: "Brampton", appDate: "3/5/2020", appResponse: "Accepted", appLink: "loblaws.ca", appNotes: "test" },
        { appID: "2", appCompany: "Loblaws1", appRole: "Product Lead1", appLocation: "Brampton1", appDate: "3/5/20201", appResponse: "Accepted1", appLink: "loblaws.ca1", appNotes: "test1" },
        { appID: "3", appCompany: "Loblaws", appRole: "Product Lead", appLocation: "Brampton", appDate: "3/5/2020", appResponse: "Accepted", appLink: "loblaws.ca", appNotes: "test" },
        { appID: "4", appCompany: "Loblaws1", appRole: "Product Lead1", appLocation: "Brampton1", appDate: "3/5/20201", appResponse: "Accepted1", appLink: "loblaws.ca1", appNotes: "test1" }

    ])

    const renderTable = () => {
        return appData.map(appRecord => {
            return (
                <AppEntry key={"App Key: " + appRecord.appID}
                    appID={appRecord.appID}
                    appCompany={appRecord.appCompany}
                    appRole={appRecord.appRole}
                    appLocation={appRecord.appLocation}
                    appDate={appRecord.appDate}
                    appResponse={appRecord.appResponse}
                    appLink={appRecord.appLink}
                    appNotes={appRecord.appNotes} />
            )
        })
    }

    return (

        < div >
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

            <div className="pa4">
                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <thead>
                            <tr className="stripe-dark">
                                <th className="fw6 tl pa3 bg-white">Company</th>
                                <th className="fw6 tl pa3 bg-white">Role</th>
                                <th className="fw6 tl pa3 bg-white">Location</th>
                                <th className="fw6 tl pa3 bg-white">Date Applied</th>
                                <th className="fw6 tl pa3 bg-white">Response</th>
                                <th className="fw6 tl pa3 bg-white">Link to Posting</th>
                                <th className="fw6 tl pa3 bg-white">Notes</th>

                            </tr>
                        </thead>
                        <tbody className="lh-copy">
                            {renderTable()};
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )

}

export default Home;