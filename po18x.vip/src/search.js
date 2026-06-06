load("config.js");

function execute(key, page) {
    // Gửi lệnh tìm kiếm bằng phương thức GET chuẩn cấu trúc tham số của po18x.vip
    let response = fetch(BASE_URL + "/search.html", {
        method: "GET",
        queries: {
            "keyword": key
        },
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "referer": "https://po18x.vip/"
        }
    });

    if (response.ok) {
        let doc = response.html();
        let books = [];
        
        // Định vị chính xác khối chứa danh sách kết quả tìm kiếm thực tế của po18x.vip
        doc.select(".book-list .book-item, .library-list li, .list-body li, .book-box").forEach(e => {
            let nameElement = e.select(".book-name, h3, h2, a[href*=/book/]").first();
            let linkElement = e.select("a[href*=/book/]").first();
            let coverElement = e.select("img").first();
            
            if (nameElement && linkElement) {
                let link = linkElement.attr("href");
                let cover = coverElement ? coverElement.attr("src") : "";
                
                // Chuẩn hóa ảnh bìa tuyệt đối
                if (cover && cover.indexOf("http") !== 0) {
                    cover = BASE_URL + cover;
                }

                books.push({
                    name: nameElement.text().trim(),
                    link: link.indexOf("http") === 0 ? link : BASE_URL + link,
                    cover: cover,
                    description: e.select(".book-intro, .intro, p, .review").text().trim()
                });
            }
        });

        return Response.success(books);
    }

    return null;
}
