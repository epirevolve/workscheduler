import React from 'react';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import EssentialSkills from './EssentialSkills';
import EssentialOperators from './EssentialOperators';
import ImpossibleOperators from './ImpossibleOperators';

const workCategory = ({ workCategory, handleRemove, onTitleChange,
    onAtFromChange, onAtToChange, onWeekDayRequireChange,
    onWeekDayMaxChange, onHolidayRequireChange, onHolidayMaxChange,
    onRestDaysChange, onMaxTimesChange, onEssentialSkillChange,
    onEssentialOperatorChange, onImpossibleOperatorChange }) => {

    return (
        <Card>
            <CardContent>
                <TextField autoFocus label="title" required value={workCategory.title}
                    onChange={onTitleChange(workCategory.id)} className="mb-3" />
                <Grid container className="mb-3">
                    <Grid item sm={6} xs={12} className="pr-2">
                        <TextField type="time" label="from" required onChange={onAtFromChange(workCategory.id)}
                            value={workCategory.atFrom ? moment(workCategory.atFrom, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField type="time" label="to" required onChange={onAtToChange(workCategory.id)}
                            value={workCategory.atTo ? moment(workCategory.atTo, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                    </Grid>
                </Grid>
                <Grid container className="mb-3">
                    <Grid item sm={6} xs={12} className="pr-2">
                        <TextField type="number" label="week day require" required value={workCategory.weekDayRequire}
                            onChange={onWeekDayRequireChange(workCategory.id)} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField type="number" label="week day max" required value={workCategory.weekDayMax}
                            onChange={onWeekDayMaxChange(workCategory.id)} />
                    </Grid>
                </Grid>
                <Grid container className="mb-3">
                    <Grid item sm={6} xs={12} className="pr-2">
                        <TextField type="number" label="holiday require" required value={workCategory.holidayRequire}
                            onChange={onHolidayRequireChange(workCategory.id)} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField type="number" label="holiday max" required value={workCategory.holidayMax}
                            onChange={onHolidayMaxChange(workCategory.id)} />
                    </Grid>
                </Grid>
                <TextField type="number" label="day offs" required value={workCategory.dayOffs}
                    onChange={onRestDaysChange(workCategory.id)} className="mb-3" />
                <TextField type="number" label="max times" required value={workCategory.maxTimes} className="mb-3"
                    onChange={onMaxTimesChange(workCategory.id)} placeholder="0 means unlimited" />
                <EssentialSkills workCategory={workCategory} onEssentialSkillChange={onEssentialSkillChange} />
                <EssentialOperators workCategory={workCategory} onEssentialOperatorChange={onEssentialOperatorChange} />
                <ImpossibleOperators workCategory={workCategory} onImpossibleOperatorChange={onImpossibleOperatorChange} />
            </CardContent>
            <CardActions className="ml-2">
                <Button onClick={handleRemove(workCategory.id)} variant="outlined" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default workCategory;