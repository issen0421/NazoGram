// ==============================================
//          NazoGram 設定ファイル
// ==============================================

const CONFIG = {
    logoFileName: '0-NazoGramLogo.png',

    // ------------------------------------------------------------------
    // メンバー情報
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
    // コンテンツ情報
    // title: タイトル
    // category: カテゴリ (WEB, GAME, EVENT...)
    // image: サムネイル画像のファイル名 (例: 'button.png') ※空欄の場合はアイコンが表示されます
    // desc: 説明文
    // diff: 難易度など (1-5)
    // ------------------------------------------------------------------
    contents: [
        {
            title: "BUTTON",
            category: "WEB",
            image: "", // 画像ファイル名をここに入力
            desc: "ボタンを押すだけの謎解き。",
            diff: 1
        },
        {
            title: "MOVE IT",
            category: "GAME",
            image: "",
            desc: "動かすことで真実が見える。",
            diff: 3
        },
        {
            title: "SCRATCH",
            category: "GAME",
            image: "",
            desc: "削って見つける新感覚パズル。",
            diff: 2
        },
        {
            title: "DisPlay",
            category: "WEB",
            image: "",
            desc: "画面の向こう側に隠されたメッセージ。",
            diff: 4
        },
        {
            title: "アストロール",
            category: "GAME",
            image: "",
            desc: "星々を繋ぎ、物語を紡ぐ。",
            diff: 3
        },
        {
            title: "配置〜ズ",
            category: "PUZZLE",
            image: "",
            desc: "正しい位置に全てを収めよ。",
            diff: 2
        },
        {
            title: "変換字",
            category: "PUZZLE",
            image: "",
            desc: "言葉を変換し、意味を変えろ。",
            diff: 3
        },
        {
            title: "ナゾトキクエスト",
            category: "EVENT",
            image: "",
            desc: "冒険の旅に出よう。",
            diff: 2
        },
        {
            title: "寿司謎",
            category: "GAME",
            image: "",
            desc: "へいお待ち！新鮮な謎を一丁。",
            diff: 1
        },
        {
            title: "AGAINST",
            category: "WEB",
            image: "",
            desc: "逆境に立ち向かう謎解き。",
            diff: 5
        }
    ]
};
