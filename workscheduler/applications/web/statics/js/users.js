;
'use strict';

import { AlertManager } from './alert-helper.js';

(function() {
    $(document).ready(function(){
        $("#user-table tbody tr").click(function(){
            $('#id').val($(this).attr('data-id'));
            $('#login_id').val($(this).find('td').eq(0).text());
            $('#name').val($(this).find('td').eq(1).text());
            $('#is_admin').prop('checked', ($(this).find('td').eq(2).text() == 'True'));
            $('#is_operator').prop('checked', ($(this).find('td').eq(3).text() == 'True'));
        });

        $('#new').click(function(){
            $('#id').val('');
        });

        $('#reset').click(function(){
            let $id = $('#id');
            if ($id.val() == '') return;

            if (!confirm('Would you really reset selected user password?')) return;

            $.ajax({
                url: '/reset_password',
                type: 'POST',
                data: { 'id': $id.val() }
            })
            .done((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Successfully changed selected user password. ' +
                    'Please notice him/her new password is "p" + his/her login_id.',
                 'alert-info')
            })
            .fail((data) => {
                alert('Oops, Sorry we have some trouble with reset password...');
            });
        });
    });
})(jQuery);