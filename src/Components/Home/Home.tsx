import React, { useState, useEffect, Fragment } from 'react';
import AppEntry from "../AppEntry/AppEntry"
import AddForm from "../AddForm/AddForm"

import type {userType} from "../../App"

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

    if (tableRoute === "table") {
        return (

            <Fragment>
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
            </Fragment>
        )

    }
    else {
        return (
            <AddForm newApplication={newApplication} setNewApplication={setNewApplication} addApplication={addApplication} setTableRoute={setTableRoute}/>
        )
    }


}

export default Home;