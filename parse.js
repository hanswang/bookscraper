var cheerio = require('cheerio');
var fs = require('fs');

fs.readFile('book2/correction.html', function(err, html) {
    var $ = cheerio.load(html);

    var list = [];

    $('ul li').each(function(i, ele){
        var chapter = { title : "", url : ""};
        var atag = $(ele).find('a');

        chapter.title = atag.text();
        //chapter.url = 'http://www.banfusheng.com' + atag.attr('href');
        chapter.url = atag.attr('href');

        list.push(chapter);
    })

    fs.writeFile('book2/index.json', JSON.stringify(list, null, 4), function(err) {
        console.log('File successfully written');
    })
});
