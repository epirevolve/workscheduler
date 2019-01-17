;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let removeDraggable = function ($this, $ui) {
        let $position = $ui.position;
        let $droppable = $($this.parents('.droppable').eq(0));
        if ($droppable==void 0) return;
        if (0 < $position.top && $position.top < $droppable.height()
            && 0 < $position.left && $position.left < $droppable.width()) return;
        $this.remove();
    };
    let baseDraggable = function($obj) {
        return $obj.draggable({
            appendTo: 'body',
            cursor: "move",
            revert: true,
            start: function(event, $ui) {
                $ui.helper.data('dropped', false);
                $ui.helper.draggable({revert: false});
            },
        });
    }
    $(document).ready(function () {
        for (let draggable of $('.selectable .draggable'))
        {
            $(draggable).draggable({
                appendTo: 'body',
                revert: true,
                helper: "clone",
                cursor: "move",
                containment: "#category-column",
                scroll: false
            });
        }
        for (let draggable of $('.droppable .draggable'))
        {
            let $draggable = $(draggable);
            $draggable = baseDraggable($draggable)
                .draggable({
                    stop: function (event, $ui) {
                        if ($ui.helper.data('dropped')) return;
                        $(this).remove();
                    }
                });
        }
        $('.droppable').droppable({
            drop: function(event, $ui) {
                $ui.helper.data('dropped', true);
                $ui.helper.draggable({revert: true});
                let id = $ui.draggable.data('id');
                if ($(this).find(`[data-id=${id}]`).length > 0) return;
                let $span =
                    $('<span>')
                        .data('id', id)
                        .attr('data-id', id)
                        .addClass('m-2 draggable')
                        .text($ui.draggable.text());
                $span = baseDraggable($span)
                    .draggable({
                        stop: (event, $ui) => {
                            if ($ui.helper.data('dropped')) return;
                            $span.remove();
                        }
                    });
                $span.appendTo($(this));
            }
        });
        $('.essential-skills').droppable({
            accept: '.skill'
        });
        $('.essential-operators, .impossible-operators').droppable({
            accept: '.operator'
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() < 200) {
                $('#selectable-list').removeClass('fixed');
            }
            else {
                $('#selectable-list').addClass('fixed');
            }
        });

        $('select[name="affiliation"]').change(function () {
            let $this = $(this);
            let affiliationId = $this.find('option:selected').val();
            let url = $this.data('url') + affiliationId;
            location.href = url;
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

        let getFormData = function () {
            let data = $('form').serialize();
            let array = [];
            $('#category-column').children('.main').map((_, card) => {
                let $card = $(card);
                array.push($card.data('id'));
                $card.find('.essential-skills').find('span').each((index, skill) => {
                    data += `&category-${$card.data('id')}-essential_skills-${index}=${$(skill).data('id')}`
                });
                $card.find('.essential-operators').find('span').each((index, operator) => {
                    data += `&category-${$card.data('id')}-essential_operators-${index}=${$(operator).data('id')}`
                });
                $card.find('.impossible-operators').find('span').each((index, operator) => {
                    data += `&category-${$card.data('id')}-impossible_operators-${index}=${$(operator).data('id')}`
                });
            });
            data += `&work_categories=${array}`;
            return data;
        }

        $('button[name="store-options"]').click(function () {
            $.ajax({
                url: $(this).data('action'),
                type: 'POST',
                data: getFormData()
            })
            .done((data) => {
                location.href = data.redirect;
            })
            .fail(($xhr) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Oops, Sorry we have some trouble with storing options...',
                'alert-danger')
            });
        });
    });
})(jQuery);