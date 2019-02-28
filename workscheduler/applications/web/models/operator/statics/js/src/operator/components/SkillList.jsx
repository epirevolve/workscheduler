import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import Skill from './Skill';

const $script = $('script[src*="operator"]');

const skills = $script.data('skills');

const skillList = ({ operator, onChange }) => {
    const skillList = [];
    const skillIds = operator.skills.map(x => x.id);
    for (let skill of skills) {
        skillList.push(
            <Skill key={skill.id} skill={skill} checked={skillIds.includes(skill.id)}
                onChange={() => onChange(skill)} />
        )
    }

    return (
        <FormControl style={{ display: 'inherit' }} margin="dense">
            <FormLabel component="legend">skills</FormLabel>
            <FormGroup row>
                {skillList}
            </FormGroup>
        </FormControl>
    )
}

export default skillList;