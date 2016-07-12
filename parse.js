var cheerio = require('cheerio'),
    fs = require('fs'),
    list = [],
    brand = 'cw';

fs.readFile(brand + '/01.html', function(err, html) {
    var $ = cheerio.load(html),

    $('body div.contain ul.goods_list li').each(function(i, ele){
        var item = { title : "", img : "", price : "", ref_price : "", filename : "" };
        item.img = $(ele).find('div.img img').attr('src');

        item.title = $(ele).find('div.txt .tit span.imp').text();
        item.price = $(ele).find('div.txt .price span.price-span').last().text();
        item.ref_price = $(ele).find('div.txt .ops span.pri').text();
        item.filename = String('0000'+(i+1)).slice(-4) + '.jpg';

        if (item.title.length > 0) {
            list.push(item);
        }
    })

    fs.writeFile(brand + '/index.json', JSON.stringify(list, null, 4), function(err) {
        console.log('File successfully written');
    })
});
