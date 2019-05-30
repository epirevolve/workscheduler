import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const skill = ({ skill, checked, onChange }) => {
    return (
        <FormControlLabel label={skill.name} control={
            <Checkbox checked={checked} onChange={onChange} value={skill.id} />}>
        </FormControlLabel>
    )
}

export default skill;