import React from 'react';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Skill from './Skill';

const skillList = ({ title, skills, handleEdit }) => {
    const skillList = skills.map(x =>
        <Skill key={x.id} skill={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List subheader={<ListSubheader component="div">{title}</ListSubheader>}>
            {skillList}
        </List>
    )
}

export default skillList;