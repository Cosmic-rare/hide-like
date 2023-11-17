// DOM 変更を検知した時に実行したい関数を定義しておく
const myCallbackFunc = (mutations) => {
  // console.log('DOM 変更があった', mutations);
  // すべてのaタグを取得
  var allLinks = document.querySelectorAll('a');

  // 各リンクに対して処理を行う
  allLinks.forEach(function(link) {
    // href属性が"/SkylineBNR334"の場合に"/tani_exe"に書き換える
    if (link.getAttribute('href') === '/SkylineBNR334' && getComputedStyle(link.parentElement).display === 'flex' && link.children.length === 4) {
      link.setAttribute('href', '/tani_exe');

      // 親を15回まで遡り、最初に見つかったulタグに対してスタイルを適用する
      let parent = link.parentElement;
      for (let i = 0; i < 15 && parent; i++) {
        if (parent.tagName === 'UL') {
          // ULタグの子要素が1個の場合はsolid 3px redにする
          if (parent.children.length === 1) {
            parent.style.border = 'solid 3px red';
          } else {
            // ULタグの子要素が2個以上の場合、a要素を含むものは solid 3px red にする
            let currentParent = link.parentElement;
            let parentCount = 0;
            while (currentParent && parentCount < 5) {
              // currentParent.style.border = 'solid 1px black';
              currentParent = currentParent.parentElement;
              parentCount++;
            }
            currentParent.style.border = 'solid 3px blue';
          }
          break;
        }
        parent = parent.parentElement;
      }

    }
  });
};

// コールバック関数を指定してインスタンスを作る
const observer = new MutationObserver(myCallbackFunc);

// body 要素配下の DOM 変更の監視を開始する
observer.observe(document.body, {
  childList    : true,  // 対象ノードの子ノード（テキストノードも含む）に対する追加・削除を監視する
  attributes   : true,  // 対象ノードの属性に対する変更を監視する
  characterData: true,  // 対象ノードのデータに対する変更を監視する
  subtree      : true   // 対象ノードとその子孫ノードに対する変更を監視する
});