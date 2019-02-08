;
'use strict';

(function () {
    const requestMonthYear = function (stamp, addMonth) {
        if (isNaN(stamp) == true) {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('Sorry, we cant do more process due to invalid date.')
            return false;
        }

        let date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        const date_str = date.toYearMonthFormatString();

        location.href = showRequestUrl.replace('schedule_of', date_str);
    }

    const setMonthChangeButtonAvailability = function () {
        const stamp = new Date(Date.parse($('#scheduleOf').data('schedule-of')));

        $('#previousMonth').prop('disabled', true);
        $('#nextMonth').prop('disabled', true);

        if (minDate.getFullYear() < stamp.getFullYear() || minDate.getMonth() < stamp.getMonth()) {
            $('#previousMonth').prop('disabled', false);
        }
        if (maxDate.getFullYear() > stamp.getFullYear() || maxDate.getMonth() > stamp.getMonth()) {
            $('#nextMonth').prop('disabled', false);
        }
    };

    $(document).ready(function () {
        $('#previousMonth').click(function () {
            const stamp = Date.parse($('#scheduleOf').data('schedule-of'));
            requestMonthYear(stamp, -1);

            setMonthChangeButtonAvailability();
        });

        $('#nextMonth').click(function () {
            const stamp = Date.parse($('#scheduleOf').data('schedule-of'));
            requestMonthYear(stamp, 1);

            setMonthChangeButtonAvailability();
        });

        setMonthChangeButtonAvailability();
    })
})(jQuery);