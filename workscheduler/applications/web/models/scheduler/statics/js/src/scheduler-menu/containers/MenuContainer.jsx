import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

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

class MenuContainer extends React.Component {
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
                    <Card style={{ maxWidth: 345 }} className="m-2 p-3">
                        <CardActionArea href={urlMonthly.replace('affiliation_id', affiliation.id)}>
                            <CardMedia
                                component="img"
                                alt="Monthly Setting"
                                height="140"
                                image="/statics/img/scheduler-calendar.svg"
                                title="Monthly Setting"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Monthly Setting
                            </Typography>
                            <Typography component="p">
                                Can control daily requires and prefixed schedule like a seminar.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card style={{ maxWidth: 345 }} className="m-2 p-3">
                        <CardActionArea href={urlBasic.replace('affiliation_id', affiliation.id)}>
                            <CardMedia
                                component="img"
                                alt="Basic Setting"
                                height="140"
                                image="/statics/img/scheduler-basic-option.svg"
                                title="Basic Setting"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Basic Setting
                            </Typography>
                            <Typography component="p">
                                Can control daily requires and prefixed schedule like a seminar.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card style={{ maxWidth: 345 }} className="m-2 p-3">
                        <CardActionArea href={urlYearly.replace('affiliation_id', affiliation.id)}>
                            <CardMedia
                                component="img"
                                alt="Yearly Setting"
                                height="140"
                                image="/statics/img/scheduler-yearly-option.svg"
                                title="Yearly Setting"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Yearly Setting
                            </Typography>
                            <Typography component="p">
                                Can control daily requires and prefixed schedule like a seminar.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card onClick={() => this.setState({ openCalendar: true })} style={{ maxWidth: 345 }} className="m-2 p-3">
                        <CardActionArea href="#">
                            <CardMedia
                                component="img"
                                alt="Launch"
                                height="140"
                                image="/statics/img/scheduler-launch.svg"
                                title="Launch"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Launch
                            </Typography>
                            <Typography component="p">
                                Can control daily requires and prefixed schedule like a seminar.
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    affiliation: state.menu.affiliation
});

export default connect(mapStateToProps)(MenuContainer);