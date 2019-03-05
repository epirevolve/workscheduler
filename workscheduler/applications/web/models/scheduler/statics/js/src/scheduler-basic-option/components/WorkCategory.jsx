import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';

const $script = $('script[src*="scheduler-basic-option"]');

const skills = $script.data('skills');
const operators = $script.data('operators');

class WorkCategory extends React.Component {
    render () {
        const { workCategory, handleRemove, onTitleChange,
            onAtFromChange, onAtToChange, onWeekDayRequireChange, onWeekDayMaxChange,
            onHolidayRequireChange, onHolidayMaxChange, onRestChange, onMaxTimesChange,
            onEssentialSkillChange, onEssentialOperatorChange, onImpossibleOperatorChange } = this.props;

        const essentialSkillIds = workCategory.essentialSkills.map(x => x.id);
        const skillList = skills.map(x =>
            <ListItem key={x.id} button onClick={() => onEssentialSkillChange(workCategory.id, x)}>
                <Checkbox checked={essentialSkillIds.includes(x.id)} tabIndex={-1} disableRipple />
                <ListItemText primary={x.name} />
            </ListItem>);
        const essentialSkills = workCategory.essentialSkills.map(x =>
            <ListItem key={x.id}>
                <ListItemText primary={x.name} />
            </ListItem>
        );

        const essentialOperatorIds = workCategory.essentialOperators.map(x => x.id);
        const operatorListForEssential = operators.map(x =>
            <ListItem key={x.id} button onClick={() => onEssentialOperatorChange(workCategory.id, x)}>
                <Checkbox checked={essentialOperatorIds.includes(x.id)} tabIndex={-1} disableRipple />
                <ListItemText primary={x.name} />
            </ListItem>);
        const essentialSkills = workCategory.essentialOperators.map(x =>
            <ListItem key={x.id}>
                <ListItemText primary={x.user.name} />
            </ListItem>
        );

        const impossibleOperatorIds = workCategory.impossibleOperators.map(x => x.id);
        const operatorListForImpossible = operators.map(x =>
            <ListItem key={x.id} button onClick={() => onImpossibleOperatorChange(workCategory.id, x)}>
                <Checkbox checked={impossibleOperatorIds.includes(x.id)} tabIndex={-1} disableRipple />
                <ListItemText primary={x.name} />
            </ListItem>);
        const essentialSkills = workCategory.impossibleOperators.map(x =>
            <ListItem key={x.id}>
                <ListItemText primary={x.user.name} />
            </ListItem>
        );

        const { anchorEl } = React.useState(null);
        const isOpen = Boolean(anchorEl);
    }
}

