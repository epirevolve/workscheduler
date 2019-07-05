import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import SkillList from './SkillList';

const operator = ({ operator, changeSkill, changeRemainPaidHoliday }) => (
    <>
        <SkillList operator={operator} onChange={changeSkill} />
        <TextField type="number" value={operator.remainPaidHolidays} onChange={changeRemainPaidHoliday}
            min="0" label="remain paid holidays" margin="dense" style={{ display: 'inherit' }} />
    </>
);

operator.propTypes = {
    operator: propTypes.object,
    changeSkill: propTypes.func.isRequired,
    changeRemainPaidHoliday: propTypes.func.isRequired,
};

export default operator;