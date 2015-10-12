var fs = require('fs');
var request = require('request');
var iconv = require('iconv');

url = 'http://baishuku.com/html/29/29363/';

request(url, function(error, response, html) {
    if (error) {
        console.log('error occur in request');
        return;
    }

    var ic = new iconv.Iconv('gbk', 'utf-8');
    var str = ic.convert(html).toString('utf-8');
    //var str = html;

    fs.writeFile('book3/index-src.html', str, 'utf8', function(err) {
        console.log('Source HTML file written success');
    })
});

