# Mirror

[中文说明](http://mirror.am0200.com/#11)

A blog tool powered by GitHub, write your blog on GitHub issue

http://mirror.am0200.com/

## How to use

### install

```bash
$ sudo npm install Mirror -g
```

### create

```bash
$ cd newblog
$ mirror init
```

or

```bash
$ mirror init newblog
```

### configure

modify `config.yml`

```yml
# site title
title: Mirror

# github user: your github username
user: LoeiFy

# issue repo: your issues repo, all blog content from here
repo: Recordum

# multi-authors, the user is included in
# example: author0, author1
authors:

# posts per page
perpage: 10
```

Add your access token in `token.txt`, this token is read-only

https://github.com/settings/tokens

> check the list below

- read:user   Read all user profile data
- user:email  Access user email addresses (read-only)

### build

```bash
$ mirror build
```

### pulish your blog

you can add domain in `CNAME`

push all files to a repo `gh-pages` branch

example: https://github.com/LoeiFy/Mirror/tree/gh-pages

### finally

everything done, now you can write your blog on GitHub issue :)

### example

write the blog on this issues

https://github.com/LoeiFy/Recordum/issues

and the blog will update automatically

http://mirror.am0200.com/

## Not installed Node.js ?

ok, you can download the latest release and configure quickly

https://github.com/LoeiFy/Mirror/raw/master/mirror.zip

```html
<script>
/*
**
** blog config here
** token should be separated by '#'.
** example: 5#c31bffc137f44faf7efcs4544da827g7ca2cfeaa
** muti-authors should be separated by ','. and the user is included in.
** example: 'LoeiFy, author0'
**
*/

window.config = {"title":"","user":"","repository":"","authors":"","perpage":"","token":""}
</script>
```

## Development

fork and install modules

```bash
$ npm install
```

local test

```bash
$ npm run dev
```

build

```bash
$ npm run build
```

## License

MIT

## Related

![mirror](https://cloud.githubusercontent.com/assets/2193211/12321915/c66d8b12-baeb-11e5-9612-b188f5272e3b.jpg)

`Mirror` by `DJ Okawari`
