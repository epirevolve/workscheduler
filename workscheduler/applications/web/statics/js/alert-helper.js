;
'use strict';

export class AlertManager {
    constructor(id) {
        this.id = id;
    }

    append(message, type) {
        let $container = $(this.id);
        let $alert = $('<div>').addClass(`alert ${type} alert-dismissible fade show`)
            .append($('<button>').addClass('close').attr({'type': 'button', 'data-dismiss': 'alert'}).html('&times;'));
        $alert.append(message);
        $container.append($alert);
    }
}