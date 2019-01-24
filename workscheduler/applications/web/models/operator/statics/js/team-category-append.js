;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function() {
    $(document).ready(function(){
        $('#append').click(function(){
            if(!$('input[name="name"]').val().trim()){
                alert('The team category name is required.');
                return false;
            }
            if(!$.isNumeric($('input[name="min_member_count"]').val()) || !$.isNumeric($('input[name="max_member_count"]').val())){
                alert('Please input a number to the member count.');
                return false;
            }
            if(Number($('input[name="min_member_count"]').val()) < 0 || Number($('input[name="max_member_count"]').val()) < 0){
                alert('Please input a number of more than 0 to the member count.');
                return false;
            }
            if(Number($('input[name="min_member_count"]').val()) > Number($('input[name="max_member_count"]').val())){
                alert('The range of the member count is wrong.');
                return false;
            }

            if (!confirm('Would you really store the team category?')) return;

            $.ajax({
                url: '/teams/append_team_category/store',
                type: 'POST',
                data: $('form').serialize()
            })
            .done((data) => {
                if (!confirm('Would you transfer in the edit page?')){
                    let alertManager = new AlertManager('#alertContainer');
                    alertManager.append('The team category was successfully registered.',
                    'alert-info');
                    return false;
                }

                $('<form/>', {action: '/teams/edit_team_category', method: 'post'})
                .append($('<input/>', {type: 'hidden', name: 'csrf_token', value: $('input[name="csrf_token"]').val()}))
                .append($('<input/>', {type: 'hidden', name: 'team_category_id', value: data.teamCategoryId}))
                .appendTo(document.body)
                .submit();
            })
            .fail(($xhr) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('Oops, Sorry we have some trouble with storing the team category...',
                'alert-error');
            })
        });

        $('#abort').click(function(){
            if (!confirm('Would you back to the previous page?')) return;

            location.href = $(this).attr("data-href");
        });
    })
})(jQuery);
