load('config.js'); // Nạp cấu hình headers chống chặn

function execute(url) {
    const BASE_URL = "https://po18x.vip";
    
    // Thuật toán bóc tách ID truyện tự động (nhận diện mọi dạng link số của po18x)
    let bookId = url.match(/\d+/);
    if (!bookId) return Response.error("Không tìm thấy ID truyện hợp lệ.");
    bookId = parseInt(bookId[0]);

    // Tính toán phân vùng thư mục lưu trữ file JSON trên máy chủ web
    let xid = Math.floor(bookId / 1000);
    let dataUrl = BASE_URL + '/files/' + xid + '/' + bookId + '/' + bookId + '.json';

    let response = fetch(dataUrl);
    if (response.ok) {
        let json = response.json();
        let chapters = [];

        // Duyệt danh sách chương từ file JSON trả về
        json.list.forEach(item => {
            chapters.push({
                name: item.chaptername,
                link: BASE_URL + '/b/' + bookId + '/' + item.chapterid + '.html' // Đổi thành 'link' theo chuẩn v3
            });
        });

        return Response.success(chapters);
    }

    return Response.error("Không thể tải file dữ liệu JSON mục lục.");
}
