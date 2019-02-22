import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import 'rc-time-picker/assets/index';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';

function isValidRange(v) {
  return v && v[0] && v[1];
}

class RequestDialog extends React.Component {
    disabledDate (current) {
        if (!current) {
            return false;
        }
        return current.valueOf() < minDate.valueOf() || maxDate.valueOf() < current.valueOf();
    }

    render () {
        const timePickerElement = <TimePickerPanel defaultValue={moment('00:00', 'HH:mm')}
            showSecond={false} minuteStep={15} />;
        const calendar = <RangeCalendar showDateInput={false} disabledDate={this.disabledDate}
            timePicker={timePickerElement} showToday={false} format='YYYY-MM-DD HH:mm' />;
        return (
            <Dialog open={this.props.dialog.isOpen} aria-labelledby="request-store">
                <DialogTitle id="simple-dialog-title">Set request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To set your scheduled holiday, please submit your request.
                        This request is not notified to an administrators.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="title" type="text" fullWidth
                        onChange={this.props.onTitleChange} value={this.props.dialog.title} />
                    <TextField autoFocus margin="dense" label="note" type="text" fullWidth
                        onChange={this.props.onNoteChange} value={this.props.dialog.note} />
                    <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                        value={[this.props.dialog.atFrom, this.props.dialog.atTo]} onChange={this.props.onDateChange} >
                        { ({ value }) => {
                            return (
                                <TextField autoFocus margin="dense" label="date" type="text" fullWidth InputProps={{ readOnly: true, tabIndex: "-1" }}
                                    value={isValidRange(value) && `${value[0].format('YYYY-MM-DD HH:mm')} - ${value[1].format('YYYY-MM-DD HH:mm')}` || ''} />
                                )}}
                    </DatePicker>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                    { (() => {
                        if (this.props.dialog.id)
                            <Button onClick={() => this.props.handleRemove(this.props.dialog.id)} color="primary">
                                Remove
                            </Button>
                    })() }
                    <Button onClick={() => this.props.handleSave(this.props.dialog)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default RequestDialog;