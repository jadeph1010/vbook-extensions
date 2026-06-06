function execute(url, page) {
    if (!page) page = '1';
    
    // Tạo đường dẫn tìm kiếm chuẩn theo cấu trúc nhận diện của po18x.vip
    let searchUrl = url;
    if (url.indexOf("http") !== 0) {
        // Sử dụng cấu trúc rewrite URL chuẩn của trang web để tìm kiếm
        searchUrl = "https://po18x.vip" + encodeURIComponent(url);
    }

    let response = fetch(searchUrl);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Quét chính xác khối danh sách chứa kết quả tìm kiếm dựa trên giao diện thực tế
        let elements = doc.select(".book-list .book-item, .library-list li, .list-body li, .book-box"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a").first();
            let linkElement = e.select("a").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                data.push({
                    name: nameElement.text().trim(),
                    link: link.indexOf("http") === 0 ? link : "https://po18x.vip" + link,
                    cover: coverElement ? coverElement.attr("src") : "",
                    description: e.select(".book-intro, .intro, p, .review").text().trim()
                });
            }
        });
        
        return Response.success(data);
    }
    return Response.error("Tìm kiếm thất bại, vui lòng thử lại.");
}
