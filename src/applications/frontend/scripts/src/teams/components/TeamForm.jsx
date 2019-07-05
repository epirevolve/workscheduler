import React from 'react';
import propTypes from 'prop-types';

import TextField from "@material-ui/core/TextField";

const teamForm = ({
        team, changeName, changeNote
    }) => (
    <>
       <TextField autoFocus margin="dense" label="name" fullWidth required
            onChange={changeName} value={team.name} />
        <TextField margin="dense" label="note" fullWidth multiline rowsMax="5" variant="outlined"
            onChange={changeNote} value={team.note} />
    </>
);

teamForm.propTypes = {
    team: propTypes.object,
    changeName: propTypes.func.isRequired,
    changeNote: propTypes.func.isRequired
};

export default teamForm;