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
        this.setState({ openCalendar: false });

        const alertManager = new AlertManager('#alertContainer');
        alertManager.append('Started to make schedule. Please wait until it will be done.', 'alert-info');

        requestAgent
            .post('/api/launch-scheduler')
            .send({'affiliationId': affiliation.id, month, 'year': this.state.year})
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('Finish to make schedule.', 'alert-info');
            })
            .catch((err) => {
                const res = err.response.text;
                const alertManager = new AlertManager('#alertContainer');
                const message = res || 'we have some trouble with launching scheduler...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger');
            });
    }

    render () {
        const { affiliation } = this.props;
        const createGridButton = (handle, val) => (
            <Grid item sm={12} md={3}>
                <Button color="primary" size="large" onClick={handle}>
                    {val}
                </Button>
            </Grid>
        );
        const createCardInGrid = (title, img, href, description, onClick = () => {}) => {
            img = `/statics/img/${img}`;
            return (
                <Grid item xs={12} md={6} lg={3}>
                    <MenuCard {...{title, img, href, description, onClick}} />
                </Grid>
            );
        };

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
                            {createGridButton(() => this.handleLunch(1), 'Jan')}
                            {createGridButton(() => this.handleLunch(2), 'Feb')}
                            {createGridButton(() => this.handleLunch(3), 'Mar')}
                            {createGridButton(() => this.handleLunch(4), 'Apr')}
                            {createGridButton(() => this.handleLunch(5), 'May')}
                            {createGridButton(() => this.handleLunch(6), 'Jun')}
                            {createGridButton(() => this.handleLunch(7), 'Jul')}
                            {createGridButton(() => this.handleLunch(8), 'Aug')}
                            {createGridButton(() => this.handleLunch(9), 'Sep')}
                            {createGridButton(() => this.handleLunch(10), 'Oct')}
                            {createGridButton(() => this.handleLunch(11), 'Nov')}
                            {createGridButton(() => this.handleLunch(12), 'Dec')}
                        </Grid>
                    </div>
                </Dialog>
                <Grid container spacing={16} className="my-4" style={{ marginLeft: "0.2rem" }}>
                    {createCardInGrid("Monthly Setting", "scheduler-monthly-setting.svg",
                        urlMonthly.replace('affiliation_id', affiliation.id),
                        "set require number of member each day and prefixed schedule")}
                    {createCardInGrid("Basic Setting", "scheduler-basic-setting.svg",
                        urlBasic.replace('affiliation_id', affiliation.id),
                        "set work category and witch parameter will be used when making a schedule")}
                    {createCardInGrid("Yearly Setting", "scheduler-yearly-setting.svg",
                        urlMonthly.replace('affiliation_id', affiliation.id),
                        "set require number of member each day and prefixed schedule")}
                    {createCardInGrid("Launch", "scheduler-launch.svg",
                        "#", "create schedule of current affiliation and selected month",
                        () => this.setState({ openCalendar: true }))}
                </Grid>
            </>
        );
    }
}

export default MenuItems;