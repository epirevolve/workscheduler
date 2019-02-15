const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

const communicator = {};

class RequestDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            note: '',
            from: '',
            to: ''
        }
    }

    componentWillMount () {
        communicator.openRequestDialogToEdit = (data) => {
            this.setState({
                id: data.id,
                title: data.title,
                note: data.note,
                from: data.from,
                to: data.to
            })
        }
    }

    render () {
        return (
            <div className="modal fade" id="requestModal" tabIndex="-1" role="dialog"
                 aria-labelledby="requestLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Set your request</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">title</span>
                                </div>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="input-group m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">note</span>
                                </div>
                                <textarea className="form-control" id="requestNote"></textarea>
                            </div>
                            <div className="form-group m-1">
                                <div className="input-group date" id="datetimeFrom" data-target-input="nearest">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">from</span>
                                    </div>
                                    <input type="text" className="form-control datetimepicker-input" data-target="#datetimeFrom" />
                                    <div className="input-group-append" data-target="#datetimeFrom" data-toggle="datetimepicker">
                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group m-1">
                                <div className="input-group date" id="datetimeTo" data-target-input="nearest">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">to</span>
                                    </div>
                                    <input type="text" className="form-control datetimepicker-input" data-target="#datetimeTo" />
                                    <div className="input-group-append" data-target="#datetimeTo" data-toggle="datetimepicker">
                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" id="saveRequest">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const requestMinDialog = (props) => {
   return (
       <div>
            <button className='btn btn-info btn-sm btn-block mb-3'
                onClick={props.onClickToEdit}>Edit</button>
            <div className='m-2'>{ props.note }</div>
            <div className='m-2'>
                { props.from } ~ { props.to }
            </div>
            <button className='btn btn-danger btn-sm btn-block mt-3'
                onClick={props.onClickToRemove}>Remove</button>
        </div>
    );
};

class Request extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.title,
            note: props.note,
            from: props.from,
            to: props.to
        }

        this.onClickToEdit = this.onClickToEdit.bind(this);
        this.onClickToRemove = this.onClickToRemove.bind(this);
    }

    render () {
        <button className="btn request btn-block request-item"
                title="<h4>{ this.state.title }</h4>" type="button"
                data-toggle="popover"
                data-at-from={ this.state.from.toYearMonthFormatString() }
                data-at-to={ this.state.to }
                data-content={<RequestMinDialog note={this.state.note} from={this.state.from} to={this.state.to}
                    onClickToEdit={this.onClickToEdit} onClickToRemove={this.onClickToRemove} />}>
            { this.state.title }
        </button>
    }

    onClickToEdit (e) {
        communicator.openRequestDialogToEdit(this.state);
    }

    onClickToRemove (e) {

    }
}

class CalendarCell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            requests: props.requests
        }
    }

    render () {
        const requests = [];

        for (let request of this.state.requests) {
            requests.push(<Request />)
        }

        return (
            <React.Fragment>
                <div>
                    <button className="add-request btn btn-danger btn-sm">
                        <i className="fa fa-pencil-alt"></i>
                    </button>
                    <span className="cl-day">{ this.state.day }</span>
                </div>
                <div className="request-container">
                    { requests }
                </div>
            </React.Fragment>
        )
    }
}

class Calendar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            calendar: props.calendar
        }
    }

    render () {
        const weeks = [];

        for (let week of this.state.calendar) {
            let week_ = [];
            for (let day of week) {
                week_.push(<CalendarCell />);
            }
            weeks.push(<div className="row">week_</div>);
        }

        return (
            <div className="col-md-10">
                <div className="cl">
                    <div className="cl-header d-none d-md-block">
                        <div className="row">
                            <div className="cl-header-cell col text-danger">Sun</div>
                            <div className="cl-header-cell col">Mon</div>
                            <div className="cl-header-cell col">Tue</div>
                            <div className="cl-header-cell col">Wed</div>
                            <div className="cl-header-cell col">Thu</div>
                            <div className="cl-header-cell col">Fri</div>
                            <div className="cl-header-cell col text-info">Sat</div>
                        </div>
                    </div>
                    <div className="cl-body">
                        { weeks }
                    </div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            calendar: props.calendar,
            holidays: props.holidays,
            paidHolidays: props.paidHolidays
        }
    }

    render () {
        return (
            <div>
                <RequestDialog />

                <div className="row">
                    <Calendar calendar={this.state.calendar} />
                </div>
                <div class="col-md-2">
                    <div>
                        <h5>Monthly Holidays</h5>
                        <p>{ this.state.holidays } days</p>
                    </div>
                    <hr />
                    <div>
                        <h5>Remained Paid Holidays</h5>
                        <p>{ this.state.paidHolidays  } days</p>
                    </div>
                </div>
            </div>
        )
    }
}
Content.propTypes = {
    holidays: PropTypes.number,
    paidHolidays: PropTypes.number,
}