
document.addEventListener('DOMContentLoaded', function() {


    // Bước 12: Lấy phần tử nút "Thêm sản phẩm" và Form 
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');

    // Bước 13: Gắn sự kiện 'click' cho nút "Thêm sản phẩm" 
    addProductBtn.addEventListener('click', function() {
        
        // Bước 13 (Cách 1): Sử dụng classList.toggle 
        // Thêm hoặc xóa class 'hidden' (đã định nghĩa trong CSS)
        // để ẩn hoặc hiện form
        addProductForm.classList.toggle('hidden');
    });



    // Bước 7: Lấy các phần tử liên quan đến tìm kiếm 
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    // Bước 8: Gắn sự kiện 'click' cho nút "Tìm" 
    searchBtn.addEventListener('click', filterProducts);
    
    // (Tuỳ chọn: Gắn sự kiện 'keyup' để tìm kiếm real-time khi gõ)
    // searchInput.addEventListener('keyup', filterProducts);

    // Định nghĩa hàm xử lý việc lọc sản phẩm
    function filterProducts() {
        
        // Bước 9: Lấy giá trị (từ khóa) từ ô nhập
        // Chuyển về chữ thường (lowercase) để tìm kiếm không phân biệt hoa/thường 
        const searchTerm = searchInput.value.toLowerCase();
        
        // Bước 10: Lấy tất cả các phần tử sản phẩm 
        const products = document.querySelectorAll('.product-item');

        // Bước 10: Duyệt qua từng sản phẩm (sử dụng forEach)
        products.forEach(function(product) {
            
            // Lấy tên sản phẩm (từ thẻ <h3> có class .product-name bên trong)
            // và cũng chuyển về chữ thường 
            const productName = product.querySelector('.product-name').textContent.toLowerCase();

            // Bước 10: Kiểm tra xem tên sản phẩm có chứa từ khóa tìm kiếm không
            if (productName.includes(searchTerm)) {
                // Nếu CÓ: Hiển thị sản phẩm đó 
                product.style.display = 'block'; // 'block' hoặc '' đều được
            } else {
                // Nếu KHÔNG: Ẩn sản phẩm đó đi 
                product.style.display = 'none';
            }
        });
    }
    
    // Bước 14, 15, 16: Kiểm tra (Hoàn thành khi test trên trình duyệt)
});