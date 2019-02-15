const React = require('react');
const ReactDOM = require('react-dom');

const $mainScript = $('#mainScript');

const url = $mainScript.data('url');
const scheduleOf = new Date($mainScript.data('scheduleOf'));
const scheduleOfName = $mainScript.data('scheduleOfName');

class MonthYearSetting extends React.Component {
    constructor (props) {
        super(props);
        const [prev, next] = this.setMonthChangeButtonAvailability();

        this.state = {
            toPrevious: prev,
            toNext: next
        }

        this.handleToPrevious = this.handleToPrevious.bind(this);
        this.handleToNext = this.handleToNext.bind(this);
    }

    render () {
        return (
            <div className="cl-tool-header row">
                <div className="cl-tool-left col-md-3">
                    <button type="button" className="btn btn-link" disabled={!this.state.toPrevious}
                        onClick={this.handleToPrevious}>
                        <span className="fa fa-chevron-left"></span>
                    </button>
                </div>
                <div className="cl-tool-center cl-title col-md-6">
                    <h2>{scheduleOfName}</h2>
                </div>
                <div className="cl-tool-right col-md-3">
                    <button type="button" className="btn btn-link" disabled={!this.state.toNext}
                        onClick={this.handleToNext}>
                        <span className="fa fa-chevron-right"></span>
                    </button>
                </div>
            </div>
        );
    }

    requestOfOtherMonthYear (addMonth) {
        const stamp = Date.parse(scheduleOf);

        if (isNaN(stamp) == true) {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('Sorry, we cant do more process due to invalid date.')
            return false;
        }

        let date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        const date_str = date.toYearMonthFormatString();

        location.href = url.replace('schedule_of', date_str);
    }

    setMonthChangeButtonAvailability () {
        const stamp = new Date(Date.parse(scheduleOf));

        let prev = false;
        let next = false;

        if (minDate.getFullYear() < stamp.getFullYear() || minDate.getMonth() < stamp.getMonth()) {
            prev = true;
        }
        if (maxDate.getFullYear() > stamp.getFullYear() || maxDate.getMonth() > stamp.getMonth()) {
            next = true;
        }

        return [prev, next];
    };

    handleToPrevious () {
        this.requestOfOtherMonthYear(-1);
    }

    handleToNext () {
        this.requestOfOtherMonthYear(1);
    }
}

ReactDOM.render(
    <MonthYearSetting />,
    document.getElementById('content')
);