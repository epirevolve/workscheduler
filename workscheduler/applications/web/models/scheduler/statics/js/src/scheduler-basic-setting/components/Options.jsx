import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const options = ({ scheduler, onCertifiedSkillChange, onNotCertifiedSkillChange }) => {
    return (
        <React.Fragment>
            <Typography variant="h4" className="mt-4">
                {scheduler.affiliation.name}
            </Typography>
            <Divider className="mb-4" />
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
        </React.Fragment>
    )
}

export default options;
