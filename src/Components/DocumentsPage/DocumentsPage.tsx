import React, { useState, useEffect } from 'react';

import type { userType } from '../../App';

interface DocPageType {
    user: userType,
    setRoute: Function
}

const DocumentsPage = ({ user, setRoute }: DocPageType) => {
    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => {
                        setRoute('Home');
                    }}
                    className="f2 link dim black underline pa3 pointer"
                >
                    Go Back
          </p>
            </nav>
        </>
    )
}

export default DocumentsPage;