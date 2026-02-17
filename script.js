document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ロゴの初期化 ---
    const logoNav = document.getElementById('nav-logo');
    const logoHero = document.getElementById('hero-logo');
    const textNav = document.getElementById('nav-text-fallback');
    const textHero = document.getElementById('hero-text-fallback');

    if (typeof CONFIG !== 'undefined' && CONFIG.logoFileName && CONFIG.logoFileName.trim() !== '') {
        logoNav.src = CONFIG.logoFileName;
        logoHero.src = CONFIG.logoFileName;
        logoNav.classList.remove('hidden');
        logoHero.classList.remove('hidden');
        textNav.classList.add('hidden');
        textHero.classList.add('hidden');

        const fallback = () => {
            logoNav.classList.add('hidden');
            logoHero.classList.add('hidden');
            textNav.classList.remove('hidden');
            textHero.classList.remove('hidden');
        };
        logoNav.onerror = fallback;
        logoHero.onerror = fallback;
    }

    // ==========================================
    //   タブ & グリッド描画システム
    // ==========================================

    /**
     * コンテンツカードのHTMLを生成する関数
     */
    function createContentCard(c) {
        let colorClass = c.category === 'EVENT' ? 'text-nazo-secondary border-nazo-secondary' : 'text-nazo-primary border-nazo-primary';
        let btnColor = c.category === 'EVENT' ? 'border-nazo-secondary text-nazo-secondary' : 'border-nazo-primary text-nazo-primary';

        // 画像があるかどうかチェック
        let thumbnailHTML;
        if (c.image && c.image.trim() !== '') {
            thumbnailHTML = `<img src="${c.image}" alt="${c.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">`;
        } else {
            // 画像がない場合はアイコン (フォールバック)
            let icon = c.icon || 'fa-cube'; 
            thumbnailHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas ${icon} text-5xl text-gray-700 group-hover:text-white transition-colors duration-500"></i>
                </div>`;
        }

        return `
        <div class="group bg-nazo-dark border border-gray-800 hover:border-gray-600 transition-all duration-300 overflow-hidden relative rounded cursor-pointer animate-fade-in shadow-lg">
            <!-- サムネイルエリア -->
            <div class="aspect-[16/9] bg-gray-900 relative overflow-hidden">
                ${thumbnailHTML}
                <!-- オーバーレイ -->
                <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <span class="border ${btnColor} px-6 py-2 font-mono text-sm tracking-widest bg-black/50">VIEW DETAILS</span>
                </div>
            </div>
            <!-- テキストエリア -->
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-white font-bold text-lg font-mono">${c.title}</h3>
                    <span class="text-xs ${colorClass} border ${colorClass.replace('text-', 'border-').replace('border-', 'border-opacity-30 ')} px-2 py-0.5 rounded">${c.category}</span>
                </div>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">${c.desc}</p>
                <div class="flex items-center text-xs text-gray-600 font-mono">
                    <i class="fas fa-layer-group mr-2"></i> Diff: ${'★'.repeat(c.diff)}${'☆'.repeat(5-c.diff)}
                </div>
            </div>
        </div>`;
    }

    /**
     * メンバーカードのHTMLを生成する関数
     */
    function createMemberCard(m, index) {
        let colorHex = '';
        let colorClass = '';
        if(m.color === 'primary') { colorHex = '#00ffcc'; colorClass = 'text-nazo-primary'; }
        else if(m.color === 'secondary') { colorHex = '#9d00ff'; colorClass = 'text-nazo-secondary'; }
        else { colorHex = '#ff0055'; colorClass = 'text-red-500'; }

        const xLink = m.xUrl ? 
            `<a href="${m.xUrl}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-white hover:text-black text-gray-400 transition-all duration-300 group-hover:scale-110">
                <i class="fa-brands fa-x-twitter"></i>
             </a>` : '';

        return `
        <div class="group relative bg-nazo-dark border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-all duration-300 overflow-hidden animate-fade-in flex flex-col items-center text-center">
            <div class="absolute top-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <i class="fas ${m.icon} text-6xl ${colorClass}"></i>
            </div>
            <div class="relative w-16 h-16 bg-gray-800 rounded-full mb-4 flex items-center justify-center border-2 border-nazo-dim group-hover:border-[${colorHex}] transition-colors z-10" style="border-color: #586575;">
                <span class="font-mono text-xl text-white">${String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-1 font-mono z-10">${m.name}</h3>
            <p class="${colorClass} text-xs font-mono uppercase tracking-wider z-10">${m.role}</p>
            <div class="z-10">
                ${xLink}
            </div>
        </div>`;
    }

    /**
     * グリッドをフィルタリングして描画する関数
     */
    function renderGrid(containerId, data, categoryKey, filter, renderFunc) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const filteredData = filter === 'ALL' ? data : data.filter(item => item[categoryKey] === filter);
        filteredData.forEach((item, index) => {
            container.innerHTML += renderFunc(item, index);
        });
    }

    /**
     * タブボタンを生成する関数
     */
    function createTabs(tabsContainerId, gridContainerId, data, categoryKey, renderFunc) {
        const tabsContainer = document.getElementById(tabsContainerId);
        if (!tabsContainer) return;
        
        // カテゴリのセットを定義 (順序固定のため)
        // ※データから自動抽出も可能ですが、指定された順序(ALL, EVENT, GOODS, OTHERS)を守るために固定リストと照合します
        const priorityOrder = ['ALL', 'EVENT', 'GOODS', 'OTHERS'];
        
        // データ内に存在するカテゴリを抽出
        const existingCategories = [...new Set(data.map(item => item[categoryKey]))].filter(c => c);
        
        // 優先順位リストに基づいて表示するカテゴリを決定 (存在しないカテゴリも表示したい場合は priorityOrder をそのまま使う)
        // ここでは「データがなくてもボタンは表示する」方針で行きます
        const categoriesToShow = priorityOrder;

        tabsContainer.innerHTML = ''; 

        categoriesToShow.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `tab-btn px-6 py-2 border border-gray-700 rounded-full text-sm font-mono text-gray-400 hover:text-white hover:border-nazo-primary transition-all duration-300 ${cat === 'ALL' ? 'active' : ''}`;
            btn.innerText = cat;
            
            btn.addEventListener('click', () => {
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active', 'bg-nazo-primary', 'text-black', 'border-nazo-primary');
                    b.classList.add('text-gray-400', 'border-gray-700');
                });
                // Active Style Update
                btn.classList.add('active', 'bg-nazo-primary', 'text-black', 'border-nazo-primary');
                btn.classList.remove('text-gray-400', 'border-gray-700');
                renderGrid(gridContainerId, data, categoryKey, cat, renderFunc);
            });
            tabsContainer.appendChild(btn);
        });

        renderGrid(gridContainerId, data, categoryKey, 'ALL', renderFunc);
        
        // 初期アクティブスタイル
        const firstBtn = tabsContainer.querySelector('.tab-btn');
        if(firstBtn) {
            firstBtn.classList.add('bg-nazo-primary', 'text-black', 'border-nazo-primary');
            firstBtn.classList.remove('text-gray-400', 'border-gray-700');
        }
    }

    // --- 初期化実行 ---
    if (typeof CONFIG !== 'undefined') {
        createTabs('content-tabs', 'contents-grid', CONFIG.contents, 'category', createContentCard);
        createTabs('member-tabs', 'members-grid', CONFIG.members, 'category', createMemberCard);
    }

    // モバイルメニュー制御
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => { menu.classList.toggle('hidden'); });
    }

    // ローダー & Canvas
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initCanvas();
            }, 800);
        }
    }, 1500);

    function initCanvas() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize);
        resize();
        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = '#586575';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const nodes = Array.from({ length: 60 }, () => new Node());
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(node => { node.update(); node.draw(); });
            nodes.forEach((a, i) => {
                nodes.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 204, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
