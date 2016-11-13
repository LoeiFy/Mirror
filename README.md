# Mirror

A blog tool powered by GitHub issues 

http://mirror.am0200.com/

content from:

https://github.com/LoeiFy/Recordum

## Install

```bash
$ sudo npm install Mirror -g
```

## Usage

### create new blog

```bash
$ cd newblog
$ mirror init 
```

or 

```bash
$ mirror init newblog
```

### config your blog

modify `config.yml`

```yml
# site title
title: Mirror

# github user: your github username
user: LoeiFy

# issue repo: your issues repo, all blog content from here 
repo: Recordum

# per page
per_page: 10
```

add your access token in `token.txt`

https://github.com/settings/tokens

![token](https://cloud.githubusercontent.com/assets/2193211/20244206/d4d72a80-a9b2-11e6-9c0d-bb557cab90ec.png)

### build the blog

```bash
$ mirror build
```

### push your blog

you can add domain in `CNAME`

push all files to a repo `gh-pages` branch

and everything done, now you can write your blog on github issues :) 

## License

MIT

## Related

![mirror](https://cloud.githubusercontent.com/assets/2193211/12321915/c66d8b12-baeb-11e5-9612-b188f5272e3b.jpg)

`Mirror` by `DJ Okawari`
