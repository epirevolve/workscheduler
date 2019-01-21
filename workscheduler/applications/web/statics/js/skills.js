;
'use strict';

import { AlertManager } from './alert-helper.js';

(function () {
    let accessTo = '';

    let modalAddSkill = function (title) {
        let modalContainer = $('#skill-modal');
        modalContainer.find('#title').text(title);
        modalContainer.find('#skill-name').val('');
        modalContainer.find('#skill-score').val(1);
        modalContainer.modal();
    };

    $(document).ready(function () {
        $('tbody').sortable();

        $('#add-certified-skill').click(function () {
            modalAddSkill('Set Certified Skill');
            accessTo = '/skills/certified_skill';
        });

        $('#add-not-certified-skill').click(function () {
            modalAddSkill('Set Not Certified Skill');
            accessTo = '/skills/not_certified_skill';
        });

        $('#save-skill').click(function () {
            let $skillModal = $('#skill-modal');

            $.ajax({
                url: accessTo,
                type: 'POST',
                data: {
                    'skill-name': $skillModal.find('#skill-name').val(),
                    'skill-score': $skillModal.find('#skill-score').val()
                }
            })
            .done((data) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('New skill is correctly registered.',
                'alert-info');
                $('#skill-modal').modal('hide');
                let $container = $(data.skillIsCertified ? '#certified-skills' : '#not-certified-skills');
                $container.find('tbody').append(
                    $('<tr>')
                        .append($('<td>').text(data.skillName))
                        .append($('<td>').text(data.skillScore))
                        .append($('<td>')
                            .addClass('icon-column')
                            .append(
                                $('<button>')
                                    .addClass('btn btn-warning btn-sm')
                                    .attr('data-toggle', 'tooltip')
                                    .attr('title', 'edit')
                                    .data('category', 'certified')
                                    .data('id', data.skillId)
                                    .data('name', data.skillName)
                                    .data('score', data.skillScore)
                                    .append($('<i>').addClass('fa fa-pencil-alt')))
                            )
                        .append($('<td>')
                            .addClass('icon-column')
                            .append(
                                $('<button>')
                                    .addClass('btn btn-danger btn-sm')
                                    .attr('data-toggle', 'tooltip')
                                    .attr('title', 'remove')
                                    .data('id', data.skillId)
                                    .append($('<i>').addClass('fa fa-trash-alt'))))
                )
            })
            .fail(($xhr) => {
                let alertManager = new AlertManager('#alertContainer');
                alertManager.append('Oops, Sorry we have some trouble with appending skill...',
                'alert-danger')
            });
        });
    });
})(jQuery);