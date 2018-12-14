;
'use strict';

import { AlertManager } from './alert-helper.js';

(function() {
    $(document).ready(function(){
        $('#user-table tbody tr').click(function(){
            $('#user_form').attr('action', '/users/update_user');
            $('#id').val($(this).attr('data-id'));
            $('#login_id').val($(this).find('td').eq(0).text());
            $('#name').val($(this).find('td').eq(1).text());
            $('#is_admin').prop('checked', ($(this).find('td').eq(2).text() == 'True'));
            $('#is_operator').prop('checked', ($(this).find('td').eq(3).text() == 'True'));
        });

        $('#new').click(function(){
            $('#user_form').attr('action', '/users/append_user');
        });

        $('#reset').click(function(){
            let $id = $('#id');
            if ($id.val() == '') return;

            if (!confirm('Would you really reset selected user password?')) return;

            $.ajax({
                url: '/users/reset_password',
                type: 'POST',
                data: $('form').serialize()
            })
            .done((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Successfully changed selected user password. ' +
                    'Please notice him/her new password is "p" + his/her login_id.',
                'alert-info')
            })
            .fail((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Oops, Sorry we have some trouble with reset password...',
                'alert-danger')
            });
        });
    });
})(jQuery);