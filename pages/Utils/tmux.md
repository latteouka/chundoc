## 可以丟到遠端主機上

重新讀到以後可以用 prefix+r 重新 source config

如果要手動就 `tmux source-file ~/.tmux.conf`

因為我是慣用 ctrl+t 的，所以主機上就改用比較近的 g，預設的 b 對我來說很不好按。

```bash filename="~/.tmux.conf"
# set-option -g default-terminal "screen-256color"
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# change prefix
unbind C-b
set-option -g prefix C-g
set-option -g repeat-time 0

#### Key bindings

set-window-option -g mode-keys vi

# Reload settings
bind r source-file ~/.tmux.conf \; display "Reloaded!"
# Open current directory
bind o run-shell "open #{pane_current_path}"
bind -r e kill-pane -a

# split
bind '"' split-window -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"

# vim-like pane switching
bind -r k select-pane -U
bind -r j select-pane -D
bind -r h select-pane -L
bind -r l select-pane -R

# Moving window
bind-key -n C-S-Left swap-window -t -1 \; previous-window
bind-key -n C-S-Right swap-window -t +1 \; next-window

# Resizing pane
bind -r C-k resize-pane -U 5
bind -r C-j resize-pane -D 5
bind -r C-h resize-pane -L 5
bind -r C-l resize-pane -R 5
```

## 我自己本機上的

```bash
# set-option -g default-terminal "screen-256color"
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# action key
unbind C-b
set-option -g prefix C-t
set-option -g repeat-time 0

#### Key bindings

set-window-option -g mode-keys vi

# bind t send-key C-t

# Reload settings
bind r source-file ~/.tmux.conf \; display "Reloaded!"
# Open current directory
bind o run-shell "open #{pane_current_path}"
bind -r e kill-pane -a

# split
bind '"' split-window -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"

# vim-like pane switching
bind -r k select-pane -U
bind -r j select-pane -D
bind -r h select-pane -L
bind -r l select-pane -R

# Moving window
bind-key -n C-S-Left swap-window -t -1 \; previous-window
bind-key -n C-S-Right swap-window -t +1 \; next-window

# Resizing pane
bind -r C-k resize-pane -U 5
bind -r C-j resize-pane -D 5
bind -r C-h resize-pane -L 5
bind -r C-l resize-pane -R 5

#### basic settings
set-option -g status-justify "left"

#set-option utf8-default on
setw -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'copy-mode -e'"

# look'n feel
set-option -g status-fg cyan
set-option -g status-bg black
set -g pane-active-border-style fg=colour166,bg=default
set -g window-style fg=colour10,bg=default
set -g window-active-style fg=colour12,bg=default
set-option -g history-limit 64096

set -sg escape-time 10

#### COLOUR

# default statusbar colors
set-option -g status-style bg=colour235,fg=colour136,default

# default window title colors
set-window-option -g window-status-style fg=colour244,bg=colour234,dim

# active window title colors
set-window-option -g window-status-current-style fg=colour166,bg=default,bright


# pane border
set-option -g pane-border-style fg=colour235 #base02
set-option -g pane-active-border-style fg=colour136,bg=colour235

# message text
# set-option -g message-style bg=colour235,fg=colour166

# pane number display
# set-option -g display-panes-active-colour colour33 #blue
# set-option -g display-panes-colour colour166 #orange

# clock
# set-window-option -g clock-mode-colour colour64 #green

# allow the title bar to adapt to whatever host you connect to
# set -g set-titles on
# set -g set-titles-string "#T"

# Panel Look
set -g status on
set -g status-interval 2
set -g status-left-length 60
set -g status-left ''

set -g status-right-length 150

set -g @spotify_playing_icon "♫"
set -g @spotify_paused_icon "■"
set -g @spotify_stopped_icon " "
set -g status-right "#{music_status}  #{artist}  #[fg=colour252,bold]#{track} "

set -g window-status-separator ' '

# 0: name
set -g window-status-format "#[fg=colour245, bg=color0] #I:#W "
set -g window-status-current-format "#[fg=colour255] #I:#[fg=colour255,bold]#W "

set-option -g default-shell /opt/homebrew/bin/fish

# PLUG MANAGER
# -- Install -- prefix: Ctrl-t
# Add new plugin to ~/.tmux.conf with set -g @plugin '...'
# Press prefix + I (capital i, as in Install) to fetch the plugin.
# -- Uninstall --
# Remove (or comment out) plugin from the list.
# Press prefix + alt + u (lowercase u as in uninstall) to remove the plugin.
# or just run ~/.tmux/plugins/tpm/bin/clean_plugins

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# List of plugins
set -g @plugin 'robhurring/tmux-spotify'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```
