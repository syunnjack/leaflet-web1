# SPOTPALETTE ドメイン公開設定

## 正規URL

- Web: `https://spotpalette.jp`
- App landing: `https://spotpalette.app`
- Redirect: `spotpalette.com` / `spotpalette.net` → `spotpalette.jp`

## DNS

4ドメインを同じCloudflareアカウントへ追加し、Web公開先へカスタムドメインとして接続する。`www`も登録する。`.com`と`.net`はパスとクエリを保持した301転送にする。コード側にも同じ転送処理を実装済み。

## SEO

canonical、Open Graph、WebSite構造化データ、robots、sitemapは`.jp`へ統一する。Search Consoleには4ドメインを登録し、サイトマップは`.jp`から送信する。

## アプリリンク

Expo設定済みドメインは`spotpalette.app`と`spotpalette.jp`。App Store公開時にApple Team ID、Google Play公開時にSHA-256証明書フィンガープリントを取得し、各ドメインの`.well-known`へ関連付けファイルを追加する。
