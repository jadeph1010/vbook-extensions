load('config.js'); // Nạp cấu hình BASE_URL và headers

function execute(url, page) {
    if (!page) page = '1';
    
    // Tự động xử lý phân trang nếu VBook truyền vào tham số page tiếp theo
    let targetUrl = url;
    if (page !== '1') {
        // Biến đổi link từ dạng "1-1.html" thành "1-2.html" khi lướt sang trang mới
        targetUrl = url.replace(/-1\.html$/, "-" + page + ".html");
    }

    let response = fetch(targetUrl);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Quét toàn bộ các cấu trúc danh sách truyện của po18x bao gồm cả trang chủ và trang sort
        let elements = doc.select(".book-list .book-item, .library-list li, .list-body li, .book-box, .sort-list li, .common-list li"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a[href*=/book/]").first();
            let linkElement = e.select("a[href*=/book/]").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                let cover = coverElement ? coverElement.attr("src") : "";
                
                // Chuẩn hóa link ảnh bìa tuyệt đối
                if (cover && cover.indexOf("http") !== 0) {
                    cover = BASE_URL + cover;
                }

                data.push({
                    name: nameElement.text().trim(),
                    link: link.indexOf("http") === 0 ? link : BASE_URL + link,
                    cover: cover,
                    description: e.select(".book-intro, .intro, p, .review, .intro-text").text().trim()
                });
            }
        });
        
        return Response.success(data);
    }
    return Response.error("Không thể tải danh sách truyện từ mục này.");
}
