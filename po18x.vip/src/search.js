function execute(url, page) {
    // Tự động nhận diện nếu url truyền vào chỉ là từ khóa thô thì chuyển đổi sang link tìm kiếm của web
    let searchUrl = url;
    if (url.indexOf("http") !== 0) {
        searchUrl = "https://po18x.vip" + encodeURIComponent(url);
    }

    let response = fetch(searchUrl);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Quét các phần tử chứa danh sách kết quả sau khi tìm kiếm
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
    return Response.error("Tìm kiếm thất bại, vui lòng kiểm tra kết nối mạng.");
}
