import React from 'react'

import requestAgent from 'superagent';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const dataset = document.querySelector('script[src*="schedule-admin"]').dataset;

const affiliations = ({ affiliation, scheduleOf, onAffiliationChange }) => {
    const affiliations = JSON.parse(dataset.affiliations);
    const affiliationList = affiliations.map(x =>
        <MenuItem key={x.id} value={x}>
            <Typography variant="h5" css={css`
                    color: lightslategray !important;
                `}>
                {x.name}
            </Typography>
        </MenuItem>)

    if (affiliations.map(x => x.id).includes(affiliation.id)) affiliation = affiliations.find(x => x.id == affiliation.id);

    return (
        <Select value={affiliation} fullWidth className="m-2" input={<OutlinedInput labelWidth={0}
            onChange={e => onAffiliationChange(scheduleOf, e)} />}>
            {affiliationList}
        </Select>
    )
}

export default affiliations;