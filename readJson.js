var request = require('request');
var fs = require('fs');
var iconv = require('iconv');
var sleep = require('sleep');

fs.readFile('book2/index.json', function(err, data) {
    if (err) throw err;
    var list = JSON.parse(data);
    processList(list);
});

function processList(list) {
    for (var i = 0; i < list.length; i++) {
        processChapter(i+1, list[i]);
    }
}

function processChapter(i, chpt) {
    var fn = String('000'+i).slice(-3) + chpt.title + '.html';
    var url = chpt.url;

    request({url: url, encoding: null}, function(error, response, html) {
        if (error) {
            console.log('error occur in request' + url);
            return;
        }

        var ic = new iconv.Iconv('gbk', 'utf-8');
        var str = ic.convert(html).toString('utf-8');

        fs.writeFile('book2/chapter/' + fn, str, 'utf8', function(err) {
            console.log(i + ' file written success');
            sleep.sleep(20);
        })
    });
}

