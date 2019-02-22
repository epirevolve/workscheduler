import React from 'react'

import DialogContainer from '../containers/DialogContainer'
import CalendarContainer from '../containers/CalendarContainer'

const $script = $('script[src*="request-public.min.js"]');

const holidays = $script.data('holidays');
const paidHolidays = $script.data('paidHolidays');

const App = () => (
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

export default App;