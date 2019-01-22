;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    let requestMonthYear = function (stamp, addMonth) {
        if (isNaN(stamp) == true) {
            let alertManager = new AlertManager('#alertContainer');
            alertManager.append('Sorry, we cant do more process due to invalid date.')
            return false;
        }

        let userId = $('#user-id').val();
        let date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        let date_str = date.toYearMonthFormatString();

        location.href = `/operators/my-requests/month-year/${date_str}`;
    }

    let getEventData = function () {
        let from = new Date($('#datetime-from').datetimepicker("date")).toDateTimeFormatString();
        let to = new Date($('#datetime-to').datetimepicker("date")).toDateTimeFormatString();

        let d = {
                'requestId': $('#request-id').val(),
                'requestTitle': $('#request-title').val(),
                'requestNote': $('#request-note').val(),
                'requestAtFrom': from,
                'requestAtTo': to
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

        const $postAction = () => {
            $.ajax({
                url: '/operators/my-requests',
                type: 'POST',
                data: getEventData()
            })
            .done((data) => {
                location.reload(true);
            })
            .fail(($xhr) => {
                const data = $xhr.responseJSON;
                const alertManager = new AlertManager('#alertContainer');
                const message = data.errorMessage || 'we have some trouble with appending request...';
                alertManager.append(`Oops, Sorry ${message}`,
                'alert-danger')
            });
        }

        if (monthlyHolidays <= $('.request').length) {
            const message = remainedPaidHolidays <= 0 ? '<br><br>and also maybe your paid holidays are empty.' : '';
            showConfirmDialog('No Problem?', `adding more request will decrease your paid holidays.${message}`,
                (value) => {
                    if (!value) return;
                    $postAction();
                });
        }
        else {
            $postAction();
        }
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

        $('#add-request').click(function () {
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

            $('#requestModal').modal();
        });

        $(document).on('click', '#edit-request', function () {
            let $button = $(this);

            $('#request-title').val($button.data('title'));
            $('#request-note').val($button.data('note'));

            $('.popover').popover('hide');

            let $save = $("#save-request");
            $save.off('click');
            $save.on('click', editEvent);

            $('#requestModal').modal();
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