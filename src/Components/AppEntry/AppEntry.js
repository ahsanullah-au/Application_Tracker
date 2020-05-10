import React, { useState } from 'react';

const AppEntry = ({ appCompany, appRole, appLocation, appDate, appResponse, appLink, appNotes }) => {

const updateApplication = () => {

}

const deleteApplication = () => {

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
            <td className="pa1">Delete</td>
        </tr>
    )
}

export default AppEntry;