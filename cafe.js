const shop = [  // name: String, position: { x: , y: }
 { name: "喫茶　曳舟", position: { x: 35.717885, y: 139.816565 } },
 { name: "錦糸町カフェ", position: { x: 35.696927, y: 139.814419 } },
 { name: "マクドナルド京成津田沼駅前店", position: { x: 35.682806, y: 140.023010 } },
 { name: "セブンイレブン京成津田沼駅前店", position: { x: 35.684113, y: 140.023718 } },
 { name: "コーヒーハウスチャオ", position: { x: 35.683442, y: 140.024030 } },
 { name: "ペンネん・ネネム", position: { x: 35.682092, y: 140.022978 } },
 { name: "珈琲屋からす", position: { x: 35.682127, y: 140.024606 } },
 { name: "BROWN SOUND COFFEE", position: { x: 35.685886, y: 140.022182 } },
 { name: "タリーズコーヒーモリシア津田沼", position: { x: 35.689951, y: 140.019414 } },
 { name: "サンマルクカフェモリシア津田沼", position: { x: 35.689999, y: 140.019237 } },
 { name: "スターバックスコーヒー TSUTAYA モリシア津田沼", position: { x: 35.690016, y: 140.018764 } },
 { name: "ドトールコーヒーショップ津田沼南口店", position: { x: 35.690595, y: 140.018882 } },
 { name: "エクセルシオールカフェ津田沼北口店", position: { x: 35.691122, y: 140.020916 } },
 { name: "スターバックスコーヒー ミーナ津田沼店", position: { x: 35.689694, y: 140.023131 } },
 { name: "カフェ・ベローチェ新津田沼店", position: { x: 35.690186, y: 140.023276 } },
 { name: "タリーズコーヒーイオンモール津田沼", position: { x: 35.690835, y: 140.023587 } },
 { name: "珈琲館イオンモール津田沼店", position: { x: 35.690656, y: 140.025030 } },

];

const station = [  // name: String, position: { x: , y: }
// { name: "曳舟駅", position: { x: 35.717885, y: 139.816565 } },
// { name: "錦糸町駅", position: { x: 35.696927, y: 139.814419 } },
 { name: "津田沼駅", position: { x: 35.691256, y: 140.020328 } },
 { name: "新津田沼駅", position: { x: 35.690228, y: 140.023611 } },
 { name: "京成津田沼駅", position: { x: 35.683686, y: 140.024566 } },
];

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
    "デカフェ",
    "プリン",
    "ケーキ",
    "パスタ",
    "駅チカ",
    "男性でも入りやすい",
];

const tag_shop = [
    { tag: 0, shop: 0 },
    { tag: 0, shop: 1 },
    { tag: 1, shop: 0 },
    { tag: 2, shop: 1 },
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

    shop.sort( (a,b) => ((lng-a.position.x)**2 + (lat-a.position.y)**2) - ((lng-b.position.x)**2 + (lat-b.position.y)**2) );
    
    let result = document.querySelector('#station_result');
    result.innerHTML = '';
    result.appendChild( document.createTextNode( '駅から近い順に5店表示します'));

    for( let i=0; i<5; i++ ) {
        let shp_element = document.createElement('p');
        shp_element.innerText = shop[i].name;
        result.appendChild( shp_element );
    }
})