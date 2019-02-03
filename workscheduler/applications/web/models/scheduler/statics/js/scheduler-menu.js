;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';

(function () {
    let affiliationChanged = function () {
        const affiliationId = $('[name="affiliation"]').find('option:selected').val();
        for (const anchor of $('.card-deck a:not(#launch)')) {
            const $anchor = $(anchor);
            const baseUrl = $anchor.data('url') || "";
            $anchor.attr('href', baseUrl.replace('affiliation_id', affiliationId));
        }
    }

    $(document).ready(function () {
        $('select[name="affiliation"]').change(function () {
            affiliationChanged();
        });

        $('#launchCalendar').datetimepicker({
            inline: true,
            format: 'YYYY-MM',
            useCurrent: false
        });

        affiliationChanged();

        $('#launch').click(function () {
            $('#launchCalendarModal').modal();
        });

        $('#launchCalendar').on('change.datetimepicker', function (e) {
            const affiliationId = $('[name="affiliation"]').find('option:selected').val();
            const monthYear = new Date($(this).datetimepicker('date')).toYearMonthFormatString();
            const url = $('#launch').data('url').replace('affiliation_id', affiliationId)
                .replace('schedule_of', monthYear);
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    'affiliation_id': affiliationId,
                    'schedule_of': monthYear
                }
            })
            .done((data) => {
                $('#launchCalendarModal').modal('hide');
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('Started to make schedule. Please wait until it will be done.',
                'alert-info');
            })
            .fail(($xhr) => {

            });
        });
    });
})(jQuery)