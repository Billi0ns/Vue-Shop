# Mary's Bakery 電商平台 (Vue)

## 目錄

- [Demo](#demo)
- [專案說明](#about)
- [網站功能](#usage)
- [後續優化](#optimization)
- [訪客測試用帳號](#test_account)
- [使用技術](#built_using)
- [本地測試](#getting_started)

## Demo <a name = "demo"></a>

https://billi0ns-vue-shop.netlify.app

## 專案說明 <a name = "about"></a>

前端使用 Vue 與 BootstrapVue 來開發，資料庫以及使用者驗證使用 Firebase。

- 前台功能： 瀏覽商品以及篩選商品類別、加入購物車及結帳、查詢歷史訂單等
- 後台功能： 管理上架商品內容以及商品擺放順序，查看訂單紀錄等

## 網站功能 <a name="usage"></a>

### 加入購物車

![Imgur](https://imgur.com/7ZumY7p.gif)

### 選擇商品分類

![Imgur](https://imgur.com/nH0b6d8.gif)

### 完成訂單並結帳

![Imgur](https://imgur.com/tWxRDRJ.gif)

### 查詢訂單紀錄

![Imgur](https://imgur.com/FlaXx6r.gif)

### 上架新產品

![Imgur](https://imgur.com/geAwFKZ.gif)

## 後續優化 <a name = "optimization"></a>

在完成了網站的大致功能後，就把網站丟到 PageSpeed 測試速度。

而測試結果中第一個建議是移除未使用 JavaScript，因此使用 Webpack Bundle Analyzer 來檢視一下是哪一個套件最佔空間。

檢視後發現其中最大的是 BootstrapVue，gzipped 後依然有 206KB。其次為 Firebase，gzipped 後有 154.8KB。

研究後發現 BootstrapBue JavaScript 的部分支持 tree-shaking，因此就逐一手動引入需要的組件，也成功讓檔案大小降到了 45.8KB。

Firebase 的部分在了解後發現並不支持 tree-shaking。GitHub 上也有人開 issue 表示 bundle 太大了，而官方意識到這件事情也著手進行優化。

[最新消息](https://github.com/firebase/firebase-js-sdk/issues/2241)是優化後的 Firebase 已經在 alpha release 前的最終階段了，因此未來有機會能使用瘦身後的 Firebase 了。

在優化後整體 bundle size 來到了 272.52KB，依然比建議的 244KB 來的高。不過主要是 Firebase 太大了，但目前又無法降低它的大小。
而偏肥的 bundle size 也導致 First Contentful Paint 比較久，尤其在行動裝置上通常大於 5 秒，電腦裝置則約 1.2 秒。
為了避免長時間白畫面造成使用體驗不佳，我也在 vue render 前加入了一段載入動畫，讓等待的體驗好一些。

最終 bundle report
![bundle size](https://i.imgur.com/oVm4jne.png)

## 訪客測試用帳號 <a name = "test_account"></a>

帳號：`visitor@test.com`
密碼：`visitorpw456`

P.S. 訪客帳號只有進入後台讀取資料庫的權限，無法寫入資料庫喔！

## 使用技術 <a name = "built_using"></a>

- [VueJs](https://vuejs.org/) - 網頁框架
  - Vue CLI - 快速配置開發環境、build code、檢視 webpack bundle 大小
  - Vue Router - 管理頁面並控管進入後台的路徑
  - Vuex - 同時利用 localStorage 來儲存購物車資訊
- [BootstrapVue](https://bootstrap-vue.org/)
- [ESLint](https://eslint.org/) - 使用 Airbnb Style Guide，全部都符合沒有任何 error。而用 console.log 除錯的地方在 production mode 時也用 babel-plugin 移除跟 console 有關的訊息了。
- [Firebase](https://firebase.google.com/) - 資料庫
  - [Firestore](https://firebase.google.com/docs/firestore) - 對資料庫進行 CRUD 操作來管理產品資料及訂單資料，
  - [Firebase Auth](https://firebase.google.com/docs/auth) - 當 Navigation Guard 管理進入後台的權限
  - [Firebase Storage](https://firebase.google.com/docs/storage) - 存放產品的圖片

## 本地測試 <a name = "getting_started"></a>

安裝所需的套件

```
npm install
```

啟動 local server

```
npm run serve
```

建立 production build

```
npm run build
```
