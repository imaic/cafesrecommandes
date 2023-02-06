/**
 * お店の情報を入れておく配列
 * @type {Array.<Object>}
 * @property {string} name  店名
 * @property {number} position.x    お店の位置（東経）
 * @property {number} position.y    お店の位置（北緯）
 */
const shop = [
 { name: "喫茶　スズキ", position: { x: 139.816565, y: 35.717885 } },
 { name: "喫茶　津田沼", position: { x: 139.814419, y: 35.696927 } },
 { name: "マチナカコーヒー", position: { x: 140.023010, y: 35.682806 } },
 { name: "GOOD　coffee", position: { x: 140.023718, y: 35.684113 } },
 { name: "HARUKAZE　COFFEE", position: { x: 140.024030, y: 35.683442 } },
 { name: "京成珈琲", position: { x: 140.022978, y: 35.682092 } },
 { name: "珈琲の店　ブルドック", position: { x: 140.024606, y: 35.682127 } },
 { name: "カフェ　M", position: { x: 140.022182, y: 35.685886 } },
 { name: "cafe　茶ノ間", position: { x: 140.019414, y: 35.689951 } },
 { name: "津田沼　cafe", position: { x: 140.019237, y: 35.689999 } },
 { name: "cafe＆dining　きのこ", position: { x: 140.018764, y: 35.690016 } },
 { name: "小さなcafe　ベル", position: { x: 140.018882, y: 35.690595 } },
 { name: "hamburgershop", position: { x: 140.020916, y: 35.691122 } },
 { name: "coffee　shop　natural", position: { x: 140.023131, y: 35.689694 } },
 { name: "檸檬の家", position: { x: 140.023276, y: 35.690186 } },
 { name: "紅茶とシトラス", position: { x: 140.023587, y: 35.690835 } },
 { name: "チーズケーキ専門店　みるく", position: { x: 140.025030, y: 35.690656 } },
 { name: "HUNGRY　sugar"}
 { name: "オグマノ家"}
 { name: "雪の宿　ホワイト"}
 { name: "TSUDANUMA　テラス"}
 { name: "Daily　STORE"}
];

/**
 * 駅の情報を入れておく配列
 * @type {Array.<Obuject>}
 * @property {string} name  駅名
 * @property {number} position.x    駅の位置（東経）
 * @property {number} position.y    駅の位置（北緯）
 */
const station = [
// { name: "曳舟駅", position: { x: 139.816565, y: 35.717885 } },
// { name: "錦糸町駅", position: { x: 139.814419, y: 35.696927 } },
 { name: "津田沼駅", position: { x: 140.020328, y: 35.691256 } },
 { name: "新津田沼駅", position: { x: 140.023611, y: 35.690228 } },
 { name: "京成津田沼駅", position: { x: 140.024566, y: 35.683686 } },
];

/**
 * タグ一覧
 * @type {Array.<string>}
 */
const tag = [
    "暇つぶし",
    "作業（勉強）",
    "作業（パソコン）",
    "にぎやか",
    "子連れ",
    "1人でも入りやすい",
    "ランチ",
    "ディナー",
    "豆を販売している",
    "デート",
    "女子会",
    "デカフェ",
    "プリン",
    "ケーキ",
    "古民家",
    "駅チカ",
    "男性でも入りやすい",
];

/**
 * タグとお店を結びつける（連携させる）情報
 * @type {Array.<object>}
 * @property {number} tag   タグ番号
 * @property {number} shop  お店の番号
 */
const tag_shop = [
    { tag: 0, shop: 0 },
    { tag: 0, shop: 1 },
    { tag: 1, shop: 0 },
    { tag: 2, shop: 1 },
    { tag: 0, shop: 2},
    { tag: 0, shop: 8},
    { tag: 0, shop: 9},
    { tag: 0, shop: 10},
    { tag: 0, shop: 11},
    { tag: 0, shop: 13},
    { tag: 0, shop: 15},
    { tag: 1, shop: 2},
    { tag: 1, shop: 8},
    { tag: 1, shop: 9},
    { tag: 1, shop: 10},
    { tag: 1, shop: 11},
    { tag: 1, shop: 13},
    { tag: 1, shop: 15},
    { tag: 2, shop: 10},
    { tag: 2, shop: 13},
    { tag: 3, shop: 2},
    { tag: 4, shop: 2},
]

