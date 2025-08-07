# find-cached README

For large git projects, finds file in workspace using `fd` and `fzf` then stores the list in `/tmp/<git_commit>` directory for subsequent invocations.

## How to Use

Launch (and add keybindings) by pressing \<Command-Shift-P\> and searching for "Find Cached".

## Install

### Linux

```
sudo apt-get install fzf fd-find
```

### Macbook
```
brew install fzf fd
```

## Requirements

`fd` and `fzf` must be on your `PATH`. Only works with `git` repos. No windows support for now.
