**List existing remotes**
```shell script
$ git remote -v
or
$ git remote show origin
```
**Set remote's URL**
```shell script
$ git remote add origin https://github.com/USERNAME/REPOSITORY.git
```
**Change remote's URL**
```shell script
$ git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```
**Generate changelog since last tag**
```shell script
$ git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%s"  
```
**Get last tag (semver speaking)**
```shell script
$ git tag -l --sort=-version:refname | head -1  
```
**Rebase the first 2 commits**
```bash
git rebase -i --root
```
**Reset the last commit and keep changes**
```bash
git reset HEAD~1
```
**Apply a change to a previous commit which is not last commit**
```bash
git rebase -i HEAD~{number of commits to go back}
 => set "pick" to "edit" at the commit you want to change
 => apply the changes to your files
git add .
git commit --amend --no-edit
git rebase --continue
```
