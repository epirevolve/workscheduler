import React from 'react';

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';

const dataset = document.querySelector('script[src*="scheduler-basic-setting"]').dataset;
const skills = JSON.parse(dataset.skills);

const essentialSkills = ({ workCategory, onEssentialSkillChange }) => {
    const essentialSkillIds = workCategory.essentialSkills.map(x => x.id);
    const skillList = skills.map(x =>
        <ListItem key={x.id} button onClick={() => onEssentialSkillChange(workCategory.id, x)}>
            <Checkbox checked={essentialSkillIds.includes(x.id)} tabIndex={-1} disableRipple />
            <ListItemText primary={x.name} />
        </ListItem>);
    const essentialSkills = workCategory.essentialSkills.map(x =>
        <ListItem key={x.id}>
            <ListItemText primary={x.name} />
        </ListItem>);

    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const [ expanded, setExpanded ] = React.useState(false);
    const onExpandedChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <>
            <Popover open={isOpen} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                onClose={() => setAnchorEl(null)}>
                <List subheader={<ListSubheader component="div">skills</ListSubheader>}>
                    {skillList}
                </List>
            </Popover>
            <ExpansionPanel expanded={expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ color: 'gray' }} className="mt-2">essential skills</Typography>
                    <div className="ml-3">
                        <IconButton size="small" onClick={(e) => { setAnchorEl(e.currentTarget); e.stopPropagation(); }}>
                            <CheckBoxRoundedIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {essentialSkills}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}

export default essentialSkills;