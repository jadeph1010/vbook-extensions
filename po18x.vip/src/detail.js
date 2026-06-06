function execute(url) {
    let response = fetch(url);
    
    if (response.ok) {
        let doc = response.html();
        let chapterList = [];
        
        // Cào danh sách chương truyện từ các thẻ chứa mục lục của trang
        let chapters = doc.select(".chapter-list a, .catalog-list a, .list-charts a");
        chapters.forEach(c => {
            chapterList.push({
                name: c.text().trim(),
                link: c.attr("href")
            });
        });

        return Response.success({
            name: doc.select(".book-info h1, .title, h1").text().trim(),
            author: doc.select(".author, .book-info .meta, .book-author").text().trim(),
            description: doc.select(".book-desc, #novel_intro, .intro-content").text().trim(),
            detail: doc.select(".book-status, .status").text().trim(),
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
