import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const dataset = document.querySelector('script[src*="users"]').dataset;
const teams = JSON.parse(dataset.teams);

const userEdit = ({ user, changeLoginId, changeName, changeTeam,
    changeIsAdmin, changeIsOperator }) => {
        const teamList = teams.map((x, i) => <MenuItem key={i} value={x}>{x.name}</MenuItem>);

        let team = user.team || "";
        if (team && teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

        return (
            <>
                <TextField autoFocus margin="dense" label="login id" fullWidth required
                    onChange={changeLoginId} value={user.loginId} />
                <TextField margin="dense" label="name" fullWidth required
                    onChange={changeName} value={user.name} />
                <FormControl margin="dense">
                    <InputLabel htmlFor="team">team</InputLabel>
                    <Select value={team} id="team" onChange={changeTeam}>
                        {teamList}
                    </Select>
                </FormControl>
                <br />
                <FormControlLabel margin="dense" label="is admin"
                    control={<Checkbox checked={user.isAdmin}
                        onChange={changeIsAdmin} color="primary" />} />
                <FormControlLabel margin="dense" label="is operator"
                    control={<Checkbox checked={user.isOperator}
                        onChange={changeIsOperator} color="primary" />} />
            </>
        );
};

userEdit.propTypes = {
    user: propTypes.object,
    changeLoginId: propTypes.func.isRequired,
    changeName: propTypes.func.isRequired,
    changeTeam: propTypes.func.isRequired,
    changeIsAdmin: propTypes.func.isRequired,
    changeIsOperator: propTypes.func.isRequired,
};

export default userEdit;