# 背景颜色切换器

[![Manifest](https://img.shields.io/badge/Chrome-Manifest%20V3-1a73e8)](https://developer.chrome.com/docs/extensions/reference/manifest)
[![Version](https://img.shields.io/badge/version-1.0-555555)](manifest.json)

一个可直接加载的 Chrome 扩展示例：点击工具栏图标，在弹窗里按一次按钮，把**当前网页**的背景换成随机颜色。

仓库用来演示 Manifest V3 扩展的最小写法。源码就是清单、一个弹窗页面和四张图标，没有打包脚本，也没有第三方依赖。

![扩展图标](images/icon128.png)

## 它能做什么

- 在工具栏显示扩展图标，点击后打开 `popup.html`。
- 弹窗里只有一个按钮，文案是 `change background color`。
- 点击按钮后，扩展查询当前窗口的活动标签页，并用 `chrome.scripting.executeScript` 注入一段函数。
- 注入的函数生成一个随机十六进制颜色，写到该页 `document.body.style.backgroundColor`。
- 声明的权限只有 `activeTab` 和 `scripting`：在用户点开扩展之后，对当前标签页执行上述操作。

扩展没有后台 Service Worker、内容脚本、选项页或网络请求。

## 技术栈

| 项目 | 说明 |
| --- | --- |
| 扩展清单 | Manifest V3，`manifest.json` 中 `version` 为 `1.0` |
| 界面与逻辑 | 原生 HTML / CSS / JavaScript（`popup.html`、`popup.js`） |
| 依赖 | 无。不需要 Node.js、包管理器或构建命令 |
| 运行环境 | 支持 Manifest V3 的 Chromium 浏览器。已在 Google Chrome 157.0.8103.50 上加载并点过按钮 |

## 目录

```text
.
├── manifest.json    # 扩展名称、版本、权限、图标与弹窗入口
├── popup.html       # 宽 200px 的弹窗，内有变色按钮
├── popup.js         # 查询活动标签页并注入变色脚本
├── images/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png  # 蓝色圆形图标，工具栏与扩展管理页都会用到
└── README.md
```

## 环境要求

- Google Chrome，或其他支持 Manifest V3 的 Chromium 浏览器（如 Microsoft Edge）。Chrome 从 88 起支持 Manifest V3。
- 选择含有 `manifest.json` 的仓库根目录进行加载。

## 安装与运行

1. 克隆仓库，记住本机上的根目录路径。
2. 打开扩展管理页：
   - Chrome：在地址栏输入 `chrome://extensions`
   - Edge：在地址栏输入 `edge://extensions`
3. 打开页面上的「开发者模式」（Developer mode）。
4. 点击「加载已解压的扩展程序」（Load unpacked），选中本仓库根目录。
5. 确认列表中出现 **背景颜色切换器**，版本 `1.0`。
6. 打开一个普通网页（地址以 `https://` 或 `http://` 开头）。
7. 点击工具栏中的扩展图标。图标被收进扩展菜单时，先打开拼图图标再点它；可以把它固定到工具栏。
8. 在弹窗中点击 `change background color`。当前页 `body` 的背景会变成一种新的随机颜色，再点一次会换成另一种颜色。

浏览器内部页面（地址以 `chrome://`、`edge://` 开头）不允许扩展注入脚本，按钮在这些页面上不会改变背景。请在普通网页上试用。

### 本次验证

在 Google Chrome 157.0.8103.50 中，已用「加载已解压的扩展程序」载入本仓库根目录。对一个本地普通网页连续点击弹窗按钮，页面背景先后变为不同颜色（例如 `rgb(128, 148, 24)` 与 `rgb(67, 14, 7)`）。清单 JSON、`popup.html`、`popup.js` 以及 `images/` 下四张图标的路径均与 `manifest.json` 一致。

Edge 的加载入口与 Chrome 相同，本次没有在 Edge 里再跑一遍。

## 备注

- 随机颜色的写法是 `'#' + Math.floor(Math.random() * 16777215).toString(16)`。结果不一定是 6 位十六进制；长度不被 CSS 接受时，这一次点击不会改变背景。
- 脚本只改 `document.body` 的行内背景色。页面若用别的元素铺满视口，看到的颜色可能不变。
- 弹窗按钮是英文，扩展名称和描述是中文，与当前源码一致。
- 仓库没有测试脚本或发布到 Chrome 应用店的配置。

## 参考

- [Chrome 扩展概述](https://developer.chrome.com/docs/extensions)
- [入门：扩展的各个部分](https://developer.chrome.com/docs/extensions/get-started)
- [Manifest 文件](https://developer.chrome.com/docs/extensions/reference/manifest)
- [`chrome.scripting`](https://developer.chrome.com/docs/extensions/reference/api/scripting)
