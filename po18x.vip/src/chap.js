function execute(url) {
    // 1. Thuật toán tách các con số ID từ link wap thực tế của bạn: 
    // Ví dụ link: https://po18x.vip
    let match = url.match(/\/(\d+)\/(\d+)\/(\d+)\.html/);
    let regionId, bookId, chapId;
    
    if (match) {
        regionId = match[1]; // Số 26
        bookId = match[2];   // Số 26658
        chapId = parseInt(match[3]); // Số ID chương: 1853198
    } else {
        // Dự phòng nếu link truyền từ file toc sang là link rút gọn dạng /b/
        let altMatch = url.match(/\/b\/(\d+)\/(\d+)/);
        if (altMatch) {
            bookId = altMatch[1];
            chapId = parseInt(altMatch[2]);
            regionId = Math.floor(parseInt(bookId) / 1000); // Tự suy ra số vùng
        }
    }

    if (!bookId || !chapId) return Response.error("Đường dẫn chương truyện không hợp lệ.");

    // 2. Tính toán phân vùng thư mục lưu trữ file text tĩnh trên hệ thống máy chủ
    let xid = Math.floor(parseInt(bookId) / 1000);
    
    // Đường dẫn gọi file text tĩnh để lấy biến cctxt giải mã
    let urlData = "https://po18x.vip" + xid + "/" + bookId + "/" + chapId + ".html";

    // 3. Thực hiện fetch dữ liệu file tĩnh từ máy chủ và ép đọc theo bảng mã Trung Quốc (gbk)
    let response = fetch(urlData, {
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "referer": url
        }
    });

    if (response.ok) {
        let data = response.text("gbk"); // Ép đọc gbk cứu font chữ bị lỗi ký hiệu lạ
        
        // Chạy hàm giải mã cctxt nâng cao độc quyền của bạn
        let txt = Script.execute(data + "\nfunction getTxt() { return cctxt; }", "getTxt", "");
        
        if (txt) {
            // Định dạng dọn rác khoảng trắng và ép xuống dòng mượt mà cho VBook hiển thị
            txt = txt.replace(/&nbsp;/g, " ")
                     .replace(/<p>/g, "")
                     .replace(/<\/p>/g, "<br><br>")
                     .replace(/<br\s*\/?>/gi, "<br><br>");
                     
            return Response.success(txt);
        }
    }

    // 4. Lớp bảo vệ dự phòng: Cào trực tiếp nội dung HTML từ trang web gốc nếu file tĩnh lỗi
    let backupResponse = fetch(url, { headers: { "user-agent": "Mozilla/5.0 Mobile" } });
    if (backupResponse.ok) {
        let doc = backupResponse.html("gbk");
        doc.select("script, style, .ads, .advertisement").remove();
        let content = doc.select(".chapter-content, #chapter-content, .content-box, #content, .content").html();
        if (content) {
            content = content.replace(/&nbsp;/g, " ").replace(/<p>/g, "").replace(/<\/p>/g, "<br><br>");
            return Response.success(content);
        }
    }

    return Response.error("Không thể tải hoặc giải mã nội dung chương này.");
}
