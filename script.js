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
    //   モーダル制御システム
    // ==========================================
    const modal = document.getElementById('content-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    
    // 要素参照
    const mImage = document.getElementById('modal-image');
    const mFallback = document.getElementById('modal-image-fallback');
    const mCategory = document.getElementById('modal-category');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mDiff = document.getElementById('modal-diff');
    const mCredits = document.getElementById('modal-credits');

    function openModal(content) {
        // データ流し込み
        mTitle.innerText = content.title;
        mDesc.innerText = content.desc;
        mCategory.innerText = content.category;
        
        // 色設定
        let colorClass = 'border-gray-500 text-gray-400';
        if(content.category === 'EVENT') colorClass = 'border-nazo-secondary text-nazo-secondary';
        else if(content.category === 'GOODS') colorClass = 'border-yellow-500 text-yellow-500';
        else if(content.category === 'CAFE') colorClass = 'border-orange-500 text-orange-500';
        else colorClass = 'border-nazo-primary text-nazo-primary';
        
        mCategory.className = `text-xs border px-2 py-0.5 rounded font-mono mb-2 inline-block ${colorClass}`;

        // 難易度
        mDiff.innerText = '★'.repeat(content.diff) + '☆'.repeat(5-content.diff);

        // 画像
        if(content.image && content.image.trim() !== '') {
            mImage.src = content.image;
            mImage.classList.remove('hidden');
            mFallback.classList.add('hidden');
        } else {
            mImage.classList.add('hidden');
            mFallback.classList.remove('hidden');
        }

        // クレジット (メンバー表示)
        mCredits.innerHTML = '';
        if(content.credits && content.credits.length > 0) {
            content.credits.forEach(name => {
                // 名前からメンバー情報を検索
                const member = CONFIG.members.find(m => m.name === name);
                if(member) {
                    let iconHtml = member.image ? 
                        `<img src="${member.image}" class="w-full h-full object-cover">` : 
                        `<i class="fas fa-user text-gray-400 text-sm"></i>`;
                    
                    let linkHtml = `
                    <div class="flex flex-col items-center group cursor-pointer" onclick="window.open('${member.xUrl}', '_blank')">
                        <div class="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center overflow-hidden mb-1 group-hover:border-nazo-primary transition-colors">
                            ${iconHtml}
                        </div>
                        <span class="text-xs text-gray-400 group-hover:text-white transition-colors">${member.name}</span>
                    </div>`;
                    mCredits.innerHTML += linkHtml;
                } else {
                    // メンバーリストにない名前の場合
                     mCredits.innerHTML += `<div class="flex flex-col items-center"><div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-1"><span class="text-xs text-gray-500">?</span></div><span class="text-xs text-gray-500">${name}</span></div>`;
                }
            });
        } else {
             mCredits.innerHTML = '<span class="text-xs text-gray-600">No credits info.</span>';
        }

        // 表示
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 背景スクロール固定
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', closeModal);


    // ==========================================
    //   グリッド描画システム
    // ==========================================

    /**
     * コンテンツカードHTML (クリックイベントをバインドするためHTML生成後にイベントリスナ設定が必要だが
     * ここではonclick属性でindexを渡し、データ配列から参照する方式をとる)
     */
    function createContentCard(c, index) {
        // 画像チェック
        let thumbnailHTML;
        if (c.image && c.image.trim() !== '') {
            thumbnailHTML = `<img src="${c.image}" alt="${c.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">`;
        } else {
            let icon = c.icon || 'fa-cube'; 
            thumbnailHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas ${icon} text-5xl text-gray-700 group-hover:text-white transition-colors duration-500"></i>
                </div>`;
        }
        
        // 色設定
        let borderColor = 'border-gray-800 hover:border-nazo-primary';
        let badgeColor = 'text-nazo-primary border-nazo-primary';
        if(c.category === 'EVENT') { borderColor = 'border-gray-800 hover:border-nazo-secondary'; badgeColor = 'text-nazo-secondary border-nazo-secondary'; }
        else if(c.category === 'GOODS') { borderColor = 'border-gray-800 hover:border-yellow-500'; badgeColor = 'text-yellow-500 border-yellow-500'; }
        else if(c.category === 'CAFE') { borderColor = 'border-gray-800 hover:border-orange-500'; badgeColor = 'text-orange-500 border-orange-500'; }

        return `
        <div class="content-card group bg-nazo-dark border ${borderColor} transition-all duration-300 overflow-hidden relative rounded cursor-pointer animate-fade-in shadow-lg" data-index="${index}">
            <div class="aspect-[16/9] bg-gray-900 relative overflow-hidden">
                ${thumbnailHTML}
                <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <span class="border px-6 py-2 font-mono text-sm tracking-widest bg-black/50 text-white border-white">DETAILS</span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-white font-bold text-lg font-mono">${c.title}</h3>
                    <span class="text-xs ${badgeColor} border px-2 py-0.5 rounded border-opacity-50">${c.category}</span>
                </div>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">${c.desc}</p>
                <div class="flex items-center text-xs text-gray-600 font-mono">
                    <i class="fas fa-layer-group mr-2"></i> Diff: ${'★'.repeat(c.diff)}${'☆'.repeat(5-c.diff)}
                </div>
            </div>
        </div>`;
    }

    /**
     * メンバーカードHTML (カテゴリタブなし、全員表示)
     */
    function createMemberCard(m, index) {
        let colorHex = '#00ffcc'; // default
        if(m.color === 'secondary') colorHex = '#9d00ff';
        else if(m.color === 'red') colorHex = '#ef4444';

        // 画像処理
        let iconHTML;
        if (m.image && m.image.trim() !== '') {
            iconHTML = `<img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover rounded-full">`;
        } else {
            iconHTML = `<i class="fas fa-user text-3xl text-gray-400"></i>`;
        }

        const xLink = m.xUrl ? 
            `<a href="${m.xUrl}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-white hover:text-black text-gray-400 transition-all duration-300 group-hover:scale-110">
                <i class="fa-brands fa-x-twitter"></i>
             </a>` : '';

        return `
        <div class="group relative bg-nazo-dark border border-gray-800 p-6 rounded-lg hover:border-nazo-primary hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in flex flex-col items-center text-center">
            <div class="relative w-24 h-24 bg-gray-800 rounded-full mb-4 flex items-center justify-center border-2 border-gray-700 group-hover:border-[${colorHex}] transition-colors overflow-hidden">
                ${iconHTML}
            </div>
            <h3 class="text-lg font-bold text-white mb-1 font-mono z-10">${m.name}</h3>
            <div class="z-10">${xLink}</div>
        </div>`;
    }

    // 描画関数
    function renderGrid(containerId, data, categoryKey, filter, renderFunc, isInteractive = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        
        // フィルタリング
        let filteredData = data;
        let originalIndices = data.map((_, i) => i); // 元のインデックスを保持
        
        if(filter !== 'ALL') {
             filteredData = data.filter((item, i) => {
                 const match = item[categoryKey] === filter;
                 return match;
             });
             // 元のインデックスを再マップ（詳細表示時に正しいデータを引くため）
             originalIndices = data.map((item, i) => item[categoryKey] === filter ? i : -1).filter(i => i !== -1);
        }

        filteredData.forEach((item, index) => {
            // HTML生成時に、元のデータ配列のインデックスを埋め込むかどうか
            // コンテンツの場合はクリックイベントのために元インデックスが必要
            // ここでは簡易的に、フィルタ後のDOMにクリックイベントを付与する際に、
            // originalIndices[index] を使って正しいデータを特定する
            
            // HTML文字列を追加
            container.innerHTML += renderFunc(item, index);
        });

        // インタラクティブ要素（クリックイベント）の追加
        if(isInteractive) {
            const cards = container.querySelectorAll('.content-card');
            cards.forEach((card, i) => {
                const dataIndex = originalIndices[i];
                card.addEventListener('click', () => {
                    openModal(CONFIG.contents[dataIndex]);
                });
            });
        }
    }

    // タブ生成
    function createTabs(tabsContainerId, gridContainerId, data, categoryKey, renderFunc) {
        const tabsContainer = document.getElementById(tabsContainerId);
        if (!tabsContainer) return;
        
        const priorityOrder = ['ALL', 'EVENT', 'GOODS', 'CAFE', 'OTHERS'];
        
        tabsContainer.innerHTML = ''; 

        priorityOrder.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `tab-btn px-6 py-2 border border-gray-700 rounded-full text-sm font-mono text-gray-400 hover:text-white hover:border-nazo-primary transition-all duration-300 ${cat === 'ALL' ? 'active' : ''}`;
            btn.innerText = cat;
            
            btn.addEventListener('click', () => {
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active', 'bg-nazo-primary', 'text-black', 'border-nazo-primary');
                    b.classList.add('text-gray-400', 'border-gray-700');
                });
                btn.classList.add('active', 'bg-nazo-primary', 'text-black', 'border-nazo-primary');
                btn.classList.remove('text-gray-400', 'border-gray-700');
                
                // コンテンツグリッド再描画 (クリックイベント有効)
                renderGrid(gridContainerId, data, categoryKey, cat, renderFunc, true);
            });
            tabsContainer.appendChild(btn);
        });

        // 初期描画
        renderGrid(gridContainerId, data, categoryKey, 'ALL', renderFunc, true);
        
        const firstBtn = tabsContainer.querySelector('.tab-btn');
        if(firstBtn) {
            firstBtn.classList.add('bg-nazo-primary', 'text-black', 'border-nazo-primary');
            firstBtn.classList.remove('text-gray-400', 'border-gray-700');
        }
    }

    // --- 初期化 ---
    if (typeof CONFIG !== 'undefined') {
        // コンテンツ（タブあり、クリックあり）
        createTabs('content-tabs', 'contents-grid', CONFIG.contents, 'category', createContentCard);
        
        // メンバー（タブなし、全員表示）
        const memberContainer = document.getElementById('members-grid');
        if(memberContainer) {
            CONFIG.members.forEach((m, i) => {
                memberContainer.innerHTML += createMemberCard(m, i);
            });
        }
    }

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => { menu.classList.toggle('hidden'); });
    }

    // --- Canvas (復元) ---
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

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.9 ? '#9d00ff' : '#00ffcc'; 
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const particles = Array.from({length: 60}, () => new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            
            // 線で繋ぐ
            particles.forEach((a, index) => {
                particles.slice(index + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(0, 255, 204, ${1 - dist / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
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
