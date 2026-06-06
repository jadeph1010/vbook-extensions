function execute() {
    let response = fetch("https://po18x.vip");
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Định vị chính xác thanh menu màu nâu chữ trắng dựa trên HTML trang web
        let menuItems = doc.select(".nav a, .menu a, #nav li a");
        
        // Bảng đối chiếu tự động dịch nghĩa chữ Trung Quốc trên thanh menu
        const translation = {
            "首页": "Trang Chủ",
            "书库": "Thư Viện",
            "排行": "Xếp Hạng",
            "都市": "Đô Thị",
            "浓情": "Nùng Tình",
            "言情": "Ngôn Tình",
            "校园": "Vườn Trường",
            "武侠": "Võ Hiệp",
            "玄幻": "Huyền Huyễn",
            "穿越": "Xuyên Qua",
            "惊悚": "Kinh Tủng",
            "悬疑": "Huyền Nghi",
            "耽美": "Đam Mỹ",
            "高干": "Cán Bộ Cao Cấp",
            "种田": "Làm Ruộng",
            "百合": "Bách Hợp",
            "其他": "Mặt Khác"
        };

        menuItems.forEach(item => {
            let chineseName = item.text().trim();
            let link = item.attr("href");
            
            if (chineseName && link && chineseName !== "临时书架") { // Bỏ qua mục Tủ truyện tạm thời
                // Nếu từ nào có trong bảng dịch thì lấy tiếng Việt, không thì giữ nguyên tiếng Trung
                let vietnameseName = translation[chineseName] || chineseName;
                
                data.push({
                    title: vietnameseName,
                    input: link.indexOf("http") === 0 ? link : "https://po18x.vip" + link,
                    script: "src/home.js"
                });
            }
        });

        return Response.success(data);
    }
    return Response.error("Không thể kết nối để lấy danh mục thể loại.");
}
