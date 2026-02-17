// ==============================================
//          NazoGram 設定ファイル
// ==============================================

const CONFIG = {
    logoFileName: '0-NazoGramLogo.png',

    // ------------------------------------------------------------------
    // メンバー情報
    // name: 名前
    // role: 役職
    // color: テーマカラー ('primary', 'secondary', 'red')
    // icon: 背景アイコン
    // category: フィルタ用カテゴリ
    // xUrl: X(Twitter)のプロフィールURL (例: 'https://twitter.com/username')
    // ------------------------------------------------------------------
    members: [
        { name: "一仙", role: "Representative", color: "primary", icon: "fa-crown", category: "LEADER", xUrl: "https://twitter.com/" },
        { name: "しろくま", role: "Nazo Creator", color: "secondary", icon: "fa-puzzle-piece", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "さっしー", role: "Engineer", color: "primary", icon: "fa-code", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "YAMASA", role: "Designer", color: "secondary", icon: "fa-palette", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "あせろら", role: "Nazo Creator", color: "red", icon: "fa-lightbulb", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Tohl", role: "Programmer", color: "primary", icon: "fa-terminal", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "土反レイ", role: "Storyteller", color: "secondary", icon: "fa-book-open", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Misa", role: "Creator", color: "red", icon: "fa-star", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "あめあられ", role: "Engineer", color: "primary", icon: "fa-microchip", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "きゃわわ", role: "Designer", color: "secondary", icon: "fa-paint-brush", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "えゆねる", role: "Nazo Creator", color: "red", icon: "fa-cube", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Kadi", role: "Creator", color: "primary", icon: "fa-layer-group", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "いおくたん", role: "Engineer", color: "secondary", icon: "fa-server", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "けん", role: "Nazo Creator", color: "red", icon: "fa-shapes", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "すぴか", role: "Creator", color: "primary", icon: "fa-bolt", category: "MEMBER", xUrl: "https://twitter.com/" }
    ],

    // ------------------------------------------------------------------
    // プロジェクト情報
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
        },
        {
            title: "Logic Archive 01",
            category: "LINE",
            desc: "LINEボットを使用した対話型ミステリー。",
            diff: 2,
            icon: "fa-comments"
        },
        {
            title: "Midnight Console",
            category: "GAME",
            desc: "黒い画面にコマンドを打ち込み、真相を暴くハッキングシミュレータ。",
            diff: 4,
            icon: "fa-terminal"
        }
    ]
};
