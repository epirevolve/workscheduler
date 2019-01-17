;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let requestMonthYear = function (stamp, addMonth) {
        if (isNaN(stamp) == true) {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('Sorry, we cant do more process due to invalid date.')
            return false;
        }

        let userId = $('#user-id').val();
        let date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        let date_str = date.getFullYear() + '-' + (date.getMonth() + 1);

        location.href = `/operators/my-requests/month-year/${date_str}`;
    }

    let getEventData = function () {
        let from = new Date($('#datetime-from').datetimepicker("date"));
        let fromstr = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()} ${from.getHours()}:${from.getMinutes()}`;
        let to = new Date($('#datetime-to').datetimepicker("date"));
        let tostr = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()} ${to.getHours()}:${to.getMinutes()}`;

        let d = {
                'requestId': $('#request-id').val(),
                'requestTitle': $('#request-title').val(),
                'requestNote': $('#request-note').val(),
                'requestAtFrom': fromstr,
                'requestAtTo': tostr
            };

        return d;
    }

    const minDate = new Date(new Date().addMonths(1).setDate(1));
    const maxDate = new Date(new Date().addMonths(7).setDate(0));

    let setDateLimit = function () {
        $('#datetime-from').datetimepicker("maxDate", false);
        $('#datetime-from').datetimepicker("minDate", minDate.setEarliestTime());

        $('#datetime-to').datetimepicker("minDate", false);
        $('#datetime-to').datetimepicker("maxDate", maxDate.setLatestTime());
    }

    let addEvent = function () {
        let monthlyHolidays = parseInt($('#monthly-holidays').data('holidays'));
        let remainedPaidHolidays = parseInt($('#paid-holidays').data('holidays'));

        if (monthlyHolidays <= $('.request').length) {
            let ret = confirm('adding more request will decrease your paid holidays.\r\nis it ok?');
            if (!ret) return;
            if (remainedPaidHolidays <= 0) {
                let ret = confirm('maybe your paid holidays are still empty.\r\nare you keep going?');
                if (!ret) return;
            }
        }

        $.ajax({
            url: '/operators/my-requests',
            type: 'POST',
            data: getEventData()
        })
        .done((data) => {
            const alertManager = new AlertManager('#alert-container');
            alertManager.append('Your request is correctly registered.',
            'alert-info');
            $('#request-modal').modal('hide');
            const requestAtFrom = new Date(data.requestAtFrom);
            const requestAtTo = new Date(data.requestAtTo);
            const $requestPlace = $(`[data-date='${requestAtFrom.toDateFormatString()}'`).find('.request-container');
            if ($requestPlace == null) return;
            const $inner =
                $('<div>')
                    .append(
                        $('<button>')
                            .addClass('btn btn-info btn-sm btn-block mb-3')
                            .attr('id', 'edit-request')
                            .data('id', data.requestId)
                            .data('title', data.requestTitle)
                            .data('note', data.requestNote)
                            .html('Edit'))
                    .append(
                        $('<div>')
                            .addClass('m-2')
                            .html(data.requestNote))
                    .append(
                        $('<div>')
                            .addClass('m-2')
                            .html(`${requestAtFrom.toDateFormatString()}<br />~</br>${requestAtTo.toDateFormatString()}`))
                    .append(
                        $('<button>')
                            .addClass('btn btn-danger btn-sm btn-block mt-3')
                            .attr('id', 'remove-request')
                            .data('id', data.requestId)
                            .html('Remove'));
            const $button =
                $('<button>')
                    .addClass('btn request btn-block request-item')
                    .attr('title', `<h4>${data.requestTitle}</h4>`)
                    .attr('type', 'button')
                    .data('toggle', 'popover')
                    .data('content', $inner)
                    .html(data.requestTitle);
            $requestPlace.append($button);
            $button.popover(
            {
                'html': true,
                'placement': 'top'
            });

            remainedPaidHolidays -= 1;
            $('#paid-holidays').text(`${remainedPaidHolidays} days`);
        })
        .fail(($xhr) => {
            const data = $xhr.responseJSON;
            const alertManager = new AlertManager('#alert-container');
            const message = data.errorMessage || 'we have some trouble with appending request...';
            alertManager.append(`Oops, Sorry ${message}`,
            'alert-danger')
        });
    }

    let editEvent = function () {

    }

    $(document).ready(function () {
        for (let request of $('.request')) {
            const $request = $(request);
            const from = new Date($request.data('atFrom'));
            const to = new Date($request.data('atTo'));
            if (from.toDateFormatString() == to.toDateFormatString()) continue;
            let days = to.getDate() - from.getDate();
            if (days <= 7 && from.getDay() < to.getDay()) {
                $request.addClass(`day-${days + 1}`);
            }
            else {
                const remainedDays = 6 - from.getDay();
                days -= remainedDays;
                let nextWeekDate = from.addDays(remainedDays + 1);
                while (1 <= Math.floor(days/7)) {
                    $(`[data-date='${nextWeekDate.toDateFormatString()}']`).find('.request-container')
                        .append($request.clone().addClass('day-7'));
                    days -= 7;
                    nextWeekDate.addDays(7);
                }
                $(`[data-date='${nextWeekDate.toDateFormatString()}']`).find('.request-container')
                    .append($request.clone().addClass(`day-${days}`));
                $request.addClass(`day-${remainedDays + 1}`);
            }
        }

        $('[data-toggle="popover"]').popover(
        {
            'html': true,
            'placement': 'top'
        });

        $(document).on('click', '#add-request', function () {
            let $button = $(this);
            let $container = $button.parents('.cl-body-cell').eq(0);

            if ($container.find('.request-item').length >= 2) {
                alert('cant append more request on this day');
                return;
            }

            let recipient = $container.data('date');
            $('#request-title').val('');
            $('#request-note').val('');

            setDateLimit();

            $('#datetime-from').datetimepicker("date", recipient + 'T09:30');
            $('#datetime-to').datetimepicker("date", recipient + 'T18:00');

            let $save = $("#save-request");
            $save.off('click');
            $save.on('click', addEvent);

            $('#request-modal').modal();
        });

        $(document).on('click', '#edit-request', function () {
            let $button = $(this);

            $('#request-title').val($button.data('title'));
            $('#request-note').val($button.data('note'));

            $('.popover').popover('hide');

            let $save = $("#save-request");
            $save.off('click');
            $save.on('click', editEvent);

            $('#request-modal').modal();
        });

        $('.date').datetimepicker({
            format: 'YYYY-MM-DD HH:mm',
            useCurrent: false,
            stepping: 15,
            icons: {
                time: 'far fa-clock',
                date: 'far fa-calendar-alt',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'far fa-calendar-check',
                clear: 'far fa-trash-alt',
                close: 'fas fa-times'
            }
        });

        $("#datetime-from").on("change.datetimepicker", function (e) {
            $('#datetime-to').datetimepicker('minDate', e.date);
        });
        $("#datetime-to").on("change.datetimepicker", function (e) {
            $('#datetime-from').datetimepicker('maxDate', e.date);
        });

        let setMonthChangeButtonAvailability = function () {
            let stamp = new Date(Date.parse($('#month_year').data('month_year')));

            $('button[name="previous-month"]').prop('disabled', true);
            $('button[name="next-month"]').prop('disabled', true);

            if (minDate.getFullYear() < stamp.getFullYear() || minDate.getMonth() < stamp.getMonth()) {
                $('button[name="previous-month"]').prop('disabled', false);
            }
            if (maxDate.getFullYear() > stamp.getFullYear() || maxDate.getMonth() > stamp.getMonth()) {
                $('button[name="next-month"]').prop('disabled', false);
            }
        };
        setMonthChangeButtonAvailability();

        $('button[name="previous-month"]').click(function () {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, -1);

            setMonthChangeButtonAvailability();
        });

        $('button[name="next-month"]').click(function () {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, 1);

            setMonthChangeButtonAvailability();
        });
    });
})(jQuery);