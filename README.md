# AKAO Portfolio

AKAO のポートフォリオサイトです。  
北欧モダンなトーンをベースに、プロフィール・スキル・実績・問い合わせ導線を掲載しています。

## Features

- ライト / ダークモード切り替え
- スキルのカテゴリ表示（Frontend / Design / Tools & Workflow）
- 実績カード（概要 / 改善 / 成果）
- Contact フォーム（フロント + `app/api/contact` の最小 API 連携）
- 送信成功時の導線（Google フォームへの外部リンク）

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4

## Setup

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認できます。

## Environment Variables

`.env.local` に以下を設定してください。

```bash
NEXT_PUBLIC_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/your-form-id/viewform
```

- 未設定でもフォーム自体は動作します
- 成功画面に Google フォームボタンを表示したい場合は設定が必要です

## Scripts

```bash
npm run dev    # 開発サーバー
npm run lint   # ESLint
npm run build  # 本番ビルド
```

## Deploy (Vercel)

1. GitHub に push
2. Vercel でリポジトリを Import
3. `NEXT_PUBLIC_GOOGLE_FORM_URL` を Vercel の Environment Variables に設定
4. Deploy

## Live URL

- Production: `TBD (after Vercel deploy)`
