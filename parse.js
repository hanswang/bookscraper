var cheerio = require('cheerio');
var fs = require('fs');

fs.readFile('book3/correction.html', function(err, html) {
    var $ = cheerio.load(html);

    var list = [];

    $('tr td.ccss').each(function(i, ele){
        var chapter = { title : "", url : ""};
        var atag = $(ele).find('a');

        chapter.title = atag.text();
        chapter.url = 'http://baishuku.com/html/29/29363/' + atag.attr('href');

        if (chapter.title.length > 0) {
            list.push(chapter);
        }
    })

    fs.writeFile('book3/index.json', JSON.stringify(list, null, 4), function(err) {
        console.log('File successfully written');
    })
});
