        const images = document.querySelectorAll(".custom-card img");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightboxImg");
        const closeBtn = document.getElementById("closeLightbox");



document.getElementById("menuBtn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "menu.html";
});

        /* open */
        images.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.classList.add("show");
                lightboxImg.src = img.src;
                document.body.style.overflow = "hidden"; // يمنع الاسكرول
            });
        });

        /* close */
        function closeLightbox() {
            lightbox.classList.remove("show");
            document.body.style.overflow = "auto";
        }

        closeBtn.addEventListener("click", closeLightbox);

        /* click outside */
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        /* ESC key */
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeLightbox();
            }
        });

        document.addEventListener("click", function(e){
    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (href === "#" || href === "") {
        e.preventDefault();
    }
});
        // Initialize Animations
        AOS.init({
            duration: 800,
            once: true
        });

        // Change Navbar Background on Scroll
        window.addEventListener('scroll', function () {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                nav.style.background = '#121212';
                nav.style.padding = '10px 0';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.7)';
                nav.style.padding = '15px 0';
            }
        });

// function toggleRating(btn) {
//   // تدوير السهم
//   btn.classList.toggle('active');
  
//   // إظهار/إخفاء المحتوى الذي يلي الـ parent مباشرة أو البحث عنه
//   const card = btn.closest('.testi-card');
//   const details = card.querySelector('.rating-details');
  
//   details.classList.toggle('show');
// }
function toggleRating(btn) {
    const card = btn.closest('.testi-card');
    const details = card.querySelector('.rating-details');
    
    // قفل أي كارت تاني مفتوح (اختياري - لو عايز واحد بس اللي يفتح)
    /*
    document.querySelectorAll('.rating-details').forEach(el => {
        if (el !== details) el.classList.remove('show');
    });
    document.querySelectorAll('.toggle-btn').forEach(b => {
        if (b !== btn) b.classList.remove('active');
    });
    */

    details.classList.toggle('show');
    btn.classList.toggle('active');
}



const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-page");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    // جلب جميع روابط الناف بار
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    
    // معرفة اسم الصفحة الحالية من رابط المتصفح
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // الحصول على قيمة الـ href من الرابط
        const linkHref = link.getAttribute("href");

        // إذا كان الرابط الحالي يطابق الـ href، أضف كلاس active
        if (currentPath.includes(linkHref) && linkHref !== "#") {
            link.classList.add("active");
        } else if (currentPath.endsWith("/") && linkHref === "index.html") {
            // حالة خاصة لو الموقع مفتوح على الصفحة الرئيسية مباشرة بدون اسم الملف
            link.classList.add("active");
        }

        // تأثير إضافي عند الضغط المباشر
        link.addEventListener("click", function() {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. هنحدد مكان الحاوية اللي فيها الزرار والكلام جوة الـ Hero
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    // 2. إنشاء حاوية العدادات وضبط الـ HTML بتاعها عشان يتماشى مع الألوان الغامقة للـ Hero
    const statsContainer = document.createElement("div");
    statsContainer.className = "hero-stats-wrapper mt-5 pt-4 border-top border-secondary border-opacity-25";
    statsContainer.setAttribute("data-aos", "fade-up");
    statsContainer.setAttribute("data-aos-delay", "400");
    
    statsContainer.innerHTML = `
      <div class="row g-4">
        <div class="col-6 col-sm-3">
          <div class="stat-item">
            <h3 class="counter" data-target="1500">0</h3>
            <p>Happy Clients</p>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="stat-item">
            <h3 class="counter" data-target="120">0</h3>
            <p>Coffee Blends</p>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="stat-item">
            <h3 class="counter" data-target="50">0</h3>
            <p>Expert Baristas</p>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="stat-item">
            <h3 class="counter" data-target="4.9">0</h3>
            <p>Rating</p>
          </div>
        </div>
      </div>
    `;

    // 3. حقن العدادات في نهاية الـ hero-content (يعني تحت الزرار مباشرة)
    heroContent.appendChild(statsContainer);

    // 4. إضافة الـ CSS الخاص بالعدادات عشان تليق على الخلفية الغامقة وتطلع متناسقة
    const style = document.createElement("style");
    style.textContent = `
      .hero-stats-wrapper {
        max-width: 600px; /* عشان م تفرشش أوي وتفضل ملمومة تحت الكلام */
      }
      .stat-item h3 {
        font-size: 2rem;
        font-weight: 700;
        color: #ff9f43; /* لون برتقالي/ذهبي دافي يلوق مع زرار Explore Menu */
        margin-bottom: 2px;
        font-family: sans-serif;
      }
      .stat-item h3::after {
        content: "+";
        font-size: 1.2rem;
        margin-left: 2px;
        color: #ff9f43;
      }
      /* تخصيص التقييم عشان ميبقاش جنبه زائد */
      .hero-stats-wrapper .row > div:last-child h3::after {
        content: "/5";
        font-size: 1rem;
      }
      .stat-item p {
        color: #c7c7c7; /* لون رمادي فاتح عشان يبان على الخلفية الغامقة */
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.75rem;
        font-weight: 500;
        margin-bottom: 0;
      }
    `;
    document.head.appendChild(style);

    // 5. أنيميشن العداد الاحترافي
    const counters = statsContainer.querySelectorAll('.counter');
    const speed = 60; // سرعة العداد جوة الـ Hero (أسرع شوية عشان يظهر علطول)

    const startCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isFloat = target % 1 !== 0;
        
        const updateCount = () => {
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            if (isFloat) {
              const nextCount = count + inc;
              counter.innerText = nextCount >= target ? target : nextCount.toFixed(1);
            } else {
              counter.innerText = Math.ceil(count + inc);
            }
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    // بما إنها في الـ Hero فوق خالص، فغالباً هتشتغل علطول أول ما الصفحة تفتح
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(statsContainer);
  }
});