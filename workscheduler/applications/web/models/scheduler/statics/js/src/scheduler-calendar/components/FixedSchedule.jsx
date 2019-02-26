import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
import Icon from '@material-ui/core/Icon';
import { TimeFormatInput } from 'material-ui-next-pickers'

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import 'rc-time-picker/assets/index';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

function isValidRange(v) {
  return v && v[0] && v[1];
}

const styles = (theme) => ({
    input: {
        minWidth: '180px',
        flexGrow: 1,
        maxWidth: '100%',
        height: 'auto',
        padding: '6px 0 7px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
})

class FixedSchedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {isOpen: false};
    }

    handleClick (operator, onParticipantChange) {
        return () => onParticipantChange(operator);
    };

    render () {
        const { fixedSchedule, handleRemove, onTitleChange, onDateChange, onAtFromChange, onAtToChange, onParticipantChange } = this.props;

        const timePickerElement = <TimePickerPanel defaultValue={moment('00:00', 'HH:mm')}
            showSecond={false} minuteStep={15} />;
        const calendar = <RangeCalendar showDateInput={false} disabledDate={this.disabledDate}
            showToday={false} format='YYYY-MM-DD' />;

        const operators = [];
        const participantIds = fixedSchedule.participants.map(x => x.id);
        for (let operator of operators) {
            operators.push(
                <ListItem key={operator.id} button onClick={this.handleClick(operator, onParticipantChange)}>
                    <Checkbox checked={participantIds.indexOf(operator.id) !== -1} tabIndex={-1} disableRipple />
                    <ListItemText primary={operator.user.name} />
                </ListItem>
            )
        }

        const participants = [];
        for (let participant of participants) {
            participants.push(
                <ListItem key={participant.id}>
                    <ListItemText primary={participant.user.name} />
                </ListItem>
            )
        }

        const atFrom = moment().hour()

        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <TextField autoFocus label="title" required value={fixedSchedule.title} onChange={onTitleChange} />
                    </Typography>
                    <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                        value={[moment(fixedSchedule.onFrom), moment(fixedSchedule.onTo)]} onChange={onDateChange}>
                        { ({ value }) => {
                            const formatDate = (x) => x.format('YYYY-MM-DD')
                            const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                            return (
                                <TextField margin="dense" label="date"
                                    InputProps={{ readOnly: true, tabIndex: "-1" }} value={disp} />
                                )}}
                    </DatePicker>
                    <div style={{ margin:'1rem 0' }}>
                        <TimeFormatInput label="start time" mode="24h" value={moment(fixedSchedule.atFrom, 'HH:mm').toDate()}
                            onChange={onAtFromChange} selectableMinutesInterval="15" margin="normal" />
                        <TimeFormatInput label="end time" mode="24h" value={moment(fixedSchedule.atTo, 'HH:mm').toDate()}
                            onChange={onAtToChange} selectableMinutesInterval="15" margin="normal" />
                    </div>
                    <Popover open={this.state.isOpen} anchorOrigin={{ vertical: 'top', horizontal: 'right',}}>
                        <List subheader={<ListSubheader component="div">operators</ListSubheader>}>
                            {operators}
                        </List>
                    </Popover>
                    <List subheader={<ListSubheader component="div">participants</ListSubheader>}>
                        {participants}
                    </List>
                    <Fab color="secondary" aria-label="Edit" onClick={() => this.setState({isOpen: true})}>
                        <Icon>edit_icon</Icon>
                    </Fab>
                </CardContent>
                <CardActions disableActionSpacing>
                    <Button onClick={handleRemove}>
                        Remove
                    </Button>
                </CardActions>
            </Card>
        )
    }
};

export default FixedSchedule;