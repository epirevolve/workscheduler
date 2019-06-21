import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const dataset = document.querySelector('script[src*="scheduleAdmin"]').dataset;

const teamCss = css({
    '& fieldset': {border: 0}
});

const teams = ({ team, scheduleOf, onTeamChange }) => {
    const teams = JSON.parse(dataset.teams);
    const teamList = teams.map((x) =>
        <MenuItem key={x.id} value={x}>
            <Typography variant="h5" css={css`
                    color: lightslategray !important;
                `}>
                {x.name}
            </Typography>
        </MenuItem>);

    if (teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

    return (
        <Select value={team} fullWidth
            input={<OutlinedInput labelWidth={0} css={teamCss}
                onChange={(e) => onTeamChange(scheduleOf, e)} />}>
            {teamList}
        </Select>
    );
};

export default teams;