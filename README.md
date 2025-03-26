## 環境構築
1. 初期化
```bash
npm init -y
```
2. パッケージのインストール
```bash
npm install express
npm install --save-dev typescript ts-node @types/node @types/express
```
3. ts環境の初期化
```bash
npx tsc --init
```
4. package.jsonの"script"に以下を追加
```json
"scripts": {
  "dev": "ts-node src/index.ts"
}
```

## 環境移植方法


## RDB接続
```bash
$ psql postgresql://fern-developer@localhost:35432/main
$ password: password
```
