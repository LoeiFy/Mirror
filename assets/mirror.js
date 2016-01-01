
$(function($) {

    var issue_list = 'https://api.github.com/repos/LoeiFy/Recordum/issues',
        issue_single = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id',
        issue_comment = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id'+'/comments';

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/LoeiFy/Recordum/issues/1/comments',
        data: {
            //filter: 'created',
            access_token: 'da3fb4003c268a958949'+'6b36b39b5d43a62831b3',
            //page: 1,
            //per_page: 2
        },
        success: function(data) {
            console.log(data)
        }
    })

})
