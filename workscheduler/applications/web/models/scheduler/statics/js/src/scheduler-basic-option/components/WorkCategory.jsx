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

const operators = $script.data('operators');
const skills = $script.data('skills');

class WorkCategory extends React.Component {
    constructor (props) {
        super(props);
        this.state = { anchorEl1: null, anchorEl2: null, anchorEl3: null };
    }

    render () {

    }
}