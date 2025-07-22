---
title: Git
---

## List existing remotes
```shell script
git remote -v
or
git remote show origin
```
## Set remote's URL
```shell script
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```
## Change remote's URL
```shell script
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```
## Generate changelog since last tag
```shell script
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%s"
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"* %s by @%an in https://github.com/my-org/my-repo/commit/%H"
```
## Get last tag (semver speaking)
```shell script
git tag -l --sort=-version:refname | head -1  
```
## Rebase the first 2 commits
```bash
git rebase -i --root
```
## Reset the last commit and keep changes
```bash
git reset HEAD~1
```
## Apply a change to a previous commit which is not last commit
```bash
git rebase -i HEAD~{number of commits to go back}
 => set "pick" to "edit" at the commit you want to change
 => apply the changes to your files
git add .
git commit --amend --no-edit
git rebase --continue
```
## Force to reset a branch as a remote one (here origin/master)
```bash
git reset --hard origin/master
```
## Sync from a template
- Add the original template repository as a remote
```bash
git remote add template git@github.com:Te4g/symfony-template.git
```

- Fetch the latest changes from the template
```bash
git fetch template
```

- Create a new branch for the merge
```bash
git checkout -b sync-template
```

- Merge the template changes (this may require resolving conflicts)
```bash
git merge template/main
```

- Review changes and resolve any conflicts
- Then merge back to your main branch
```bash
git checkout main
git merge sync-template
```
