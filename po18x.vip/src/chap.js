function execute(url) {
    let response = fetch(url);
    
    if (response.ok) {
        let doc = response.html();
        
        // Xóa bỏ tất cả các thẻ quảng cáo, kịch bản ẩn để tránh lỗi hiển thị
        doc.select("script, style, .ads, .advertisement, iframe").remove();
        
        // Chọn vùng chứa nội dung chữ chính của chương truyện
        let contentElement = doc.select(".chapter-content, #chapter-content, .content-box, #content");
        
        if (contentElement) {
            let content = contentElement.html();
            
            // Định dạng lại các khoảng trắng ẩn và ép xuống dòng chuẩn theo thẻ <br>
            content = content.replace(/&nbsp;/g, " ")
                             .replace(/<p>/g, "")
                             .replace(/<\/p>/g, "<br><br>")
                             .replace(/<div.*?>.*?<\/div>/g, ""); // Xóa các div quảng cáo xen kẽ
            
            return Response.success(content);
        }
    }
    return Response.error("Không thể tải nội dung chữ của chương này.");
}
