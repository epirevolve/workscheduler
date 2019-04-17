import React from 'react';

const request = ({ request, handleEdit, className }) => {
    return (
        <button className={`btn request btn-block request-item ${className}`}
            type="button" onClick={handleEdit}
            data-at-from={request.atFrom}
            data-at-to={request.atTo}>
            { request.title }
        </button>
    )
}

export default request;