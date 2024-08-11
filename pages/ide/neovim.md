## my mapping

```lua
local keymap = vim.keymap

keymap.set('n', 'x', '"_x')

-- Increment/decrement
keymap.set('n', '+', '<C-a>')
keymap.set('n', '-', '<C-x>')

-- Delete a word backwards
keymap.set('n', 'dw', 'vb"_d')

-- Select all
keymap.set('n', '<C-a>', 'gg<S-v>G')

-- New tab
keymap.set('n', 'te', ':tabedit')

-- Split window
keymap.set('n', 'ss', ':split<Return><C-w>w')
keymap.set('n', 'sv', ':vsplit<Return><C-w>w')

-- Move window
keymap.set('n', '<Space>', '<C-w>w')
keymap.set('', 'sh', '<C-w>h')
keymap.set('', 'sk', '<C-w>k')
keymap.set('', 'sj', '<C-w>j')
keymap.set('', 'sl', '<C-w>l')

-- Resize window
keymap.set('n', '<C-w><left>', '<C-w><')
keymap.set('n', '<C-w><right>', '<C-w>>')
keymap.set('n', '<C-w><up>', '<C-w>+')
keymap.set('n', '<C-w><down>', '<C-w>-')

-- tab
keymap.set('n', '<Tab>', ':tabnext<Return>')
keymap.set('n', '<S-Tab>', ':tabprev<Return>')
keymap.set('n', '<A-Left>', ':-tabmove<cr>')
keymap.set('n', '<A-Right>', ':+tabmove<cr>')

-- Move line
keymap.set('n', '<S-Up>', ':m-2<CR>')
keymap.set('i', '<S-Up>', ':m-2<CR>')
keymap.set('n', '<S-Down>', ':m+<CR>')
keymap.set('i', '<S-Down>', ':m+<CR>')

-- Move Block
keymap.set("v", "<S-Down>", ":m '>+1<CR>gv=gv")
keymap.set("v", "<S-Up>", ":m '<-2<CR>gv=gv")

-- Stay center when Ctrl-d or Ctrl-u or search
keymap.set("n", "<C-d>", "<C-d>zz")
keymap.set("n", "<C-u>", "<C-u>zz")
keymap.set("n", "n", "nzzzv")
keymap.set("n", "N", "Nzzzv")

-- keep paste item
keymap.set("x", "<leader>p", [["_dP]])

-- copy
keymap.set({ "n", "v" }, "<leader>y", [["+y]])
keymap.set("n", "<leader>Y", [["+Y]])

-- rename
keymap.set("n", "<leader>s", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])

-- wrap
keymap.set("n", "<leader>w", ':set wrap<CR>')

-- Disable Ctrl+Z
keymap.set('n', '<C-z>', '<nop>')

-- markdown preview
keymap.set('n', '<leader>m', ':MarkdownPreviewToggle<CR>')
```
