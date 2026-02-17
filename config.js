// ==============================================
//          NazoGram 設定ファイル
// ==============================================

const CONFIG = {
    // ------------------------------------------------------------------
    // 1. ロゴ画像設定
    // アップロードした画像ファイル名を入力してください。
    // 例: 'logo.png', 'my-logo.jpg' など
    // 画像がない場合は空欄 '' にすると、自動でテキストロゴが表示されます。
    // ------------------------------------------------------------------
    logoFileName: '0-NazoGramLogo.png',


    // ------------------------------------------------------------------
    // 2. メンバー情報
    // name: 名前
    // role: 役職
    // desc: 説明文
    // color: テーマカラー ('primary'=水色, 'secondary'=紫, 'red'=赤)
    // icon: FontAwesomeのアイコンクラス名 (例: 'fa-code', 'fa-user', 'fa-bug')
    // ------------------------------------------------------------------
    members: [
        {
            name: "ROOT_ADMIN",
            role: "Founder / Main Programmer",
            desc: "全てのロジックを統べる管理者。Web実装から謎のコアシステム構築まで担当。",
            color: "primary",
            icon: "fa-code"
        },
        {
            name: "DESIGN_BOT",
            role: "UI/UX Designer",
            desc: "視覚的な謎と洗練されたインターフェースを生成する。色彩と図形の魔術師。",
            color: "secondary",
            icon: "fa-pencil-ruler"
        },
        {
            name: "GLITCH_MAKER",
            role: "Storyteller",
            desc: "物語のバグ（非日常）を生み出す脚本家。プレイヤーを世界観の深淵へと誘う。",
            color: "red",
            icon: "fa-bug"
        }
    ],


    // ------------------------------------------------------------------
    // 3. プロジェクト情報
    // title: タイトル
    // category: カテゴリ (WEB, GAME, ARG...)
    // desc: 説明
    // diff: 難易度 (1-5の数字)
    // icon: アイコン
    // locked: true にすると鍵がかかった表示になります
    // ------------------------------------------------------------------
    projects: [
        {
            title: "CODE: GENESIS",
            category: "WEB",
            desc: "Webサイトの構造自体が謎となっている。デベロッパーツールを駆使して深淵へ潜れ。",
            diff: 5,
            icon: "fa-network-wired"
        },
        {
            title: "PHANTOM_BUG",
            category: "GAME",
            desc: "意図的に仕込まれたバグを利用してクリアする、逆転の発想のアクションパズル。",
            diff: 3,
            icon: "fa-bug"
        },
        {
            title: "Project: ???",
            category: "DEV",
            desc: "現在開発中の極秘プロジェクト。詳細は待て。",
            diff: 0,
            icon: "fa-lock",
            locked: true
        }
    ]
};
