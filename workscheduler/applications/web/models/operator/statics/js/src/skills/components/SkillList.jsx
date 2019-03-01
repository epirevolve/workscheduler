import React from 'react';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Skill from './Skill';

const skillList = ({ title, skills, handleEdit }) => {
    const skillList = [];
    for (let skill of skills) {
        skillList.push(<Skill key={skill.id} skill={skill} handleEdit={() => handleEdit(skill)} />)
    }

    return (
        <List subheader={<ListSubheader component="div">{title}</ListSubheader>}>
            {skillList}
        </List>
    )
}

export default skillList;