load('src/config.js'); // Nạp cấu hình BASE_URL và headers từ file config của bạn

function execute(url) {
    // Tự động ép mọi link phụ (như wap.) về miền gốc trong config để đồng bộ dữ liệu
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    
    let response = fetch(url, {
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "referer": "https://po18x.vip"
        }
    });

    if (response.ok) {
        let doc = response.html("gbk"); // Ép đọc gbk tránh lỗi font chữ Trung Quốc
        let genres = [];
        
        // Quét danh sách thể loại truyện bao quát mọi class của web
        doc.select(".tag font, .book-tags a, .genres a, .tag span").forEach(e => {
            let t = e.text().trim();
            if (t && t !== "连载中" && t !== "已完结") { // Lọc bỏ trạng thái ra khỏi mục thể loại
                genres.push({ title: t });
            }
        });

        // Bóc tách tên tác giả an toàn, tránh lấy nhầm số chữ/lượt đọc
        let authorElement = doc.select("a[href*=/author/], .book-text span a, .author a").first();
        let authorName = authorElement ? authorElement.text().trim() : "Ẩn danh";
        if (authorName === "Ẩn danh") {
            // Dự phòng nếu tên tác giả nằm trong thẻ text thuần
            let rawMeta = doc.select(".book-text span, .meta-info").first().text();
            let authorMatch = rawMeta.match(/作者[：:]\s*(.+)/);
            if (authorMatch) authorName = authorMatch[1].trim();
        }

        // Bóc tách tên truyện an toàn
        let titleName = doc.select(".book-text h1, .book-title, h1, .title").text().trim();
        if (!titleName) titleName = "Truyện chữ PO18X";

        // Bóc tách ảnh bìa an toàn
        let coverImg = doc.select(".book-img img, .cover img, .book-pic img").first();
        let coverUrl = coverImg ? (coverImg.attr("data-original") || coverImg.attr("src")) : "";
        if (coverUrl && coverUrl.indexOf("http") !== 0) {
            coverUrl = BASE_URL + coverUrl;
        }

        // Trả về dữ liệu chuẩn v3 không bao giờ bị dính lỗi rỗng (null exception)
        return Response.success({
            name: titleName,
            cover: coverUrl,
            host: BASE_URL,
            author: authorName,
            description: doc.select(".intro, .book-intro, #novel_intro, .description").html() || "Chưa có phần giới thiệu cốt truyện.",
            detail: doc.select(".book-meta, .meta-info, .tag").text().trim(),
            ongoing: doc.text().indexOf("连载中") >= 0 || doc.select(".tag span").text().indexOf("连载中") >= 0,
            genres: genres
        });
    }
    return Response.error("Tường lửa chặn kết nối, không thể tải chi tiết truyện.");
}
