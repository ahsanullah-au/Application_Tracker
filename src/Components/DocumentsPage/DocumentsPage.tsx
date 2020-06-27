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
  const [uploadState, setUploadState] = useState<UploadStateType>({ url: '', file: null });

  const handleUploadChange = (evt: ChangeEvent) => {
    setUploadState({ url: '', file: (evt.target as HTMLInputElement).files });
  };

  
  const nameAlreadyExists = (fileName: string) => userDocs.some((elem) => elem.fileName === fileName);

  const handleUpload = () => {
    if (uploadState.file && !nameAlreadyExists(uploadState.file[0].name)) {
      const file = uploadState.file[0];


      fetch('http://localhost:3001/docStorage', {
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
        .then((data) => {
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
            return fetch('http://localhost:3001/docAccess', {
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
        .then((newAdd) => getDocs());
    } else if (!uploadState.file) {
      alert('File Not Uploaded');
    } else {
      alert('Filename Already Exists');
    }
  };

  const handleDelete = (tempDocID: string, tempFileURL: string) => {
    if (tempDocID && tempFileURL) {
      fetch('http://localhost:3001/docAccess', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docID: tempDocID,
        }),
      })
        .then((response) => {
          fetch('http://localhost:3001/docStorage', {
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
