# flac2alac

MusicBrainz のメタデータを維持しつつ、flac を alac に変換してくれる君。

## Requirements

- Node.js
- yarn
- XLD

## Usage

詳しくは [こちら](https://scrapbox.io/mizdra/flac_%E3%82%92_alac_%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B) を参照。

### セットアップ

```console
$ # セットアップ
$ git clone git@github.com:mizdra-sandbox/flac2alac.git
$ cd flac2alac
$ yarn install
```

### `flac2alac` コマンド

ディレクトリに入っている flac を alac に変換する。

```console
$ # 変換前に flac が何ファイルあるのか確認
$ find music/main -name '*.flac' | wc -l
1143

$ # 変換 (マシンの CPU 数に応じて XLD のプロセスを並列で立ち上げて変換してくれる)
$ yarn run flac2alac music/main dist-alac/

$ # ちゃんと flac のファイル数と対応しているか確認
$ find alac -name '*.m4a' | wc -l
1143
```

### `rmflac` コマンド

ディレクトリに入っている flac を削除する。

```console
$ find music/main -name '*.flac' | wc -l
1143

$ yarn run rmflac music/main
(削除する前に削除するファイルを一覧してくれるので、間違いがないか確認して y を入力する)

$ find music/main -name '*.flac' | wc -l
0
```

## License

MIT
