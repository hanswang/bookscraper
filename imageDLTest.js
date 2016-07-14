/*

https://wallpaperscraft.com/image/moscow_city_landscape_sports_kremlin_bridge_river_58946_3840x2400.jpg

https://wallpaperscraft.com/image/verkhoturye_cross_cathedral_church_st_nicholas_architecture_dome_paintings_carvings_59063_3840x2400.jpg

https://wallpaperscraft.com/image/peterhof_fountains_park_82518_3840x2400.jpg

https://wallpaperscraft.com/image/suzdal_vladimir_region_river_stove_kremlin_tower_city_estate_boats_wooden_house_59257_3840x2400.jpg

https://wallpaperscraft.com/image/sevastopol_bridge_evening_59024_3840x2400.jpg

*/
var https = require('https'),
    fs = require('fs'),
    sleep = require('sleep'),
    async = require('async');

var imgList = [
	'https://wallpaperscraft.com/image/moscow_city_landscape_sports_kremlin_bridge_river_58946_3840x2400.jpg',
	'https://wallpaperscraft.com/image/verkhoturye_cross_cathedral_church_st_nicholas_architecture_dome_paintings_carvings_59063_3840x2400.jpg',
	'https://wallpaperscraft.com/image/peterhof_fountains_park_82518_3840x2400.jpg',
	'https://wallpaperscraft.com/image/suzdal_vladimir_region_river_stove_kremlin_tower_city_estate_boats_wooden_house_59257_3840x2400.jpg',
	'https://wallpaperscraft.com/image/sevastopol_bridge_evening_59024_3840x2400.jpg',
]

async.eachOfSeries(imgList, function(img, id, callback) {
	console.log('Downloading '+ id +' Image' + img);
	f = fs.createWriteStream('images/' + id + '.jpg');

	https.get(img, function(res) {
        console.log('ResponseCode: ' + res.statusCode);
        res.on('data', function (chunk) {
            f.write(chunk);
        });
        res.on('end', function (chunk) {
            f.end();
            console.log(id + "image saved");
            sleep.sleep(3);
            callback();
        });
    });
}, function (err) {
	if (err) {
		console.log(err.message);
	}
});