import React, { useState, useEffect } from 'react';

import type { userType, userDocsArrayType } from '../../App';

interface DocPageType {
    user: userType,
    setRoute: Function
    userDocs: userDocsArrayType,
    setUserDocs: Function
}

const [uploadState, setUploadState] = useState({success: false, url:""})

const handleUpload = ()  => {

}

const DocumentsPage = ({ user, setRoute, userDocs, setUserDocs }: DocPageType) => {
    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => { setRoute('Home') }} className="f2 link dim black underline pa3 pointer">Go Back</p>
            </nav>
            <h1>Upload</h1>
            {uploadState.success? <h1>Successful Upload</h1>: null}
            <input onChange={handleUpload} type="file"/>

        </>
    )
}

export default DocumentsPage;