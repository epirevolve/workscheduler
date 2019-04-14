import React from 'react'

import DialogContainer from '../containers/DialogContainer'
import RequestsContainer from '../containers/RequestsContainer'

const dataset = document.querySelector('script[src*="request-public"]').dataset;
const holidays = JSON.parse(dataset.holidays);
const paidHolidays = JSON.parse(dataset.paidHolidays || 0);

const app = () => (
    <React.Fragment>
        <DialogContainer />
        <div className="row">
            <CalendarContainer />
            <div className="col-md-2">
                <div>
                    <h5>Monthly Holidays</h5>
                    <p>{holidays || 0} days</p>
                </div>
                <hr />
                <div>
                    <h5>Remained Paid Holidays</h5>
                    <p>{paidHolidays || 0} days</p>
                </div>
            </div>
        </div>
    </React.Fragment>
)

export default app;