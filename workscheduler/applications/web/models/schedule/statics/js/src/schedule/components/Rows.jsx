import React from 'react';

import Row from './Row';

const rows = ({ rows }) => {
    const rows_ = rows.map(x =>
        <Row key={x.key} {...x} />
    );

    return rows_
}

export default rows;