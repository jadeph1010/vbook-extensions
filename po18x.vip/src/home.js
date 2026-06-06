load('config.js');
function execute() {
    return Response.success([
        { title: "Biên Tập Đề Cử (编辑推荐)", script: "https://raw.githubusercontent.com/jadeph1010/vbook-extensions/refs/heads/main/po18x.vip/plugin/src/rank.js", input: "https://po18x.vip" },
        { title: "Bảng Cất Chứa (收藏榜)", script: "https://raw.githubusercontent.com/jadeph1010/vbook-extensions/refs/heads/main/po18x.vip/plugin/src/rank.js", input: "https://po18x.vip" },
        { title: "Tổng Click (总点击)", script: "https://raw.githubusercontent.com/jadeph1010/vbook-extensions/refs/heads/main/po18x.vip/plugin/src/rank.js", input: "https://po18x.vip" },
        { title: "Tháng Click (月点击)", script: "https://raw.githubusercontent.com/jadeph1010/vbook-extensions/refs/heads/main/po18x.vip/plugin/src/rank.js", input: "https://po18x.vip" },
        { title: "Tuần Click (周点击)", script: "https://raw.githubusercontent.com/jadeph1010/vbook-extensions/refs/heads/main/po18x.vip/plugin/src/rank.js", input: "https://po18x.vip" }
    ]);
}
