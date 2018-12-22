;
'use strict';

(function() {
    $(document).ready(function(){
        $('#check1').prop('checked', ($('#hidden1').val() == 'True'));
        $('#check2').prop('checked', ($('#hidden2').val() == 'True'));

        $('#add').click(function(){
            var array = [];
            array.push('<div class="float-left w-50">');
            array.push('<div class="m-3">');
            array.push('<div class="border p-1 bg-light">');
            array.push('<input type="text" class="form-control" name="teamName">');
            array.push('</div>');
            array.push('<div class="border" style="height:8rem; overflow:scroll;">');
            array.push('</div>');
            array.push('</div>');
            array.push('</div>');
            var string = array.join('');
            $(string).appendTo('#teamArea')
        })

        $('#abort').click(function(){
            location.href = $(this).attr("data-href");
        });
    })
})(jQuery);
