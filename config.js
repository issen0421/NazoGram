// ==============================================
//          NazoGram 設定ファイル
// ==============================================

const CONFIG = {
    logoFileName: '0-NazoGramLogo.png',

    // ------------------------------------------------------------------
    // メンバー情報 (15名)
    // ------------------------------------------------------------------
    members: [
        { name: "一仙", role: "Representative", desc: "NazoGramの代表。全ての始まり。", color: "primary", icon: "fa-crown", category: "LEADER" },
        { name: "しろくま", role: "Nazo Creator", desc: "論理と閃きのクリエイター。", color: "secondary", icon: "fa-puzzle-piece", category: "MEMBER" },
        { name: "さっしー", role: "Engineer", desc: "システム構築のスペシャリスト。", color: "primary", icon: "fa-code", category: "MEMBER" },
        { name: "YAMASA", role: "Designer", desc: "視覚デザインと世界観の構築。", color: "secondary", icon: "fa-palette", category: "MEMBER" },
        { name: "あせろら", role: "Nazo Creator", desc: "独自の世界観を持つ謎を生み出す。", color: "red", icon: "fa-lightbulb", category: "MEMBER" },
        { name: "Tohl", role: "Programmer", desc: "コードで謎を紡ぐ。", color: "primary", icon: "fa-terminal", category: "MEMBER" },
        { name: "土反レイ", role: "Storyteller", desc: "物語の深淵を描く。", color: "secondary", icon: "fa-book-open", category: "MEMBER" },
        { name: "Misa", role: "Creator", desc: "繊細なギミックの魔術師。", color: "red", icon: "fa-star", category: "MEMBER" },
        { name: "あめあられ", role: "Engineer", desc: "技術で不可能を可能にする。", color: "primary", icon: "fa-microchip", category: "MEMBER" },
        { name: "きゃわわ", role: "Designer", desc: "ポップで洗練されたデザイン。", color: "secondary", icon: "fa-paint-brush", category: "MEMBER" },
        { name: "えゆねる", role: "Nazo Creator", desc: "革新的な謎解き体験を提供。", color: "red", icon: "fa-cube", category: "MEMBER" },
        { name: "Kadi", role: "Creator", desc: "多角的な視点から謎を構築。", color: "primary", icon: "fa-layer-group", category: "MEMBER" },
        { name: "いおくたん", role: "Engineer", desc: "サーバーサイドの守護者。", color: "secondary", icon: "fa-server", category: "MEMBER" },
        { name: "けん", role: "Nazo Creator", desc: "シンプルかつ奥深い謎。", color: "red", icon: "fa-shapes", category: "MEMBER" },
        { name: "すぴか", role: "Creator", desc: "輝くようなアイデアの源泉。", color: "primary", icon: "fa-bolt", category: "MEMBER" }
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
