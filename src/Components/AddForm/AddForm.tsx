//Form used to add job applications.
//Connects to Web scraper to pull Indeed postings to autopopulate.


import React, { useState, useEffect } from 'react';

import { userType } from '../../App';

interface newApplicationTypes {
  user: userType,
  setTableRoute: Function,
  getApplications: Function
}

const AddForm = ({ user, setTableRoute, getApplications }: newApplicationTypes) => {
  const [addFormRoute, setAddFormRoute] = useState('choice');//State for which part of this component is being used

  const [scraperInput, setScraperInput] = useState({//State to hold input for scraper
    scraperURL: '',
    scraperSite: 'Indeed',
  });

  const [scrapedValues, setScrapedValues] = useState({//State to hold output from scraper
    jobTitle: '',
    jobLocation: '',
    jobCompanyName: '',
    jobURL: '',
  });

  const getTodaysDate = () => {
    const date = new Date()
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`//Returns today's UTC date and converts to HTML value format
  }

  const [newApplication, setNewApplication] = useState({
    newCompany: scrapedValues.jobCompanyName,
    newRole: scrapedValues.jobTitle,
    newLocation: scrapedValues.jobLocation,
    newDate: getTodaysDate(),
    newResponse: 'None',
    newLink: scrapedValues.jobURL,
    newNotes: '',
  });

  // When scraper values are updated, so are the newApplication values
  // Setting default values below so that scraped values can be used right away
  useEffect(() => {
    setNewApplication({
      newCompany: scrapedValues.jobCompanyName,
      newRole: scrapedValues.jobTitle,
      newLocation: scrapedValues.jobLocation,
      newDate: newApplication.newDate,
      newResponse: newApplication.newResponse,
      newLink: scrapedValues.jobURL,
      newNotes: newApplication.newNotes,
    });

  }, [scrapedValues]);

  //Gets all applications in DB for specific user.
  const getScraperValues = () => {
    if (scraperInput.scraperURL) {
      fetch('http://localhost:3001/scraper', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          URL: scraperInput.scraperURL,
          site: scraperInput.scraperSite,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setScrapedValues(data);
          return scrapedValues;
        })
        .then((data) => setAddFormRoute('form'));
    }
  };

  //Adds applications to DB if all required fields are filled out.
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
          appNotes: newApplication.newNotes,

        }),
      })
        .then((response) => response.json())
        .then((data) => {
          getApplications();
          setTableRoute('table');
        });
    }
    else {
      alert("All fields are required except Notes")
    }
  };



  //Choosing between manual entry and scraper
  if (addFormRoute === 'choice') {
    return (
      <>
        <p className="f2 link dim black pa3 pointer" onClick={() => setAddFormRoute('form')}>Add Manually</p>
        <p className="f2 link dim black pa3 pointer" onClick={() => setAddFormRoute('scraper')}>Add From Indeed Postings</p>
        <p className="f2 link dim black pa3 pointer" onClick={() => setTableRoute('table')}>Cancel</p>
      </>
    );
  }
  //Manual Entry
  if (addFormRoute === 'form') {
    return (
      <>
        <article className="pa4 black-80">
          <form acceptCharset="utf-8" method="post">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Company</label>
                <input type="text" id="AddCompany" defaultValue={scrapedValues.jobCompanyName} onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }); }} />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Role</label>
                <input type="text" id="AddRole" defaultValue={scrapedValues.jobTitle} onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }); }} />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Location</label>
                <input type="text" id="AddLocation" defaultValue={scrapedValues.jobLocation} onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }); }} />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Date</label>
                <input type="date" id="AddDate"
                  defaultValue={getTodaysDate()}
                  onChange={(evt) => { setNewApplication({ ...newApplication, newDate: evt.target.value }); }} />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Response</label>
                <select id="AddResponse" onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }); }}>
                  <option>None</option>
                  <option>Interview</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Link</label>
                <input type="url" id="AddLink" defaultValue={scrapedValues.jobURL} onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }); }} />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6">Notes</label>
                <input type="text" id="AddNotes" onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }); }} />
              </div>

            </fieldset>
            <div className="mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                type="button"
                value="Add"
                onClick={() => addApplication()}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                className="f6 link dim black db"
                onClick={() => setAddFormRoute('choice')}
              >
                Cancel
              </a>
            </div>
          </form>
        </article>
      </>
    );
  }

  //Scraper
  return (
    <>
      <article className="pa4 black-80">
        <form acceptCharset="utf-8" method="post">
          <div className="mt3">
            <label className="db fw4 lh-copy f6">URL to Scrape</label>
            <input
              type="url"
              id="ScraperURL"
              onChange={(evt) => { setScraperInput({ ...scraperInput, scraperURL: evt.target.value }); }}
            />
          </div>
          {/*
          Taking out below while LinkedIn scraper is fixed or changed to API based solution
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Type of Posting</label>
            <select id="AddResponse" onChange={(evt) => { setScraperInput({ ...scraperInput, scraperSite: evt.target.value }); }}>
              <option>LinkedIn</option>
              <option>Indeed</option>
            </select>
          </div>
          */}
          <div className="mt3">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              type="button"
              value="Scrape"
              onClick={() => getScraperValues()}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db"
              onClick={() => setAddFormRoute('choice')}
            >
              Cancel
            </a>
          </div>

        </form>
      </article>

    </>
  );
};

export default AddForm;
