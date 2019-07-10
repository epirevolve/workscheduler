import React from 'react';
import propTypes from "prop-types";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const dataset = document.querySelector('script[src*="scheduleAdmin"]').dataset;

const teamCss = css({
    '& fieldset': { border: 0 }
});

import { lightslategray } from 'color';

const teams = ({ team, scheduleOf, changeTeam }) => {
    const teams = JSON.parse(dataset.teams);
    const teamList = teams.map((x) =>
        <MenuItem key={x.id} value={x}>
            <Typography variant="h5" css={lightslategray}>
                {x.name}
            </Typography>
        </MenuItem>);

    if (teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

    return (
        <Select value={team} fullWidth
            input={<OutlinedInput labelWidth={0} css={teamCss}
                onChange={(e) => changeTeam(scheduleOf, e)} />}>
            {teamList}
        </Select>
    );
};

teams.propTypes = {
    team: propTypes.object,
    scheduleOf: propTypes.string,
    changeTeam: propTypes.func.isRequired
};

export default teams;