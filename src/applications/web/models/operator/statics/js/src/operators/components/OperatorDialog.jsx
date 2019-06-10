import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import SkillList from './SkillList';

const dataset = document.querySelector('script[src*="operators"]').dataset;
const operators = JSON.parse(dataset.operators);

const operatorDialog = ({ operatorDialog, onSkillChange, onOjtChange,
    handleClose, handleSave }) => {

    const ojtList = [<MenuItem key="none" value=""></MenuItem>];
    for (const operator of operators.filter((x) => x.id != operatorDialog.id)) {
        ojtList.push(
            <MenuItem key={operator.id} value={operator}>
                {operator.user.name}
            </MenuItem>
        );
    }

    let ojt = operatorDialog.ojt || "";
    if (ojt && operators.map((x) => x.id).includes(ojt.id)) ojt = operators.find((x) => x.id == ojt.id);

    return (
        <Dialog open={operatorDialog.isOpen} aria-labelledby="operator-store" maxWidth="lg">
            <DialogTitle>register operator</DialogTitle>
            <DialogContent>
                <TextField disabled value={operatorDialog.name} label="name" fullWidth margin="dense" />
                <TextField disabled value={operatorDialog.team} label="team" fullWidth margin="dense" />
                <SkillList operatorSkills={operatorDialog.skills} onChange={onSkillChange} />
                <FormControl fullWidth>
                    <InputLabel htmlFor="ojt">supervisor(ojt)</InputLabel>
                    <Select value={ojt} onChange={onOjtChange} inputProps={{id: 'ojt'}}>
                        {ojtList}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Close
                </Button>
                <Button onClick={() => handleSave(operatorDialog)} color="primary" variant="outlined">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

operatorDialog.propTypes = {
    operatorDialog: propTypes.object.isRequired,
    onSkillChange: propTypes.func.isRequired,
    onOjtChange: propTypes.func.isRequired,
    handleClose: propTypes.func.isRequired,
    handleSave: propTypes.func.isRequired,
};

export default operatorDialog;