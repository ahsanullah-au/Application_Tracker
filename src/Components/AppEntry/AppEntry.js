import React, { useState } from 'react';

const AppEntry = ({ appID, appCompany, appRole, appLocation, appDate, appResponse, appLink, appNotes, getApplications }) => {

    const updateApplication = () => {

    }


    const deleteApplication = () => {

        if (appID) {
            fetch('http://localhost:3001/applications', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appID: appID
                })
            })
                .then(response => response.json())
                .then(data => {
                    getApplications();
                })



        }

    }

    const [newApplication, setNewApplication] = useState([])

    const [modifyState, setModifyState] = useState(0)

    const ChangeModify = () => {
        if (modifyState === 0) {
            return (
                <tr className="stripe-dark w-100">
                    <td className="pa3">{appCompany}</td>
                    <td className="pa3">{appRole}</td>
                    <td className="pa3">{appLocation}</td>
                    <td className="pa3">{appDate.substring(0, 10)}</td>
                    <td className="pa3">{appResponse}</td>
                    <td className="pa3">{appLink}</td>
                    <td className="pa3">{appNotes}</td>
                    <td className="pa1"><button id={"EditApplication" + appID} value="Edit" onClick={() => setModifyState(1)}>Edit</button></td>
                    <td className="pa1"><button id={"DeleteApplication" + appID} value="Delete" onClick={deleteApplication}>Delete</button></td>
                </tr>)
        }
        else {
            return (
                <tr className="stripe-dark w-100">
                    <td className="pa3"><input type="text" id="AddCompany" onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="text" id="AddRole" onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="text" id="AddLocation" onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="date" id="AddDate" onChange={(evt) => { setNewApplication({ ...newApplication, newDate: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="text" id="AddResponse" onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="text" id="AddLink" onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }) }} /></td>
                    <td className="pa3"><input type="text" id="AddNotes" onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }) }} /></td>
                    <td className="pa1"><button id="AddApplication" value="Add" onClick={() => setModifyState(0)} >Cancel</button></td>
                    <td className="pa1"></td>
                </tr>)

        }
    
    }

return (
    <ChangeModify />
)
}

export default AppEntry;