;
'use strict';

(function() {
    $(document).ready(function(){
        $('.edit').click(function(){
            var $team_category = $(this).parent().children('input[type="hidden"]');
            var $csrf_token = $('input[name="csrf_token"]').val();
            $('<form/>', {action: '/teams/edit_team_category', method: 'post'})
            .append($('<input/>', {type: 'hidden', name: 'csrf_token', value: $csrf_token}))
            .append($('<input/>', {type: 'hidden', name: 'team_category_id', value: $team_category.val()}))
            .appendTo(document.body)
            .submit();
        });
    })
})(jQuery);
