import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const trivialOptions = ({ scheduler, onCertifiedSkillChange, onNotCertifiedSkillChange }) => (
    <>
        <FormGroup row>
            <FormControlLabel
                control={<Checkbox checked={scheduler.certifiedSkill}
                    onChange={onCertifiedSkillChange} />}
                label="certified skill" />
            <FormControlLabel
                control={<Checkbox checked={scheduler.notCertifiedSkill}
                    onChange={onNotCertifiedSkillChange} />}
                label="not certified skill" />
        </FormGroup>
    </>
);

export default trivialOptions;
