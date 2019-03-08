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

const $script = $('script[src*="scheduler-basic-setting"]');

const operators = $script.data('operators');

const essentialOperators = ({ workCategory, onEssentialOperatorChange }) => {
    const essentialOperatorIds = workCategory.essentialOperators.map(x => x.id);
    const operatorList = operators.map(x =>
        <ListItem key={x.id} button onClick={() => onEssentialOperatorChange(workCategory.id, x)}>
            <Checkbox checked={essentialOperatorIds.includes(x.id)} tabIndex={-1} disableRipple />
            <ListItemText primary={x.user.name} />
        </ListItem>);
    const essentialOperators = workCategory.essentialOperators.map(x =>
        <ListItem key={x.id}>
            <ListItemText primary={x.user.name} />
        </ListItem>);

    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const [ expanded, setExpanded ] = React.useState(false);
    const onExpandedChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <React.Fragment>
            <Popover open={isOpen} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                onClose={() => setAnchorEl(null)}>
                <List subheader={<ListSubheader component="div">operators</ListSubheader>}>
                    {operatorList}
                </List>
            </Popover>
            <ExpansionPanel expanded={expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ color: 'gray' }} className="mt-2">essential operators</Typography>
                    <div className="ml-3">
                        <IconButton size="small" onClick={(e) => { setAnchorEl(e.currentTarget); e.stopPropagation(); }}>
                            <CheckBoxRoundedIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {essentialOperators}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    )
}

export default essentialOperators;