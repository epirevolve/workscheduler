;
'use strict';

import { AlertManager } from './alert-helper.js';

(function() {
    $(document).ready(function(){
        $('#append').click(function(){
            $.ajax({
                url: '/teams/append_team_category/store',
                type: 'POST',
                data: $('form').serialize()
            })
            .done((data) => {
                if (!confirm('Would you transfer in the edit page?')){
                    let alertManager = new AlertManager('#alertContainer');
                    alertManager.append('Team Category was successfully registered.',
                    'alert-info');
                }


            })
            .fail(($xhr) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('Oops, Sorry we have some trouble with store the team category...',
                'alert-error');
            })
        });

        $('#abort').click(function(){
            location.href = $(this).attr("data-href");
        });
    })
})(jQuery);
