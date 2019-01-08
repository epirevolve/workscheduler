;
'use strict';

(function () {
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
    });
})(jQuery);