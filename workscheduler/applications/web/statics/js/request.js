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

        let login_id = $('#login-user-id').text();
        let date = new Date(stamp);
        date.setMonth(date.getMonth() + addMonth);
        let date_str = date.getFullYear() + '-' + (date.getMonth() + 1)

        $.ajax({
            url: `/operators/show_my_request/${login_id}/${date_str}`
        }).done((data) => {
            let $header = $(data).find('#month_year');
            $('#month_year').data('month_year', $header.data('month_year'));
            $('#month_year').html($header.html());
            $('.cl-body').html($(data).find('.cl-body').html());
        });
    }

    let getEventData = function () {
        let from = new Date($('#datetime-from').datetimepicker("date"));
        let fromstr = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()} ${from.getHours()}:${from.getMinutes()}`;
        let to = new Date($('#datetime-to').datetimepicker("date"));
        let tostr = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()} ${to.getHours()}:${to.getMinutes()}`;

        let d = {
                'event-id': $('#event-id').val(),
                'event-title': $('#event-title').val(),
                'event-note': $('#event-note').val(),
                'event-at-from': fromstr,
                'event-at-to': tostr
            };

        return d;
    }

    let setDateLimit = function () {
        $('#datetime-from').datetimepicker("maxDate", false);
        let minDate = new Date(new Date().addMonths(1).setDate(1)).setEarliestTime();
        $('#datetime-from').datetimepicker("minDate", minDate);

        $('#datetime-to').datetimepicker("minDate", false);
        let maxDate = new Date(new Date().addMonths(7).setDate(0)).setLatestTime();
        $('#datetime-to').datetimepicker("maxDate", maxDate);
    }

    let addEvent = function () {
        $.ajax({
            url: '/operators/append_my_request',
            type: 'POST',
            data: getEventData()
        })
        .done((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('Your event is correctly registered.',
            'alert-info');
            $('#event-modal').modal('hide');
            let eventAtFrom = new Date(data.eventAtFrom);
            let $eventPlace = $(`#events-${eventAtFrom.getFullYear()}${("0" + (eventAtFrom.getMonth()+1)).slice(-2)}${("0" + eventAtFrom.getDate()).slice(-2)}`);
            if ($eventPlace == null) return;
            let $inner =
                $('<div>')
                    .append(
                        $('<button>')
                            .addClass('btn btn-basic btn-sm btn-block mb-3')
                            .attr('id', 'edit-event')
                            .data('id', data.eventId)
                            .data('title', data.eventTitle)
                            .data('note', data.eventNote)
                            .html('Edit'))
                    .append(
                        $('<div>')
                            .addClass('m-2')
                            .html(data.eventNote))
                    .append(
                        $('<div>')
                            .addClass('m-2')
                            .html(`${data.eventAtFrom}<br />~</br>${data.eventAtTo}`))
                    .append(
                        $('<button>')
                            .addClass('btn btn-basic btn-sm btn-block mt-3')
                            .attr('id', 'remove-event')
                            .data('id', data.eventId)
                            .html('Remove'));
            let $button =
                $('<button>')
                    .addClass('btn btn-warning btn-block event-item')
                    .attr('title', `<h4>${data.eventTitle}</h4>`)
                    .attr('type', 'button')
                    .data('toggle', 'popover')
                    .data('content', $inner)
                    .html(data.eventTitle);
            $eventPlace.append($button);
            $button.popover(
            {
                'html': true,
                'placement': 'top'
            });
        })
        .fail((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('Oops, Sorry we have some trouble with appending event...',
            'alert-danger')
        });
    }

    let editEvent = function () {

    }

    $(document).ready(function () {
        $('[data-toggle="popover"]').popover(
        {
            'html': true,
            'placement': 'top'
        });

        $(document).on('click', '#add-event', function () {
            let $button = $(this);
            let $container = $button.parents('.cl-body-cell').eq(0);

            if ($container.find('.event-item').length >= 2) {
                alert('cant append more event on this day');
                return;
            }

            let recipient = $container.data('date');
            $('#event-title').val('');
            $('#event-note').val('');

            setDateLimit();

            $('#datetime-from').datetimepicker("date", recipient + 'T09:30');
            $('#datetime-to').datetimepicker("date", recipient + 'T18:00');

            let $save = $("#save-event");
            $save.off('click');
            $save.on('click', addEvent);

            $('#event-modal').modal();
        });

        $(document).on('click', '#edit-event', function () {
            let $button = $(this);

            $('#event-title').val($button.data('title'));
            $('#event-note').val($button.data('note'));

            $('.popover').popover('hide');

            let $save = $("#save-event");
            $save.off('click');
            $save.on('click', editEvent);

            $('#event-modal').modal();
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

        $('button[name="previous-month"]').click(function () {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, -1);

            $('button[name="next-month"]').prop('disabled', false);

            let d = new Date(stamp);
            let minDate = new Date().addMonths(2);
            if (d.getFullYear() <= minDate.getFullYear() && d.getMonth() <= minDate.getMonth()) {
                $(this).prop('disabled', true);
            };
        });

        $('button[name="next-month"]').click(function () {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, 1);

            $('button[name="previous-month"]').prop('disabled', false);

            let d = new Date(stamp);
            let maxDate = new Date().addMonths(5);
            if (d.getFullYear() >= maxDate.getFullYear() && d.getMonth() >= maxDate.getMonth()) {
                $(this).prop('disabled', true);
            };
        });
    });
})(jQuery);