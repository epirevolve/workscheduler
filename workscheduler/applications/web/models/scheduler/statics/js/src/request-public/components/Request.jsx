import React from 'react';
import ReactDOMServer from 'react-dom/server';

const request = ({ request, handleEdit }) => {
    return (
        <button className="btn request btn-block request-item"
            type="button" onClick={handleEdit}
            data-at-from={request.atFrom}
            data-at-to={request.atTo}>
            { request.title }
        </button>
    )
}

export default request;