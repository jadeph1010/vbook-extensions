load('config.js');
function execute(url) {

   // Thuật toán Regex mới: Tự động bắt cụm số nằm sau chữ /book/ và dấu gạch chéo
    let match = url.match(/\/book\/(\d+)/);
    if (!match) {
        match = url.match(/\d+/); // Dự phòng quét số thô nếu link chỉ truyền ID
    }
    
    if (!match) return Response.error("Không tìm thấy ID truyện hợp lệ.");
    let bookId = parseInt(match[1] || match[0]);
    let xid = Math.floor(bookId / 1000)
    let dataUrl = BASE_URL + '/files/' + xid + '/' + bookId + '/' + bookId + '.json';

    let response = fetch(dataUrl);
    if (response.ok) {
        let json = response.json();

        let chapters = [];

        json.list.forEach(item => {
            chapters.push({
                name: item.chaptername.trim(),
                url: BASE_URL + bookId + '/' + item.chapterid + '.html',
            })
        });

        return Response.success(chapters);
    }

    return null;
}