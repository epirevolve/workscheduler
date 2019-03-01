import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import Skill from './Skill';

const $script = $('script[src*="operators"]');

const skills = $script.data('skills');

const skillList = ({ operatorSkills, onChange }) => {
    const skillIds = operatorSkills.map(x => x.id);

    const notCertifiedSkillList = [];
    for (let skill of skills.filter(x => !x.isCertified)) {
        notCertifiedSkillList.push(
            <Skill key={skill.id} skill={skill} checked={skillIds.includes(skill.id)}
                onChange={() => onChange(skill)} />
        )
    }

    return (
        <FormControl style={{ display: 'inherit' }} margin="dense" className="mt-3">
            <FormLabel component="legend">not certified skills</FormLabel>
            <FormGroup row>
                {notCertifiedSkillList}
            </FormGroup>
        </FormControl>
    )
}

export default skillList;