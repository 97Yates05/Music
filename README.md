# MD音乐 (web-music)

<a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>

网页在线音乐播放,demo（待部署）。

## 安装依赖

```bash
yarn
```

### 在开发模式下运行应用 (代码热重载, 错误报告, 等等.)

```bash
quasar dev
```

### 检查代码文件

```bash
yarn run lint
```

### 构建生产版本

```bash
quasar build
```

### 自定义配置

参照 [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## 项目简介

###实现技术

主要使用Vue全家桶（包括Vuex、router、axios），UI框架使用了quasar，网络数据的获取基于 **[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)** 项目提供的API。

### 主要功能

- 使用手机号登陆（已实现）
- 忘记密码功能（未实现）
- 查看个性推荐页、排行榜页、歌手页和最新音乐页（已实现）
- 搜索功能（已实现）
- 私人FM（部分实现）
- 最近播放（已实现，功能待优化）
- 我的页面（已实现，界面待优化）
- 点赞评论功能（未实现）
- 热评展示功能（未实现）

## 界面展示

### 登陆页



![截屏2020-03-0909.21](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/login-page.jpg)

### 主页

![main-page](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/main-page.jpg)

### 发现音乐页

![dis](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/dis.jpg)

### 私人FM

![fm](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/fm.jpg)

### 最近播放

![latest](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/latest.png)

### 我的主页（包含搜索结果页和歌单页）

![mine](https://github.com/97Yates05/web-music/blob/master/src/Screenshot/mine.jpg)

## 后续工作

- 优化性能，设计整体UI，添加注释，删除冗余代码，优化项目结构；
- 完善并添加功能；
- 改造typescript项目；
