import React from 'react';

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

    return (
        <tr className="stripe-dark">
            <td className="pa3">{appCompany}</td>
            <td className="pa3">{appRole}</td>
            <td className="pa3">{appLocation}</td>
            <td className="pa3">{appDate}</td>
            <td className="pa3">{appResponse}</td>
            <td className="pa3">{appLink}</td>
            <td className="pa3">{appNotes}</td>
            <td className="pa1">Edit</td>
            <td className="pa1" onClick={deleteApplication} >Delete</td>
        </tr>
    )
}

export default AppEntry;