// ==============================================
//          NazoGram 設定ファイル
// ==============================================

const CONFIG = {
    logoFileName: '0-NazoGramLogo.png',

    // ------------------------------------------------------------------
    // メンバー情報
    // name: 名前
    // color: テーマカラー ('primary', 'secondary', 'red')
    // image: アイコン画像のファイル名 (例: 'member1.png') ※空欄ならデフォルトアイコン
    // xUrl: X(Twitter)のプロフィールURL
    // category: フィルタ用 (LEADER, MEMBER)
    // ------------------------------------------------------------------
    members: [
        { name: "一仙", image: "", color: "primary", category: "LEADER", xUrl: "https://twitter.com/" },
        { name: "しろくま", image: "", color: "secondary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "さっしー", image: "", color: "primary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "YAMASA", image: "", color: "secondary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "あせろら", image: "", color: "red", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Tohl", image: "", color: "primary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "土反レイ", image: "", color: "secondary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Misa", image: "", color: "red", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "あめあられ", image: "", color: "primary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "きゃわわ", image: "", color: "secondary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "えゆねる", image: "", color: "red", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "Kadi", image: "", color: "primary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "いおくたん", image: "", color: "secondary", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "けん", image: "", color: "red", category: "MEMBER", xUrl: "https://twitter.com/" },
        { name: "すぴか", image: "", color: "primary", category: "MEMBER", xUrl: "https://twitter.com/" }
    ],

    // ------------------------------------------------------------------
    // コンテンツ情報
    // category: EVENT, GOODS, CAFE, OTHERS
    // ------------------------------------------------------------------
    contents: [
        {
            title: "BUTTON",
            category: "GOODS",
            image: "", 
            desc: "ボタンを押すだけの謎解き。",
            diff: 1
        },
        {
            title: "MOVE IT",
            category: "GOODS",
            image: "",
            desc: "動かすことで真実が見える。",
            diff: 3
        },
        {
            title: "SCRATCH",
            category: "GOODS",
            image: "",
            desc: "削って見つける新感覚パズル。",
            diff: 2
        },
        {
            title: "アストロール",
            category: "EVENT",
            image: "",
            desc: "星々を繋ぎ、物語を紡ぐ。",
            diff: 3
        },
        {
            title: "AGAINST",
            category: "EVENT",
            image: "",
            desc: "逆境に立ち向かう謎解き。",
            diff: 5
        },
        {
            title: "DisPlay",
            category: "EVENT",
            image: "",
            desc: "画面の向こう側に隠されたメッセージ。",
            diff: 4
        },
        {
            title: "配置〜ズ",
            category: "CAFE",
            image: "",
            desc: "正しい位置に全てを収めよ。",
            diff: 2
        },
        {
            title: "変換字",
            category: "CAFE",
            image: "",
            desc: "言葉を変換し、意味を変えろ。",
            diff: 3
        },
        {
            title: "ナゾトキクエスト",
            category: "CAFE",
            image: "",
            desc: "冒険の旅に出よう。",
            diff: 2
        },
        {
            title: "寿司謎",
            category: "CAFE",
            image: "",
            desc: "へいお待ち！新鮮な謎を一丁。",
            diff: 1
        },
        {
            title: "FALL",
            category: "OTHERS",
            image: "",
            desc: "落ちる、堕ちる、そして見つける。",
            diff: 4
        }
    ]
};
