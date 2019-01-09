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
        $('#prefix').datetimepicker({
            format: 'L'
        });

        $('button[name="add-category"]').click(function () {
            let $card =
                $('<div>')
                    .addClass('card')
                    .append(
                        $('<div>')
                            .addClass('card-header')
                            .append(
                                $('<h4>').append($('<input>').attr('type', 'text'))))
                    .append(
                        $('<div>')
                            .addClass('card-body')
                            .append(
                                $('<div>')
                                    .addClass('input-group m-1 mb-3')
                                    .append(
                                        $('<div>')
                                            .addClass('input-group-prepend')
                                            .append(
                                                $('<span>')
                                                    .addClass('input-group-text')
                                                    .text('Default Count')))
                                    .append(
                                        $('<input>')
                                            .attr('type', 'number')
                                            .addClass('form-control')
                                            .attr('min', '0')))
                            .append(
                                $('<div>')
                                    .addClass('m-1 mb-3 custom-control custom-checkbox')
                                    .append(
                                        $('<input>')
                                            .attr('type', 'checkbox')
                                            .addClass('custom-control-input')
                                            .attr('id', 'rest_next_day'))))

        });
    });
})(jQuery);