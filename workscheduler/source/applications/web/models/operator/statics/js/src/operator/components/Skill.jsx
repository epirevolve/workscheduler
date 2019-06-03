import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const skill = ({ skill, checked, onChange }) => {
    <FormControlLabel label={skill.name} control={
        <Checkbox checked={checked} onChange={onChange} value={skill.id} />}>
    </FormControlLabel>;
};

skill.propTypes = {
	skill: PropTypes.object.isRequired,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func,
};

export default skill;