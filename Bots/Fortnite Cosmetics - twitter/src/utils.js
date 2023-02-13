const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');

const { createCanvas, loadImage } = require('canvas');

module.exports = class Util {
    static log(title, message, line, debug) {
        if (debug && !process.argv.includes('--debug')) return
        let time = '[' + moment().format('hh:mm:ss.SSS') + ']'
        title = chalk.hex(text_to_hex(title.split(' ').join('_')))(' [' + title + '] ')
        let msg = time + title + message
        let out = line ? `\n${msg}\n` : msg
        console.log(out);
    }

    static ensure_path(path) {
        !fs.existsSync(path) && fs.mkdirSync(path);
    }

    static make_rarity(name) {
        if (name === 'Legendary') return 6
        if (name === 'Epic') return 4
        if (name === 'Rare') return 3
        if (name === 'Uncommon') return 2
        if (name === 'Common') return 1
        return 5
    }

    static text_to_hex(text) {
        return text_to_hex(text);
    }

    static makeCollage(data) {
        return new Promise(async (res, rej) => {
            let all = data.length;
            let c = 0;

            let cWidth = Math.ceil(Math.sqrt(all));
            let cHeight = Math.ceil(all / cWidth);

            const canvas = createCanvas(cWidth * (130 + 4), cHeight * (130 + 4));
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#292a29';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let x = 0;
            let y = 0;

            data.forEach(async (item) => {
                let pos = {
                    x,
                    y
                };
                x += 130 + 4;
                canvas.width <= x && (x = 0, y += 130 + 4);

                let image = await loadImage(item.icon);
                ctx.drawImage(image, pos.x, pos.y, 130, 130);

                c++
                c === all && res(canvas.toBuffer('image/png'));
            });
        });
    }

    static makeCollage4k(data) {
        return new Promise(async (res, rej) => {
            let all = data.length;
            let c = 0;

            let cWidth = Math.ceil(Math.sqrt(all));
            let cHeight = Math.ceil(all / cWidth);

            const canvas = createCanvas(cWidth * (1000 + 16), cHeight * (1000 + 16));
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#292a29';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let x = 0;
            let y = 0;

            data.forEach(async (item) => {
                let pos = {
                    x,
                    y
                };
                x += 1000 + 16;
                canvas.width <= x && (x = 0, y += 1000 + 16);

                let image = await loadImage(item.icon);
                ctx.drawImage(image, pos.x, pos.y, 1000, 1000);

                c++
                c === all && res(canvas.toBuffer('image/png'));
            });
        });
    }

   
    
};

function text_to_hex(str) {
    let hash = 0;
    for (var i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    let hex = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '00000'.substring(0, 6 - hex.length) + hex;
}

