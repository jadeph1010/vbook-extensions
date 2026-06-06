load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let genres = [];

        // Quét danh sách thể loại truyện
        doc.select(".tag font, .book-tags a, .genres a").forEach(e => {
            genres.push({
                title: e.text().trim()
            });
        });

          // Bóc tách chính xác thẻ chứa liên kết tác giả dạng /author/...
        let authorElement = doc.select("a[href*=/author/]").first();
        let authorName = authorElement ? authorElement.text().trim() : "Ẩn danh";

        return Response.success({
            name: doc.select(".book-text h1, .book-title, h1").text().trim(),
            cover: doc.select(".book-img img, .cover img").first().attr("src"),
            host: BASE_URL,
            author: authorName, // Trả về tên tác giả chuẩn để liên kết với tính năng bấm tìm tác giả
            description: doc.select(".intro, .book-intro, #novel_intro").html(),
            detail: doc.select(".book-meta, .meta-info").text().trim(),
            // Kiểm tra trạng thái truyện (Liên tái trung = Đang tiến hành)
            ongoing: doc.text().indexOf("连载中") >= 0 || doc.select(".tag span").text().indexOf("连载中") >= 0,
            genres: genres
        });
    }
    return null;
}