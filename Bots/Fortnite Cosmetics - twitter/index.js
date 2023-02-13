const axios = require('axios');
const { loadImage, registerFont, createCanvas } = require('canvas');
const fs = require('fs')

const Image = require('./src/image');
const { log } = require('./src/utils');
const image = new Image();

let cosmetics = [];
var Lastversion = fs.readFileSync('version.txt', 'utf8')
console.log("Bot Started")
async function test() {
        var VersionCheck = (await axios.get('https://fortnite-api.com/v2/cosmetics/br/new')).data.data.build.split("-")[1];
        if (VersionCheck != "Lastversion") {
    let data = (await axios.get('https://fortnite-api.com/v2/cosmetics/br/new')).data.data.items;
    fs.writeFileSync("version.txt", VersionCheck);
    const canvas2 = createCanvas(1000, 1000);
    const buf2 = canvas2.toBuffer('image/png');

    for (var item of data) {
        let buf = await image.makeCosmetic(item);

        log('Images', `Maked Image of ${item.id}`);

        cosmetics.push({
            icon: buf != null ? buf : buf2,
            type: item.type != null ? item.type.value : ' ',
            rarity: item.series != null ? item.series.backendValue : item.rarity.value ?? "Common",
            name: item.name != null ? item.name : "No Name"
        });
    }

    await image.makeCosmeticsCollage(cosmetics);
}
}
test()