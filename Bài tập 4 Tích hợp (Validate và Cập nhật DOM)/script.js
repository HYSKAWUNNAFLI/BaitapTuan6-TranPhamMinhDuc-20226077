

document.addEventListener('DOMContentLoaded', function() {

    // --- PHẦN 1: LẤY CÁC PHẦN TỬ DOM ---
    
    // (Từ Bài 3) Lấy nút "Thêm sản phẩm" và Form
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    
    // (Từ Bài 3) Lấy các phần tử liên quan đến tìm kiếm
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    // (Bổ sung cho Bài 4) Lấy các phần tử mới 
    const cancelBtn = document.getElementById('cancelBtn'); // Nút Hủy
    const productList = document.getElementById('product-list'); // Vùng <div> chứa danh sách SP
    const errorMsg = document.getElementById('errorMsg'); // Thẻ <p> báo lỗi


    // --- PHẦN 2: LOGIC HIỂN THỊ FORM (Cập nhật từ Bài 3) ---

    // (Sửa đổi logic Bài 3)
    // Thay vì toggle, giờ đây nút này CHỈ DÙNG ĐỂ HIỆN form
    // và xóa các lỗi cũ (nếu có).
    addProductBtn.addEventListener('click', function() {
        // Luôn hiện form
        addProductForm.classList.remove('hidden');
        // Xóa thông báo lỗi cũ
        clearFormErrors();
    });

    // (Logic MỚI cho Bài 4)
    // Thêm sự kiện cho nút "Hủy"
    cancelBtn.addEventListener('click', function() {
        // Ẩn form đi
        addProductForm.classList.add('hidden');
        // Xóa trắng các ô input
        addProductForm.reset();
        // Xóa thông báo lỗi
        clearFormErrors();
    });

    // (Hàm MỚI cho Bài 4)
    // Hàm tiện ích để xóa thông báo lỗi
    function clearFormErrors() {
        errorMsg.textContent = '';
    }

    
    // --- PHẦN 3: LOGIC TÌM KIẾM (Giữ nguyên từ Bài 3) ---

    // (Code từ Bài 3) Gắn sự kiện 'click' cho nút "Tìm"
    searchBtn.addEventListener('click', filterProducts);
    
    // (Code từ Bài 3) Định nghĩa hàm xử lý việc lọc sản phẩm
    function filterProducts() {
        // Lấy từ khóa, chuyển về chữ thường
        const searchTerm = searchInput.value.toLowerCase();
        
        // Lấy tất cả các phần tử sản phẩm
        // (Quan trọng: Việc gọi querySelectorAll Ở TRONG HÀM
        // đảm bảo nó luôn tìm thấy cả các sản phẩm mới được thêm)
        const products = document.querySelectorAll('.product-item');

        // Duyệt qua từng sản phẩm
        products.forEach(function(product) {
            // Lấy tên sản phẩm từ thẻ h3 có class .product-name
            const productName = product.querySelector('.product-name').textContent.toLowerCase();

            // Kiểm tra tên sản phẩm
            if (productName.includes(searchTerm)) {
                product.style.display = 'block'; // Hiển thị nếu khớp
            } else {
                product.style.display = 'none'; // Ẩn nếu không khớp
            }
        });
    }

    // --- PHẦN 4: LOGIC THÊM SẢN PHẨM MỚI (MỚI cho Bài 4) ---

    // Gắn sự kiện 'submit' cho form
    addProductForm.addEventListener('submit', function(event) {
        
        // 1. Ngăn trang web tải lại (hành vi mặc định của form)
        event.preventDefault();

        // 2. Lấy giá trị từ các trường input (thêm .trim() để bỏ khoảng trắng)
        const name = document.getElementById('newName').value.trim();
        const price = document.getElementById('newPrice').value.trim();
        const desc = document.getElementById('newDesc').value.trim();
        let imageUrl = document.getElementById('newImage').value.trim();

        // 3. Xử lý ảnh (nếu rỗng thì dùng ảnh placeholder)
        if (imageUrl === "") {
            imageUrl = "https://via.placeholder.com/200x200.png?text=New+Book";
        }
        
        // 4. Validate (Kiểm tra) dữ liệu
        const priceNum = parseFloat(price); // Chuyển giá sang dạng Số
        
        if (name === "" || price === "") {
            errorMsg.textContent = "Lỗi: Tên sản phẩm và Giá không được để trống.";
            return; // Dừng hàm
        }
        if (isNaN(priceNum) || priceNum <= 0) {
            errorMsg.textContent = "Lỗi: Giá phải là một số lớn hơn 0.";
            return; // Dừng hàm
        }

        // Nếu dữ liệu hợp lệ, xóa lỗi
        clearFormErrors();

        // 5. Tạo phần tử sản phẩm mới (dùng Template String)
        const newItem = document.createElement('article');
        newItem.className = 'product-item'; // Gán class để nhận CSS
        newItem.innerHTML = `
            <img src="${imageUrl}" alt="Bìa sách ${name}">
            <h3 class="product-name">${name}</h3> <p>${desc || "Mô tả sản phẩm..."}</p>
            <p class="price">Giá: ${priceNum.toLocaleString('vi-VN')} VNĐ</p>
        `;
        
        // 6. Chèn sản phẩm mới vào ĐẦU danh sách
        productList.prepend(newItem);

        // 7. Reset (xóa trắng) và Ẩn form
        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });
    
}); // Kết thúc 'DOMContentLoaded'