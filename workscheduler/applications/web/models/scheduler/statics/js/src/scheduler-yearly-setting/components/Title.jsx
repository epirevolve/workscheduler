import React from 'react';

import Typography from '@material-ui/core/Typography';

const dataset = document.querySelector('script[src*="scheduler-yearly-setting"]').dataset;
const scheduler = JSON.parse(dataset.scheduler);

const options = () => {
    return (
        <React.Fragment>
            <Typography variant="h4" className="mt-4">
                {scheduler.affiliation.name}
            </Typography>
        </React.Fragment>
    )
}

export default options;