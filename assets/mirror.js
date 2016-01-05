
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
            page: 1,
            per_page: 2
        },
        success: function(data) {
            console.log(JSON.stringify(data))
        }
    })
    */

    var html = '<ul>';

    for (var i = 0; i < O.length; i ++) {
        var labels = '';
        for (var j = 0; j < O[i].labels.length; j ++) {
            labels += '<mark style="background:#'+ O[i].labels[j].color +'">'+ O[i].labels[j].name +'</mark>'
        }

        html += '<li>'+
                '<h1>'+ O[i].title +'</h1>'+
                '<time>'+ O[i].updated_at.split('T')[0] +'</time>'+
                '<article class="content">'+ marked(O[i].body) +'</article>'+
                '<section>'+ labels +'</section>'+
                '</li>'
    }

    html += '</ul>';

    $('#post').html(html)

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block)
    })

})
