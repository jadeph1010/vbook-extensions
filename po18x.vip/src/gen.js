load('config.js'); // Nạp cấu hình BASE_URL và headers từ file config của bạn

function execute(url, page) {
    if (!page) page = '1';
    
    // Thuật toán tự động đổi số trang chuẩn theo link dạng /sort/1-1.html thực tế của web
    let targetUrl = url;
    if (page !== '1') {
        targetUrl = url.replace(/-1\.html$/, "-" + page + ".html");
    }

    // Gửi yêu cầu kèm headers chống chặn
    let response = fetch(targetUrl);

    if (response.ok) {
        let doc = response.html();
        let novelList = [];
        
        // Quét chính xác khối chứa danh sách truyện thực tế của po18x (bao gồm cả trang sort và thư viện)
        let elements = doc.select(".book-list .book-item, .library-list li, .list-body li, .book-box, .sort-list li, .common-list li"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a[href*=/book/]").first();
            let linkElement = e.select("a[href*=/book/]").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                let cover = coverElement ? coverElement.attr("src") : "";
                
                // Chuẩn hóa link ảnh bìa tuyệt đối nếu web dùng link tương đối
                if (cover && cover.indexOf("http") !== 0) cover = BASE_URL + cover;

                novelList.push({
                    name: nameElement.text().trim(),
                    link: link.indexOf("http") === 0 ? link : BASE_URL + link,
                    cover: cover,
                    description: e.select(".book-intro, .intro, p, .review, .intro-text").text().trim(),
                    host: BASE_URL
                });
            }
        });

        // Thuật toán phân trang tự động đơn giản của VBook v3: 
        // Nếu danh sách có truyện thì cho phép app cộng thêm 1 trang khi vuốt màn hình xuống dưới cùng
        let nextPage = novelList.length > 0 ? (parseInt(page) + 1).toString() : "";

        return Response.success(novelList, nextPage);
    }
    return Response.error("Không thể tải danh sách truyện từ mục này.");
}
