;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let getEventData = function () {
        let d = {
                'affiliation-id': $('#affiliationId').val(),
                'affiliation-name': $('#affiliationName').val(),
                'affiliation-note': $('#affiliationNote').val()
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
            let alertManager = new AlertManager('#alertContainer');
            alertManager.append('New affiliation is correctly registered.',
            'alert-info');
            $('#affiliationModal').modal('hide');

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
                                            .attr('id', 'editAffiliation')
                                            .attr('type', 'button')
                                            .data('id', data.affiliationId)
                                            .data('name', data.affiliationName)
                                            .data('note', data.affiliationNote)
                                            .html('Edit'))
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-danger btn-sm col-4')
                                            .attr('id', 'removeAffiliation')
                                            .attr('type', 'button')
                                            .data('id', data.affiliationId)
                                            .html('Remove'))));
            $container.append($card);
        })
        .fail(($xhr) => {
            let alertManager = new AlertManager('#alertContainer');
            alertManager.append('Oops, Sorry we have some trouble with appending affiliation...',
            'alert-danger')
        });
    };

    $(document).ready(function () {
        $(document).on('click', '#addAffiliation', function () {
            $('#affiliationName').val('');
            $('#affiliationNote').val('');

            let $save = $("#saveAffiliation");
            $save.off('click');
            $save.on('click', addAffiliation);

            $('#affiliationModal').modal();
        });

        $(document).on('click', '#editAffiliation', function () {
            let $button = $(this);
            $('#affiliationName').val($button.data('name'));
            $('#affiliationNote').val($button.data('note'));

            let $save = $("#saveAffiliation");
            $save.off('click');
//            $save.on('click', editAffiliation);

            $('#affiliationModal').modal();
        });

        $(document).on('click', '#removeAffiliation', function () {
            let $button = $(this);
            $('#affiliationId').val($button.data('id'));
            $('#affiliationName').val($button.data('name'));
            $('#affiliationNote').val($button.data('note'));

            let $save = $("#saveAffiliation");
            $save.off('click');
//            $save.on('click', editAffiliation);

            $('#affiliationModal').modal();
        });
    });
})(jQuery);