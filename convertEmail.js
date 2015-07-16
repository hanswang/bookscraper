var fs = require('fs');
var cheerio = require('cheerio');

fs.readdir('book1/chapter/', function(err, files) {
    if (err) throw err;
    processList(files);
});

function processList(list) {
    for (var i = 0; i < 432; i++) {
        processFile(list[i]);
    }
}

function processFile(fn) {
    fs.readFile('book1/chapter/' + fn, function(err, data) {
        if (err) throw err;
        var $ = cheerio.load(data);

        var para = [];
        $('#content p').each(function(i, ele) {
            para[i] = '    ' + $(this).text();
        });

        var content = para.join("\n\r\n\r");

        var serin = fn.slice(0, 3);
        var title = fn.slice(3);

        fs.writeFile(
            'book1/chapter/packs/' + serin + '.txt',
            title + "\n\r\n\r\n\r" + content,
            function (err) {
                console.log(serin + ' done with success');
            }
        );
    });
}
