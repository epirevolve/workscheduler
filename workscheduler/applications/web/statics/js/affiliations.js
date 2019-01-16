;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let getEventData = function () {
        let d = {
                'affiliation-id': $('#affiliation-id').val(),
                'affiliation-name': $('#affiliation-name').val(),
                'affiliation-note': $('#affiliation-note').val()
            };

        return d;
    }

    let addAffiliation = function () {
        $.ajax({
            url: '/affiliations',
            type: 'POST',
            data: getEventData()
        })
        .done((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('New affiliation is correctly registered.',
            'alert-info');
            $('#affiliation-modal').modal('hide');

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
                                    .html(data.affiliationName)))
                    .append(
                        $('<div>')
                            .addClass('card-body')
                            .append(
                                $('<p>')
                                    .addClass('card-text')
                                    .html(data.affiliationNote)))
                    .append(
                        $('<div>')
                            .addClass('card-footer')
                            .append(
                                $('<div>')
                                    .addClass('row')
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-primary btn-sm col-8')
                                            .attr('id', 'edit-affiliation')
                                            .attr('type', 'button')
                                            .data('id', data.affiliationId)
                                            .data('name', data.affiliationName)
                                            .data('note', data.affiliationNote)
                                            .html('Edit'))
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-danger btn-sm col-4')
                                            .attr('id', 'remove-affiliation')
                                            .attr('type', 'button')
                                            .data('id', data.affiliationId)
                                            .html('Remove'))));
            $container.append($card);
        })
        .fail((data) => {
            let alertManager = new AlertManager('#alert-container');
            alertManager.append('Oops, Sorry we have some trouble with appending affiliation...',
            'alert-danger')
        });
    };

    $(document).ready(function () {
        $(document).on('click', '#add-affiliation', function () {
            $('#affiliation-name').val('');
            $('#affiliation-note').val('');

            let $save = $("#save-affiliation");
            $save.off('click');
            $save.on('click', addAffiliation);

            $('#affiliation-modal').modal();
        });

        $(document).on('click', '#edit-affiliation', function () {
            let $button = $(this);
            $('#affiliation-name').val($button.data('name'));
            $('#affiliation-note').val($button.data('note'));

            let $save = $("#save-affiliation");
            $save.off('click');
//            $save.on('click', editAffiliation);

            $('#affiliation-modal').modal();
        });

        $(document).on('click', '#remove-affiliation', function () {
            let $button = $(this);
            $('#affiliation-id').val($button.data('id'));
            $('#affiliation-name').val($button.data('name'));
            $('#affiliation-note').val($button.data('note'));

            let $save = $("#save-affiliation");
            $save.off('click');
//            $save.on('click', editAffiliation);

            $('#affiliation-modal').modal();
        });
    });
})(jQuery);