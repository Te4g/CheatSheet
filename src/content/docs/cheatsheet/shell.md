---
title: Shell (Bash)
---

## Navigation
- **Ctrl + A**: Move to the beginning of the line.
- **Ctrl + E**: Move to the end of the line.
- **Alt + B**: Move backward one word.
- **Alt + F**: Move forward one word.

## Editing
- **Ctrl + U**: Cut everything before the cursor to a special clipboard.
- **Ctrl + K**: Cut everything after the cursor to a special clipboard.
- **Ctrl + Y**: Paste the last thing you cut from the special clipboard.
- **Ctrl + W**: Cut the word before the cursor to the special clipboard.
- **Alt + D**: Cut the word after the cursor to the special clipboard.
- **Ctrl + _**: Undo the last change.

## History
- **!!**: Repeat the last command.
- **!$**: Repeat the last argument of the previous command.
- **!n**: Repeat the n-th command in the history.
- **!-n**: Repeat the command n commands ago.
- **^lastcmd^newcmd**: Replace `lastcmd` with `newcmd` in the last command and run it.
- **!***: Repeat all arguments of the previous command.

## Searching
- **Ctrl + R**: Search through command history as you type – press Ctrl + R again to cycle through matches.
- **Ctrl + G**: Exit history searching mode without running a command.

## Control
- **Ctrl + C**: Kill whatever you are running.
- **Ctrl + Z**: Put whatever you are running into a suspended background process. Use `fg` to restore it.
- **Ctrl + D**: Log out of the current shell session, similar to typing `exit`.

## Miscellaneous
- **Tab**: Auto-complete files, folders, and commands.
- **Ctrl + L**: Clear the screen.
- **Ctrl + T**: Swap the last two characters before the cursor.
- **Esc + T**: Swap the last two words before the cursor.

## Command Substitution
- **$(command)**: Use the output of `command` as an argument in another command.

## Redirection
- **command > file**: Redirect the output of `command` to `file`.
- **command >> file**: Append the output of `command` to `file`.
- **command < file**: Take input for `command` from `file`.
- **command 2> file**: Redirect the error output of `command` to `file`.

## Piping
- **command1 | command2**: Pipe the output of `command1` as input to `command2`.

## Brace Expansion
- **{a,b,c}**: Create several variations of a command (e.g., `mv file.{txt,bak}` renames `file.txt` to `file.bak`).

## File Permissions (chmod)
- **chmod +x file**: Make `file` executable.
- **chmod 755 file**: Set read, write, and execute permission for owner, and read and execute permission for group and others.
