;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    let affiliationChanged = function () {
        let $affiliation = $('[name="affiliation"]');
        let affiliationId = $affiliation.find('option:selected').val();
        for (let anchor of $('.card-deck a:not(#launch)')) {
            let $anchor = $(anchor);
            let baseUrl = $anchor.data('url') || "";
            $anchor.attr('href', baseUrl.replace('affiliation_id', affiliationId));
        }
    }

    $(document).ready(function () {
        $('select[name="affiliation"]').change(function () {
            affiliationChanged();
        });

        affiliationChanged();

        $('#launch').click(function () {
            const alertManager = new AlertManager('#alertContainer');
            alertManager.append('Started to make schedule. Please wait until it will be done.',
            'alert-info')
        });
    });
})(jQuery)