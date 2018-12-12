;
'use strict';

import { AlertManager } from './alert-helper.js';

(function(){
    let requestMonthYear = function(stamp, addMonth) {
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
            url: `/operators/my_request/${login_id}/${date_str}`
        }).done((data) => {
            let $header = $(data).find('#month_year');
            $('#month_year').data('month_year', $header.data('month_year'));
            $('#month_year').html($header.html());
            $('.cl-body').html($(data).find('.cl-body').html());
        });
    }

    $(document).ready(function() {
        $('#eventModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var recipient = button.parents('.cl-body-cell').data('date');
            $('#datetime-from').datetimepicker("date", recipient + ' 09:30');
            $('#datetime-to').datetimepicker("date", recipient + ' 18:00');
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

        $("#save-event").click(function() {
            let login_id = $('#login-user-id').text();
            let from = new Date($('#datetime-from').datetimepicker("date"));
            let fromstr = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDay()} ${from.getHours()}:${from.getMinutes()}`;
            let to = new Date($('#datetime-to').datetimepicker("date"));
            let tostr = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDay()} ${to.getHours()}:${to.getMinutes()}`;
            $.ajax({
                url: '/operator/store_my_request/' + login_id,
                type: 'POST',
                data: {
                    'id': $('#event-id').val(),
                    'name': $('#name').val(),
                    'at-from': from,
                    'at-to': to
                }
            })
        });

        $('button[name="previous-month"]').click(function() {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, -1);
        });

        $('button[name="today"]').click(function() {
            let stamp = new Date();
            requestMonthYear(stamp, 0);
        });

        $('button[name="next-month"]').click(function() {
            let stamp = Date.parse($('#month_year').data('month_year'));
            requestMonthYear(stamp, 1);
        });
    });
})(jQuery);