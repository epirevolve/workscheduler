;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    let getEventData = function () {
        let from = new Date($('#datetimeFrom').datetimepicker("date")).toDateTimeFormatString();
        let to = new Date($('#datetimeTo').datetimepicker("date")).toDateTimeFormatString();

        let d = {
                'requestId': $('#requestId').val(),
                'requestTitle': $('#requestTitle').val(),
                'requestNote': $('#requestNote').val(),
                'requestAtFrom': from,
                'requestAtTo': to
            };

        return d;
    }

    let setDateLimit = function () {
        $('#datetimeFrom').datetimepicker("maxDate", false);
        $('#datetimeFrom').datetimepicker("minDate", minDate.setEarliestTime());

        $('#datetimeTo').datetimepicker("minDate", false);
        $('#datetimeTo').datetimepicker("maxDate", maxDate.setLatestTime());
    }

    let addEvent = function () {
        let monthlyHolidays = parseInt($('#monthlyHolidays').data('holidays'));
        let remainedPaidHolidays = parseInt($('#paidHolidays').data('holidays'));

        const $postAction = () => {
            $.ajax({
                url: appendRequestUrl,
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
                    $(`[data-day='${nextWeekDate.getDate()}']`).find('.request-container')
                        .append($request.clone().addClass('day-7'));
                    days -= 7;
                    nextWeekDate.addDays(7);
                }
                $(`[data-day='${nextWeekDate.getDate()}']`).find('.request-container')
                    .append($request.clone().addClass(`day-${days}`));
                $request.addClass(`day-${remainedDays + 1}`);
            }
        }

        $('[data-toggle="popover"]').popover(
        {
            'html': true,
            'placement': 'top'
        });

        $(document).on('click', '#addRequest', function () {
            const $button = $(this);
            const $container = $button.parents('.cl-body-cell').eq(0);

            if ($container.find('.request-item').length >= 2) {
                alert('cant append more request on this day');
                return;
            }

            const day = $container.data('day');
            $('#requestTitle').val('');
            $('#requestNote').val('');

            setDateLimit();

            const scheduleOf = new Date(Date.parse($('#scheduleOf').data('schedule-of')));
            const date = `${scheduleOf.getFullYear()}-${scheduleOf.getMonth() + 1}-${day}`;

            $('#datetimeFrom').datetimepicker("date", date + 'T09:30');
            $('#datetimeTo').datetimepicker("date", date + 'T18:00');

            let $save = $("#saveRequest");
            $save.off('click');
            $save.on('click', addEvent);

            $('#requestModal').modal();
        });

        $(document).on('click', '#editRequest', function () {
            let $button = $(this);

            $('#requestTitle').val($button.data('title'));
            $('#requestNote').val($button.data('note'));

            $('.popover').popover('hide');

            let $save = $("#saveRequest");
            $save.off('click');
            $save.on('click', editEvent);

            $('#requestModal').modal();
        });
    });
})(jQuery);