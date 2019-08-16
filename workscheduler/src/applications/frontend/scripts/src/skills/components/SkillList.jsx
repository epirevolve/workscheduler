import React from 'react';
import propTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Skill from './Skill';

const skillList = ({ title, skills, edit }) => (
    <List subheader={<ListSubheader component="div">{title}</ListSubheader>}>
        {skills.map((x, i) => <Skill key={i} skill={x} edit={() => edit(x)} />)}
    </List>
);

skillList.propTypes = {
    title: propTypes.string,
    skills: propTypes.array,
    edit: propTypes.func.isRequired
};

export default skillList;