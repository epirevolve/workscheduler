import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SkillList from './SkillList';

const operator = ({ operator, onSkillChange, onRemainPaidHolidaysChange, handleSave }) => (
    <>
        <SkillList operator={operator} onChange={onSkillChange} />
        <TextField type="number" value={operator.remainPaidHolidays} onChange={onRemainPaidHolidaysChange}
            min="0" label="remain paid holidays" margin="dense" style={{ display: 'inherit' }} />
        <Button className="mt-3" variant="contained" color="primary" size="large"
            onClick={() => handleSave(operator)}>
            Store Operator
        </Button>
    </>
);

export default operator;