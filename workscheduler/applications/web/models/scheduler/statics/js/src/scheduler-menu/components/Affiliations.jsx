import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

const affiliations_ = $('script[src*="scheduler-menu"]').data('affiliations');

const affiliations = ({ affiliation, onAffiliationChange }) => {
    const affiliationList = affiliations_.map(x =>
        <MenuItem key={x.id} value={x}>
            <Typography variant="h5" className="menuHeader">
                {x.name}
            </Typography>
        </MenuItem>)

    if (affiliations_.map(x => x.id).includes(affiliation.id)) affiliation = affiliations_.find(x => x.id == affiliation.id);

    return (
        <Select value={affiliation} onChange={onAffiliationChange}
            fullWidth className="m-2" input={<OutlinedInput labelWidth={0} />}>
            {affiliationList}
        </Select>
    )
}

export default affiliations;