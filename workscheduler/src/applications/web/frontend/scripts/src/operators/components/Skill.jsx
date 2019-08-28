import React from 'react';
import propTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const skill = ({ skill, checked, changeSkill }) => (
    <FormControlLabel label={skill.name} control={
        <Checkbox checked={checked} onChange={changeSkill} value={skill.id} />}>
    </FormControlLabel>
);

skill.propTypes = {
    skill: propTypes.object.isRequired,
    checked: propTypes.bool.isRequired,
    changeSkill: propTypes.func.isRequired
};

export default skill;