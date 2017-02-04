# Mirror

A blog tool powered by GitHub issues 

http://mirror.am0200.com/

content from:

https://github.com/LoeiFy/Recordum/issues

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

# multi-author, should be separated by ','
# example: author0,author1
authors:

# per page
per_page: 10
```

add your access token in `token.txt`

https://github.com/settings/tokens

![token](https://cloud.githubusercontent.com/assets/2193211/20244206/d4d72a80-a9b2-11e6-9c0d-bb557cab90ec.png)

### build

```bash
$ mirror build
```

### pulish your blog

you can add domain in `CNAME`

push all files to a repo `gh-pages` branch

and everything done, now you can write your blog on github issues :) 

## Not installed Node.js ?

ok, you can download the latest release and configure quickly 

https://github.com/LoeiFy/Mirror/releases

```html
<!-- index.html -->

<script>

// blog config here
// token should be separated by '#'. example: 5#c31bffc137f44faf7efc4a84da827g7ca2cfeaa
var config = {"title":"","user":"","repo":"","token":"","authors":"","per_page":""}

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
