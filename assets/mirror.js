
$(function($) {

    var issue_list = 'https://api.github.com/repos/LoeiFy/Recordum/issues',
        issue_single = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id',
        issue_comment = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id'+'/comments';

    var to_comment = '#new_comment_field';

    /*
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/LoeiFy/Recordum/issues',
        data: {
            filter: 'created',
            access_token: 'da3fb4003c268a958949'+'6b36b39b5d43a62831b3',
            page: 5,
            per_page: 2
        },
        success: function(data) {
            console.log(JSON.stringify(data))
        }
    })
    */

    var html = '';

    for (var i = 0; i < O.length; i ++) {
        var labels = '';
        for (var j = 0; j < O[i].labels.length; j ++) {
            labels += '<mark style="background:#'+ O[i].labels[j].color +'">#'+ O[i].labels[j].name +'</mark>'
        }

        var comment = O[i].comments > 0 ? 
            '<button class="comment" data-id="'+ O[i].number +'">View Comments</button>' :
            '<a class="comment" href="'+ O[i].html_url +'#new_comment_field" target="_blank">Add Comment</a>';

        html += '<li class="post">'+
                '<h1 class="title">'+ O[i].title +'</h1>'+
                '<time class="time">Updated at<span>'+ O[i].updated_at.split('T')[0] +'</span></time>'+
                '<section class="labels">'+ labels +'</section>'+
                '<article class="content">'+ marked(O[i].body) +'</article>'+ comment +
                '</li>';
    }

    $('#posts').html(html)

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block)
    })

    $('body').on('click', function(e) {
        e = $(e.target);

        if (e.hasClass('comment') && e[0].tagName == 'BUTTON') {
            var id = e.data('id');

            var list = '<ul class="comment_list">'
            for (var i = 0; i < C.length; i ++) {
                list += '<li>'+
                        '<a href="'+ C[i].user.html_url +'" target="_blank"><img src="'+ C[i].user.avatar_url +'" /></a>'+
                        '<section>'+
                        '<header>'+ C[i].user.login +'<span>commented on '+ C[i].updated_at.split('T')[0] +'</span></header>'+
                        '<p>'+ marked(C[i].body) +'</p>'+
                        '</section>'+
                        '</li>';
            }
            list += '</ul>';
            e.parent().append(list)
        }
    })

})
