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
            url: '/operators/my_request/' + login_id + '/' + date_str
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
            var recipient = button.data('whatever');
            var modal = $(this);
            modal.find('.modal-title').text('Event');
            modal.find('.modal-body input').val(recipient);
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