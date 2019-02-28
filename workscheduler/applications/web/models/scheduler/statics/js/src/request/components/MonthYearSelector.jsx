import React from 'react';

import Button from '@material-ui/core/Button';
const $script = $('script[src*="request"]');

const url = $script.data('url');
const scheduleOf = new Date($script.data('scheduleOf'));
const scheduleOfName = $script.data('scheduleOfName');

class MonthYearSetting extends React.Component {
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

        location.href = `${url}?calendar=${date_str}`;
    }

    render () {
        const [prev, next] = this.setMonthChangeButtonAvailability();
        return (
            <div className="cl-tool-header row">
                <div className="cl-tool-left col-md-3">
                    <button type="button" className="btn btn-link" disabled={!prev}
                        onClick={() => this.requestOfOtherMonthYear(-1)}>
                        <span className="fa fa-chevron-left"></span>
                    </button>
                </div>
                <div className="cl-tool-center cl-title col-md-6">
                    <h2>{scheduleOfName}</h2>
                </div>
                <div className="cl-tool-right col-md-3">
                    <button type="button" className="btn btn-link" disabled={!next}
                        onClick={() => this.requestOfOtherMonthYear(1)}>
                        <span className="fa fa-chevron-right"></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default MonthYearSetting;