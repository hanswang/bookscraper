var http = require('http'),
    fs = require('fs'),
    sleep = require('sleep'),
    brand = 'cw';

fs.readFile(brand + '/index.json', function(err, data) {
    if (err) throw err;
    var list = JSON.parse(data),
        i = 0,
        end = list.length;
    processItem(i+1, end, list);
});

function processItem(i, end, list) {
    if (i > end) {
        return;
    }
    var item = list[i-1],
        fn = item.filename,
        url = item.img,
        f = fs.createWriteStream(brand + '/images/' + fn);

    http.get(url, function(res) {
        console.log('ResponseCode: ' + res.statusCode);
        res.on('data', function (chunk) {
            f.write(chunk);
        });
        res.on('end', function (chunk) {
            f.end();
            console.log(i + "image saved");
            sleep.sleep(3);
            processItem(i+1, end, list);
        });
    });
}

