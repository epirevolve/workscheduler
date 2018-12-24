;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    $(document).ready(function () {
        $('#user-table tbody tr').click(function(){
            $('form[name="user_form"]').attr('action', '/users/update_user');

            let $this = $(this);
            $('input[name="id"]').val($this.data('id'));
            $('input[name="login_id"]').val($this.data('login_id'));
            $('input[name="name"]').val($this.data('name'));
            $('select[name="belong"]').val($this.data('belong_id'));
            $('input[name="is_admin"]').prop('checked', ($this.data('is_admin') == 'True'));
            $('input[name="is_operator"]').prop('checked', ($this.data('is_operator') == 'True'));
        });

        $('#new').click(function () {
            $('form[name="user_form"]').attr('action', '/users/append_user');
        });

        $('#reset').click(function () {
            let id = $('input[name="id"]').val();
            if (id == '') return;

            if (!confirm('Would you really reset selected user password?')) return;

            $.ajax({
                url: '/users/reset_password',
                type: 'POST',
                data: {
                    'id': id
                }
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

        $('#inactivate').click(function () {
            let id = $('input[name="id"]').val();

            if (id == '') return;

            if (!confirm('Would you really inactivate selected user? this action cant be undo.')) return;

            $.ajax({
                url: '/users/inactivate',
                type: 'POST',
                data: {
                    'id': id
                }
            })
            .done((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Successfully inactivate user.',
                'alert-info');
                $(`tr[data-id=${id}]`).data('is_inactivated', 'True');
                $(`tr[data-id=${id}]`).attr('data-is_inactivated', 'True');
            })
            .fail((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Oops, Sorry we have some trouble with inactivating...',
                'alert-danger')
            });
        });
    });
})(jQuery);