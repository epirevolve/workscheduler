import React from 'react';
import propTypes from "prop-types";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { m2 } from "margin";
import { lightslategray } from "color";

const dataset = document.querySelector('script[src*="schedulermenu"]').dataset;

const teams = ({ team, changeTeam }) => {
    const teams = JSON.parse(dataset.teams);
    const teamList = teams.map((x) =>
        <MenuItem key={x.id} value={x}>
            <Typography variant="h5" css={lightslategray}>
                {x.name}
            </Typography>
        </MenuItem>);

    if (teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

    return (
        <Select value={team} onChange={changeTeam} fullWidth css={m2} input={<OutlinedInput labelWidth={0} />}>
            {teamList}
        </Select>
    );
};

teams.propTypes = {
    team: propTypes.object,
    changeTeam: propTypes.func.isRequired
};

export default teams;