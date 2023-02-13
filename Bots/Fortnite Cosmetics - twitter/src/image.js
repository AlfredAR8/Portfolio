const { loadImage, registerFont, createCanvas } = require('canvas');
const fs = require('fs');
const dropboxV2Api = require('dropbox-v2-api');
const axios = require('axios');
const Twitter = require("twitter")

var TwitterK1 = 'write your twitter consumer_key here'
var TwitterK2 = 'write your twitter consumer_secret here'
var TwitterK3 = 'write your twitter access_token_key here'
var TwitterK4 = 'write your twitter access_token_secret here'
var TOKENDropbox = "Write your dropbox token here";

const { makeCollage, makeCollage4k, log, make_rarity} = require('./utils');

module.exports = class Image {
    constructor() {}

    makeCosmetic(item) {
        return new Promise(async (done, err) => {
        try {
    //single
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');
//info cosmetic
    if (item.images.featured == null) {
        var cosmeticimage = await loadImage(item.images.icon)
    } else {
        var cosmeticimage = await loadImage(item.images.featured)
    }

    if (item.series == null) {
        if (item.rarity == null) {
            var CosmeticRarity = "common";
        } else {
            var CosmeticRarity = (item.rarity.value).replace(/ /g, '').toLowerCase();
        }
    } else {
        var CosmeticRarity = (item.series.value).replace(/ /g, '').toLowerCase();
    }

    if (item.set == null) {
        var CosmeticSet = "No";
    } else {
        var CosmeticSet = item.set.value;
    }
    
    if (item.type == null) {
        var CosmeticType = "No Type"
    } else {
        var CosmeticType = item.type.displayValue
    }

    if (item.name == null) {
        var CosmeticName = "No Name";
    } else {
        var CosmeticName = item.name;
    }

    if (item.description == null) {
        var CosmeticDescription = "No Description";
    } else {
        var CosmeticDescription = item.description.split('\r')[0];
    }

    if (item.id == null) {
        var CosmeticID = "No ID";
    } else {
        var CosmeticID = item.id;
    }

    var cosmeticSource = item.gameplayTags;
    var cosmeticVariants = item.variants;
    if (cosmeticVariants != null) {
    var cosmeticVariantsNum = item.variants.length;
    } else {
    var cosmeticVariantsNum = 0;
    }

    if (item.introduction) {
        if (item.introduction.Chapter) {
            chapter11 = "C" + item.introduction.Chapter + " "
        } else {
            chapter11 = null
        }
        if (item.introduction.season) {
            season11 = "S" + item.introduction.season
        } else {
            season11 = null
        }
    } else {
        var chapter11 = null
        var season11 = null
    }
    if (cosmeticSource != null) {
        var source = cosmeticSource.find(v => v.startsWith('Cosmetics.Source.'))

        var season1 = cosmeticSource.find(v => v.startsWith('Cosmetics.Filter.Season.'))
    } else {
        var source = null

        var season1 = null
    }

    if (season1 != null) {
    var season2 = season1.replace('Cosmetics.Filter.Season.','');
    if (season2 >= 10) {
        var chapter = "C2 "
    } else {
        var chapter = "C1 "
    }
    var season3 = season1.slice(-1);
    if (season2 == 10) {
        var season = "S10"
    } else if (season3 == 0) {
        var season = "S1"
    } else {
        var season = "S" + season3
    }
} else {
    var season = "No Introduction"
    var chapter = ""
}
//info cosmetic

    //source image
    if (source != null) {
if (source.includes("BattlePass")) {
    var sourceimage = await loadImage(`./assets/battlepass.png`)
} else if (source.includes("Challenge")){
    var sourceimage = await loadImage(`./assets/challenge.png`)
} else if (source.includes("Event")){
    var sourceimage = await loadImage(`./assets/challenge.png`)
} else if (source.includes("CrewPack")){
    var sourceimage = await loadImage(`./assets/crewpack.png`)
} else if (source.includes("FNCS")){
    var sourceimage = await loadImage(`./assets/fncs.png`)
} else if (source.includes("ItemShop")){
    var sourceimage = await loadImage(`./assets/itemshop.png`)
} else if (source.includes("RMT")){
    var sourceimage = await loadImage(`./assets/itemshop.png`)
} else if (source.includes("STWStarterPack")){
    var sourceimage = await loadImage(`./assets/itemshop.png`)
} else if (source.includes("StarterPack")){
    var sourceimage = await loadImage(`./assets/itemshop.png`)
} else if (source.includes("Twitch")){
    var sourceimage = await loadImage(`./assets/twitch.png`)
} else {
    var sourceimage = await loadImage(`./assets/novalid.png`)
}
} else {
    var sourceimage = await loadImage(`./assets/noexists.png`)
}

    //source image
    var Tags_animated = await loadImage(`./assets/Tags/animated.png`)
    var Tags_builtin = await loadImage(`./assets/Tags/builtin.png`)
    var Tags_GearUp = await loadImage(`./assets/Tags/gearup.png`)
    var Tags_gold = await loadImage(`./assets/Tags/gold.png`)
    var Tags_hasupgradequests = await loadImage(`./assets/Tags/hasupgradequests.png`)
    var Tags_hasvariants = await loadImage(`./assets/Tags/hasvariants.png`)
    var Tags_reactive = await loadImage(`./assets/Tags/reactive.png`)
    var Tags_synced = await loadImage(`./assets/Tags/synced.png`)
    var Tags_traversal = await loadImage(`./assets/Tags/traversal.png`)
    //features

    //features
    if (CosmeticRarity == null) {
        var path = await loadImage(`./assets/rarities/common.png`)
    } else {
        var path = await loadImage(`./assets/rarities/${CosmeticRarity}.png`)
    }
    ctx.drawImage(path, 0, 0, 1000, 1000);

    const line1 = await loadImage(`./assets/line1.png`)
    ctx.drawImage(line1, 0, 0, 1000, 1000);
    

var FontSize1 = 50
ctx.textAlign = "center"
ctx.fillStyle = '#FFFFFF';

    do {
        FontSize1--;
        ctx.font = FontSize1 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(CosmeticName).width > 320)
      ctx.font = FontSize1 + 'px "Franklin Gothic Heavy"';
    ctx.fillText((setMaxLength(CosmeticName, 20)), 190, 80);

    ctx.font = '25px "Franklin Gothic Heavy"'
    ctx.fillStyle = '#E8E5E5';
    ctx.fillText(CosmeticType, 190, 40);

    ctx.textAlign = "left" 
    ctx.fillStyle = '#FFFFFF';
    
    if (CosmeticDescription.split(" ").length < 14) {
        ctx.fillText((setMaxLength(CosmeticDescription, 20)), 20, 120);
    } else {
        var FontSize5 = 25
        var Description1 = Math.round((CosmeticDescription.split(" ").length/3));
        var Description2 = CosmeticDescription.split(" ").myJoin(" ",0,Description1);
        var Description3 = CosmeticDescription.split(" ").myJoin(" ",Description1+1,(Description1+Description1));
        var Description4 = CosmeticDescription.split(" ").myJoin(" ",Description1+Description1+1);
        var Descriptionfinal = Description2.concat('\n', Description3, '\n', Description4);
        do {
            FontSize5--;
            ctx.font = FontSize5 + 'px "Franklin Gothic Heavy"';
          } while (ctx.measureText(Descriptionfinal).width > 350)
          ctx.font = FontSize5 + 'px "Franklin Gothic Heavy"';
        ctx.fillText(Descriptionfinal, 20, 130);
    }

    ctx.font = '35px "Franklin Gothic Heavy"'
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText((setMaxLength("Part of the " + CosmeticSet + " Set", 15)), 35, 270);

    ctx.fillStyle = '#30CEEF';
    ctx.fillText((setMaxLength("Part of the " + CosmeticSet, 15)), 35, 270);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText((setMaxLength("Part of the ", 15)), 35, 270);

    var FontSize2 = 20
    ctx.textAlign = "center"
    do {
        FontSize2--;
        ctx.font = FontSize2 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(CosmeticID).width > 320)
      ctx.font = FontSize2 + 'px "Franklin Gothic Heavy"';
    ctx.fillText((CosmeticID), 190, 400);
    ctx.textAlign = "left"

    var invalidimage = await loadImage(`./assets/novalid.png`)

    ctx.drawImage(sourceimage, 115, 400, 150, 150);

if (cosmeticimage != null) {
    ctx.drawImage(cosmeticimage, 400, 80, 596, 596);
} else {
    ctx.drawImage(invalidimage, 400, 80, 596, 596);
}

    ctx.globalAlpha = 0.2;
    ctx.drawImage(Tags_animated, 60, 560, 47, 47);
    ctx.drawImage(Tags_builtin, 117, 560, 47, 47);
    ctx.drawImage(Tags_GearUp, 174, 560, 47, 47);
    ctx.drawImage(Tags_gold, 231, 560, 47, 47);
    ctx.drawImage(Tags_hasupgradequests, 288, 560, 47, 47);
    ctx.drawImage(Tags_hasvariants, 85, 617, 47, 47);
    ctx.drawImage(Tags_reactive, 147, 617, 47, 47);
    ctx.drawImage(Tags_synced, 204, 617, 47, 47);
    ctx.drawImage(Tags_traversal, 261, 617, 47, 47);
    ctx.globalAlpha = 1;

    //foreach
    if (cosmeticVariants != null) {
        ctx.drawImage(Tags_hasvariants, 85, 617, 47, 47);
    }
    if (cosmeticSource != null) {
    cosmeticSource.forEach(async (tag) => {
        if (tag.endsWith('.HasUpgradeQuests')) {
            ctx.drawImage(Tags_hasupgradequests, 288, 560, 47, 47);
        } else if (tag.endsWith('.BuiltInEmote')) {
            ctx.drawImage(Tags_builtin, 117, 560, 47, 47);
        } else if (tag.endsWith('.Traversal')) {
            ctx.drawImage(Tags_traversal, 261, 617, 47, 47);
        } else if (tag.endsWith('.Reactive')) {
            ctx.drawImage(Tags_reactive, 147, 617, 47, 47);
        } else if (tag.endsWith('.Animated')) {
            ctx.drawImage(Tags_animated, 60, 560, 47, 47);
        } else if (tag.endsWith('.Enlightened')) {
            ctx.drawImage(Tags_gold, 231, 560, 47, 47);
        } else if (tag.endsWith('.Synced')) {
            ctx.drawImage(Tags_synced, 204, 617, 47, 47);
        } else if (tag.endsWith('.GearUp')) {
            ctx.drawImage(Tags_GearUp, 174, 560, 47, 47);
        }
    });
}
    //foreach
if (source != null) {
    var source2 = source.replace('Cosmetics.Source.','');
var FontSize0 = 35
ctx.textAlign = "left"
ctx.fillStyle = '#95A6AA';
do {
    FontSize0--;
    ctx.font = FontSize0 + 'px "Franklin Gothic Heavy"';
  } while (ctx.measureText(source2).width > 400)
  ctx.font = FontSize0 + 'px "Franklin Gothic Heavy"';
ctx.fillText((source2), 20, 980);
} else {
    var source2 = "No Source";
var FontSize0 = 35
ctx.textAlign = "left"
ctx.fillStyle = '#95A6AA';
do {
    FontSize0--;
    ctx.font = FontSize0 + 'px "Franklin Gothic Heavy"';
  } while (ctx.measureText(source2).width > 400)
  ctx.font = FontSize0 + 'px "Franklin Gothic Heavy"';
ctx.fillText((source2), 20, 980);
}

ctx.textAlign = "right"
ctx.font = '35px "Franklin Gothic Heavy"'
ctx.fillText((chapter + season), 980, 980);

if (cosmeticVariantsNum != 0) {
ctx.fillStyle = '#E8E5E5';
ctx.font = '30px "Franklin Gothic Heavy"'
ctx.save();
ctx.translate(60, 1310);
ctx.rotate(-Math.PI/2);
ctx.textAlign = "center";
ctx.fillText("Styles Sections", 500, 0);
ctx.restore();
}

ctx.textAlign = "center"
ctx.font = '25px "Franklin Gothic Heavy"'

var FontSize9 = 25
//styles
if (cosmeticVariantsNum == 0) {
    
} else if (cosmeticVariantsNum == 1) {
        //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }
    
    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);
    
} else if (cosmeticVariantsNum == 2) {
    //1
ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
if (cosmeticVariants[0].options[1] == null) {
    ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
} else {
    ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
}

ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
do {
    FontSize9--;
    ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
  } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
  ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
ctx.fillText(cosmeticVariants[0].type, 179, 794);

//2
ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
if (cosmeticVariants[1].options[1] == null) {
    ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
} else {
    ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
}

ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
do {
    FontSize9--;
    ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
  } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
  ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
ctx.fillText(cosmeticVariants[1].type, 354, 794);

} else if (cosmeticVariantsNum == 3) {
        //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
} else if (cosmeticVariantsNum == 4) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
} else if (cosmeticVariantsNum == 5) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
} else if (cosmeticVariantsNum == 6) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
    //6
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 816, 159, 106);
    if (cosmeticVariants[5].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[0].image)), 126, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[1].image)), 126, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[5].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[5].type, 179, 910);

} else if (cosmeticVariantsNum == 7) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
    //6
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 816, 159, 106);
    if (cosmeticVariants[5].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[0].image)), 126, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[1].image)), 126, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[5].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[5].type, 179, 910);

    //7
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 816, 159, 106);
    if (cosmeticVariants[6].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[0].image)), 301, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[1].image)), 301, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[6].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[6].type, 354, 910);
    
} else if (cosmeticVariantsNum == 8) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
    //6
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 816, 159, 106);
    if (cosmeticVariants[5].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[0].image)), 126, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[1].image)), 126, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[5].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[5].type, 179, 910);

    //7
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 816, 159, 106);
    if (cosmeticVariants[6].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[0].image)), 301, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[1].image)), 301, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[6].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[6].type, 354, 910);
    
        //8
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 816, 159, 106);
    if (cosmeticVariants[7].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[0].image)), 476, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[1].image)), 476, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[7].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[7].type, 529, 910);
    
} else if (cosmeticVariantsNum == 9) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
    //6
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 816, 159, 106);
    if (cosmeticVariants[5].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[0].image)), 126, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[1].image)), 126, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[5].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[5].type, 179, 910);

    //7
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 816, 159, 106);
    if (cosmeticVariants[6].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[0].image)), 301, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[1].image)), 301, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[6].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[6].type, 354, 910);
    
        //8
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 816, 159, 106);
    if (cosmeticVariants[7].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[0].image)), 476, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[1].image)), 476, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[7].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[7].type, 529, 910);
    
        //9
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 816, 159, 106);
    if (cosmeticVariants[8].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[8].options[0].image)), 651, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[8].options[1].image)), 651, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[8].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[8].type, 704, 910);
    
} else if (cosmeticVariantsNum > 9) {
    //1
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 700, 159, 106);
    if (cosmeticVariants[0].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[0].image)), 126, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[0].options[1].image)), 126, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[0].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[0].type, 179, 794);

    //2
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 700, 159, 106);
    if (cosmeticVariants[1].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[0].image)), 301, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[1].options[1].image)), 301, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[1].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[1].type, 354, 794);
    
        //3
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 700, 159, 106);
    if (cosmeticVariants[2].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[0].image)), 476, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[2].options[1].image)), 476, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[2].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[2].type, 529, 794);
    
        //4
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 700, 159, 106);
    if (cosmeticVariants[3].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[0].image)), 651, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[3].options[1].image)), 651, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[3].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[3].type, 704, 794);
    
        //5
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 700, 159, 106);
    if (cosmeticVariants[4].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[0].image)), 826, 700, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[4].options[1].image)), 826, 700, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 766, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[4].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[4].type, 879, 794);
    
    //6
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 100, 816, 159, 106);
    if (cosmeticVariants[5].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[0].image)), 126, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[5].options[1].image)), 126, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 100, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[5].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[5].type, 179, 910);

    //7
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 275, 816, 159, 106);
    if (cosmeticVariants[6].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[0].image)), 301, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[6].options[1].image)), 301, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 275, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[6].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[6].type, 354, 910);
    
        //8
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 450, 816, 159, 106);
    if (cosmeticVariants[7].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[0].image)), 476, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[7].options[1].image)), 476, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 450, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[7].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[7].type, 529, 910);
    
        //9
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 625, 816, 159, 106);
    if (cosmeticVariants[8].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[8].options[0].image)), 651, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[8].options[1].image)), 651, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 625, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[8].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[8].type, 704, 910);
    
        //10
    ctx.drawImage((await loadImage(`./assets/mini_rarities/${CosmeticRarity}.png`)), 800, 816, 159, 106);
    if (cosmeticVariants[9].options[1] == null) {
        ctx.drawImage((await loadImage(cosmeticVariants[9].options[0].image)), 826, 816, 106, 106);
    } else {
        ctx.drawImage((await loadImage(cosmeticVariants[9].options[1].image)), 826, 816, 106, 106);
    }

    ctx.drawImage((await loadImage(`./assets/mini_rarities/box.png`)), 800, 882, 159, 40);
    do {
        FontSize9--;
        ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
      } while (ctx.measureText(cosmeticVariants[9].type).width > 155)
      ctx.font = FontSize9 + 'px "Franklin Gothic Heavy"';
    ctx.fillText(cosmeticVariants[9].type, 879, 910);
    
}

    const buf = canvas.toBuffer('image/png');
    try {
        done(buf)
    } catch (error) {
        console.log("You have the image opened, it caused an error and it was not saved")
    }
} catch (error) {    
    const canvas2 = createCanvas(1000, 1000);
    const buf2 = canvas2.toBuffer('image/png');
    done(buf2)
    console.log("Error Creating Cosmetic")   
}
})
}

    makeCosmeticsCollage(data) {
        return new Promise(async (res, rej) => {
            let cosmetics = data;
                    this.sorter(cosmetics)
                    var buf = await makeCollage(cosmetics)
                    var buf2 = await makeCollage4k(cosmetics)
                    fs.writeFileSync(`./out/cosmeticsimage.png`, buf2)
                    var VersionUpdate = (await axios.get('https://fortnite-api.com/v2/cosmetics/br/new')).data.data.build.split("-")[1];
                    var upload = DropboxUpload("./out/cosmeticsimage.png", VersionUpdate)
                    console.log(upload)
                    const client = new Twitter({
                        consumer_key: TwitterK1,
                        consumer_secret: TwitterK2,
                        access_token_key: TwitterK3,
                        access_token_secret: TwitterK4
                      })
                      client.post("media/upload", {media: buf}, function(error, media, response) {
                        const status = {
                          status: (`Unreleased Cosmetics for the ${VersionUpdate} update!

📱#Fortnite | 🔗${upload}`),
                          media_ids: media.media_id_string }
                      
                        client.post("statuses/update", status, function(error, tweet, response) {
                          if (error) {
                            console.log(error)
                          } else {
                            console.log("Successfully tweeted an image!")
                          }
                        })
                      });
                    log('Collage Manager', 'Saved all collages', true)
                    res()
                });
    }

    sorter(data) {
        data.sort(function(n,a){var r=n.name,e=a.name;return r<e?-1:e<r?1:0})
        data.sort(function(n,a){var r=n.rarity,e=a.rarity;return r<e?1:e<r?-1:0})
        data.sort(function(n,a){var r=make_rarity(n.rarity),e=make_rarity(a.rarity);return r<e?1:e<r?-1:0})
        data.sort(function(n,a){var r=n.type,e=a.type;return r<e?-1:e<r?1:0})
    }
}

function setMaxLength(input, len) {
    let i = 0;
    return input.split(' ').reduce((acc, val) => {
      i += val.length;
      return acc + (i > len ? (i = val.length, '\n' + val) : ' ' + val);
    })
  }

  Array.prototype.myJoin = function(seperator,start,end){
    if(!start) start = 0;
    if(!end) end = this.length - 1;
    end++;
    return this.slice(start,end).join(seperator);
};

function DropboxUpload(Path, Version) {
    var TOKEN = TOKENDropbox;
    const dropbox = dropboxV2Api.authenticate({
        token: TOKEN
    });
    
    dropbox({
        resource: 'files/upload',
        parameters: {
            path: `/Fortnite Unreleased Cosmetics/V${Version}.png`
        },
        readStream: fs.createReadStream(Path)
    }, (err, result, response) => {
        //upload completed
    });
    return (`https://www.dropbox.com/sh/fh59hf6pgdcqnfa/AAC3v-97NrDMTLWSc4ny5cIOa?dl=0&preview=V${Version}.png`)
  }