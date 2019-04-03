import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import 'rc-time-picker/assets/index';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';

const isValidRange = (v) => {
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
        const { requestDialog, onTitleChange, onNoteChange, onDateChange,
            handleClose, handleRemove, handleSave } = this.props;
        const timePickerElement = <TimePickerPanel defaultValue={moment('00:00', 'HH:mm')}
            showSecond={false} minuteStep={15} />;
        const calendar = <RangeCalendar showDateInput={false} disabledDate={this.disabledDate}
            timePicker={timePickerElement} showToday={false} format='YYYY-MM-DD HH:mm' />;
        return (
            <Dialog open={requestDialog.isOpen} aria-labelledby="request-store">
                <DialogTitle>register request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        to set your scheduled holiday, please submit your request
                    </DialogContentText>
                    <DialogContentText>
                        this request is not notified to an administrators
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="title" fullWidth
                        onChange={onTitleChange} value={requestDialog.title} />
                    <TextField autoFocus margin="dense" label="note" fullWidth
                        onChange={onNoteChange} value={requestDialog.note} />
                    <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                        value={[requestDialog.atFrom, requestDialog.atTo]} onChange={onDateChange} >
                        { ({ value }) => {
                            const formatDate = (x) => x.format('YYYY-MM-DD HH:mm')
                            const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                            return (
                                <TextField autoFocus margin="dense" label="date"
                                    fullWidth InputProps={{ readOnly: true, tabIndex: "-1" }} value={disp} />
                                )}}
                    </DatePicker>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    {requestDialog.id && (
                        <Button onClick={() => handleRemove(requestDialog.id)} color="primary">
                            Remove
                        </Button>
                    )}
                    <Button onClick={() => handleSave(requestDialog)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default RequestDialog;