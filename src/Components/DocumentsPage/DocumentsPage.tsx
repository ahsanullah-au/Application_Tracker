import React, { useState, useEffect, ChangeEvent } from 'react';

import type { userType, userDocsArrayType } from '../../App';

interface DocPageType {
    user: userType,
    setRoute: Function
    userDocs: userDocsArrayType,
    setUserDocs: Function
}

interface UploadStateType {
    success: boolean,
    url: string,
    file: null | FileList
}


const DocumentsPage = ({ user, setRoute, userDocs, setUserDocs }: DocPageType) => {
    useEffect(() => getDocs(), []);

    const [uploadState, setUploadState] = useState<UploadStateType>({ success: false, url: "", file: null })

    const [uploadedDoc, setUploadedDoc] = useState({ filename: "", fileURL: "" })

    const handleUploadChange = (evt: ChangeEvent) => {
        setUploadState({ success: false, url: "", file: (evt.target as HTMLInputElement).files })
    }

    const getDocs = () => {
        if (user.id) {
            fetch(`http://localhost:3001/docAccess/${user.id}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((userApps) => {
                    setUserDocs(userApps);
                });
        }
    };


    const handleUpload = () => {
        if (uploadState.file) {
            const file = uploadState.file[0]

            fetch('http://localhost:3001/docStorage', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user.id,
                    fileName: file.name.split('.')[0],
                    fileType: file.name.split('.')[1]
                }),
            })
                .then(data => data.json())
                .then(data => {
                    const url = data.returnURL
                    return fetch(data.signedRequest, { method: 'PUT', body: file })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`${response.status}: ${response.statusText}`);
                            }
                            return url;
                        })
                })
                .then(url => {
                    if (!user.id || !file.name || !url) {
                        throw new Error("Missing User or Files")
                    }
                    else {
                        fetch('http://localhost:3001/docAccess', {
                            method: 'post',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                userID: user.id,
                                fileName: file.name,
                                fileURL: url
                            })
                        })
                    }
                })
                .then(newAdd => getDocs())

        }



    }

    const renderTableBody = () => userDocs.map((docRecord) => {
        return (
            <tr className="stripe-dark w-100">
                <td className="pa3">{docRecord.fileName}</td>
                <td className="pa3"><a href={docRecord.fileURL} target="_blank">Link</a></td>

                <td className="pa1"><button value="Delete" >Delete</button></td>
            </tr>
        )
    });

    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => { setRoute('Home') }} className="f2 link dim black underline pa3 pointer">Go Back</p>
            </nav>
            <h1>Upload</h1>
            {uploadState.success ? <h1>Successful Upload</h1> : null}
            <input onChange={(evt) => handleUploadChange(evt)} type="file" />
            <button onClick={(evt) => handleUpload()}>UPLOAD</button>
            <br />
            <p>{uploadedDoc.filename}</p>
            {uploadedDoc.fileURL ? <a href={uploadedDoc.fileURL}>Link</a> : null}

            <thead>
                <tr className="stripe-dark">
                    <th className="fw6 tl pa3 bg-white" >Doc Name</th>
                    <th className="fw6 tl pa3 bg-white" >Link</th>

                </tr>
            </thead>

            {renderTableBody()}

        </>
    )
}

export default DocumentsPage;