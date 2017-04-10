# Template Widget Project


##### File naming conventions:
- Mixins and Partials: `lower-case-hyphenated.js` (in a sub-directory grouping related ones together)
- Classes and Components: `PascalNameCase.js(x)`

### Development
This project uses ES6 JavaScript. ([WebPack][1] bundles and [babel][2] transpiles)

Please do not checkin dist bundles. This project is intended to be included into a larger project using a packager like [WebPack][1].


##### Setup:
```bash
$ npm install
```


### Recommended

If you haven't already done so, configure `git` to make all new branches rebase on pull by default:
```bash
git config branch.autosetuprebase always --global
```

Set `master`, `develop` to default to rebase on pull
```bash
git config branch.master.rebase true
git config branch.develop.rebase true
```

I can't make this change centrally. It must be made per-clone.  This explains why you would want to rebase on pull: http://stevenharman.net/git-pull-with-automatic-rebase

It basically simplifies your interactions. so you can simply `git pull` to get updated code, instead of `git pull -r` or `git fetch && git rebase... ` etc. With out this change, a `git pull` will make a merge bubble, and thats just ugly.


##### Building:
```bash
$ make
```

##### Testing:
```bash
#for continuous integration (calls karma with extra reports, see package.json)
$ npm test

# for dev (single run, basic report)
$ jest

# for dev (watch mode)
$ jest --watch
```

##### Running dev:
```bash
$ npm start
```


   [1]: //webpack.github.io
   [2]: //babeljs.org
