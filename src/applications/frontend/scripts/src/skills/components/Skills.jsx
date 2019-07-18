import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import SkillList from './SkillList';

const skills = ({ certifiedSkills, notCertifiedSkills, append, edit }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                    skills
                </Typography>
                <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={append}>
                        <AddIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <Grid container>
            <Grid item sm={6} xs={12}>
                <SkillList title="certified skills" skills={certifiedSkills} edit={edit} />
            </Grid>
            <Grid item sm={6} xs={12}>
                <SkillList title="not certified skills" skills={notCertifiedSkills} edit={edit} />
            </Grid>
        </Grid>
    </>
);

skills.propTypes = {
    certifiedSkills: propTypes.array,
    notCertifiedSkills: propTypes.array,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired
};

export default skills;