const shop = [  // name: String, position: { x: , y: }
 { name: "喫茶　曳舟", position: { x: 35.717885, y: 139.816565 } },
 { name: "錦糸町カフェ", position: { x: 35.696927, y: 139.814419 } },
];

const station = [  // name: String, position: { x: , y: }
 { name: "曳舟駅", position: { x: 35.717885, y: 139.816565 } },
 { name: "錦糸町駅", position: { x: 35.696927, y: 139.814419 } },
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
                match.push( shop[ ts.shop ] );
            }
        }
    }
    console.log( match );
});