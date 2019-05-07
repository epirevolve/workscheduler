import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const baseDataset = document.querySelector('script[id="base-schedule"]').dataset;
const dataset = document.querySelector('script[src*="schedule-admin"]').dataset;

class affiliations extends React.Component {
    onAffiliationChange (affiliation) {
        const url = baseDataset.url;
        const s = baseDataset.scheduleOf;
        location.href = url.replace('param_affiliation_id', affiliation.id).replace('param_schedule_of', s);
    }

    render () {
        const affiliations = JSON.parse(dataset.affiliations);
        let affiliation = JSON.parse(baseDataset.affiliation);
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
            <Select value={affiliation} onChange={this.onAffiliationChange}
                fullWidth className="m-2" input={<OutlinedInput labelWidth={0} />}>
                {affiliationList}
            </Select>
        )
    }
}

export default affiliations;