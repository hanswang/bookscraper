var fs = require('fs');
var cheerio = require('cheerio');

fs.readdir('book3/chapter/', function(err, files) {
    if (err) throw err;
    processList(files);
});

function processList(list) {
    for (var i = 0; i < 609; i++) {
        processFile(list[i]);
    }
}

function processFile(fn) {
    fs.readFile('book3/chapter/' + fn, function(err, data) {
        if (err) throw err;
        var $ = cheerio.load(data);

        $('#toplink').remove();

        var para = [];
        $('#content').contents().each(function(i, ele) {
            if (ele.type == 'text') {
                para[i] = $(this).text();
            }
        });

        var content = para.join("\n\r");

        var serin = fn.slice(0, 3);
        var title = fn.slice(3);

        fs.writeFile(
            'book3/packs/' + serin + '.txt',
            title + "\n\r" + content + "\n\r\n\r\n\r",
            function (err) {
                console.log(serin + ' done with success');
            }
        );
    });
}
