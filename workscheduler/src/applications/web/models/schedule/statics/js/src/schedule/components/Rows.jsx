import React from 'react';

import Row from './Row';

const rows = ({ rows }) => (
	rows.map((x, i) => <Row key={i} {...x} />)
);

export default rows;