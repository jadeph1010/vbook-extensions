function execute(url) {
    // Đảm bảo đường link truyền vào là đường dẫn tuyệt đối
    let detailUrl = url;
    if (url.indexOf("http") !== 0) {
        detailUrl = "https://po18x.vip" + url;
    }

    let response = fetch(detailUrl);
    
    if (response.ok) {
        let doc = response.html();
        let chapterList = [];
        
        // 1. Định vị và cào danh sách chương truyện chuẩn cấu trúc po18x
        let chapters = doc.select(".chapter-list a, .catalog-list a, .list-charts a, .section-box li a, a[href*=/chapter/]");
        chapters.forEach(c => {
            let cLink = c.attr("href");
            chapterList.push({
                name: c.text().trim(),
                link: cLink.indexOf("http") === 0 ? cLink : "https://po18x.vip" + cLink
            });
        });

        // 2. Trả về dữ liệu chi tiết cho VBook hiển thị giao diện sách
        return Response.success({
            name: doc.select(".book-info h1, .title, h1, .book-title").text().trim() || "Truyện chữ PO18X",
            author: doc.select(".author, .book-info .meta, .book-author, .author-name").text().trim() || "Ẩn danh",
            description: doc.select(".book-desc, #novel_intro, .intro-content, .book-intro").text().trim() || "Chưa có giới thiệu.",
            detail: doc.select(".book-status, .status, .book-meta").text().trim(),
            volumes: [
                {
                    name: "Mục lục",
                    chapters: chapterList
                }
            ]
        });
    }
    return Response.error("Không thể tải thông tin chi tiết của bộ truyện này.");
}
