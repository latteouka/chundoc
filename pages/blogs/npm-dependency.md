遇到一個問題，我發布的 NPM Package 有用到 gsap，
當我開一個新專案測試時，下了 yarn add 之後確實也有安裝到 gsap，
專案裡也能使用，但這個 gsap 卻不會顯示在新專案的 package.json 中，
想一想這樣好像也是對的，我們平常裝的 package 也是有超級多的 nested dependencies 吧？

但像 gsap 這種比較重要的還是會希望能出現在 package.json 啊。
