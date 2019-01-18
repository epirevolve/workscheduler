;
'use strict';

(function () {
    let affiliationChanged = function () {
        let $affiliation = $('[name="affiliation"]');
        let affiliationId = $affiliation.find('option:selected').val();
        for (let anchor of $('.card-deck a')) {
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
    });
})(jQuery)