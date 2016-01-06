
// Define
var config = {
    user:       'LoeiFy',
    repo:       'Recordum',
    token:      'da3fb4003c268a958949'+'6b36b39b5d43a62831b3',
    info:       'Lorem ipsum dolor sit amet',
    behance:    '',
    dribbble:   '',
    instagram:  ''
}

var _load = function(url, data, callback, error) {

    url = 'https://api.github.com'+ url; 
    data.access_token = token;

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        success: function(data) {
            callback(data)
        },
        error: function(a, b, c) {
            error && error(a, b, c)
        }
    })

}

var _template = {

    user: function(data) {
        var social = '<a target="_blank" class="github" href="'+ data.html_url +'"></a>';
        if (data.blog) {
            social += '<a target="_blank" class="blog" href="'+ U.blog +'"></a>'
        }
        if (data.email) {
            social += '<a target="_blank" class="email" href="mailto:'+ U.email +'"></a>'
        }
        if (config.behance) {
            social += '<a target="_blank" class="behance" href="'+ config.behance +'"></a>'
        }
        if (config.dribbble) {
            social += '<a target="_blank" class="dribbble" href="'+ config.dribbble +'"></a>'
        }
        if (config.instagram) {
            social += '<a target="_blank" class="instagram" href="'+ config.instagram +'"></a>'
        }

        var user = '<img src="'+ data.avatar_url +'" />'+
                   '<h1>'+ data.name +'</h1>'+
                   '<p>'+ config.info +'</p>'+
                   '<section>'+ social +'</section>';

        return user
    },

    issue: function(data) {
        var issue = '';

        for (var i = 0; i < data.length; i ++) {
            var labels = '';
            
            for (var j = 0; j < data[i].labels.length; j ++) {
                labels += '<mark style="background:#'+ data[i].labels[j].color +'">#'+ data[i].labels[j].name +'</mark>'
            }

            var comment = data[i].comments > 0 ? 
                '<button class="comment" data-id="'+ data[i].number +'">View Comments</button>' :
                '<a class="comment" href="'+ data[i].html_url +'#new_comment_field" target="_blank">Add Comment</a>';

            issue += '<li class="post" id="post'+ data[i].number +'">'+
                     '<h1 class="title">'+ data[i].title +'</h1>'+
                     '<time class="time">Updated at<span>'+ data[i].updated_at.split('T')[0] +'</span></time>'+
                     '<section class="labels">'+ labels +'</section>'+
                     '<section class="main hidden">'+
                     '<article class="content">'+ marked(data[i].body) +'</article>'+ comment +
                     '</section>'+
                     '<button class="comment" id="p'+ data[i].number +'">View More</button>'+
                     '</li>';
        }

        return issue
    },

    comment: function(data) {
        var comment = '<ul class="comment_list">', issue_url = '';

        for (var i = 0; i < data.length; i ++) {
            if (i === 0) {
                issue_url = data[i].html_url.split('#')[0]
            }

            comment += '<li>'+
                       '<a href="'+ data[i].user.html_url +'" target="_blank"><img src="'+ data[i].user.avatar_url +'" /></a>'+
                       '<section>'+
                       '<header>'+
                       '<a target="_blank" href="'+ data[i].user.login +'">'+ data[i].user.login +'</a>'+
                       '<span>commented on '+ data[i].updated_at.split('T')[0] +'</span>'+
                       '</header>'+
                       '<p>'+ marked(data[i].body) +'</p>'+
                       '</section>'+
                       '</li>';
        }
        comment += '</ul><a class="comment" href="'+ issue_url +'#new_comment_field" target="_blank">Add Comment</a>';

        return comment
    }

}

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

    if (location.hash) {
        O = [];
        O.push(S)
    }

    var html = '';

    for (var i = 0; i < O.length; i ++) {
        var labels = '';
        for (var j = 0; j < O[i].labels.length; j ++) {
            labels += '<mark style="background:#'+ O[i].labels[j].color +'">#'+ O[i].labels[j].name +'</mark>'
        }

        var comment = O[i].comments > 0 ? 
            '<button class="comment" data-id="'+ O[i].number +'">View Comments</button>' :
            '<a class="comment" href="'+ O[i].html_url +'#new_comment_field" target="_blank">Add Comment</a>';

        html += '<li class="post" id="post'+ O[i].number +'">'+
                '<h1 class="title">'+ O[i].title +'</h1>'+
                '<time class="time">Updated at<span>'+ O[i].updated_at.split('T')[0] +'</span></time>'+
                '<section class="labels">'+ labels +'</section>'+
                '<section class="main hidden"><article class="content">'+ marked(O[i].body) +'</article>'+ comment +'</section>'+
                '<button class="comment" id="p'+ O[i].number +'">View More</button>'+
                '</li>';
    }

    $('#posts').html(html)

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block)
    })

    $('body').on('click', function(e) {
        e = $(e.target);

        if (e.hasClass('comment') && e[0].tagName == 'BUTTON') {
            var id;

            if (e.data('id')) {
                id = e.data('id');

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

            if (e.attr('id')) {
                id = e.attr('id');
                location.hash = id.split('p')[1];
            }

        }
    })

    $(window).on('hashchange', function() {
        var hash = location.hash.split('#')[1];

        $('#p'+ hash).hide()
        $('#post'+ hash).find('.main').removeClass('hidden').parent().siblings().each(function() {
            $(this).find('.main').addClass('hidden').next().show()
        })

        setTimeout(function() {
            window.scrollTo(0, $('#post'+ hash).offset().top)
        }, 0)
    })

})
