function execute(url, page) {
    if (!page) page = '1';
    
    // Gửi yêu cầu tải trang chủ hoặc trang danh sách cập nhật mới
    let response = fetch(url);
    
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Định vị danh sách khối truyện ngoài trang chủ
        let elements = doc.select(".book-list .book-item, .library-list li, .list-body li"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, a").first();
            let linkElement = e.select("a").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                data.push({
                    name: nameElement.text().trim(),
                    link: linkElement.attr("href"),
                    cover: coverElement ? coverElement.attr("src") : "",
                    description: e.select(".book-intro, .intro, p").text().trim()
                });
            }
        });
        
        return Response.success(data);
    }
    return Response.error("Không thể tải dữ liệu trang chủ.");
}
