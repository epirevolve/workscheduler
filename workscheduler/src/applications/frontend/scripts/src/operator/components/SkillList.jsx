import React from 'react';
import propTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import Skill from './Skill';

const dataset = document.querySelector('script[src*="operator"]').dataset;
const skills = JSON.parse(dataset.skills);

const skillList = ({ operator, onChange }) => {
    const skillList = [];
    const skillIds = operator.skills.map((x) => x.id);
    for (const skill of skills) {
        skillList.push(
            <Skill key={skill.id} skill={skill} checked={skillIds.includes(skill.id)}
                onChange={() => onChange(skill)} />
        );
    }

    return (
        <FormControl style={{ display: 'inherit' }} margin="dense">
            <FormLabel component="legend">skills</FormLabel>
            <FormGroup row>
                {skillList}
            </FormGroup>
        </FormControl>
    );
};

skillList.propTypes = {
    operator: propTypes.object.isRequired,
    onChange: propTypes.func.isRequired
};

export default skillList;