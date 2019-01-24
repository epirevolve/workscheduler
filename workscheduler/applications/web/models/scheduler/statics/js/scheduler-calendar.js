;
'use strict';

import { newPseudoUuid } from '/statics/js/util.js';

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
                let $span = $(`<span data-id=${id} class="m-2 dropped-item draggable">`)
                                .data('id', id)
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

        $('.date').datetimepicker({
            format: 'YYYY-MM-DD',
            useCurrent: false
        });

        $('#schedule-of').on('change.datetimepicker', function (e) {
            const date = new Date($('#schedule-of').datetimepicker('date')).toYearMonthFormatString();
            location.href = $(this).data('url').replace('schedule_of', date);
        });

        $('#addFixedSchedule').click(function () {
            const id = newPseudoUuid();
            const $card = $('<div class="card">');
            $card
                .append($('<div class="card-header">')
                    .append($('<h4>').append($('<input type="text">'))))
                .append($('<div class="card-body">')
                    .append($(`<div class="input-group m-1 mb-3 date" id="${id}-from" data-target-input="nearest">`)
                        .append($('<div class="input-group-prepend">')
                            .append($('<span class="input-group-text">').html('From')))
                        .append($(`<input type="text" class="form-control datetimepicker-input" data-target="#${id}-from">`))
                        .append($(`<div class="input-group-append" data-target="#${id}-from" data-toggle="datetimepicker">`)
                            .append($('<div class="input-group-text">').append($('<i class="fa fa-calendar">')))))
                    .append($(`<div class="input-group m-1 mb-3 date" id="${id}-to" data-target-input="nearest">`)
                        .append($('<div class="input-group-prepend">')
                            .append($('<span class="input-group-text">').html('To')))
                        .append($(`<input type="text" class="form-control datetimepicker-input" data-target="#${id}-to">`))
                        .append($(`<div class="input-group-append" data-target="#${id}-to" data-toggle="datetimepicker">`)
                            .append($('<div class="input-group-text">').append($('<i class="fa fa-calendar">')))))
                    .append($('<div class="custom-control-inline mb-2">'))
                    .append($('<h5>').html('Attend Member'))
                    .append($('<div class="attend-member drop-region droppable ml-1 mb-3">'))
                    .append($('<hr>'))
                    .append($('<button type="button" class="btn btn-danger btn-block">').html("Remove"))
                );
            $('#fixedScheduleColumns').append($card);
            $('.date').datetimepicker({
                format: 'YYYY-MM-DD',
                useCurrent: false
            });
        });
    });
})(jQuery);