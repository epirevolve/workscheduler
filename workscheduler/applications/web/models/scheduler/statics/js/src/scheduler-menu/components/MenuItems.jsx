import React from 'react';

import requestAgent from 'superagent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Button from '@material-ui/core/Button';

import MenuCard from 'MenuCard';

import { AlertManager } from 'alert-helper';

const dataset = document.querySelector('script[src*="scheduler-menu"]').dataset;
const urlMonthly = dataset.urlMonthly;
const urlBasic = dataset.urlBasic;
const urlYearly = dataset.urlYearly;
const urlLaunch = dataset.urlLaunch;

const disabledDate = (value) => {
    return false;
}

class MenuItems extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            openCalendar: false,
            year: new Date().getFullYear()
        };
    }

    handleLunch (month) {
        const { affiliation } = this.props;
        this.setState({ openCalendar: false })

        const alertManager = new AlertManager('#alertContainer');
        alertManager.append('Started to make schedule. Please wait until it will be done.', 'alert-info')

        requestAgent
            .post(urlLaunch.replace('affiliation_id', affiliation.id)
                .replace('month_', month).replace('year_', this.state.year))
            .send(affiliation)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('Finish to make schedule.', 'alert-info')
            })
            .catch(err => {
                const res = err.response.text;
                const alertManager = new AlertManager('#alertContainer');
                const message = res || 'we have some trouble with launching scheduler...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
    }

    render () {
        const { affiliation } = this.props;

        return (
            <>
                 <Dialog open={this.state.openCalendar} onClose={() => this.setState({ openCalendar: false })}>
                    <DialogTitle style={{ textAlign: 'center' }}>
                        <IconButton aria-label="back year" onClick={() => this.setState({ year: this.state.year - 1})}>
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <span style={{ fontSize: '2rem', padding: '0 2rem' }}>{this.state.year}</span>
                        <IconButton aria-label="forward year" onClick={() => this.setState({ year: this.state.year + 1})}>
                            <ArrowForwardIosRoundedIcon />
                        </IconButton>
                    </DialogTitle>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <Grid container>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(1)}>
                                    Jan
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(2)}>
                                    Feb
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(3)}>
                                    Mar
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(4)}>
                                    Apr
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(5)}>
                                    May
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(6)}>
                                    Jun
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(7)}>
                                    Jul
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(8)}>
                                    Aug
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(9)}>
                                    Sep
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(10)}>
                                    Oct
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(11)}>
                                    Nov
                                </Button>
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <Button color="primary" size="large" onClick={() => this.handleLunch(12)}>
                                    Dec
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Grid container spacing={16} className="my-4" style={{ marginLeft: "0.2rem" }}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MenuCard title="Monthly Setting" img="/statics/img/scheduler-monthly-setting.svg"
                            href={urlMonthly.replace('affiliation_id', affiliation.id)}
                            description="set require number of member each day and prefixed schedule" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MenuCard title="Basic Setting" img="/statics/img/scheduler-basic-setting.svg"
                            href={urlBasic.replace('affiliation_id', affiliation.id)}
                            description="set work category and witch parameter will be used when making a schedule" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MenuCard title="Yearly Setting" img="/statics/img/scheduler-yearly-setting.svg"
                            href={urlYearly.replace('affiliation_id', affiliation.id)}
                            description="set vacation in summer or winter" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MenuCard title="Launch" img="/statics/img/scheduler-launch.svg"
                            href="#" onClick={() => this.setState({ openCalendar: true })}
                            description="create schedule of current affiliation and selected month" />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default MenuItems;