;
'use strict';

import { AlertManager } from '/statics/js/alert-helper.js';
import { newPseudoUuid } from '/statics/js/util.js';

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

        let categoriesModified = false;

        $('button[name="addCategory"]').click(function () {
            const id = newPseudoUuid();
            let $card =
                $('<div class="card main">')
                    .data('id', id)
                    .append($(`<input type="hidden" name="category-${id}-id">`).val(id))
                    .append($('<div class="card-header">')
                        .append($('<h4>').append($(`<input type="text" name="category-${id}-title">`))))
                    .append($('<div class="card-body">')
                        .append($('<div class="card">')
                            .append($('<div class="card-header">').html('Weekday'))
                            .append($('<div class="card-body custom-control-inline">')
                                .append($('<div class="input-group m-1">')
                                    .append($('<div class="input-group-prepend">')
                                        .append($('<span class="input-group-text">').html('Require')))
                                    .append($(`<input type="number" min="0" name="category-${id}-week_day_require" class="form-control">`).val(0)))
                                .append($('<div class="input-group m-1">')
                                    .append($('<div class="input-group-prepend">')
                                        .append($('<span class="input-group-text">').html('Max')))
                                    .append($(`<input type="number" min="0" name="category-${id}-week_day_max" class="form-control">`).val(0)))))
                        .append($('<div class="card">')
                            .append($('<div class="card-header">').html('Holiday'))
                            .append($('<div class="card-body custom-control-inline">')
                                .append($('<div class="input-group m-1">')
                                    .append($('<div class="input-group-prepend">')
                                        .append($('<span class="input-group-text">').html('Require')))
                                    .append($(`<input type="number" min="0" name="category-${id}-holiday_require" class="form-control">`).val(0)))
                                .append($('<div class="input-group m-1">')
                                    .append($('<div class="input-group-prepend">')
                                        .append($('<span class="input-group-text">').html('Max')))
                                    .append($(`<input type="number" min="0" name="category-${id}-holiday_max" class="form-control">`).val(0)))))
                        .append($('<div class="input-group m-1 pr-1 mb-4">')
                            .append($('<div class="input-group-prepend">')
                                .append($('<span class="input-group-text">').html('Rest Days')))
                            .append($(`<input type="number" min="0" name="category-${id}-rest_days" class="form-control">`).val(0)))
                        .append($('<div class="input-group m-1 pr-1">')
                            .append($('<div class="input-group-prepend">')
                                .append($('<span class="input-group-text">').html('Max Times')))
                            .append($(`<input type="number" min="0" name="category-${id}-max_times" class="form-control">`).val(0)))
                        .append($('<div class="m-1 mb-4">').html('*0 means not limited.'))
                        .append($('<h5>').html('Essential Skills'))
                        .append($('<div class="essential-skills drop-region droppable ml-1 mb-3">'))
                        .append($('<h5>').html('Essential Operators'))
                        .append($('<div class="essential-operators drop-region droppable ml-1 mb-3">'))
                        .append($('<h5>').html('Impossible Operators'))
                        .append($('<div class="impossible-operators drop-region droppable ml-1 mb-3">'))
                        .append($('<hr>'))
                        .append($('<button class="btn btn-danger btn-block" type="button">').html('Remove')));
            $('#category-column').append($card);
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

        $('button[name="storeOption"]').click(function () {
            $.ajax({
                url: $(this).data('action'),
                type: 'POST',
                data: getFormData()
            })
            .done((data) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('Successfully storing scheduler basic options.',
                'alert-info')
            })
            .fail(($xhr) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('Oops, Sorry we have some trouble with storing options...',
                'alert-danger')
            });
        });
    });
})(jQuery);