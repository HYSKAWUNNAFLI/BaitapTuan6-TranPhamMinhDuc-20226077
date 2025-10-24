
document.addEventListener('DOMContentLoaded', function() {

    // --- PHẦN 1: BIẾN TOÀN CỤC VÀ LẤY PHẦN TỬ DOM ---

    /** * (Bài 5) Mảng này sẽ lưu trữ TOÀN BỘ sản phẩm.
     * Đây là "Nguồn dữ liệu duy nhất".
     */
    let allProducts = [];

    /** * (Bài 5) Dữ liệu mẫu (3 cuốn sách của bạn)
     * Dùng để khởi tạo nếu LocalStorage rỗng.
     */
    const MOCK_DATA = [
        {
            name: "Nhà Giả Kim",
            price: 79000,
            desc: "Một cuốn tiểu thuyết kinh điển về hành trình theo đuổi vận mệnh.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpVgfbLLwNtuHiPzFedHP90lcGjgwsXLPgA&s"
        },
        {
            name: "Đắc Nhân Tâm",
            price: 120000,
            desc: "Nghệ thuật ứng xử và thu phục lòng người.",
            img: "https://i1.sndcdn.com/artworks-000145256049-pvqksy-t500x500.jpg"
        },
        {
            name: "Cây Cam Ngọt Của Tôi",
            price: 88000,
            desc: "Câu chuyện cảm động về tuổi thơ và sự trưởng thành.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTraFSTtH6fLlERIeu1KeHniNxeqIdMB26bxA&s"
        }
    ];

    // (Giữ nguyên từ Bài 4) Lấy các phần tử DOM
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorMsg = document.getElementById('errorMsg');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    
    // --- PHẦN 2: CÁC HÀM XỬ LÝ DỮ LIỆU (BÀI 5 - LOCALSTORAGE) ---

    /**
     * (Bài 5) Tải sản phẩm từ LocalStorage khi trang được mở
     */
    function loadProductsFromLocalStorage() {
        // 1. Lấy chuỗi JSON từ localStorage
        const savedProductsJSON = localStorage.getItem('products');
        
        // 2. Kiểm tra xem có dữ liệu không
        if (savedProductsJSON) {
            // Nếu có, chuyển chuỗi JSON ngược lại thành mảng
            allProducts = JSON.parse(savedProductsJSON);
        } else {
            // Nếu không (lần đầu truy cập), khởi tạo bằng dữ liệu mẫu
            allProducts = MOCK_DATA;
            // (Tùy chọn) Lưu luôn dữ liệu mẫu vào LS
            saveProductsToLocalStorage();
        }
        
        // 3. Hiển thị mảng sản phẩm ra màn hình
        renderProductList(allProducts);
    }

    /**
     * (Bài 5) Vẽ lại toàn bộ danh sách sản phẩm ra DOM
     */
    function renderProductList(productsArray) {
        // Xóa sạch danh sách cũ trên HTML
        productList.innerHTML = ''; 
        
        // Lặp qua mảng và tạo element cho mỗi sản phẩm
        // (Sản phẩm trong 'allProducts' đã được xếp (unshift)
        //  để cái mới nhất ở đầu, nên ta chỉ cần lặp bình thường)
        productsArray.forEach(product => {
            const productElement = createProductElement(product);
            // Dùng appendChild để giữ đúng thứ tự (mới nhất ở đầu)
            productList.appendChild(productElement);
        });
    }

    /**
     * (Bài 5) Lưu mảng 'allProducts' hiện tại vào LocalStorage
     */
    function saveProductsToLocalStorage() {
        // Chuyển mảng object thành chuỗi JSON
        const allProductsJSON = JSON.stringify(allProducts);
        // Lưu vào localStorage với key là 'products'
        localStorage.setItem('products', allProductsJSON);
    }

    /**
     * (Bài 5) Tạo một thẻ <article> (phần tử DOM) từ một object sản phẩm
     * (Tách ra từ code Bài 4 để tái sử dụng)
     */
    function createProductElement(product) {
        // Tạo thẻ article
        const newItem = document.createElement('article');
        newItem.className = 'product-item';
        
        // Dùng ảnh placeholder nếu không có link ảnh
        const imageUrl = product.img || "https://via.placeholder.com/200x200.png?text=New+Book";
        
        // Dùng template string để tạo nội dung
        newItem.innerHTML = `
            <img src="${imageUrl}" alt="Bìa sách ${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p>${product.desc || "Mô tả sản phẩm..."}</p>
            <p class="price">Giá: ${product.price.toLocaleString('vi-VN')} VNĐ</p>
        `;
        return newItem; // Trả về phần tử DOM
    }

    // (Giữ nguyên từ Bài 4) Hàm tiện ích: Xóa thông báo lỗi
    function clearFormErrors() {
        errorMsg.textContent = '';
    }


    // --- PHẦN 3: XỬ LÝ SỰ KIỆN (BÀI 4, 5, 6) ---

    /**
     * (Cập nhật cho Bài 6) Sự kiện click nút "Thêm sản phẩm mới"
     * Thay vì dùng .hidden, ta dùng .form-open để kích hoạt transition
     */
    addProductBtn.addEventListener('click', function() {
        // Toggle (bật/tắt) class 'form-open'
        addProductForm.classList.toggle('form-open');
        
        // Nếu vừa MỞ form (tức là class 'form-open' vừa được thêm vào)
        if (addProductForm.classList.contains('form-open')) {
            clearFormErrors(); // Xóa lỗi cũ
        }
    });

    /**
     * (Cập nhật cho Bài 6) Sự kiện click nút "Hủy"
     * Luôn đóng form (xóa class 'form-open') và reset
     */
    cancelBtn.addEventListener('click', function() {
        // Đóng form (xóa class 'form-open')
        addProductForm.classList.remove('form-open');
        // Xóa trắng input
        addProductForm.reset();
        // Xóa lỗi
        clearFormErrors();
    });

    /**
     * (Cập nhật cho Bài 5) Sự kiện 'submit' form
     */
    addProductForm.addEventListener('submit', function(event) {
        // 1. Ngăn trang tải lại (Giữ nguyên)
        event.preventDefault();

        // 2. Lấy giá trị (Giữ nguyên)
        const name = document.getElementById('newName').value.trim();
        const price = document.getElementById('newPrice').value.trim();
        const desc = document.getElementById('newDesc').value.trim();
        let imageUrl = document.getElementById('newImage').value.trim();
        
        // 3. Validate (Giữ nguyên)
        const priceNum = parseFloat(price);
        if (name === "" || price === "") {
            errorMsg.textContent = "Lỗi: Tên sản phẩm và Giá không được để trống.";
            return;
        }
        if (isNaN(priceNum) || priceNum <= 0) {
            errorMsg.textContent = "Lỗi: Giá phải là một số lớn hơn 0.";
            return;
        }
        clearFormErrors();

        // 4. (Bài 5) Tạo object sản phẩm mới
        const newProduct = {
            name: name,
            price: priceNum,
            desc: desc,
            img: imageUrl // Link ảnh (có thể rỗng)
        };

        // 5. (Bài 5) Cập nhật dữ liệu
        // Thêm sản phẩm mới vào ĐẦU mảng 'allProducts'
        allProducts.unshift(newProduct);
        
        // Lưu mảng mới nhất vào LocalStorage
        saveProductsToLocalStorage(); 

        // 6. (Bài 5) Cập nhật giao diện (UI)
        // Tạo element cho sản phẩm mới
        const newElement = createProductElement(newProduct);
        // Thêm element mới vào ĐẦU danh sách (hiển thị ngay lập tức)
        productList.prepend(newElement);

        // 7. (Bài 6) Đóng form và reset
        addProductForm.reset();
        addProductForm.classList.remove('form-open'); // Đóng form (Bài 6)
    });


    /**
     * (Giữ nguyên từ Bài 4) Chức năng tìm kiếm
     * Vẫn hoạt động bình thường vì nó đọc từ DOM
     */
    searchBtn.addEventListener('click', filterProducts);
    
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Lấy TẤT CẢ sản phẩm (cả cũ và mới) đang có trên DOM
        const products = document.querySelectorAll('.product-item');

        products.forEach(function(product) {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

  
    
    // (Bài 5) Gọi hàm này để tải dữ liệu (từ LS hoặc MOCK_DATA)
    // ngay khi trang vừa mở.
    loadProductsFromLocalStorage();

}); // Kết thúc 'DOMContentLoaded'