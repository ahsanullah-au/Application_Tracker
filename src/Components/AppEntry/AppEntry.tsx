import React, { useState } from 'react';
import DocLinker from '../DocLinker/DocLinker';
import type { userDocsArrayType } from '../../App';


interface AppEntryProps {
  appID: string,
  appCompany: string,
  appRole: string,
  appLocation: string,
  appDate: string,
  appResponse: string,
  appLink: string,
  appNotes: string,
  getApplications: Function,
  userDocs: userDocsArrayType
}

const AppEntry = ({
  appID, appCompany, appRole, appLocation, appDate, appResponse, appLink, appNotes, getApplications, userDocs,
}: AppEntryProps) => {
  const [newApplication, setNewApplication] = useState({
    newCompany: appCompany,
    newRole: appRole,
    newLocation: appLocation,
    newDate: appDate,
    newResponse: appResponse,
    newLink: appLink,
    newNotes: appNotes,
  });

  const [modifyState, setModifyState] = useState(0);


  const updateApplication = () => {
    if (appID && newApplication.newCompany && newApplication.newRole && newApplication.newLocation && newApplication.newDate && newApplication.newResponse && newApplication.newLink) {
      fetch('http://localhost:3001/applications', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appID,
          appCompany: newApplication.newCompany,
          appRole: newApplication.newRole,
          appLocation: newApplication.newLocation,
          appDate: newApplication.newDate,
          appResponse: newApplication.newResponse,
          appLink: newApplication.newLink,
          appNotes: newApplication.newNotes,

        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setModifyState(0);
          getApplications();
        });
    }
  };


  const deleteApplication = () => {
    if (appID) {
      fetch('http://localhost:3001/applications', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appID,
        }),
      })
        .then((response) => response.json())
        .then((data) => getApplications());
    }
  };

  
  if (modifyState === 0) {
    return (
      <>
        <tr className="stripe-dark w-100">
          <td className="pa3">{appCompany}</td>
          <td className="pa3">{appRole}</td>
          <td className="pa3">{appLocation}</td>
          <td className="pa3">{appDate.substring(0, 10)}</td>
          <td className="pa3">{appResponse}</td>
          <td className="pa3">
            <a href={appLink}>{appLink}</a>
          </td>
          <td className="pa3">{appNotes}</td>
          <td className="pa1"><button id={`EditApplication${appID}`} value="Edit" onClick={() => setModifyState(1)}>Edit</button></td>
          <td className="pa1"><button id={`DeleteApplication${appID}`} value="Delete" onClick={deleteApplication}>Delete</button></td>
        </tr>
        <td colSpan={10}>
          <form>
            <input type="checkbox" id="Doc1" name="Doc1" value="Doc1" />
            <label htmlFor="Doc1"> Doc1</label><br />
            <input type="checkbox" id="Doc2" name="Doc2" value="Doc2" />
            <label htmlFor="Doc2">Doc2</label><br />
            <input type="checkbox" id="Doc3" name="Doc3" value="Doc3" />
            <label htmlFor="Doc3">Doc3</label><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </td>
      </>
    );
  }

  return (
    <tr className="stripe-dark w-100">
      <td className="pa3"><input type="text" id="ModifyCompany" defaultValue={appCompany} onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }); }} /></td>
      <td className="pa3"><input type="text" id="ModifyRole" defaultValue={appRole} onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }); }} /></td>
      <td className="pa3"><input type="text" id="ModifyLocation" defaultValue={appLocation} onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }); }} /></td>
      <td className="pa3"><input type="date" id="ModifyDate" defaultValue={appDate.substring(0, 10)} onChange={(evt) => { setNewApplication({ ...newApplication, newDate: evt.target.value }); }} /></td>
      <td className="pa3">
        <select id="ModifyResponse" onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }); }}>
          <option>None</option>
          <option>Interview</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
      </td>
      <td className="pa3"><input type="url" id="ModifyLink" defaultValue={appLink} onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }); }} /></td>
      <td className="pa3"><input type="text" id="ModifyNotes" defaultValue={appNotes} onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }); }} /></td>
      <td className="pa1"><button id="AddUpdatedApplication" value="Submit" onClick={() => updateApplication()}>Update</button></td>
      <td className="pa1"><button id="CancelUpdatedApplication" value="Cancel" onClick={() => setModifyState(0)}>Cancel</button></td>

    </tr>
  );
};

export default AppEntry;
