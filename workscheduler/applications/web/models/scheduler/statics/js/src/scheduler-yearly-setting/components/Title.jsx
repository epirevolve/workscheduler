import React from 'react';

import Typography from '@material-ui/core/Typography';

const $script = $('script[src*="scheduler-yearly-setting"]');
const scheduler = $script.data('scheduler');

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