function execute() {
    return Response.success({
        // Thiết lập User-Agent giả lập trình duyệt Chrome trên điện thoại Android
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            "referer": "https://po18x.vip",
            "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7"
        },
        // Tự động vượt qua kiểm tra Cookie cơ bản nếu web thay đổi cấu trúc
        timeout: 15000 
    });
}