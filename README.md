# 天気予報アプリ

このアプリケーションは、現在地の天気情報から忘れ物を防止するReact Native製のモバイルアプリケーションです。

## 機能

- 現在地の天気情報の表示
- 気温、湿度、風速などの詳細情報
- 降水確率の表示
- 天気に応じたコメント表示
- 日本語対応

## 技術スタック

- React Native
- Expo
- OpenWeatherMap API
- 天気予報API（気象庁データ）

## 必要条件

- Node.js (v14.0.0以上)
- npm または yarn
- Expo CLI
- OpenWeatherMap APIキー

## セットアップ

1. リポジトリのクローン

```bash
git clone [リポジトリURL]
cd [プロジェクト名]
```

2. 依存関係のインストール

```bash
npm install
# または
yarn install
```

3. 環境変数の設定
   `.env`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を追加：

```
WEATHER_API_KEY=あなたのOpenWeatherMap APIキー
```

4. アプリケーションの起動

```bash
npm start
# または
yarn start
```

## 開発環境のセットアップ

1. Expo CLIのインストール

```bash
npm install -g expo-cli
```

2. 開発用の依存関係のインストール

```bash
npm install --save-dev eslint prettier
```

## プロジェクト構造

```
weather-api/
├── assets/          # 画像やフォントなどの静的ファイル
├── components/      # Reactコンポーネント
├── App.js          # メインアプリケーションファイル
├── app.config.js   # Expo設定ファイル
└── package.json    # プロジェクトの依存関係
```

## 使用しているAPI

1. OpenWeatherMap API

   - 天気情報の取得
   - 気温、湿度、風速などの詳細データ

2. 天気予報API（気象庁データ）
   - 日本語の天気情報
   - 都道府県別の天気予報

## ライセンス

このプロジェクトは著作権法によって保護されています。複製、改変、再配布、フォーク、商用利用は禁止されています。

詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 作者

Hideaki Tomori

## 謝辞

- デザイン：S.K
