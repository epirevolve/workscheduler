;
'use strict';

(function() {
    $(document).ready(function(){
        $('#add').click(function(){
            let array = [];
            array.push('<div class="float-left w-50">');
            array.push('<div class="m-3">');
            array.push('<div class="border p-1 bg-light">');
            array.push('<input type="text" class="form-control" name="teamName">');
            array.push('</div>');
            array.push('<div class="border" style="height:8rem; overflow:scroll;">');
            array.push('</div>');
            array.push('</div>');
            array.push('</div>');
            let string = array.join('');
            $(string).appendTo('#teamArea')
        })

        $('#abort').click(function(){
            location.href = $(this).attr("data-href");
        });
    })
})(jQuery);
