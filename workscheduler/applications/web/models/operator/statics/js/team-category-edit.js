;
'use strict';

import { AlertManager } from './alert-helper.js';

(function() {
    $(document).ready(function(){
        let tempTeamId = 1;

        function duplicateCheck(){
            let memberId;
            let target;
            $('.member').each(function(i, elem) {
                memberId = $(elem).find('.hdnUserId').val();
                target = $('#teamArea').find('.hdnUserId[value="' + memberId + '"]');
                if(target.length > 1){
                    target.parents('.member').addClass('bg-danger');
                    target.parents('.member').tooltip('show');
                }else{
                    target.parents('.member').removeClass('bg-danger');
                    target.parents('.member').tooltip('hide');
                }
            });
        }

        function leaderCheck(){
            $('.team').each(function(i, elem) {
                if(!$(elem).find('span').length){
                    $(elem).find('.teamName').addClass('bg-danger');
                    $(elem).find('.teamName').tooltip('show');
                }else{
                    $(elem).find('.teamName').removeClass('bg-danger');
                    $(elem).find('.teamName').tooltip('hide');
                }
            })
        }

        function memberCountCheck(){
            $('.memberArea').each(function(i, elem) {
                let memberCount = $(elem).find('.member').length;
                if(memberCount < Number($('#min_member_count').val()) || memberCount > Number($('#max_member_count').val())){
                    $(elem).addClass('bg-danger');
                    $(elem).tooltip('show');
                }else{
                    $(elem).removeClass('bg-danger');
                    $(elem).tooltip('hide');
                }
            })
        }

        if(!$('#check1').prop('checked')){
            duplicateCheck();
        }
        if($('#check2').prop('checked')){
            leaderCheck();
        }
        memberCountCheck();

        $('#check1').change(function(){
            if($(this).prop('checked')){
                $('.member').removeClass('bg-danger');
                $('.member').tooltip('hide');
            }else{
                duplicateCheck();
            }
        })

        $('#check2').change(function(){
            if($(this).prop('checked')){
                leaderCheck();
            }else{
                $('.teamName').removeClass('bg-danger');
                $('.teamName').tooltip('hide');
            }
        })

        $('input[type="number"]').change(function(){
            memberCountCheck();
        })

        let nowChecked = [];
        $('input[type="radio"]:checked').each(function(){
            nowChecked.push($(this).attr('id'));
        });
        $(document).on('click', 'input[type="radio"]', function(){
            let idx = $.inArray($(this).attr('id'), nowChecked);
            if(idx >= 0) {
                $(this).prop('checked', false);
                nowChecked.splice(idx, 1);

                $(this).parents('.memberArea').find('span').remove();
                if($('#check2').prop('checked')){
                    $(this).parents('.team').find('.teamName').addClass('bg-danger');
                    $(this).parents('.team').find('.teamName').tooltip('show');
                }
            }else{
                let name = $(this).attr('name');
                $('input[name="' + name + '"]').each(function(){
                    let idx2 = $.inArray($(this).attr('id'), nowChecked);
                    if(idx2 >= 0){
                        nowChecked.splice(idx2, 1);
                    }
                });
                nowChecked.push($(this).attr('id'));

                $(this).parents('.memberArea').find('span').remove();
                $(this).parents('.member').append('<span class="badge badge-warning float-right p-2">Leader</span>');
                if($('#check2').prop('checked')){
                    $(this).parents('.team').find('.teamName').removeClass('bg-danger');
                    $(this).parents('.team').find('.teamName').tooltip('hide');
                }
            }
        });

        $('.user').draggable({
            helper: function(e){
                        return $(e.target).clone().css({
                            width: $(e.target).width()
                        });
            }
        });

        let dropOption = {
            drop: function(e, ui){
		        let exists = false;
                $(this).find('.hdnUserId').each(function(i, elem) {
                    if(ui.draggable.children().val() === $(elem).val()){
                        alert('The same user exists already.');
                        exists = true;
                        return false;
                    }
                });
                if(exists){
                    return false;
                }

				let array = [];
                array.push('<div class="border py-1 member" data-toggle="tooltip" data-trigger="manual" title="A user cannot belong to more than one team." style="height:2.25rem">');
                array.push('<input type="radio" name="');
                array.push($(this).find('.hdnTeamId').val());
                array.push('" id="');
                array.push($(this).find('.hdnTeamId').val() + ui.draggable.children().val());
                array.push('" style="width:2rem">');
                array.push(ui.draggable.text());
                array.push('<input type="hidden" class="hdnUserId" value="');
                array.push(ui.draggable.children().val());
                array.push('">');
                array.push('<button class="btn btn-light float-right h-100 mr-1 p-0 deleteMember" style="width:1.75rem">×</button>');
                array.push('</div>');
                let string = array.join('');
                $(string).appendTo(this);

                if(!$('#check1').prop('checked')){
                    duplicateCheck();
                }
                if($('#check2').prop('checked')){
                    leaderCheck();
                }
                memberCountCheck();
		    }
        }

        $('.memberArea').droppable(dropOption);

        $(document).on('click', '.deleteTeam', function(){
            $(this).parents('.team').find('.teamName').tooltip('hide');
            $(this).parents('.team').find('.memberArea').tooltip('hide');
            $(this).parents('.team').find('.member').tooltip('hide');
            $(this).parents('.team').remove();

            if(!$('#check1').prop('checked')){
                duplicateCheck();
            }
        })

        $(document).on('click', '.deleteMember', function(){
            $(this).parents('.team').find('.member').tooltip('hide');
            $(this).parents('.member').remove();

            if(!$('#check1').prop('checked')){
                duplicateCheck();
            }
            if($('#check2').prop('checked')){
                leaderCheck();
            }
            memberCountCheck();
        })

        $('#update').click(function(){
            let exitFlag = false;
            if(!$('#teamCategoryName').val().trim()){
                alert('The team category name is required.');
                return false;
            }
            if(!$.isNumeric($('#min_member_count').val()) || !$.isNumeric($('#max_member_count').val())){
                alert('Please input a number to the member count.');
                return false;
            }
            if(Number($('#min_member_count').val()) < 0 || Number($('#max_member_count').val()) < 0){
                alert('Please input a number of more than 0 to the member count.');
                return false;
            }
            if(Number($('#min_member_count').val()) > Number($('#max_member_count').val())){
                alert('The range of the member count is wrong.');
                return false;
            }
            $('.teamName').each(function(i, elem) {
                if(!$(elem).val().trim()){
                    alert('The team name is required.');
                    exitFlag = true;
                    return false;
                }
            })
            if(exitFlag){
                return false;
            }
            $('.team').each(function(i, elem) {
                if(!$(elem).find('.member').length){
                    alert('More than 1 member has to belong to a team.');
                    exitFlag = true;
                    return false;
                }
            })
            if(exitFlag){
                return false;
            }
            if($('body').find('.tooltip-inner').length){
                alert($('body').find('.tooltip-inner').eq(0).text());
                return false;
            }

            if (!confirm('Would you really update the team category?')) return;

            let teamCategoryInfo = [
                ["id", $('#teamCategoryId').val()],
                ["name", $('#teamCategoryName').val()],
                ["allow_multiple_affiliation", $('#check1').prop('checked')],
                ["is_leader_required", $('#check2').prop('checked')],
                ["min_member_count", Number($('#min_member_count').val())],
                ["max_member_count", Number($('#max_member_count').val())]
            ];
            let teamInfo;
            let teamMemberIds;
            let allTeamInfo = [];
            $('.team').each(function(i, elem1) {
                teamInfo = [];
                teamInfo.push($(elem1).find('.hdnTeamId').val());
                teamInfo.push($(elem1).find('.teamName').val());
                teamMemberIds = [];
                $(elem1).find('.member').each(function(j, elem2) {
                    teamMemberIds.push([$(elem2).find('.hdnUserId').val(), $(elem2).find('input[type="radio"]').prop('checked')]);
                })
                teamInfo.push(teamMemberIds);
                allTeamInfo.push(teamInfo);
            })
            let sendData = {
                teamCategoryInfo: teamCategoryInfo,
                teamInfo: allTeamInfo
            }
            $.ajax({
                url: '/teams/edit_team_category/update',
                type: 'POST',
                data: JSON.stringify(sendData),
                contentType: 'application/json'
            })
            .done((data) => {
                    let alertManager = new AlertManager('#alert-container');
                    alertManager.append('The team category was successfully updated.',
                    'alert-info');
            })
            .fail((data) => {
                let alertManager = new AlertManager('#alert-container');
                alertManager.append('Oops, Sorry we have some trouble with updating the team category...',
                'alert-error');
            })
        });

        $('#add').click(function(){
            let array = [];
            array.push('<div class="float-left w-50 team">');
            array.push('<div class="m-3">');
            array.push('<div class="border p-1 bg-light">');
            array.push('<input type="text" class="form-control d-inline teamName" data-toggle="tooltip" data-trigger="manual" title="A leader is required." style="width:calc(100% - 5.25rem)">');
            array.push('<button class="btn btn-secondary deleteTeam" style="width:5rem">Delete</button>');
            array.push('</div>');
            array.push('<div class="border memberArea" data-toggle="tooltip" data-trigger="manual" title="The member count is out of range." style="height:8rem; overflow:scroll;">');
            array.push('<input type="hidden" class="hdnTeamId" value="');
            array.push(tempTeamId);
            array.push('">');
            array.push('</div>');
            array.push('</div>');
            array.push('</div>');
            let string = array.join('');
            $(string).appendTo('#teamArea');
            tempTeamId++;

            $('.memberArea').droppable(dropOption);

            if($('#check2').prop('checked')){
                leaderCheck();
            }
            memberCountCheck();
        })

        $('#abort').click(function(){
            if (!confirm('Would you back to the previous page?')) return;

            location.href = $(this).attr("data-href");
        });
    })
})(jQuery);