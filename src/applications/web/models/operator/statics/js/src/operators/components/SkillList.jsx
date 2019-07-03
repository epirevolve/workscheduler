import React from 'react';
import propTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import Skill from './Skill';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mt3 } from 'margin';

const dataset = document.querySelector('script[src*="operators"]').dataset;
const skills = JSON.parse(dataset.skills);

const skillList = ({ operatorSkills, changeSkill }) => {
    const skillIds = operatorSkills.map((x) => x.id);
    const notCertifiedSkillList = skills.filter((x) => !x.isCertified)
        .map((x, i) => <Skill key={i} skill={x} checked={skillIds.includes(x.id)}
            changeSkill={() => changeSkill(x)} />);

    return (
        <FormControl style={{ display: 'inherit' }} margin="dense" css={mt3}>
            <FormLabel component="legend">not certified skills</FormLabel>
            <FormGroup row>
                {notCertifiedSkillList}
            </FormGroup>
        </FormControl>
    );
};

skillList.propTypes = {
    operatorSkills: propTypes.array,
    changeSkill: propTypes.func.isRequired
};

export default skillList;