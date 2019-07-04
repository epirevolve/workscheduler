import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import SkillList from './SkillList';

const dataset = document.querySelector('script[src*="operators"]').dataset;
const operators = JSON.parse(dataset.operators);

const operatorForm = ({ operator, changeSkill, changeOjt }) => {
    const ojtList = [<MenuItem key="none" value=""></MenuItem>].concat(
        operators.filter((x) => x.id != operator.id).map((x, i) =>
        <MenuItem key={i} value={x}>
            {x.user.name}
        </MenuItem>));

    let ojt = operator.ojt || "";
    if (ojt && operators.map((x) => x.id).includes(ojt.id)) ojt = operators.find((x) => x.id == ojt.id);

    return (
        <>
            <TextField disabled value={operator.name} label="name" fullWidth margin="dense" />
            <TextField disabled value={operator.team} label="team" fullWidth margin="dense" />
            <SkillList operatorSkills={operator.skills} changeSkill={changeSkill} />
            <FormControl fullWidth>
                <InputLabel htmlFor="ojt">supervisor(ojt)</InputLabel>
                <Select value={ojt} onChange={changeOjt} inputProps={{ id: 'ojt' }}>
                    {ojtList}
                </Select>
            </FormControl>
        </>
    );
};

operatorForm.propTypes = {
    operator: propTypes.object.isRequired,
    changeSkill: propTypes.func.isRequired,
    changeOjt: propTypes.func.isRequired
};

export default operatorForm;