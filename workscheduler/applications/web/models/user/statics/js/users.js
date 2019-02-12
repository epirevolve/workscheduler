;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    let setButtonsDisability = function (bool) {
        $('#reset').prop('disabled', bool);
        $('#store').prop('disabled', bool);
        $('#inactivate').prop('disabled', bool);
    }

    $(document).ready(function () {
        $('#userTable tbody tr').click(function(){
            let $this = $(this);

            $('#userForm').attr('action', `/users/${$this.data('id')}`);

            $('#id').val($this.data('id'));
            $('#loginId').val($this.data('login-id'));
            $('#name').val($this.data('name'));
            $('#affiliation').val($this.data('affiliation-id'));
            $('#isAdmin').prop('checked', ($this.data('is-admin') == 'True'));
            $('#isOperator').prop('checked', ($this.data('is-operator') == 'True'));

            if ($this.data('is-inactivated') == 'True'){
                setButtonsDisability(true);
            } else {
                setButtonsDisability(false);
            }
        });

        $('#new').click(function () {
            $('#userForm').attr('action', '/users/');
            setButtonsDisability(false);
        });

        $('#reset').click(function () {
            let id = $('input[name="id"]').val();
            if (id == '') return;

            showConfirmDialog('Would you really reset selected user password?', 'this action cant be undo.',
                (value) => {
                    if (!value) return;
                    $.ajax({
                        url: `/users/${id}/reset-password`,
                        type: 'POST',
                        data: {
                            'id': id
                        }
                    })
                    .done((data) => {
                        let alertManager = new AlertManager('#alertContainer');
                        alertManager.append('Successfully changed selected user password. ' +
                            'Please notice him/her new password is "p" + his/her login id.',
                        'alert-info')
                    })
                    .fail(($xhr) => {
                        let alertManager = new AlertManager('#alertContainer');
                        alertManager.append('Oops, Sorry we have some trouble with reset password...',
                        'alert-danger')
                    });
                });
        });

        $('#inactivate').click(function () {
            let id = $('input[name="id"]').val();
            if (id == '') return;

            showConfirmDialog('Would you really inactivate selected user?', 'this action cant be undo.',
                (value) => {
                    if (!value) return;
                    $.ajax({
                        url: `/users/${id}/inactivate`,
                        type: 'POST',
                        data: {
                            'id': id
                        }
                    })
                    .done((data) => {
                        let alertManager = new AlertManager('#alertContainer');
                        alertManager.append('Successfully inactivate user.',
                        'alert-info');
                        $(`tr[data-id=${id}]`).data('is-inactivated', 'True');
                        $(`tr[data-id=${id}]`).attr('data-is-inactivated', 'True');
                    })
                    .fail(($xhr) => {
                        let alertManager = new AlertManager('#alertContainer');
                        alertManager.append('Oops, Sorry we have some trouble with inactivating...',
                        'alert-danger')
                    });
                });
        });
    });
})(jQuery);