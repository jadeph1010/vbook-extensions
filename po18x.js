function execute(url, page) {
    // 1. Khai báo thông tin extension
    if (!page) {
        return Response.success({
            name: "PO18X VIP",
            author: "VBook User",
            version: "1.0.0",
            source: "https://po18x.vip",
            type: "novel",
            locale: "zh_CN",
            description: "Nguồn đọc truyện bóc tách từ trang po18x.vip"
        });
    }

    // 2. Hàm bóc tách danh sách truyện ngoài trang chủ / tìm kiếm
    // Kiểm tra nếu đường link là lệnh tìm kiếm
    if (url.indexOf('search') !== -1 || url.indexOf('keyword') !== -1) {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let data = [];
            // Định vị danh sách kết quả dựa trên thẻ HTML của trang
            let elements = doc.select(".book-list .book-item, .library-list li"); 
            
            elements.forEach(e => {
                data.push({
                    name: e.select(".book-name, h3").text(),
                    link: e.select("a").first().attr("href"),
                    cover: e.select("img").first().attr("src"),
                    description: e.select(".book-intro, .intro").text()
                });
            });
            return Response.success(data);
        }
    }
    return Response.error("Không thể tải dữ liệu");
}

// 3. Hàm lấy thông tin chi tiết và danh sách chương của một bộ truyện
function detail(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let chapterList = [];
        
        // Cào danh sách toàn bộ các chương truyện
        let chapters = doc.select(".chapter-list a, .catalog-list a");
        chapters.forEach(c => {
            chapterList.push({
                name: c.text(),
                link: c.attr("href")
            });
        });

        return Response.success({
            name: doc.select(".book-info h1, .title").text(),
            author: doc.select(".author, .book-info .meta").text(),
            description: doc.select(".book-desc, #novel_intro").text(),
            detail: doc.select(".book-status").text(),
            volumes: [
                {
                    name: "Mục lục",
                    chapters: chapterList
                }
            ]
        });
    }
    return Response.error("Không thể tải chi tiết truyện");
}

// 4. Hàm bóc tách nội dung văn bản chữ của từng chương truyện
function chapter(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        
        // Loại bỏ các thẻ quảng cáo, kịch bản lỗi nếu có trong nội dung
        doc.select("script, style, .ads, .advertisement").remove();
        
        // Định vị thẻ chứa nội dung chữ chính của chương
        let content = doc.select(".chapter-content, #chapter-content, .content-box").html();
        
        // Định dạng xuống dòng bằng thẻ <br> chuẩn cho VBook hiển thị
        content = content.replace(/&nbsp;/g, " ").replace(/<p>/g, "").replace(/<\/p>/g, "<br><br>");
        
        return Response.success(content);
    }
    return Response.error("Không thể tải nội dung chương");
}
