;
'use strict';

(function () {
    let setRegulatedDate = function () {

    }

    $(document).ready(function () {
        for (let draggable of $('.draggable'))
        {
            $(draggable).draggable({
                appendTo: 'body',
                revert: true,
                helper: "clone",
                cursor: "move",
                containment: ".row",
                scroll: false
            });
        }
        $('.droppable').droppable({
            drop: function(event, $ui) {
                let id = $ui.draggable.data('id');
                if ($(this).find(`span[data-id=${id}]`).length > 0) return;
                let $span = $('<span>')
                                .data('id', id)
                                .attr('data-id', id)
                                .addClass('m-2 dropped-item draggable')
                                .text($ui.draggable.text())
                                .draggable({
                                    appendTo: 'body',
                                    cursor: "move",
                                    stop: (event, $ui) => {
                                        $span.remove();
                                    }
                                });
                $span.appendTo($(this));
            }
        });

        $('#schedule-of').datetimepicker({
            viewMode: 'months',
            format: 'YYYY-MM',
            useCurrent: false,
            icons: {
                time: 'far fa-clock',
                date: 'far fa-calendar-alt',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'far fa-calendar-check',
                clear: 'far fa-trash-alt',
                close: 'fas fa-times'
            }
        });

        $('#from, #to').datetimepicker({
            viewMode: 'days',
            format: 'YYYY-MM-DD',
            useCurrent: false
        });

        $('#schedule-of').on('change.datetimepicker', function (e) {
            const date = new Date($('#schedule-of').datetimepicker('date')).toYearMonthFormatString();
            location.href = $(this).data('url').replace('schedule_of', date);
        });
    });
})(jQuery);