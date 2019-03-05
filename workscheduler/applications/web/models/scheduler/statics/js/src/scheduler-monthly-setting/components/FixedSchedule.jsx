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

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

const $script = $('script[src*="scheduler-monthly-setting"]');

const operators = $script.data('operators');

function isValidRange(v) {
  return v && v[0] && v[1];
}

const fixedSchedule = ({ fixedSchedule, handleRemove, onTitleChange, onDateChange,
    onAtFromChange, onAtToChange, onParticipantChange }) => {

    const calendar = <RangeCalendar showDateInput={false} showToday={false} format='YYYY-MM-DD' />;

    const participantIds = fixedSchedule.participants.map(x => x.id);
    const operatorList = operators.map(x =>
        <ListItem key={x.id} button onClick={() => onParticipantChange(fixedSchedule.id, x)}>
            <Checkbox checked={participantIds.includes(x.id)} tabIndex={-1} disableRipple />
            <ListItemText primary={x.user.name} />
        </ListItem>);
    const participants = fixedSchedule.participants.map(x =>
        <ListItem key={x.id}>
            <ListItemText primary={x.user.name} />
        </ListItem>
    );

    const { anchorEl } = React.useState(null);
    const isOpen = Boolean(anchorEl);

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <TextField autoFocus label="title" required value={fixedSchedule.title}
                        onChange={onTitleChange(fixedSchedule.id)} />
                </Typography>
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={[moment(fixedSchedule.onFrom), moment(fixedSchedule.onTo)]}
                        onChange={onDateChange(fixedSchedule.id)}>
                    { ({ value }) => {
                        const formatDate = (x) => x.format('YYYY-MM-DD')
                        const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                        return (
                            <TextField margin="dense" label="date"
                                InputProps={{ readOnly: true, tabIndex: "-1" }} value={disp} />
                            )}}
                </DatePicker>
                <div className="my-3">
                    <TextField label="start time" type="time" className="mr-4" onChange={onAtFromChange(fixedSchedule.id)}
                        value={fixedSchedule.atFrom ? moment(fixedSchedule.atFrom, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                    <TextField label="end time" type="time" onChange={onAtToChange(fixedSchedule.id)}
                        value={fixedSchedule.atTo ? moment(fixedSchedule.atTo, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </div>
                <Popover open={isOpen} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                    onClose={() => this.setState({anchorEl: null})}>
                    <List subheader={<ListSubheader component="div">operators</ListSubheader>}>
                        {operatorList}
                    </List>
                </Popover>
                <Fab color="secondary" aria-label="Edit" className="add-participants"
                    onClick={(event) => this.setState({anchorEl: event.currentTarget})}>
                    <CheckBoxRoundedIcon />
                </Fab>
                <List className="participants" subheader={<ListSubheader component="div">participants</ListSubheader>}>
                    {participants}
                </List>
            </CardContent>
            <CardActions disableActionSpacing>
                <Button onClick={handleRemove(fixedSchedule.id)} variant="outlined" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
};

export default fixedSchedule;