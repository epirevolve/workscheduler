import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import SkillList from './SkillList';

const $script = $('script[src*="operators"]');
const operators = $script.data('operators');

const operatorDialog = ({ operatorDialog, onSkillChange, onOjtChange,
    handleClose, handleSave }) => {
    const operatorsList = [<MenuItem key="none" value=""></MenuItem>];
    for (let operator of operators.filter(x => x.id != operatorDialog.id)) {
        operatorsList.push(
            <MenuItem key={operator.id} value={operator}>
                {operator.user.name}
            </MenuItem>
        )
    }

    let ojt = operatorDialog.ojt || "";
    if (ojt && operators.map(x => x.id).includes(ojt.id)) ojt = operators.find(x => x.id == ojt.id);

    return (
        <Dialog open={operatorDialog.isOpen} aria-labelledby="skill-store" maxWidth="lg">
            <DialogTitle id="simple-dialog-title">Set operator</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Set operator info like not certified skills.
                </DialogContentText>
                <TextField disabled value={operatorDialog.name} label="name" fullWidth margin="dense" />
                <TextField disabled value={operatorDialog.affiliation} label="affiliation" fullWidth margin="dense" />
                <SkillList operatorSkills={operatorDialog.skills} onChange={onSkillChange} />
                <FormControl fullWidth>
                    <InputLabel htmlFor="ojt">supervisor(ojt)</InputLabel>
                    <Select value={ojt} onChange={onOjtChange} inputProps={{id: 'ojt'}}>
                        {operatorsList}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={() => handleSave(operatorDialog)} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default operatorDialog;