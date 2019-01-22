;
'use strict';

export function newPseudoUuid() {
    const d = new Date();
    return `tmp${d.getFullYear()}${d.getMonth()}${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`;
}