const search_inner1 = document.querySelector('#search_inner1');
let number = 0;
for( let t of tag ) {
    let span = document.createElement('span');
    span.setAttribute( 'class', 'search_ckeck');

    let cb = document.createElement('input');
    cb.setAttribute( 'type', 'checkbox' );
    cb.setAttribute( 'id', 'search' + number );
    cb.setAttribute( 'name', 'search' );
    cb.setAttribute( 'data-number', number );

    let label = document.createElement('label');
    label.setAttribute( 'for', 'search' + number );
    label.innerText = t;
    span.appendChild( cb );
    span.appendChild( label );
    search_inner1.appendChild( span );
    number += 1;
}

document.querySelector('#search_button').addEventListener( 'click', () => {
    let checked = document.querySelectorAll('#search_inner1 input[name=search]:checked');
    console.log(checked);
    let match = [];
    for( let ck of checked ) {
        for( let ts of tag_shop ) {
            if( ts.tag == ck.dataset.number ) {
                if( !match.includes( shop[ ts.shop ] ) )
                    match.push( shop[ ts.shop ] );
            }
        }
    }
    console.log( match );
    if( match.length == 0 ) {
        let error_message = document.createTextNode('該当するカフェがありません');
        document.querySelector('#search_result').appendChild( error_message );
    } else {
        let tbl = document.createElement('table');
        for( let shp of match ) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.innerText = shp.name;
            tr.appendChild( td1 );
            tbl.appendChild( tr );
        }
        document.querySelector('#search_result').appendChild( tbl );
    }
});

document.querySelector('#station_search').addEventListener( 'click', () => {
    let station_number = document.querySelector('#station_menu').selectedIndex;
    let lng = station[ station_number ].position.x; // longitude
    let lat = station[ station_number ].position.y; // latitude

    let copied = [...shop];
    copied.sort( (a,b) => ((lng-a.position.x)**2 + (lat-a.position.y)**2) - ((lng-b.position.x)**2 + (lat-b.position.y)**2) );

    let result = document.querySelector('#station_result');
    result.innerHTML = '';
    result.appendChild( document.createTextNode( '駅から近い順に5店表示します'));

    for( let i=0; i<5; i++ ) {
        let shp_element = document.createElement('p');
        shp_element.innerText = copied[i].name;
        result.appendChild( shp_element );
    }
});

document.querySelector('#near_search').addEventListener( 'click', () => {
    let station_number = document.querySelector('#station_menu').selectedIndex;
    navigator.geolocation.getCurrentPosition( (position) => {
        let lng = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log( {lng, lat});

        let copied = [...shop];
        copied.sort( (a,b) => ((lng-a.position.x)**2 + (lat-a.position.y)**2) - ((lng-b.position.x)**2 + (lat-b.position.y)**2) );

        let result = document.querySelector('#near_result');
        result.innerHTML = '';
        result.appendChild( document.createTextNode( '駅から近い順に5店表示します'));

        for( let i=0; i<5; i++ ) {
            let shp_element = document.createElement('p');
            shp_element.innerText = copied[i].name;
            result.appendChild( shp_element );
        }
    }, (error) => {
        let err_msg = "";
        switch (error.code) {
          case 1:
            err_msg = "位置情報の利用が許可されていません";
            break;
          case 2:
            err_msg = "デバイスの位置が判定できません";
            break;
          case 3:
            err_msg = "タイムアウトしました";
            break;
        }
        document.querySelector('#near_result').innerHTML = err_msg;
    });
});