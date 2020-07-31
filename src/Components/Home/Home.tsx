//Main component to show all applications and their respective data

import React, { useState, useEffect } from 'react';
import AppEntry from '../AppEntry/AppEntry';
import AddForm from '../AddForm/AddForm';
import type { userType, userDocsArrayType } from '../../App';

interface HomeType {
  user: userType,
  setUser: Function,
  setRoute: Function
  userDocs: userDocsArrayType,
  getDocs: Function
}

const Home = ({
  user, setUser, setRoute, userDocs, getDocs
}: HomeType) => {
  const [appData, setAppData] = useState<Array<{ [key: string]: string }>>([{ // State to hold all applications, lets you index by string for sorting function
    appID: '',
    appCompany: '',
    appRole: '',
    appLocation: '',
    appDate: '',
    appResponse: '',
    appLink: '',
    appNotes: '',
  }]);


  const [sortState, setSortState] = useState({ sortType: 'ID', sortDirection: 1 });//State to store sort direction and type

  const [tableRoute, setTableRoute] = useState('table');//Toggle if there exist records


  useEffect(() => getApplications(),
    []);

  //Gets Applications from DB.
  const getApplications = () => {
    if (user.id) {
      fetch(`https://obscure-dusk-24459.herokuapp.com/applications/${user.id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((userApps) => {
          setAppData(userApps);
        });
    }
  };

  //Sorts all applications in state
  const sortApplications = (tempSortType = sortState.sortType, changeSortDirection = 1) => {
    setSortState({
      sortType: tempSortType,
      sortDirection: sortState.sortDirection * -1 * changeSortDirection,
    });

    setAppData(appData.sort((a, b) => (((`${a[tempSortType]}`).localeCompare(`${b[tempSortType]}`)) * sortState.sortDirection)));//Sorts based on type and direction
  };

  //Renders all applications
  const renderTableBody = () => appData.map((appRecord) => (
    <AppEntry
      key={`App Key: ${appRecord.appID}`}
      appID={appRecord.appID}
      appCompany={appRecord.appCompany}
      appRole={appRecord.appRole}
      appLocation={appRecord.appLocation}
      appDate={appRecord.appDate}
      appResponse={appRecord.appResponse}
      appLink={appRecord.appLink}
      appNotes={appRecord.appNotes}
      getApplications={getApplications}
      userDocs={userDocs}
      getDocs={getDocs}
    />
  ));

  //Used to get documents when this is rendered
  useEffect(() => getDocs(),
    []);

  //If there are records, it returns a table
  if (tableRoute === 'table') {
    return (

      <>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => {
              setUser({
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                numApps: '',
                lastAppDate: '',
              });
              setRoute('SignIn');
            }}
            className="f2 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>

        <button onClick={() => setTableRoute('Add')}>Add Entry</button>

        <div className="pa4">
          <div className="overflow-auto">
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr className="stripe-dark">
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appCompany')}>Company</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appRole')}>Role</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appLocation')}>Location</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appDate')}>Date Applied</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appResponse')}>Response</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appLink')}>Link to Posting</th>
                  <th className="fw6 tl pa3 bg-white" onClick={() => sortApplications('appNotes')}>Notes</th>

                </tr>
              </thead>
              <tbody className="lh-copy">

                {renderTableBody()}

              </tbody>
            </table>
          </div>
        </div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => {
              setRoute('Docs');
            }}
            className="f2 link dim black underline pa3 pointer"
          >
            Documents
          </p>
        </nav>
      </>
    );
  }
  //Always returns link to form to add more applications.
  return (
    <AddForm user={user} setTableRoute={setTableRoute} getApplications={getApplications} />
  );
};

export default Home;
