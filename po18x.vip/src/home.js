function execute(url, page) {
    if (!page) page = '1';
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Cập nhật tất cả các class danh sách truyện thực tế của po18x bao gồm cả thư viện và trang chủ
        let elements = doc.select(".book-list .book-item, .library-list li, .list-body li, .book-box, .common-list li, .book-info-list li"); 
        
        elements.forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a[href*=/book/]").first();
            let linkElement = e.select("a[href*=/book/]").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                let cover = coverElement ? coverElement.attr("src") : "";
                
                // Chuẩn hóa link ảnh bìa nếu web dùng link tương đối
                if (cover && cover.indexOf("http") !== 0) {
                    cover = "https://po18x.vip" + cover;
                }

                data.push({
                    name: nameElement.text().trim(),
                    link: link.indexOf("http") === 0 ? link : "https://po18x.vip" + link,
                    cover: cover,
                    description: e.select(".book-intro, .intro, p, .review, .intro-text").text().trim()
                });
            }
        });
        
        return Response.success(data);
    }
    return Response.error("Không thể tải danh sách truyện.");
}
