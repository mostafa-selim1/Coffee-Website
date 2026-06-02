document.addEventListener("DOMContentLoaded", () => {
    // تشغيل الفلترة المبدئية على الكافيه
    filterProductsReal("coffee");

    // =====================================================
    // 1. تنقل القائمة الجانبية (Sidebar) والتبويبات الفوقية
    // =====================================================
    const sidebarItems = document.querySelectorAll(".sidebar .nav-item");
    const tabButtons = document.querySelectorAll(".tab-btn");

    // السايد بار الجانبي
    sidebarItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault(); 
            sidebarItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const itemText = item.textContent.trim().toLowerCase();
            if (itemText.includes("home") || itemText.includes("menu")) {
                setActiveTab("Coffee");
                filterProductsReal("coffee");
            }
        });
    });

    // التبويبات الفوقية (Coffee, Snack, Dessert)
    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            tabButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            const category = button.textContent.trim().toLowerCase();

            const menuTitle = document.querySelector(".menu-title");
            if (menuTitle) {
                menuTitle.textContent = button.textContent + " Menu";
            }

            filterProductsReal(category);
        });
    });

    // دالة تنشيط التبويب الفوقي
    function setActiveTab(tabName) {
        const tabButtons = document.querySelectorAll(".tab-btn");
        
        tabButtons.forEach(btn => {
            if (btn.textContent.trim().toLowerCase() === tabName.toLowerCase()) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        
        const menuTitle = document.querySelector(".menu-title");
        if (menuTitle) {
            const formattedTitle = tabName.charAt(0).toUpperCase() + tabName.slice(1).toLowerCase();
            menuTitle.textContent = `${formattedTitle} Menu`;
        }
    }

    // دالة الفلترة القاطعة
    function filterProductsReal(Category) {
        const cards = document.querySelectorAll(".product-card");
        if (cards.length === 0) return;

        const targetCategory = Category.trim().toLowerCase();
        let foundMatch = false;

        cards.forEach(card => {
            const cardCategory = card.getAttribute("data-category")?.toLowerCase().trim() || "";
            if (targetCategory === "all" || cardCategory === targetCategory) {
                card.style.display = "flex";  
                card.style.animation = "fadeIn 0.3s ease"; 
                foundMatch = true;
            } else {
                card.style.display = "none";  
            }
        });

        if (!foundMatch && (targetCategory === "coffee" || targetCategory === "all")) {
            console.warn("إجراء أمان: لم يتم العثور على كروت مطابقة، تم إظهار الكروت المتاحة.");
            cards.forEach(card => {
                card.style.display = "flex";
            });
        }
    }

    // =====================================================
    // 2. نظام السلة التفاعلي (الـ Cart)
    // =====================================================
    
    // إذا كنت تريد بدء الصفحة وبها عناصر افتراضية في السلة:
    let cart = [
        // { id: 1, name: "Macchiato", size: "Small", price: 80, qty: 1, icon: "☕" },
        // { id: 3, name: "Iced Chocolate", size: "Large", price: 150, qty: 1, icon: "🧋" }
    ];

    const productPrices = {
        "Macchiato": { Small: 80, Medium: 110, Large: 140 },
        "Cappuccino": { Small: 85, Medium: 115, Large: 145 },
        "Iced Chocolate": { Small: 90, Medium: 120, Large: 150 },
        "Espresso": { Small: 60, Medium: 80, Large: 100 },
        "Hot Mocha": { Small: 95, Medium: 125, Large: 155 },
        "Iced Latte": { Small: 85, Medium: 115, Large: 145 },
        "Croissant": { Regular: 50 },
        "Club Sandwich": { Regular: 120 },
        "Cheesecake": { Regular: 90 },
        "Chocolate Cake": { Regular: 85 }
    };

    const productIcons = {
        "Macchiato": "☕", "Cappuccino": "☕", "Iced Chocolate": "🧋",
        "Espresso": "☕", "Hot Mocha": "☕", "Iced Latte": "🧋",
        "Croissant": "🥐", "Club Sandwich": "🥪", "Cheesecake": "🍰", "Chocolate Cake": "🍫"
    };

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const minusBtn = card.querySelector(".qty-selector button:first-of-type");
        const plusBtn = card.querySelector(".qty-selector button:last-of-type");
        const qtySpan = card.querySelector(".qty-selector span");
        const sizeBtns = card.querySelectorAll(".size-btn");
        const addToCartBtn = card.querySelector(".add-to-cart-btn");
        const productName = card.querySelector(".product-text h3")?.textContent.trim();

        if(!productName) return;

        if(plusBtn) {
            plusBtn.addEventListener("click", () => {
                qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
            });
        }

        if(minusBtn) {
            minusBtn.addEventListener("click", () => {
                let currentQty = parseInt(qtySpan.textContent);
                if (currentQty > 1) qtySpan.textContent = currentQty - 1;
            });
        }

        sizeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                sizeBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        });

        if(addToCartBtn) {
            addToCartBtn.addEventListener("click", () => {
                const activeSizeBtn = card.querySelector(".size-btn.active");
                const selectedSize = activeSizeBtn ? activeSizeBtn.textContent.trim() : "Small";
                const selectedQty = parseInt(qtySpan.textContent) || 1;
                const basePrice = productPrices[productName]?.[selectedSize] || 80;
                const icon = productIcons[productName] || "☕";

                const existingItem = cart.find(item => item.name === productName && item.size === selectedSize);

                if (existingItem) {
                    existingItem.qty += selectedQty;
                } else {
                    cart.push({
                        id: Date.now(),
                        name: productName,
                        size: selectedSize,
                        price: basePrice,
                        qty: selectedQty,
                        icon: icon
                    });
                }
                qtySpan.textContent = 1;
                renderCart();
            });
        }
    });

    const cartItemsContainer = document.querySelector(".cart-items-list");

    function renderCart() {
        if(!cartItemsContainer) return;
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-light); font-size:13px;">Your cart is empty</div>`;
            calculateInvoice();
            return;
        }

        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-details">
                        <div class="item-icon">${item.icon}</div>
                        <div class="item-meta">
                            <span class="size-label">${item.size}</span>
                            <h5>${item.name}</h5>
                            <span class="price-label">${item.price * item.qty} EGP</span>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="remove-btn" onclick="window.deleteCartItem(${item.id})">×</button>
                        <div class="mini-qty">
                            <button onclick="window.changeQty(${item.id}, -1)">-</button> 
                            <span>${item.qty}</span> 
                            <button onclick="window.changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
        });

        calculateInvoice();
    }

    window.changeQty = (id, change) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            renderCart();
        }
    };

    window.deleteCartItem = (id) => {
        cart = cart.filter(i => i.id !== id);
        renderCart();
    };

    function calculateInvoice() {
        const invoiceRows = document.querySelectorAll(".invoice-row");
        if(invoiceRows.length === 0) return;

        let subtotal = 0;
        cart.forEach(item => { subtotal += item.price * item.qty; });

        const subtotalSpan = invoiceRows[0].querySelector(".font-bold");
        const shippingSpan = invoiceRows[1].querySelector(".font-bold");
        const taxSpan = invoiceRows[2].querySelector(".font-bold");
        const totalSpan = document.querySelector(".total-row span:last-child");

        const shippingFees = parseFloat(shippingSpan.textContent.replace(" EGP", "")) || 0;
        const tax = subtotal * 0.15; 
        const total = subtotal + shippingFees + tax;

        if(subtotalSpan) subtotalSpan.textContent = `${subtotal.toFixed(1)} EGP`;
        if(taxSpan) taxSpan.textContent = `${tax.toFixed(1)} EGP`;
        if(totalSpan) totalSpan.textContent = `${total.toFixed(1)} EGP`;
    }

    const typeButtons = document.querySelectorAll(".type-btn");
    typeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            typeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const shippingSpan = document.querySelectorAll(".invoice-row")[1]?.querySelector(".font-bold");
            if(shippingSpan) {
                if (btn.textContent.trim().toLowerCase() === "delivery") {
                    shippingSpan.textContent = "15.00 EGP";
                } else {
                    shippingSpan.textContent = "0.00 EGP";
                }
                calculateInvoice();
            }
        });
    });

    // تشغيل مبدئي لعرض عناصر السلة
    renderCart();
});

// منع السلوك الافتراضي للروابط الفارغة
document.addEventListener("click", function(e){
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (href === "#" || href === "") {
        e.preventDefault();
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