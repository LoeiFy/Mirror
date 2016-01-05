
$(function($) {

    var issue_list = 'https://api.github.com/repos/LoeiFy/Recordum/issues',
        issue_single = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id',
        issue_comment = 'https://api.github.com/repos/LoeiFy/Recordum/issues'+'id'+'/comments',
        user = 'https://api.github.com/users/loeify';

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

    var social = '<a target="_blank" class="github" href="'+ U.html_url +'"></a>';
    if (U.blog) {
        social += '<a target="_blank" class="blog" href="'+ U.blog +'"></a>'
    }
    if (U.email) {
        social += '<a target="_blank" class="email" href="mailto:'+ U.email +'"></a>'
    }

    var user = '<img src="'+ U.avatar_url +'" />'+
               '<h1>'+ U.name +'</h1>'+
               '<p>Lorem ipsum dolor sit amet</p>'+
               '<section>'+ social +'</section>';

    $('#user').html(user)


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

            var list = '<ul class="comment_list">', issue_url = '';
            for (var i = 0; i < C.length; i ++) {
                if (i === 0) {
                    issue_url = C[i].html_url.split('#')[0]
                }
                list += '<li>'+
                        '<a href="'+ C[i].user.html_url +'" target="_blank"><img src="'+ C[i].user.avatar_url +'" /></a>'+
                        '<section>'+
                        '<header><a target="_blank" href="'+ C[i].user.login +'">'+ C[i].user.login +'</a><span>commented on '+ C[i].updated_at.split('T')[0] +'</span></header>'+
                        '<p>'+ marked(C[i].body) +'</p>'+
                        '</section>'+
                        '</li>';
            }
            list += '</ul><a class="comment" href="'+ issue_url +'#new_comment_field" target="_blank">Add Comment</a>';
            e.parent().append(list)
            e.remove()
        }
    })

})
