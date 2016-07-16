var cheerio = require('cheerio'),
    fs = require('fs'),
    async = require('async'),
    sleep = require('sleep'),
    brands = [
                {name: 'cw', supId: 10, count: 72},
                {name: 'coles', supId: 22, count: 11},
                {name: 'wt', supId: 17, count: 3},
                {name: 'priceline', supId: 25, count: 3},
                {name: 'aldi', supId: 14, count: 3},
                {name: 'woolies', supId: 23, count: 1},
                {name: 'myer', supId: 24, count: 1}
            ];

async.eachSeries(brands, function(brand, brand_callback) {

    var htmlParserWrapper = function (hid, callback) {
        var p = String('0000'+(hid+1)).slice(-4),
            fn = 'content/html/' + brand.name + p + '.htm',
            list = [];

        fs.readFile(fn, function(err, html) {
            var $ = cheerio.load(html);

            $('body div.contain ul.goods_list li').each(function(i, ele){
                var item = { title : "", img : "", price : "", ref_price : "", filename : "" };
                item.img = $(ele).find('div.img img').attr('src');

                item.title = $(ele).find('div.txt .tit span.imp').text();
                item.price = $(ele).find('div.txt .price span.price-span').last().text();
                item.ref_price = $(ele).find('div.txt .ops span.pri').text();
                item.filename = brand.name + String('0000'+(hid*20+i+1)).slice(-4) + '.jpg';

                if (item.title.length > 0) {
                    list.push(item);
                }
            });

            callback(null, list);
        });
    };

    async.timesSeries(brand.count, function (n, next) {
        htmlParserWrapper(n, function (err, i_list) {
            next(err, i_list);
        });
    }, function (err, lists) {
        console.log(brand.name + ' has all parsed for ' + brand.count + ' htms');

        var merged = [].concat.apply([], lists);
        fs.writeFile('content/json/' + brand.name + '.json', JSON.stringify(merged, null, 4), function(err) {
            console.log('File ' + brand.name + '.json' + ' successfully written');
            sleep.sleep(1);
            console.log('switching to next brand');
            brand_callback();
        });
    });

}, function (err) {
    if (err) {
        console.log(err.message);
    }
});
