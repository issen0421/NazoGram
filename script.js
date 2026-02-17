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
     * プロジェクトカードのHTMLを生成する関数
     */
    function createProjectCard(p) {
        if(p.locked) {
            return `
            <div class="group bg-nazo-dark border border-gray-800 opacity-60 hover:opacity-100 transition-opacity duration-300 rounded overflow-hidden">
                <div class="aspect-[16/9] bg-black relative flex items-center justify-center border-b border-gray-800">
                    <div class="text-center">
                        <i class="fas ${p.icon} text-3xl text-gray-700 mb-2"></i>
                        <p class="text-gray-600 font-mono text-xs">LOCKED</p>
                    </div>
                </div>
                <div class="p-6">
                        <h3 class="text-gray-400 font-bold text-lg font-mono mb-2">${p.title}</h3>
                        <p class="text-gray-600 text-xs font-mono">${p.desc}</p>
                </div>
            </div>`;
        } else {
            let colorClass = p.category === 'WEB' ? 'text-nazo-primary border-nazo-primary' : 'text-nazo-secondary border-nazo-secondary';
            let hoverClass = p.category === 'WEB' ? 'group-hover:text-nazo-primary' : 'group-hover:text-nazo-secondary';
            let borderHover = p.category === 'WEB' ? 'hover:border-nazo-primary' : 'hover:border-nazo-secondary';
            let btnColor = p.category === 'WEB' ? 'border-nazo-primary text-nazo-primary' : 'border-nazo-secondary text-nazo-secondary';

            return `
            <div class="group bg-nazo-dark border border-gray-800 ${borderHover} transition-all duration-300 overflow-hidden relative rounded cursor-pointer animate-fade-in">
                <div class="aspect-[16/9] bg-gray-900 relative overflow-hidden">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas ${p.icon} text-5xl text-gray-700 ${hoverClass} transition-colors duration-500"></i>
                    </div>
                    <div class="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        <span class="border ${btnColor} px-6 py-2 font-mono text-sm tracking-widest">ACCESS</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-white font-bold text-lg font-mono">${p.title}</h3>
                        <span class="text-xs ${colorClass} border ${colorClass.replace('text-', 'border-').replace('border-', 'border-opacity-30 ')} px-2 py-0.5 rounded">${p.category}</span>
                    </div>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-2">${p.desc}</p>
                    <div class="flex items-center text-xs text-gray-600 font-mono">
                        <i class="fas fa-layer-group mr-2"></i> Diff: ${'★'.repeat(p.diff)}${'☆'.repeat(5-p.diff)}
                    </div>
                </div>
            </div>`;
        }
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

        return `
        <div class="group relative bg-nazo-dark border border-gray-800 p-6 rounded-lg hover:translate-y-[-5px] transition-all duration-300 overflow-hidden animate-fade-in">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <i class="fas ${m.icon} text-4xl ${colorClass}"></i>
            </div>
            <div class="w-16 h-16 bg-gray-800 rounded-full mb-4 flex items-center justify-center border-2 border-nazo-dim group-hover:border-[${colorHex}] transition-colors" style="border-color: #586575;">
                <span class="font-mono text-xl text-white">${String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-1 font-mono">${m.name}</h3>
            <p class="${colorClass} text-sm mb-4 font-mono">${m.role}</p>
            <p class="text-gray-400 text-sm leading-relaxed">${m.desc}</p>
        </div>`;
    }

    /**
     * グリッドをフィルタリングして描画する関数
     */
    function renderGrid(containerId, data, categoryKey, filter, renderFunc) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        const filteredData = filter === 'ALL' 
            ? data 
            : data.filter(item => item[categoryKey] === filter);

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

        // カテゴリ一覧を取得 (重複排除)
        const categories = ['ALL', ...new Set(data.map(item => item[categoryKey]))].filter(c => c);

        tabsContainer.innerHTML = ''; // クリア

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `tab-btn px-6 py-2 border border-gray-700 rounded-full text-sm font-mono text-gray-400 hover:text-white hover:border-nazo-primary transition-all duration-300 ${cat === 'ALL' ? 'active' : ''}`;
            btn.innerText = cat;
            
            btn.addEventListener('click', () => {
                // アクティブクラスの切り替え
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active', 'bg-nazo-primary/20', 'text-nazo-primary', 'border-nazo-primary');
                    b.classList.add('text-gray-400', 'border-gray-700');
                });
                btn.classList.add('active', 'bg-nazo-primary/20', 'text-nazo-primary', 'border-nazo-primary');
                btn.classList.remove('text-gray-400', 'border-gray-700');

                // グリッド再描画
                renderGrid(gridContainerId, data, categoryKey, cat, renderFunc);
            });

            tabsContainer.appendChild(btn);
        });

        // 初期描画 (ALL)
        renderGrid(gridContainerId, data, categoryKey, 'ALL', renderFunc);
        
        // ALLボタンの初期スタイル適用
        const firstBtn = tabsContainer.querySelector('.tab-btn');
        if(firstBtn) {
            firstBtn.classList.add('bg-nazo-primary/20', 'text-nazo-primary', 'border-nazo-primary');
            firstBtn.classList.remove('text-gray-400', 'border-gray-700');
        }
    }


    // --- 初期化実行 ---
    if (typeof CONFIG !== 'undefined') {
        // プロジェクトタブの生成
        createTabs('project-tabs', 'projects-grid', CONFIG.projects, 'category', createProjectCard);
        
        // メンバータブの生成
        createTabs('member-tabs', 'members-grid', CONFIG.members, 'category', createMemberCard);
    }


    // --- 4. モバイルメニューの制御 ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }


    // --- 5. ローディング & 背景アニメーション ---
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

    // Canvas Logic
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
