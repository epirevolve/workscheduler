import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { teams, roles } from "../embeddedData";

const userEdit = ({ user, changeLoginId, changeName, changeTeam,
    changeRole }) => {
        const teamList = teams.map((x, i) => <MenuItem key={i} value={x}>{x.name}</MenuItem>);
        const roleList = roles.map((x, i) => <MenuItem key={i} value={x}>{x._name_}</MenuItem>);

        let team = user.team || "";
        if (team && teams.map((x) => x.id).includes(team.id)) team = teams.find((x) => x.id == team.id);

        let role = user.role || "";
        if (role && roles.map((x) => x._value_).includes(role._value_)) role = roles.find((x) => x._value_ == role._value_);

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
                <FormControl margin="dense">
                    <InputLabel htmlFor="role">role</InputLabel>
                    <Select value={role} id="role" onChange={changeRole}>
                        {roleList}
                    </Select>
                </FormControl>
            </>
        );
};

userEdit.propTypes = {
    user: propTypes.object,
    changeLoginId: propTypes.func.isRequired,
    changeName: propTypes.func.isRequired,
    changeTeam: propTypes.func.isRequired,
    changeRole: propTypes.func.isRequired,
};

export default userEdit;