import React, { useState, useEffect } from 'react';
import AppEntry from "../AppEntry/AppEntry"

const Home = ({ user, setUser, setRoute }) => {

    const [appData, setAppData] = useState([])

    const [newApplication, setNewApplication] = useState([])

    const [sortState, setSortState] = useState({ sortType: "ID", sortDirection: 1 })

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
            <tr className="stripe-dark w-100">
                <td className="pa3"><input type="text" id="AddCompany" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }) }} /></td>
                <td className="pa3"><input type="text" id="AddRole" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }) }} /></td>
                <td className="pa3"><input type="text" id="AddLocation" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }) }} /></td>
                <td className="pa3"><input type="date" id="AddDate" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newDate: evt.target.value }) }} /></td>
                <td className="pa3">
                    <select id="AddResponse" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }) }}>
                        <option>None</option>
                        <option>Interview</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                    </select>
                </td>
                <td className="pa3"><input type="url" id="AddLink" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }) }} /></td>
                <td className="pa3"><input type="text" id="AddNotes" form='AddForm' onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }) }} /></td>
                <td className="pa1"><button type="submit"  id="AddApplication" form='AddForm' value="Add" onClick={() => addApplication()} >Add</button></td>
                <td className="pa1"></td>
            </tr>)
    }
    // eslint-disable-next-line
    useEffect(() => getApplications(), []);//Safe to ignore warning on this because getApplications is not dependent on state

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
                            {renderTableAdd()}
                            {renderTableBody()}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )

}

export default Home;