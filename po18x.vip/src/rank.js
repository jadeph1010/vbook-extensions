load('config.js'); // Nạp cấu hình BASE_URL và headers thành công

function execute(url, page) {
    if (!page) page = '1';
    
    // Thuật toán đổi số trang dạng dấu gạch ngang chuẩn xác cho link xếp hạng (allvisit-1.html -> allvisit-2.html)
    let targetUrl = url;
    if (page !== '1') {
        if (url.indexOf('-1.html') !== -1) {
            targetUrl = url.replace(/-1\.html$/, "-" + page + ".html");
        } else if (url.indexOf('_1.html') !== -1) {
            // Dự phòng nếu có tab xếp hạng khác dùng dấu gạch dưới
            targetUrl = url.replace(/_1\.html$/, "_" + page + ".html");
        } else {
            // Dự phòng cho các link dạng khác
            targetUrl = url + "?page=" + page;
        }
    }

    let response = fetch(targetUrl);

    if (response.ok) {
        let doc = response.html();
        let novelList = [];
        
        // Quét chính xác khối chứa danh sách truyện của trang xếp hạng po18x thực tế
        let elements = doc.select(".list-body li, .common-list li, .top-list li, .rank-list li, .book-list .book-item, .library-list li, .book-box"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a[href*=/book/]").first();
            let linkElement = e.select("a[href*=/book/]").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                let cover = coverElement ? coverElement.attr("src") : "";
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

        // Thuật toán phân trang tự động: Nếu danh sách có truyện thì cho phép app cộng thêm 1 trang khi vuốt xuống
        let nextPage = novelList.length > 0 ? (parseInt(page) + 1).toString() : "";

        return Response.success(novelList, nextPage);
    }
    return Response.error("Không thể tải bảng xếp hạng.");
}
