import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import WorkCategoryList from './WorkCategoryList';

const workCategories = ({ workCategories, handleAppend, handleRemove, onTitleChange,
    onAtFromChange, onAtToChange, onWeekDayRequireChange, onWeekDayMaxChange,
    onHolidayRequireChange, onHolidayMaxChange, onRestChange, onMaxTimesChange,
    onEssentialSkillsChange, onEssentialOperatorsChange, onImpossibleOperatorsChange }) => {

    const onExpandedChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <div className="mt-4 mb-3">
            <ExpansionPanel expanded={expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem' }}>work categories</Typography>
                    <div className="ml-3">
                        <IconButton onClick={handleAppend}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <WorkCategoryList workCategories={workCategories} handleRemove={handleRemove}
                            onTitleChange={onTitleChange} onAtFromChange={onAtFromChange} onAtToChange={onAtToChange}
                            onWeekDayRequireChange={onWeekDayRequireChange} onWeekDayMaxChange={onWeekDayMaxChange}
                            onHolidayRequireChange={onHolidayRequireChange} onHolidayMaxChange={onHolidayMaxChange}
                            onRestChange={onRestChange} onMaxTimesChange={onMaxTimesChange}
                            onEssentialSkillsChange={onEssentialSkillsChange} onEssentialOperatorsChange={onEssentialOperatorsChange}
                            onImpossibleOperatorsChange={onImpossibleOperatorsChange} />
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default workCategories;