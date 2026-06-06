load('config.js');
function execute() {
    return Response.success([
        { title: "Đô thị (都市)", script: "gen.js", input: BASE_URL + "/sort/1-1.html" },
        { title: "Nùng tình (浓情)", script: "gen.js", input: BASE_URL + "/sort/2-1.html" },
        { title: "Ngôn tình (言情)", script: "gen.js", input: BASE_URL + "/sort/3-1.html" },
        { title: "Vườn trường (校园)", script: "gen.js", input: BASE_URL + "/sort/4-1.html" },
        { title: "Võ hiệp (武侠)", script: "gen.js", input: BASE_URL + "/sort/5-1.html" },
        { title: "Huyền huyễn (玄幻)", script: "gen.js", input: BASE_URL + "/sort/6-1.html" },
        { title: "Xuyên qua (穿越)", script: "gen.js", input: BASE_URL + "/sort/7-1.html" },
        { title: "Kinh tủng (惊悚)", script: "gen.js", input: BASE_URL + "/sort/8-1.html" },
        { title: "Huyền nghi (悬疑)", script: "gen.js", input: BASE_URL + "/sort/9-1.html" },
        { title: "Trọng sinh (重生)", script: "gen.js", input: BASE_URL + "/sort/10-1.html" },
        { title: "Lịch sử (历史)", script: "gen.js", input: BASE_URL + "/sort/11-1.html" },
        { title: "Võng du (网游)", script: "gen.js", input: BASE_URL + "/sort/12-1.html" },
        { title: "Viễn tưởng (科幻)", script: "gen.js", input: BASE_URL + "/sort/13-1.html" },
        { title: "Đam mỹ (耽美)", script: "gen.js", input: BASE_URL + "/sort/14-1.html" },
        { title: "Cao cán (高干)", script: "gen.js", input: BASE_URL + "/sort/15-1.html" },
        { title: "Làm ruộng (种田)", script: "gen.js", input: BASE_URL + "/sort/16-1.html" },
        { title: "Bách hợp (百合)", script: "gen.js", input: BASE_URL + "/sort/17-1.html" },
        { title: "Khác (其他)", script: "gen.js", input: BASE_URL + "/sort/18-1.html" }
    ]);
}