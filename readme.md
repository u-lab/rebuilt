# Rebuilt

## 概説

建築生のためのポートフォリオ作成サービス。

## 開発環境

1. .env を作成する(.env.example をコピーする)。

2. 以下のコマンドを打つ。

```bash

// ライブラリインストール
$ npm install

// サーバー起動
$ npm run dev
```

## 環境

- Nuxt.js 2.11
- Vue.js 2.6

## サイトマップ

- HOME (/)

- 個人ページ (/pages/{username})

  - 作品ページ (/pages/{username}/storages/{ storageID })

- サイトマップ(/sitemap)

- ログイン(/login)

- 新規登録(/register)

- パスワード再発行申請画面(/password/reset)

- パスワードを変更(/password/reset/:token)

- パスワードの変更完了画面(/password/reset/success)

- メールの認証(/email/verify/:id)

### 会員ページ

- 作品一覧(/storages)

- ダッシュボード(/users/dashboard)

  - 自分のプロフィール(/users/profile)
  - プロフィール編集(/users/profile/edit)

- 自分のポートフォリオ(/users/page)
  - ポートフォリオ編集(/users/page/edit)

- 自分の作品一覧 (/users/storages)
  - 作品追加(/users/storages/{ storageID }/create)
  - 作品編集(/users/storages/{ storageID }/edit)

- 設定 (/users/settings)
  - パスワード変更 (/users/settings/password)
  - メールアドレス変更 (/users/settings/email)

- ログアウト(/logout)
