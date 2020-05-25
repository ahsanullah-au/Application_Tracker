import React, { useState, useEffect } from 'react';
import AppEntry from "../AppEntry/AppEntry"

export interface userType {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    numApps: string,
    lastAppDate: string
}

interface HomeType {
    user: userType,
    setUser: Function,
    setRoute: Function
}




const Home = ({ user, setUser, setRoute }: HomeType) => {

    const [appData, setAppData] = useState<Array<{ [key: string]: string }>>([{ //Lets you index by string, for sorting function
        appID: "",
        appCompany: "",
        appRole: "",
        appLocation: "",
        appDate: "",
        appResponse: "",
        appLink: "",
        appNotes: ""
    }])

    const [newApplication, setNewApplication] = useState({
        newCompany: '',
        newRole: '',
        newLocation: '',
        newDate: '',
        newResponse: '',
        newLink: '',
        newNotes: ''
    })

    const [sortState, setSortState] = useState({ sortType: "ID", sortDirection: 1 })

    const [tableRoute, setTableRoute] = useState("table");


    // eslint-disable-next-line
    useEffect(() => getApplications(), []);//Safe to ignore warning on this because getApplications is not dependent on state

    const getApplications = () => {
        if (user.id) {
            fetch('http://localhost:3001/applications/' + user.id, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(userApps => {
                    setAppData(userApps);
                })
        }

    }

    const addApplication = () => {
        if (user.id && newApplication.newCompany && newApplication.newRole && newApplication.newLocation && newApplication.newDate && newApplication.newResponse && newApplication.newLink) {
            fetch('http://localhost:3001/applications', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: user.id,
                    appCompany: newApplication.newCompany,
                    appRole: newApplication.newRole,
                    appLocation: newApplication.newLocation,
                    appDate: newApplication.newDate,
                    appResponse: newApplication.newResponse,
                    appLink: newApplication.newLink,
                    appNotes: newApplication.newNotes

                })
            })
                .then(response => response.json())
                .then(data => {
                    getApplications();
                    setTableRoute("table");
                })
        }
    }

    const sortApplications = (tempSortType = sortState.sortType, changeSortDirection = 1) => {
        setSortState({
            sortType: tempSortType,
            sortDirection: sortState.sortDirection * -1 * changeSortDirection
        })

        setAppData(appData.sort((a, b) => {

            return ((('' + a[tempSortType]).localeCompare('' + b[tempSortType])) * sortState.sortDirection)
        }))



    }



    const renderTableBody = () => {
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
                    appNotes={appRecord.appNotes}
                    getApplications={getApplications} />
            )
        })
    }

    const renderTableAdd = () => {
        return (
            <article className="pa4 black-80">
                <form action="sign-up_submit" acceptCharset="utf-8" method="post">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Company</label>
                            <input type="text" id="AddCompany" onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }) }} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Role</label>
                            <input type="text" id="AddRole" onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }) }} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Location</label>
                            <input type="text" id="AddLocation" onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }) }} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Date</label>
                            <input type="date" id="AddDate" onChange={(evt) => { setNewApplication({ ...newApplication, newDate: evt.target.value }) }} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Response</label>
                            <select id="AddResponse" onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }) }}>
                                <option>None</option>
                                <option>Interview</option>
                                <option>Accepted</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Link</label>
                            <input type="url" id="AddLink" onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }) }} />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Notes</label>
                            <input type="text" id="AddNotes" onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }) }} />
                        </div>

                    </fieldset>
                    <div className="mt3">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                            type="submit"
                            value="Add"
                            onClick={() => addApplication()}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0"
                            className="f6 link dim black db"
                            onClick={() => setTableRoute("table")} >Cancel</a>
                    </div>
                </form>
            </article>
        )
    }



    if (tableRoute === "table") {
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
                <button onClick={() => setTableRoute("Add")}>Add Entry</button>

                <div className="pa4">
                    <div className="overflow-auto">
                        <table className="f6 w-100 mw8 center" cellSpacing="0">
                            <thead>
                                <tr className="stripe-dark">
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appCompany")} >Company</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appRole")}>Role</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appLocation")}>Location</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appDate")}>Date Applied</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appResponse")}>Response</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appLink")}>Link to Posting</th>
                                    <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications("appNotes")}>Notes</th>

                                </tr>
                            </thead>
                            <tbody className="lh-copy">

                                {renderTableBody()}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )

    }
    else {
        return (
            <div>
                {renderTableAdd()}
            </div>
        )
    }


}

export default Home;