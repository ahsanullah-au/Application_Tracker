import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import type { userDocsType, userDocsArrayType } from '../../App';


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
  userDocs: userDocsArrayType,
  getDocs: Function
}

const AppEntry = ({
  appID, appCompany, appRole, appLocation, appDate, appResponse, appLink, appNotes, getApplications, userDocs, getDocs
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

  const [modifyDocs, setModifyDocs] = useState(0)

  const [viewDocs, setViewDocs] = useState(0)

  const [appLinkedDocs, setAppLinkedDocs] = useState([""])

  const [linkedDocsSelector, setLinkedDocsSelector] = useState([""])


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
    else{
      alert("All fields are required except Notes")
    }
  };

  const getLinkedDocs = () => {

    if (appID) {
      fetch(`http://localhost:3001/docLink/${appID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((appDocs) => {
          setAppLinkedDocs(appDocs);
        });
    }

  }


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

  const docMatcher = (docID: string) => {
    return userDocs.map(docElement => {

      if (docElement.docID.toString() === docID) {

        return (
          <>
            <a href={docElement.fileURL} target="_blank" rel="noopener noreferrer">{docElement.fileName}</a>
            <br />
          </>

        )
      }
      else {
        return null
      }

    })
  }

  const docSelector = (docElem: userDocsType) => {
    return <option value={docElem.docID}>{docElem.fileName}</option>
  }

  const handleSelectChange = (evt: ChangeEvent) => {
    let options = (evt.target as HTMLSelectElement).options;
    let values = [...options].filter(o => o.selected).map(o => o.value); //Filters out selected values
    setLinkedDocsSelector(values)
    console.log(values)
  }

  const updateSelectedDocs = (evt: MouseEvent) => {
    if (appID) {
      fetch('http://localhost:3001/docLink', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appID,
          docArray: linkedDocsSelector
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setModifyDocs(0)
          setLinkedDocsSelector([""])
          getLinkedDocs();
        });

    }
  }

  const availableDocs = () => {
    if (viewDocs) {
      return (
        <>
          <td colSpan={15}>
            {(appLinkedDocs && appLinkedDocs[0]) ? appLinkedDocs.map(docID => docMatcher(docID)) : <p>No Linked Docs for this Application</p>}

            <br />
            <button id="CancelViewingDocs" value="Cancel" onClick={() => setViewDocs(0)}>Close</button>
          </td>
        </>
      )
    }
    else if (modifyDocs) {

      return (
        <>
          <td colSpan={15}>
            <select name="linkedDocs" id="linkedDocs" multiple onChange={evt => handleSelectChange(evt)}>
              {userDocs ? userDocs.map(docElem => docSelector(docElem)) : <p>No Docs Available</p>}
            </select>
            <br />
            <button id="AddLinkingDocs" onClick={(evt) => updateSelectedDocs(evt)}>Update</button>
            <button id="CancelLinkingDocs" onClick={() => setModifyDocs(0)}>Cancel</button>
          </td>


        </>
      )
    }
    else {
      return null;
    }
  }

  useEffect(() => getLinkedDocs(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);


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
            <a href={appLink} target="_blank" rel="noopener noreferrer">{appLink}</a>
          </td>
          <td className="pa3">{appNotes}</td>
          <td className="pa1"><button id={`EditApplication${appID}`} value="Edit" onClick={() => setModifyState(1)}>Edit</button></td>
          <td className="pa1"><button id={`DeleteApplication${appID}`} value="Delete" onClick={deleteApplication}>Delete</button></td>
          <td className="pa1"><button id={`ViewDocs${appID}`} value="ViewDocs" onClick={() => {setViewDocs(1 - viewDocs); setModifyDocs(0)}}>View Docs</button></td>
          <td className="pa1"><button id={`LinkDocs${appID}`} value="LinkDocs" onClick={() => {setModifyDocs(1 - modifyDocs); setViewDocs(0)}}>Link Docs</button></td>


        </tr>
        {availableDocs()}
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
