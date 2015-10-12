var request = require('request');
var fs = require('fs');
var iconv = require('iconv');
var sleep = require('sleep');

fs.readFile('book3/index.json', function(err, data) {
    if (err) throw err;
    var list = JSON.parse(data);

    var i = 1,
        end = list.length;
    processChapter(i+1, end, list);
});

function processChapter(i, end, list) {
    if (i >= end) {
        return;
    }
    var chpt = list[i-1];
    var fn = String('000'+i).slice(-3) + chpt.title + '.html';
    var url = chpt.url;

    request({url: url, encoding: null}, function(error, response, html) {
        if (error) {
            console.log('error occur in request' + url);
            return;
        }

        var ic = new iconv.Iconv('gbk', 'utf-8');
        var str = ic.convert(html).toString('utf-8');
        //var str = html;

        fs.writeFileSync('book3/chapter/' + fn, str, 'utf8');
        fs.writeFile('book3/chapter/' + fn, str, 'utf8', function(err) {
            console.log(i + ' file saved at ' + Date());
            sleep.sleep(3);
            processChapter(i+1, end, list);
        });
    });
}

