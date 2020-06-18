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

    const [uploadState, setUploadState] = useState<UploadStateType>({ success: false, url: "", file: null })

    const handleUploadChange = (evt: ChangeEvent) => {
        setUploadState({ success: false, url: "", file: (evt.target as HTMLInputElement).files })
    }

    const handleUpload = () => {
        if (uploadState.file) {
            const file = uploadState.file[0]
            console.log("Prep")
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
                    fetch(data.signedRequest, { method: 'PUT', body: file })
                    
                })

        }



    }

    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => { setRoute('Home') }} className="f2 link dim black underline pa3 pointer">Go Back</p>
            </nav>
            <h1>Upload</h1>
            {uploadState.success ? <h1>Successful Upload</h1> : null}
            <input onChange={(evt) => handleUploadChange(evt)} type="file" />
            <button onClick={(evt) => handleUpload()}>UPLOAD</button>

        </>
    )
}

export default DocumentsPage;