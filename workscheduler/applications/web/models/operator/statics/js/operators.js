;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    $(document).ready(function () {
        $('#operatorTable tbody tr').click(function () {
            let $this = $(this);

            $('#userForm').attr('action', `/operators/${$this.data('id')}`);

            $('#id').val($this.data('id'));
            $('#name').val($this.data('name'));
            $('#affiliation').val($this.data('affiliation-name'));
        });
    });
})(jQuery);