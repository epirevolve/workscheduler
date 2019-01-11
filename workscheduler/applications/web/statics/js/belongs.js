;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let getEventData = function () {
        let d = {
                'belong-id': $('#belong-id').val(),
                'belong-name': $('#belong-name').val(),
                'belong-note': $('#belong-note').val()
            };

        return d;
    }

    let addBelong = function () {
        $.ajax({
            url: '/belongs',
            type: 'POST',
            data: getEventData()
        })
        .done((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('New belong is correctly registered.',
            'alert-info');
            $('#belong-modal').modal('hide');

            let $container = $('.card-columns');
            let $card =
                $('<div>')
                    .addClass('card')
                    .append(
                        $('<div>')
                            .addClass('card-header')
                            .append(
                                $('<h4>')
                                    .addClass('card-title')
                                    .html(data.belongName)))
                    .append(
                        $('<div>')
                            .addClass('card-body')
                            .append(
                                $('<p>')
                                    .addClass('card-text')
                                    .html(data.belongNote)))
                    .append(
                        $('<div>')
                            .addClass('card-footer')
                            .append(
                                $('<div>')
                                    .addClass('row')
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-primary btn-sm col-8')
                                            .attr('id', 'edit-belong')
                                            .attr('type', 'button')
                                            .data('id', data.belongId)
                                            .data('name', data.belongName)
                                            .data('note', data.belongNote)
                                            .html('Edit'))
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-danger btn-sm col-4')
                                            .attr('id', 'remove-belong')
                                            .attr('type', 'button')
                                            .data('id', data.belongId)
                                            .html('Remove'))));
            $container.append($card);
        })
        .fail((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('Oops, Sorry we have some trouble with appending belong...',
            'alert-danger')
        });
    };

    $(document).ready(function () {
        $(document).on('click', '#add-belong', function () {
            $('#belong-name').val('');
            $('#belong-note').val('');

            let $save = $("#save-belong");
            $save.off('click');
            $save.on('click', addBelong);

            $('#belong-modal').modal();
        });

        $(document).on('click', '#edit-belong', function () {
            let $button = $(this);
            $('#belong-name').val($button.data('name'));
            $('#belong-note').val($button.data('note'));

            let $save = $("#save-belong");
            $save.off('click');
//            $save.on('click', editBelong);

            $('#belong-modal').modal();
        });

        $(document).on('click', '#remove-belong', function () {
            let $button = $(this);
            $('#belong-id').val($button.data('id'));
            $('#belong-name').val($button.data('name'));
            $('#belong-note').val($button.data('note'));

            let $save = $("#save-belong");
            $save.off('click');
//            $save.on('click', editBelong);

            $('#belong-modal').modal();
        });
    });
})(jQuery);