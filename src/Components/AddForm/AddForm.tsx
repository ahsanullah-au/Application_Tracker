import React, { useState } from 'react';

import {userType} from "../../App"

interface newApplicationTypes {
    user: userType,    
    setTableRoute: Function,
    getApplications: Function
}

const AddForm = ({user, setTableRoute, getApplications }: newApplicationTypes) => {
    const [addFormRoute, setAddFormRoute] = useState("choice")

    const [scrapedValues, setScrapedValues] = useState({
        jobTitle: "",
        jobLocation: "",
        jobCompanyName: "",
        jobURL: ""

    })

    
    const [newApplication, setNewApplication] = useState({
        newCompany: scrapedValues.jobCompanyName,
        newRole: scrapedValues.jobTitle,
        newLocation: scrapedValues.jobLocation,
        newDate: '',
        newResponse: '',
        newLink: scrapedValues.jobURL,
        newNotes: ''
    })

    const addApplication = () => {
        console.log(newApplication.newCompany)
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


    if (addFormRoute === "choice") {
        return (
            <>
                <p className='f2 link dim black pa3 pointer' onClick={() => setAddFormRoute("form")}>Add Manually</p>
                <p className='f2 link dim black pa3 pointer' onClick={() => setAddFormRoute("scraper")}>Add From LinkedIn or Indeed Postings</p>
                <p className='f2 link dim black pa3 pointer' onClick={() => setTableRoute("table")}>Cancel</p>
            </>
        )


    }
    else if (addFormRoute === 'form') {
        return (
            <>
                <article className="pa4 black-80">
                    <form acceptCharset="utf-8" method="post">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" >Company</label>
                                <input type="text" id="AddCompany" defaultValue={scrapedValues.jobCompanyName} onChange={(evt) => { setNewApplication({ ...newApplication, newCompany: evt.target.value }) }} />
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" >Role</label>
                                <input type="text" id="AddRole" defaultValue={scrapedValues.jobTitle} onChange={(evt) => { setNewApplication({ ...newApplication, newRole: evt.target.value }) }} />
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" >Location</label>
                                <input type="text" id="AddLocation" defaultValue={scrapedValues.jobLocation} onChange={(evt) => { setNewApplication({ ...newApplication, newLocation: evt.target.value }) }} />
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
                                <input type="url" id="AddLink" defaultValue={scrapedValues.jobURL} onChange={(evt) => { setNewApplication({ ...newApplication, newLink: evt.target.value }) }} />
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" >Notes</label>
                                <input type="text" id="AddNotes" onChange={(evt) => { setNewApplication({ ...newApplication, newNotes: evt.target.value }) }} />
                            </div>

                        </fieldset>
                        <div className="mt3">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                                type="button"
                                value="Add"
                                onClick={() => addApplication()}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0"
                                className="f6 link dim black db"
                                onClick={() => setAddFormRoute("choice")} >Cancel</a>
                        </div>
                    </form>
                </article>
            </>
        )
    }

    else {
        return (
            <>
                <article className="pa4 black-80">
                    <form acceptCharset="utf-8" method="post">
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >URL to Scrape</label>
                            <input type="url" id="ScraperURL" />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" >Type of Posting</label>
                            <select id="AddResponse" onChange={(evt) => { setNewApplication({ ...newApplication, newResponse: evt.target.value }) }}>
                                <option>LinkedIn</option>
                                <option>Indeed</option>
                            </select>
                        </div>
                        <div className="mt3">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                                type="submit"
                                value="Scrape"

                            />
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0"
                                className="f6 link dim black db"
                                onClick={() => setAddFormRoute("choice")} >Cancel</a>
                        </div>

                    </form>
                </article>

            </>
        )
    }

}

export default AddForm;