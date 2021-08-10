'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をね、全削除する
 * @param {HTMLElement} element HTMLの要素 元はresultDividedという言葉だった。JS診断結果表示エリアの一行で「 removeAllChildren(resultDivided)」書きたかったのでまとめた。
 */
function removeAllChildren(element){ //HTMLのresult-areaの最初のchildを消す作業をまとめたもの）
    while(element.firstchild){// ( )の中が条件式。resultDividの中の第一子があるならば、whileの｛　｝を実行せよ。第一子がないなら、while文は素通りせよ。という意味
        //HTMLのresult-areaに第一子がある限り削除
        element.removeChild(element.firstChild); 
     }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){　//ガード句1行目
        //名前入力がないときは、処理を終了する　//ガード句2行目
        return;//ガード句3行目　return;は「戻り値なし」＝処理終了の意味
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);//第一子削除を関数にしておくと一行でかけるから便利。
    const header = document.createElement('h3');//h3タグ
    header.innerText = 'あなたの寮長が迎えにきました！';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result[0];
    resultDivided.appendChild(paragraph);

    const img = document.createElement('img');
    const index = result[1];
    img.src = images[index]
    resultDivided.appendChild(img);

    
    // ツイートエリアの作成
    removeAllChildren(tweetDivided);//第一子削除を関数にしておくと一行でかけるから便利。

    const anchor = document.createElement('a');
    const hrefValue =
     'https://twitter.com/intent/tweet?button_hashtag=' +
     encodeURIComponent('あなたの寮長') +
     '&ref_src=twsrc%5Etfw';

     anchor.setAttribute('href', hrefValue);
     anchor.className = 'twitter-hashtag-button';
     anchor.setAttribute('data-text', result);
     anchor.innerText = 'Tweet #あなたの寮長';
    
     tweetDivided.appendChild(anchor);

     const script = document.createElement('script');
     script.setAttribute('src','https://platform.twitter.com/widgets.js');
     tweetDivided.appendChild(script);
};    

userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}
const answers =[
'JavaScript界のスプリンター｜俊豹寮長　「やあ、はじめまして。{userName}って、賢そうな名前だね。うちの寮は、気がノると頭の回転が神がかって一気にコードをしあげる人が多いんだ。最速スプリンターにあやかって一緒にJavaScriptを勉強しよう！」',
'JavaScript界の空の王者｜双鷲寮長 「はじめまして！君、{userName}っていうんだ！勢いがある名前ねえ。うちの寮は狙った獲物は逃さないタイプが多いんだけど、狙うまではのんびりしてる子が多いんだよねえ…。最終試験の追い上げでは負けたことないから一緒にJavaScriptを勉強しようね！」',
'JavaScript界の神意｜神鹿寮長　「はじめまして！{userName}って、運のいい名前だなあ！鹿って日本では神の使いだっていうけど、うちの寮はコードを書くとき、アイデアが突然降りてくる人が多いんだ。君も過去になにかひらめいたことがあるんじゃない？神様に一番近い鹿にあやかって一緒に最終試験突破しよう！」',
'JavaScript界の伝説｜一角獣寮長　「はじめまして〜迎えに来たよ〜。{userName}って、夢がある名前よねえ！うちの寮は、ユニークで壮大な夢を持ってる人が多いの。Seize the day! 1を表す「ユニ」コーンにあやかって最終試験で一番の成績を一緒に残そう！」',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いにたくさんの人が癒やされています。'
];

const images = [
    img[0] = 'https://dl.dropbox.com/s/hoflquhnluffxhk/emblem0.png?',
    img[1] = 'https://dl.dropbox.com/s/c0dkz56nca4qm4q/emblem1.png?',
    img[2] = 'https://dl.dropbox.com/s/nhu1tfo6xgcry25/emblem3.png?',
    img[3] = 'https://dl.dropbox.com/s/ili6je2qmkascxi/emblem4.png?',

];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName　ユーザーの名前
 * @return {string}診断結果
*/
function assessment (userName){
    //全文字のコード番号を取得して全部足す。
let sumOfCharCode = 0;
for (let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}
//文字のコード番号の合計を回数の数で割って添え字の数値を求める
const index = sumOfCharCode % answers.length;
let result = answers[index];

result = result.replaceAll('{userName}', userName);// 「.」は「を」という意味。resultをreplaceAllします。
return [result. index];

}
//テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
