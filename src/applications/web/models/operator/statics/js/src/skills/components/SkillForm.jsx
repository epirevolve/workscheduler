import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const skillForm = ({
    skill, changeName, changeScore, changeIsCertified
    }) => (
    <>
        <TextField autoFocus margin="dense" label="name" fullWidth
            onChange={changeName} value={skill.name} />
        <TextField autoFocus margin="dense" label="score" fullWidth type="number"
            onChange={changeScore} value={skill.score} />
        <FormControlLabel label="is certified"
            control={<Switch checked={skill.isCertified}
                onChange={changeIsCertified} color="primary" />} />
    </>
);

skillForm.propTypes = {
    skill: propTypes.object.isRequired,
    changeName: propTypes.func.isRequired,
    changeScore: propTypes.func.isRequired,
    changeIsCertified: propTypes.func.isRequired,
};

export default skillForm;
