
$(function($) {

    var issue_list = 'https://api.github.com/repos/LoeiFy/Recordum/issues',
        issue_single = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id',
        issue_comment = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id'+'/comments';

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/LoeiFy/Recordum/issues/1/comments',
        data: {
            //filter: 'created',
            access_token: 'aacbe96caeea1acc10b587932f3af5418cabf14f',
            //page: 1,
            //per_page: 2
        },
        success: function(data) {
            console.log(data)
        }
    })

})
