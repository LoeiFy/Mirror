
// Define
var config = {
    user:       'LoeiFy',
    repo:       'Recordum',
    token:      'da3fb4003c268a958949'+'6b36b39b5d43a62831b3',
    info:       'Lorem ipsum dolor sit amet',
    per_page:   7,
    behance:    '',
    dribbble:   '',
    instagram:  ''
}

var _load = function(url, data, callback, error) {

    url = 'https://api.github.com'+ url; 
    data.access_token = config.token;

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        success: function(data, status, xhr) {
            callback(data, xhr.getResponseHeader('link'))
        },
        error: function(a, b, c) {
            error && error(a, b, c)
        }
    })

}

var _template = {

    user: function(data) {
        var social = '<a target="_blank" class="icon-github" href="'+ data.html_url +'"></a>';
        if (data.blog) {
            social += '<a target="_blank" class="icon-link" href="'+ data.blog +'"></a>'
        }
        if (data.email) {
            social += '<a target="_blank" class="icon-email" href="mailto:'+ data.email +'"></a>'
        }
        if (config.behance) {
            social += '<a target="_blank" class="icon-behance" href="'+ config.behance +'"></a>'
        }
        if (config.dribbble) {
            social += '<a target="_blank" class="icon-dribbble" href="'+ config.dribbble +'"></a>'
        }
        if (config.instagram) {
            social += '<a target="_blank" class="icon-instagram" href="'+ config.instagram +'"></a>'
        }

        var user = '<img src="'+ data.avatar_url +'" />'+
                   '<h1>'+ data.name +'</h1>'+
                   '<p>'+ config.info +'</p>'+
                   '<section>'+ social +'</section>';

        return user
    },

    issues: function(data) {
        var issues = '';

        for (var i = 0; i < data.length; i ++) {
            issues += '<a class="post" href="#'+ data[i].number +'">'+
                     '<h1>'+ data[i].title +'</h1>'+
                     '<time>Updated at<span>'+ data[i].updated_at.split('T')[0] +'</span></time>'+
                     '</a>';
        }

        return issues
    },

    issue: function(data) {
            var issue, labels = '', comment;

            for (var i = 0; i < data.labels.length; i ++) {
                labels += '<mark style="background:#'+ data.labels[i].color +'">#'+ data.labels[i].name +'</mark>'
            }

            comment = data.comments > 0 ? 
                '<button class="comment" data-id="'+ data.number +'">View Comments</button>' :
                '<a class="comment" href="'+ data.html_url +'#new_comment_field" target="_blank">Add Comment</a>';

            issue = '<div id="back">&laquo; back to home</div>'+
                    '<h1 class="title">'+ data.title +'</h1>'+
                    '<time class="time">Updated at<span>'+ data.updated_at.split('T')[0] +'</span></time>'+
                    '<section class="labels">'+ labels +'</section>'+
                    '<section class="main hidden">'+
                    '<article class="content">'+ marked(data.body) +'</article>'+
                    '</section>'+ comment;
            
            return issue
    },

    comments: function(data) {
        var comments = '<ul class="comment_list">', issue_url = '';

        for (var i = 0; i < data.length; i ++) {
            if (i === 0) {
                issue_url = data[i].html_url.split('#')[0]
            }

            comments += '<li>'+
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
        comments += '</ul><a class="comment" href="'+ issue_url +'#new_comment_field" target="_blank">Add Comment</a>';

        return comments
    }

}

$(function($) {

    var issues = '/repos/'+ config.user +'/'+ config.repo +'/issues',
        issue = '/repos/'+ config.user +'/'+ config.repo +'/issues/',
        user = '/users/'+ config.user,
        page = 1,
        current = 'lists',
        issues_data = [];

    function get_issues() {
        _load(issues, {filter: 'created', page: page, per_page: config.per_page}, function(data, header) {
            // save data
            issues_data = issues_data.concat(data)

            $('#posts').append(_template.issues(data))

            if (header.indexOf('rel="next"') > 0) {
                $('#next').css('display', 'block')
                page ++;
            } else {
                $('#next').hide()
            }
        })
    }

    $('#next').on('click', function() {
        get_issues()
    })

    if (location.hash) {
        current = 'single';

        var issue_id = parseInt(location.hash.split('#')[1]);
        if (issue_id) {
            $('#switch > div').removeClass('transition')
            setTimeout(function() {
                $('#switch').addClass('right')
            }, 0)

            _load(issue + issue_id, {}, function(data) {
                $('#post').html(_template.issue(data))
                $('#post pre code').each(function(i, block) {
                    hljs.highlightBlock(block)
                })
            })
        }
    } else {
        _load(user, {}, function(data) {
            $('#user').html(_template.user(data))

            get_issues()
        })
    }

    $('body').on('click', function(e) {
        e = $(e.target);

        if (e.hasClass('comment') && e[0].tagName == 'BUTTON') {
            _load(issues +'/'+ e.data('id') +'/comments', {}, function(data) {
                e.parent().append(_template.comments(data))
                e.remove()
            })
        }

        if (e.attr('id') == 'back') {
            if (current == 'single') {
                location.href = '/'
            } else {
                history.back()
            }
        }
    })

    $(window).on('hashchange', function() {
        if (current == 'single') {
            location.href = '/';
            return
        }

        var hash = parseInt(location.hash.split('#')[1]),
            data;

        if (hash) {
            for (var i = 0; i < issues_data.length; i ++) {
                if (issues_data[i].number == hash) {
                    data = issues_data[i];
                    break;
                }
            }

            $('#post').html(_template.issue(data))

            $('#post pre code').each(function(i, block) {
                hljs.highlightBlock(block)
            })

            $('body').data('scroll', window.scrollY)
            window.scrollTo(0, 0)

            setTimeout(function() {
                $('#switch').addClass('right')
                setTimeout(function() {
                    $('#main').height(window.innerHeight)
                }, 400)
            }, 0)
        } else {
            $('#switch').removeClass('right')

            $('#main').css('height', 'auto')
            window.scrollTo(0, parseInt($('body').data('scroll')))
            
            setTimeout(function() {
                $('#post').html('')
            }, 400)
        }
    })

})
