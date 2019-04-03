import React from 'react';

import requestAgent from 'superagent';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import MenuCard from 'MenuCard';

import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

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
        };
    }

    handleLunch (affiliation, date) {
        this.setState({ openCalendar: false })

        const alertManager = new AlertManager('#alertContainer');
        alertManager.append('Started to make schedule. Please wait until it will be done.', 'alert-info')

        const dateString = date.toDate().toYearMonthFormatString();
        requestAgent
            .post(urlLaunch.replace('affiliation_id', affiliation.id)
                .replace('schedule_of', dateString))
            .send(affiliation)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('Finish to make schedule.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing basic setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    render () {
        const { affiliation } = this.props;

        return (
            <React.Fragment>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                    open={this.state.openCalendar} onClose={() => this.setState({ openCalendar: false })}>
                    <MonthCalendar style={{ zIndex: 1000, top: "40%", left: "40%" }} disabledDate={disabledDate}
                        onSelect={(date) => this.handleLunch(affiliation, date)} />
                </Modal>
                <div className="my-4" style={{ display: "flex" }}>
                    <MenuCard title="Monthly Setting" img="/statics/img/scheduler-calendar.svg" href={urlMonthly.replace('affiliation_id', affiliation.id)}
                        description="set require number of member each day and prefixed schedule" />
                    <MenuCard title="Basic Setting" img="/statics/img/scheduler-basic-option.svg" href={urlBasic.replace('affiliation_id', affiliation.id)}
                        description="set work category and witch parameter will be used when making a schedule" />
                    <MenuCard title="Yearly Setting" img="/statics/img/scheduler-yearly-option.svg" href={urlYearly.replace('affiliation_id', affiliation.id)}
                        description="set vacation in summer or winter" />
                    <Card onClick={() => this.setState({ openCalendar: true })} style={{ width: 300 }} className="m-2 p-3">
                        <CardActionArea href="#">
                            <CardContent>
                                <Typography gutterBottom variant="h4" className="menuHeader">
                                    Launch
                                </Typography>
                            </CardContent>
                            <CardMedia component="img" alt="Launch" title="Launch"
                                height="140" image="/statics/img/scheduler-launch.svg" />
                            <CardContent>
                                <Typography gutterBottom component="p" className="menuContent">
                                    create schedule of current affiliation and selected month
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default MenuItems;