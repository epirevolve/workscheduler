import React from 'react';
import propTypes from "prop-types";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const trivialOptions = ({ scheduler, changeCertifiedSkill, changeNotCertifiedSkill }) => (
    <>
        <FormGroup row>
            <FormControlLabel label="certified skill" control={<Checkbox checked={scheduler.certifiedSkill}
                onChange={changeCertifiedSkill} />} />
            <FormControlLabel label="not certified skill" control={<Checkbox checked={scheduler.notCertifiedSkill}
                onChange={changeNotCertifiedSkill} />} />
        </FormGroup>
    </>
);

trivialOptions.propTypes = {
    scheduler: propTypes.object,
    changeCertifiedSkill: propTypes.func.isRequired,
    changeNotCertifiedSkill: propTypes.func.isRequired
};

export default trivialOptions;
