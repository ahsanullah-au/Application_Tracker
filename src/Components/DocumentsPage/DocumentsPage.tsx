//Component to view and add documents

import React, { useState, ChangeEvent } from 'react';
import type { userType, userDocsArrayType } from '../../App';

interface DocPageType {
  user: userType,
  setRoute: Function
  userDocs: userDocsArrayType,
  setUserDocs: Function
  getDocs: Function
}

interface UploadStateType {
  url: string,
  file: null | FileList
}


const DocumentsPage = ({
  user, setRoute, userDocs, setUserDocs, getDocs
}: DocPageType) => {
  const [uploadState, setUploadState] = useState<UploadStateType>({ url: '', file: null });//State to store Url and File

  const handleUploadChange = (evt: ChangeEvent) => {
    setUploadState({ url: '', file: (evt.target as HTMLInputElement).files });//Adds file to State
  };

  //Checks for filename as there cant be duplicate
  const nameAlreadyExists = (fileName: string) => userDocs.some((elem) => elem.fileName === fileName);

  //Uploads doc to AWS S3 Bucket using presigned URL from Backend and adds record to DB
  const handleUpload = () => {
    if (uploadState.file && !nameAlreadyExists(uploadState.file[0].name)) {
      const file = uploadState.file[0];


      fetch('https://obscure-dusk-24459.herokuapp.com/docStorage', {//Gets presigned URL for doc
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.id,
          fileName: file.name.split('.')[0],
          fileType: file.name.split('.')[1],
        }),
      })
        .then((data) => data.json())
        .then((data) => {//Uploads doc using presigned URL
          const url = data.returnURL;
          return fetch(data.signedRequest, { method: 'PUT', body: file })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
              }
              return url;
            });
        })
        .then((url) => {
          if (!user.id || !file.name || !url) {
            throw new Error('Missing User or Files');
          } else {
            return fetch('https://obscure-dusk-24459.herokuapp.com/docAccess', {//Saves Document in Backend if upload was successful
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userID: user.id,
                fileName: file.name,
                fileURL: url,
              }),
            });
          }
        })
        .then((newAdd) => getDocs())
        .catch(err => alert("Upload Error"))
    } else if (!uploadState.file) {
      alert('No File Given');
    } else {
      alert('Filename Already Exists');
    }
  };

  //Deletes document record from DB and document from S3 Bucket
  const handleDelete = (tempDocID: string, tempFileURL: string) => {
    if (tempDocID && tempFileURL) {
      fetch('https://obscure-dusk-24459.herokuapp.com/docAccess', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docID: tempDocID,
        }),
      })
        .then((response) => {
          fetch('https://obscure-dusk-24459.herokuapp.com/docStorage', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              URL: tempFileURL,
            }),
          });
        })
        .then((data) => getDocs());
    }
  };

  //Renders each document
  const renderTableBody = () => userDocs.map((docRecord) => (
    <tr className="stripe-dark w-100" key={docRecord.docID}>
      <td className="pa3 center">{docRecord.fileName}</td>
      <td className="pa3 center"><a href={docRecord.fileURL} target="_blank" rel="noopener noreferrer">Link</a></td>

      <td className="pa1 center"><button value="Delete" onClick={(evt) => handleDelete(docRecord.docID, docRecord.fileURL)}>Delete</button></td>
    </tr>
  ));



  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => { setRoute('Home'); }} className="f2 link dim black underline pa3 pointer">Go Back</p>
      </nav>
      <h1>Upload</h1>
      <input onChange={(evt) => handleUploadChange(evt)} type="file" />
      <button onClick={(evt) => handleUpload()}>UPLOAD</button>
      <br />

      <table className="f6 mw8 center" cellSpacing="0">
        <thead>
          <tr className="stripe-dark">
            <th className="fw6 tl pa3 bg-white left">Doc Name</th>
            <th className="fw6 tl pa3 bg-white left">Link</th>

          </tr>
        </thead>

        <tbody className="lh-copy">
          {renderTableBody()}
        </tbody>
      </table>

    </>
  );
};

export default DocumentsPage;
