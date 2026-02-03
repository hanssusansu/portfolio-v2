
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 3D Particle Background Animation
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 100; // Number of nodes
        const connectionDistance = 150; // Distance to draw lines

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Velocity
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(230, 175, 46, ${Math.random() * 0.5 + 0.2})`; // Gold with alpha
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(230, 175, 46, ${1 - dist / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animate();
    }


    // ==========================================
    // 2. Navigation Logic (Scroll Spy & Smooth Scroll)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideNav = document.getElementById('side-nav');

    // Smooth Scroll on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // Let default anchor behavior work with css smooth-scroll, or keep manual?
            // Let's use manual to close menu reliably
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close menu first
                if (hamburgerBtn && sideNav) {
                    hamburgerBtn.classList.remove('active');
                    sideNav.classList.remove('active');
                }

                // Scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Spy (Highlight Nav)
    const observerOptions = {
        root: null,
        threshold: 0.3 // Trigger when 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add to current
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));





    // ==========================================
    // 4. Existing Content Logic (Language, Modal, Data)
    // ==========================================

    // Modal Logic
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImagesContainer = document.getElementById('modal-images');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    const interactiveItems = document.querySelectorAll('.skill-tag, .interactive-item');
    interactiveItems.forEach(item => {
        item.addEventListener('click', () => {
            let title = item.textContent.trim();
            const h3 = item.querySelector('h3');
            if (h3) title = h3.textContent.trim();
        });
    });

    // Language Data & Logic
    const langBtn = document.getElementById('lang-switch');
    let currentLang = 'zh';

    const translations = {
        zh: {
            name: "蘇子恆",
            intro: "連結數據邏輯與商業直覺 ｜ 將市場雜訊轉化為精準的獲利指引",

            // Nav
            nav_home: "首頁",
            nav_edu: "學歷",
            nav_exp: "專案",
            nav_intern: "實習",
            nav_skills: "專業技能",
            nav_cert: "證照",
            nav_contact: "聯絡",

            edu_title: "學歷",
            edu_1_school: "國立高雄科技大學",
            edu_1_major: "運籌管理系日間部 學士",
            edu_1_time: "2020 - 2023",
            edu_2_school: "國立高雄科技大學",
            edu_2_major: "金融系日間部 碩士",
            edu_2_time: "2023 - 2025",
            edu_3_school: "法國雷恩商學院",
            edu_3_major: "數位行銷管理 碩士",
            edu_3_time: "2025 - 2026",

            exp_title: "專案經驗",
            exp_1_role: "旗津渡輪生質能源票價策略研究",
            exp_1_detail: "本專案目的在整合計畫行為理論(TPB)與價值-信念-規範理論(VBN)，探討消費者對綠色產品與CSR的願付價格。方法上採用條件評估法(CVM)設計問卷，並運用Tobit模型修正資料偏誤進行精準估計。結果證實心理因素及特定人口特徵（如年齡、職業）顯著影響願付金額。建議企業與政府應鎖定高願付意願族群制定差異化定價與行銷策略，將環境價值有效轉化為市場效益。<br><br><a href=\"files/旗津渡輪生質能源票價研究.pdf\" target=\"_blank\" class=\"dashboard-btn\">查看檔案</a>",
            exp_2_role: "感染性醫療廢棄物產量預測",
            exp_2_detail: "本專案目的在解決醫療廢棄物管理挑戰，分別針對心臟科與婦產科建立科室層級的感染性廢棄物預測模型，以克服傳統全院層級模型忽略科別差異的限制。方法上採用三項病患結構性指標，導入比較六種機器學習演算法，並運用SHAP法解釋變數影響力。結果顯示支持向量回歸(SVR)預測效果最佳，且CMI為影響各科室感染性廢棄物產量最關鍵的因素，反映病情複雜度與廢棄物量高度相關。建議醫院應屏棄一體適用的管理模式，改採科室別的差異化策略，且應針對高CMI病例建立廢棄物預警機制，讓後勤單位能提前調度資源；同時，將廢棄物管理納入臨床路徑規劃，並針對不同科室特性實施客製化的醫護分類教育訓練，以落實精準減量與永續治理。",
            exp_3_role: "Dockmate France數位行銷策略規劃",
            exp_3_detail: "本專案目的在為遊艇遙控器品牌Dockmate制定歐洲市場全方位行銷策略，提升高淨值客群的品牌認知與忠誠度。執行策略涵蓋全漏斗(Full-Funnel)路徑：首先透過「恐懼與安心」的情感訴求激發共鳴，並導入電子書與線上研討會獲取潛在客戶(Leads)；其次，運用Google Ads(40%預算)進行精準關鍵字佈局，排除無效流量並鎖定特定船型；社群方面結合Alex Jimenez等百萬級網紅與LinkedIn B2B原生廣告擴大聲量。成果不僅建立了一套整合Google Ads、社群與CRM自動化的精準獲客模型，更創新設計了「船長圈(Captains Circle)」遊戲化忠誠度計畫，透過分級獎勵機制有效強化舊客留存與口碑推薦。<br><br><a href=\"files/DockMate數位行銷策略規劃.pdf\" target=\"_blank\" class=\"dashboard-btn\">查看檔案</a>",
            exp_4_role: "電商客戶流失因素分析與數位行銷洞察",
            exp_4_detail: "本專案透過對原始資料的整理、視覺化以及演算法分析，整合Python與Microsoft Power BI技術，深入剖析電商平台27.49%高流失率背後的關鍵驅動因子。分析顯示「總購買次數低於3次」為首要流失警訊，其流失風險為其他群體的1.68倍；同時，平均對話時間過短(<8.3分鐘)與低生命週期價值(<322)亦是重要預測指標。基於此發現，建議針對購買次數少的客群建立7-14天黃金期再行銷機制，設計專屬登陸頁面(Landing Page)與個人化EDM，並同步優化客服體驗，從源頭提升顧客黏著度與留存率。<br><br><a href=\"files/顧客流失分析.pdf\" target=\"_blank\" class=\"dashboard-btn\">查看檔案</a>",
            exp_5_role: "社群媒體使用者行為分析及預測",
            exp_5_detail: "本專案目的在針對法國市場構建綠色行銷貼文的響應預測模型，以解決社群內容成效難以量化預判的痛點。結合社會科學與資料科學方法，首先透過結構化問卷蒐集在地社群使用者回饋，並運用克特量表(Likert Scale)將抽象的情感反應轉化為可量化的特徵指標；其次，導入隨機森林(Random Forest)等多種監督式機器學習演算法進行訓練與效能評估。完整建立一套能依據使用者情感分數預測貼文潛在互動率的數據模型，為品牌在制定綠色內容策略時提供具科學依據的決策參考。",
            exp_6_role: "使用AntiGravity建構個人網頁",
            exp_6_detail: `這個專案的誕生，源自於我想親自驗證一場正在發生的變革。我使用 Google 最新的 AI 開發環境 AntiGravity，從零開始打造了你現在看到的個人網站。對我來說，這不僅僅是為了建立一個存放作品集的空間，更是一場關於「Agentic Workflow（代理人工作流）的實戰實驗。我試圖去理解，當人工智慧不再只是被動的問答機器，而是能主動執行任務的代理人時，它將如何徹底改變我過去使用工具的模式，以及我解決問題的邏輯。
            
            在開發過程中，我並未將自己定位為傳統的程式開發者，而是轉身成為這名 AI 工程師的專案經理。我不需要親手敲打每一行程式碼，也不需要死記硬背繁瑣的語法，我的核心工作轉而變成了精準的指令下達與資源控管。就像在工廠管理產能一樣，我必須在 AntiGravity 有限的 Token 額度內，思考如何用最精簡的對話次數，換取最豐富的網頁功能與內容。每一次的 Prompt（提示詞），都像是一張發給產線的標準工單，指令下得越精確，產出的良率就越高，這讓我深刻體會到，在 AI 時代，「問對問題」的能力早已超越了「寫出答案」的能力。
            
            當然，過程中並非一帆風順，當排版跑掉或功能報錯時，我並沒有選擇接手重寫，而是堅持善用內建的 AI Agent 來進行除錯。我要求它不只修好錯誤，更要解釋錯誤發生的原因，讓我理解是哪一段語法邏輯產生了衝突。透過這種「指揮與反饋」的循環，我不僅成功排除了問題，更深入掌握了避免未來重複犯錯的關鍵。這段經歷讓我確信，未來的競爭力不在於誰能寫出最完美的程式碼，而在於誰能以最清晰的邏輯，指揮 AI 完成最複雜的任務。`,

            // Images Captions (ZH)
            exp_2_imgs: [
                { "src": "files/images/機器學習模型預測結果.png", "caption": "機器學習模型預測結果績效比較" },
                { "src": "files/images/W51 shap summary plot.png", "caption": "SHAP值解釋變數影響力 心臟內科" },
                { "src": "files/images/W51 因子重要性.png", "caption": "因子重要性分析 心臟內科" }
            ],

            skills_title: "專業技能",
            skills_summary: "我具備從市場洞察、資料視覺化到建構機器學習與 RAG 系統的端對端數據能力，為企業提供全方位的 AI 策略解決方案。",
            skill_1: "機器學習",
            skill_1_desc: `【緣起：數據驅動決策的啟發】
            我的機器學習之旅始於大學時期的「管理數學」課程。當時，統計機率如何能優化管理決策讓我深受啟發，也讓我決定跨出舒適圈，以商管背景選修工學院的「機器學習」課程。為了克服程式語言的門檻，我投入大量時間鑽研演算法邏輯，最終不僅克服了技術障礙，更培養出結合「商業洞察」與「數據技術」的獨特優勢。

            【實踐：從理論到落地的專案經驗】
            我深信技術必須解決實際問題。在學期間，我主動參與了多項實戰專案：

            *   預測模型開發：執行「感染性醫療廢棄物預測」專案，從資料清洗、模型訓練到部署，完整經歷了端對端的開發流程。
            *   商業應用分析：在法國雙聯碩士期間，我將焦點轉向數位行銷，利用機器學習預測社群媒體使用者行為以及分析電子商務平台消費者評論，為商業策略提供量化依據。

            【展望：準備好迎接挑戰】
            這段從台灣到法國的跨文化學習歷程，不僅磨練了我的程式撰寫能力，更讓我學會如何用數據說故事，成為技術團隊與商業決策者之間的橋樑。`,
            skill_2: "市場分析與資料視覺化",
            skill_2_desc: `在法國求學期間,我學會如何用 Python 與 TextBlob 分析 Amazon 上成千上萬條顧客評論,透過情感分析挖掘出哪些產品讓人喜愛、哪些細節引發不滿,再以 Power BI 將洞察視覺化呈現。接著在飯店訂房數據的專案中,我發現不同旅客群體有著截然不同的預訂習慣。這些經驗讓我深深著迷,原來數據背後藏著這麼多人性與行為的秘密,而我能用分析技術將它們一一揭開,轉化為有價值的市場洞察。
            
            除了學校的課程，我主動在 Udemy 修習 Power BI 專業課程，系統性地掌握了從資料串接、ETL (Extract, Transform, Load) 到高階 DAX 函數撰寫的完整技能。這段自主學習的經歷，讓我不僅能操作工具，更能理解商業智慧背後的資料架構邏輯。
            
            我擅長運用 Power BI 將分散的市場數據轉化為互動式儀表板。我重視資料的「可讀性」與「故事性」，確保報表不僅美觀，更能讓決策者在幾秒鐘內抓到重點。
            
            透過 Udemy 專業課程與實戰磨練，我具備使用Power BI建立互動式報表開發能力：
            1.  資料工程：熟練 Power Query (ETL) 與多來源資料整併。
            2.  進階分析：運用 DAX 函數建立客製化商業指標。
            3.  視覺敘事：擅長設計以使用者為核心的互動式儀表板。`,
            skill_3: "建構RAG檢索增強系統",
            skill_3_desc: "正在更新中...",
            skill_4: "AI開源平台應用",
            skill_4_desc: "正在更新中...",

            hint_text: "(點擊查看更多資訊)",

            contact_title: "聯絡我",
            contact_btn: "Email",

            about_btn: "關於我",
            about_desc: `您好，我是蘇子恆。
            
            我的個性沉穩內斂，習慣對感興趣的事物進行深度思考，並以結構化的方式釐清問題本質；同時也樂於跨出舒適圈，主動探索未知與新方法。
            
            【跨領域的學術背景】
            在台灣取得運籌管理學士學位後，我選擇跨入金融研究所，期望從供應鏈的實務運作延伸至資本市場的價值評估；隨後為了拓展對市場端的理解，我毅然前往法國攻讀數位行銷管理。
            這一連串選擇源於我對商業全貌的好奇。我希望結合運籌的流程思維、金融的嚴謹邏輯與行銷的市場洞察，成為能用數據說話、協助企業做出精準決策的複合型人才。
            
            【熱愛挑戰的生活態度】
            求學之餘，我是一名熱愛獨旅的人。利用學校假期，我獨自遊歷法國各地；從行程規劃到應對突發狀況，獨旅不只滿足好奇心，也磨練了我獨立解決問題與快速適應的能力。我相信，無論面對陌生城市或複雜的數據專案，只要保持開放並持續學習，就能找到更好的解法。`,

            cert_title: "證照與能力證明",

            cert_subtitle_prof: "專業證照",
            cert_1_name: "生產管理證照",
            cert_1_detail: "中國工業工程學會（CIIE），2022年7月",
            cert_2_name: "ESG 素養證書（專業級與進階級）",
            cert_2_detail: "IPOE，2023年12月",
            cert_3_name: "淨零碳規劃管理師證照-初級",
            cert_3_detail: "經濟部產業發展署(IPAS)，2024年12月",
            cert_4_name: "AI 應用規劃管理師證照-初級",
            cert_4_detail: "經濟部產業發展署(IPAS)，2025年5月",
            cert_google_name: "Google AI-Powered Performance Ads Certification",
            cert_google_detail: "Google，2025年8月",
            cert_hubspot_name: "Social Media Certified",
            cert_hubspot_detail: "HubSpot Academy，2025年8月",

            cert_subtitle_lang: "語言能力",
            cert_5_name: "TOEIC多益",
            cert_5_detail: "810分 2024年12月",

            cert_subtitle_course: "進修課程",
            cert_6_name: "Udemy Power BI Certificate Prep Course",
            cert_6_detail: "2026年1月",

            view_cert_btn: "查看證書",

            resume_btn: "下載履歷",

            intern_title: "實習經驗",
            intern_1_title: "Golden Corporation Sdn Bhd｜廠務實習生",
            intern_1_time: "2023年7月 - 2023年8月",

            intern1role: "Golden Corporation Sdn Bhd｜廠務實習生",
            intern1detail: `大三升大四那年暑假，為了踏出舒適圈，我選擇去到了汶萊實習。我本來就喜歡勇於嘗試，也喜歡走出跟別人不一樣的人生路線。同時我也想踏出課本，親眼看看所學和實際運作之間，到底差了哪些細節。
            
            我的實習期間是 2023/7/1 到 2023/8/31，職務是廠務實習生，實習地點在汶萊的 Golden Corporation Sdn Bhd。
            這份實習的設計不是把我固定在單一職位，而是讓我輪調於各個工作站，包含倉儲、生產線、品管實驗室、養蝦場、物流區。當走過這些站點，我才明白一間工廠不是由某個部門單獨撐起來的，它更像是一張彼此牽動的網。
            
            【倉儲 Warehousing】
            倉儲像是起點，我開始在意物料怎麼被放好，怎麼被找到，怎麼被對上後續需求。那是一種很樸素的秩序感，卻也是最容易被忽略的基本功，因為只要起點亂了，後面的每一步都要花更多力氣把它拉回來。
            
            【生產線 Production Line】
            生產線像是節奏本身，我看見標準化如何讓每一天的產出變得更一致，也看見現場如何用經驗去補齊那些標準沒寫到的角落。那一刻才理解，流程不是寫在紙上就會自己運轉，它要靠人去守，靠人去接，靠人把每一次交接都做得更清楚。
            
            【品管實驗室 QC Lab】
            走進品管實驗室時，感受又不一樣。在那裡，品質是一種必須被記錄、被判定、也必須被溝通的語言。我開始明白，現場和實驗室講的其實是同一件事，只是各自站在不同的位置，用不同的方式讓事情走向更穩的方向。
            
            【養蝦場與物流區 Farms & Logistics】
            養蝦場讓我看見更前段的現實，很多事情不是按下按鈕就會照理想發生。物流區則像是把所有努力收束成一次交付，出得去，交得穩，才算把責任完成。輪調結束後，我反而更能理解工廠之所以能運作，是因為每個部門願意在自己的位置上，把資訊交代清楚，把責任接住。
            
            【總結 Summary】
            這次實習很難量化，因為它更像一次把自己丟進系統裡的學習。我帶走的不是漂亮的數字，而是一種看事情的方式，從單點的工作走向整條流程的理解，從個人任務走向跨部門協作的節奏。
            也因為這趟經驗，我更確定自己所嚮往的，是不把人生鎖在安全範圍裡。我追求的不是與眾不同本身，而是願意把自己放進真實世界，走進陌生的領域，承認落差存在，並用更謙卑、更踏實的方式，把需要的專業一點一滴補齊。`,

            intern_1_imgs: [
                { "src": "files/images/golden1.JPG", "caption": "與老闆的合照~" },
                { "src": "files/images/golden2.JPG", "caption": "與員工的合照~" },
                { "src": "files/images/golden3.JPG", "caption": "在品管站體驗的我~" }
            ],

            skill_2_imgs: [
                { "src": "files/images/churned rate dashboard1.png", "caption": "使用Power BI建立的客戶流失率分析儀表板" },
                { "src": "files/images/churned rate dashboard2.png", "caption": "使用Power BI key influencer分析哪個因素影響最大" },
                { "src": "files/images/amazon dashboard.png", "caption": "使用Power BI建立Amazon評論分析儀表板" }
            ]
        },

        en: {
            name: "Tzu-Heng Su",
            intro: "Bridging Data Logic & Business Intuition | Transforming Market Noise into Profitable Guidance",

            // Nav
            nav_home: "Home",
            nav_edu: "Education",
            nav_exp: "Projects",
            nav_intern: "Internship",
            nav_skills: "Skills",
            nav_cert: "Certificates",
            nav_contact: "Contact",

            edu_title: "Education",
            edu_1_school: "National Kaohsiung University of Science and Technology",
            edu_1_major: "B.S. in Logistics Management",
            edu_1_time: "2020 - 2023",
            edu_2_school: "National Kaohsiung University of Science and Technology",
            edu_2_major: "M.S. in Finance",
            edu_2_time: "2023 - 2025",
            edu_3_school: "Rennes School of Business",
            edu_3_major: "MSc in Digital Marketing Management",
            edu_3_time: "2025 - 2026",

            exp_title: "Project Experience",
            exp_1_time: "Jan 2023 – Dec 2023",
            exp_2_time: "Sep 2024 – Jul 2025",
            exp_3_time: "Sep 2025 – Oct 2025",
            exp_4_time: "Sep 2025 – Dec 2025",
            exp_5_time: "Dec 2025 – Present",
            exp_6_time: "Jan 2026 – Present",
            exp_1_role: "Cijin Ferry Biofuel Pricing Strategy Research",
            exp_1_detail: "This project aimed to integrate the Theory of Planned Behavior (TPB) and Value-Belief-Norm Theory (VBN) to explore consumers' willingness to pay (WTP) for green products and CSR. The method employed the Contingent Valuation Method (CVM) for questionnaire design and used the Tobit model to correct data bias for precise estimation. The results confirmed that psychological factors and specific demographic characteristics (e.g., age, occupation) significantly affect WTP. It is suggested that enterprises and governments should target high-WTP groups to formulate differentiated pricing and marketing strategies, effectively transforming environmental value into market benefits.<br><br><a href=\"files/旗津渡輪生質能源票價研究.pdf\" target=\"_blank\" class=\"dashboard-btn\">View My Work</a>",
            exp_2_role: "Infectious Medical Waste Generation Prediction",
            exp_2_detail: "This project aimed to solve medical waste management challenges by establishing department-level infectious waste prediction models specifically for Cardiology and Obstetrics & Gynecology, overcoming the limitations of traditional hospital-wide models that ignore departmental differences. The method used three patient structural indicators, compared six machine learning algorithms, and used SHAP to explain variable influence. The results showed that Support Vector Regression (SVR) performed best, and Case Mix Index (CMI) was the most critical factor affecting infectious waste generation in each department, reflecting a high correlation between disease complexity and waste volume. It is suggested that hospitals abandon the one-size-fits-all management model in favor of departmental differentiation strategies, establish waste warning mechanisms for high-CMI cases to allow logistics units to schedule resources in advance, integrate waste management into clinical pathways, and implement customized medical classification training based on departmental characteristics to achieve precise reduction and sustainable governance.",
            exp_3_role: "Dockmate France Digital Marketing Strategy Planning",
            exp_3_detail: "This project aimed to formulate a comprehensive European market marketing strategy for the yacht remote control brand Dockmate, enhancing brand awareness and loyalty among high-net-worth clients. The execution strategy covered the Full-Funnel path: first, using emotional appeals of 'Fear and Peace of Mind' to resonate, and introducing e-books and webinars to acquire leads; second, using Google Ads (40% of budget) for precise keyword layout, excluding invalid traffic and targeting specific boat types; on the social front, combining million-follower influencers like Alex Jimenez and LinkedIn B2B native ads to expand volume. The result was not only a precise customer acquisition model integrating Google Ads, social media, and CRM automation, but also the innovative design of the 'Captains Circle' gamified loyalty program, effectively strengthening retention and word-of-mouth recommendations through tiered reward mechanisms.<br><br><a href=\"files/DockMate數位行銷策略規劃.pdf\" target=\"_blank\" class=\"dashboard-btn\">View My Work</a>",
            exp_4_role: "E-commerce Customer Churn Analysis & Insights",
            exp_4_detail: "This project integrated Python and Microsoft Power BI technologies to process primitive data, visualize it, and perform algorithmic analysis, deeply analyzing the key drivers behind a high 27.49% churn rate on an e-commerce platform. Analysis showed that 'total purchases under 3 times' was the primary churn warning signal, with a churn risk 1.68 times that of other groups; meanwhile, short average conversation time (<8.3 minutes) and low Customer Lifetime Value (<322) were also important predictive indicators. Based on these findings, it is suggested to establish a 7-14 day 'golden period' remarketing mechanism for customers with few purchases, designing exclusive Landing Pages and personalized EDMs, while synchronously optimizing customer service experience to improve customer stickiness and retention from the source.<br><br><a href=\"files/顧客流失分析.pdf\" target=\"_blank\" class=\"dashboard-btn\">View My Work</a>",
            exp_5_role: "Social Media User Behavior Analysis & Prediction",
            exp_5_detail: "This project aimed to build a response prediction model for green marketing posts in the French market, solving the pain point of difficulty in quantifying and predicting social content performance. Combining social science and data science methods, local social user feedback was first collected through structured questionnaires, utilizing the Likert Scale to convert abstract emotional responses into quantifiable feature indicators; secondly, Random Forest and other supervised machine learning algorithms were introduced for training and performance evaluation. A data model capable of predicting potential post interaction rates based on user sentiment scores was fully established, providing scientific decision-making reference for brands when formulating green content strategies.",
            exp_6_role: "Personal Website Construction with AntiGravity",
            exp_6_detail: `The birth of this project stems from my desire to personally verify a revolution that is taking place. I used Google's latest AI development environment, AntiGravity, to build the personal website you see now from scratch. For me, this is not just to build a space to store my portfolio, but a practical experiment on "Agentic Workflow". I tried to understand how AI, when it is no longer just a passive Q&A machine but an agent that can actively perform tasks, will completely change my past patterns of using tools and my logic for solving problems.
            In the development process, I did not position myself as a traditional programmer, but turned into the project manager of this AI engineer. I didn't need to type every line of code by hand, nor did I need to memorize tedious syntax. My core work shifted to precise instruction giving and resource control. Just like managing production capacity in a factory, I had to think about how to exchange the fewest dialogue turns for the richest web functions and content within AntiGravity's limited Token quota. Every Prompt is like a standard work order issued to the production line; the more precise the instructions, the higher the yield rate. This made me deeply realize that in the AI era, the ability to "ask the right questions" has long surpassed the ability to "write the answers".
            Of course, the process was not smooth sailing. When the layout broke or functions reported errors, I did not choose to take over and rewrite it, but insisted on using the built-in AI Agent for debugging. I asked it not only to fix the error but also to explain the cause of the error, letting me understand which part of the syntax logic caused the conflict. Through this cycle of "command and feedback", I not only successfully eliminated problems but also deeply mastered the keys to avoiding future repetition of mistakes. This experience convinced me that future competitiveness lies not in who can write the most perfect code, but in who can command AI to complete the most complex tasks with the clearest logic.`,

            // Images Captions (EN)
            exp_2_imgs: [
                { "src": "files/images/機器學習模型預測結果.png", "caption": "Comparison of Machine Learning Model Prediction Performance" },
                { "src": "files/images/W51 shap summary plot.png", "caption": "SHAP Summary Plot - Cardiology" },
                { "src": "files/images/W51 因子重要性.png", "caption": "Factor Importance Analysis - Cardiology" }
            ],

            skills_title: "Skills",
            skills_summary: "Specialize in the end-to-end data analysis process, from market data collection, data cleaning, and visualization to machine learning modeling and strategic recommendations, with a specific focus on digital marketing and customer behavior analysis situations.",
            skill_1: "Machine Learning",
            skill_1_desc: `【Origin: Inspiration from Data-Driven Decision Making】
            My data science journey began with the "Management Mathematics" course in university. At that time, how statistical probability could optimize management decisions deeply inspired me, and also made me decide to step out of my comfort zone and take the "Machine Learning" course in the College of Engineering with a business management background. To overcome the threshold of programming languages, I invested a lot of time delving into algorithm logic, eventually not only overcoming technical barriers but also cultivating the unique advantage of combining "Business Insight" and "Data Technology".

            【Practice: Project Experience from Theory to Implementation】
            I firmly believe that technology must solve real problems. During my studies, I actively participated in several practical projects:

            Prediction Model Development: Executed the "Infectious Medical Waste Generation Prediction" project, experiencing the end-to-end development process from data cleaning and model training to deployment.

            Commercial Application Analysis: During my dual degree master's program in France, I shifted my focus to digital marketing, using machine learning to predict website Click-Through Rate (CTR) and social media user behavior, providing quantitative basis for business strategies.

            【Outlook: Ready for Challenges】
            This cross-cultural learning journey from Taiwan to France has not only honed my coding skills but also taught me how to tell stories with data, becoming a bridge between technical teams and business decision-makers.`,
            skill_2: "Market Analysis & Data Visualization",
            skill_2_desc: `During my studies in France, I learned how to use Python and TextBlob to analyze thousands of customer reviews on Amazon, using sentiment analysis to uncover which products people loved and which details caused dissatisfaction, then visualizing these insights with Power BI. In a hotel booking data project, I discovered that different traveler groups had vastly different booking habits. These experiences deeply fascinated me—I realized that data hides so many secrets about human nature and behavior, and I could use analytical techniques to unveil them one by one, transforming them into valuable market insights.

            In addition to academic courses, I proactively took professional Power BI courses on Udemy, systematically mastering complete skills from data connection, ETL (Extract, Transform, Load) to advanced DAX function writing. This self-learning experience allowed me not only to operate tools but also to understand the data architecture logic behind business intelligence.
            I excel at using Power BI to transform scattered market data into interactive dashboards. I value the "Readability" and "Storytelling" of data, ensuring reports are not only beautiful but also allow decision-makers to grasp key points in seconds.

            Through Udemy professional courses and practical training, I possess the ability to develop interactive reports using Power BI:
            1. Data Engineering: Proficient in Power Query (ETL) and multi-source data integration.
            2. Advanced Analysis: Using DAX functions to establish customized business metrics.
            3. Visual Storytelling: Skilled in designing user-centric interactive dashboards.`,
            skill_3: "Building RAG Systems",
            skill_3_desc: "Updating...",
            skill_4: "AI Open Source Platform Application",
            skill_4_desc: "Updating...",

            hint_text: "(Click for more info)",

            contact_title: "Contact Me",
            contact_btn: "Email",

            about_btn: "About Me",
            about_desc: `Hello, I am Tzu-Heng Su.
            My personality is defined by a balance of steady analysis and active exploration. I am accustomed to thinking deeply to clarify the essence of problems, but I am equally happy to embrace the unknown. This curiosity led me to build a diverse academic background. I started with Logistics Management in Taiwan, moved into Finance to understand capital valuation, and finally studied Digital Marketing Management in France to grasp market dynamics.

            I aspire to be a multifaceted talent who can combine process efficiency, financial logic, and consumer insights. By speaking the language of data, I hope to assist enterprises in making precise and strategic decisions.

            My adaptability extends beyond the classroom. As a solo traveler who has explored France extensively, I have learned to solve problems independently and navigate unfamiliar environments with confidence. Whether I am facing a strange city or a complex data project, I believe that staying open and continuously learning is the key to finding the best solution.`,

            cert_title: "Certificates & Proof of Ability",

            cert_subtitle_prof: "Professional Certificates",
            cert_1_name: "Production Management Certificate",
            cert_1_detail: "Chinese Institute of Industrial Engineers (CIIE), July 2022",
            cert_2_name: "ESG Literacy Certificate (Professional & Advanced)",
            cert_2_detail: "IPOE, Dec 2023",
            cert_3_name: "Net Zero Planning Manager",
            cert_3_detail: "Industrial Development Administration (IPAS), Dec 2024",
            cert_4_name: "AI Application Planning Manager",
            cert_4_detail: "Industrial Development Administration (IPAS), May 2025",
            cert_google_name: "Google AI-Powered Performance Ads Certification",
            cert_google_detail: "Google, Aug 2025",
            cert_hubspot_name: "Social Media Certified",
            cert_hubspot_detail: "HubSpot Academy, Aug 2025",

            cert_subtitle_lang: "Language Proficiency",
            cert_5_name: "TOEIC",
            cert_5_detail: "Score: 810, Dec 2024",

            cert_subtitle_course: "Courses",
            cert_6_name: "Udemy Power BI Certificate Prep Course",
            cert_6_detail: "Jan 2026",

            view_cert_btn: "View Certificate",

            resume_btn: "Download CV",

            intern_title: "Internship Experience",
            intern_1_title: "Golden Corporation Sdn Bhd | Plant Intern",
            intern_1_time: "Jul 2023 - Aug 2023",

            intern1role: "Golden Corporation Sdn Bhd | Plant Intern",
            intern1detail: `In the summer between my junior and senior years, to step out of my comfort zone, I chose to go to Brunei for an internship.
            I have always liked to try boldly and also liked to take a life path different from others.
            At the same time, I also wanted to step out of the textbooks and see with my own eyes what the difference is between what I learned and actual operations.

            My internship period was from July 1, 2023 to August 31, 2023. The position was Plant Intern, and the internship location was Golden Corporation Sdn Bhd in Brunei.
            The design of this internship was not to fix me in a single position, but to let me rotate through various workstations, including warehousing, production lines, quality control laboratories, shrimp farms, and logistics areas.
            When I walked through these stations, I realized that a factory is not supported by a certain department alone, but is more like a web that affects each other.

            Warehousing is like the starting point. I started to care about how materials are placed, how they are found, and how they match subsequent needs.
            That is a very simple sense of order, but it is also the basic skill that is most easily overlooked, because as long as the starting point is messy, every subsequent step takes more effort to pull it back.

            The production line is like the rhythm itself. I saw how standardization makes daily output more consistent, and also saw how the site uses experience to fill in the corners not written in the standards.
            At that moment, I understood that the process does not run itself just because it is written on paper. It relies on people to guard it, rely on people to pick it up, and rely on people to make every handover clearer.

            Walking into the quality control laboratory, the feeling was different again.
            There, quality is a language that must be recorded, judged, and communicated.
            I began to understand that the site and the laboratory are actually talking about the same thing, just standing in different positions and using different ways to make things go in a more stable direction.

            The shrimp farm let me see the reality at the front end. Many things do not happen ideally just by pressing a button.
            The logistics area is like gathering all efforts into one delivery. Going out and delivering steadily counts as completing the responsibility.
            After the rotation, I could understand better that the reason why the factory works is because every department is willing to explain information clearly and take responsibility in their own position.

            This internship is hard to quantify because it is more like learning to throw myself into the system.
            What I took away was not beautiful numbers, but a way of seeing things, moving from single-point work to understanding the entire process, and from personal tasks to the rhythm of cross-departmental collaboration.
            Also because of this experience, I am more certain that what I yearn for is not to lock my life in a safe range.
            What I pursue is not being different itself, but being willing to put myself into the real world, walk into unfamiliar fields, admit the existence of gaps, and use a more humble and practical way to fill up the required professionalism bit by bit.`,

            intern_1_imgs: [
                { "src": "files/images/golden1.JPG", "caption": "Photo with the Boss~" },
                { "src": "files/images/golden2.JPG", "caption": "Photo with Staff~" },
                { "src": "files/images/golden3.JPG", "caption": "Experiencing the QC Station~" }
            ],

            skill_2_imgs: [
                { "src": "files/images/churned rate dashboard1.png", "caption": "Customer Churn Rate Analysis Dashboard built with Power BI" },
                { "src": "files/images/churned rate dashboard2.png", "caption": "Using Power BI Key Influencer to analyze which factor has the greatest impact" },
                { "src": "files/images/amazon dashboard.png", "caption": "Amazon Review Analysis Dashboard built with Power BI" }
            ]
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key] != null) {
                el.textContent = translations[lang][key];
            }
        });

        // Update descriptions and image lists stored in attributes
        document.querySelectorAll('.skill-tag, .interactive-item, .about-btn').forEach(item => {
            const descKey = item.getAttribute('data-desc-key');
            if (descKey && translations[lang] && translations[lang][descKey] != null) {
                item.setAttribute('data-desc', translations[lang][descKey]);
            }
            const imagesKey = item.getAttribute('data-images-key');
            if (imagesKey && translations[lang] && translations[lang][imagesKey]) {
                item.setAttribute('data-images', JSON.stringify(translations[lang][imagesKey]));
            }
        });

        if (langBtn) {
            langBtn.textContent = lang === 'zh' ? 'EN / 中' : '中 / EN';
        }
    }

    // Modal click handler update (dynamic content)
    document.querySelectorAll('.skill-tag, .interactive-item, .about-btn').forEach(item => {
        item.addEventListener('click', () => {
            let title = item.textContent.trim();
            // Adjust title extraction for complex items
            const h3 = item.querySelector('h3');
            if (h3) title = h3.textContent.trim();
            // Special case for 'About Me' button which has no h3
            if (item.classList.contains('about-btn')) {
                title = translations[currentLang]['about_btn']; // Use translated title
            }

            const desc = item.getAttribute('data-desc') || '';

            modalTitle.textContent = title;
            modalDesc.innerHTML = desc;

            modalImagesContainer.innerHTML = '';
            const imagesData = item.getAttribute('data-images');
            if (imagesData) {
                try {
                    const images = JSON.parse(imagesData);
                    images.forEach(imgData => {
                        const imageItem = document.createElement('div');
                        imageItem.className = 'modal-image-item';

                        const img = document.createElement('img');
                        img.src = imgData.src;
                        img.alt = imgData.caption || '';

                        const caption = document.createElement('p');
                        caption.className = 'modal-image-caption';
                        caption.textContent = imgData.caption || '';

                        imageItem.appendChild(img);
                        imageItem.appendChild(caption);
                        modalImagesContainer.appendChild(imageItem);
                    });
                } catch (e) {
                    console.error('Error parsing images data:', e);
                }
            }
            modal.classList.add('active');
        });
    });

    // Hamburger Logic (Existing)
    if (hamburgerBtn && sideNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            sideNav.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !sideNav.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                sideNav.classList.remove('active');
            }
        });
    }

    // Lang Switch Logic
    updateLanguage(currentLang);
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage(currentLang);
        });
    }
});
