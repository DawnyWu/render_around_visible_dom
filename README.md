Render Around Visible Dom
===

**一个只渲染可视部分Dom的小例子,只有100行左右的代码哦**

当一个可滚动的Div中有很多item的时候，item都会在Dom中显示。如果有成千上万个item,滚动的时候就会变得没有效率。这个例子中我们只渲染可视部分的item以及上下一定范围内的item，其他部分用空白的可变高度的div来填充。整个例子只有100行左右的代码，很适合学习。

## Installation

```shell
git clone https://github.com/DawnyWu/render_around_visible_dom.git
npm install
npm start
```

在控制台中查看dom元素即可看到效果