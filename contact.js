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