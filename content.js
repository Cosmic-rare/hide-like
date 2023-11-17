let user_id = ''

chrome.storage.local.get('key', function (value) {
  user_id = value.key 
});

const myCallbackFunc = (mutations) => {
  var allLinks = document.querySelectorAll('a');

  allLinks.forEach(function(link) {
    if (link.getAttribute('href') === '/' + user_id && getComputedStyle(link.parentElement).display === 'flex' && link.children.length === 4) {

      let parent = link.parentElement;
      for (let i = 0; i < 15 && parent; i++) {
        if (parent.tagName === 'UL') {

          if (parent.children.length === 1) {
            parent.style.border = 'solid 3px red';
            let currentParent = link.parentElement;
            let parentCount = 0;
            while (currentParent && parentCount < 12) {
              currentParent = currentParent.parentElement;
              parentCount++;
            }
            currentParent.remove()
          } else {
            let currentParent = link.parentElement;
            let parentCount = 0;
            while (currentParent && parentCount < 5) {
              currentParent = currentParent.parentElement;
              parentCount++;
            }
            currentParent.remove()
          }

          break;
        }
        parent = parent.parentElement;
      }
    }
  });
};

const observer = new MutationObserver(myCallbackFunc);

observer.observe(document.body, {
  childList    : true,  // 対象ノードの子ノード（テキストノードも含む）に対する追加・削除を監視する
  attributes   : true,  // 対象ノードの属性に対する変更を監視する
  characterData: true,  // 対象ノードのデータに対する変更を監視する
  subtree      : true   // 対象ノードとその子孫ノードに対する変更を監視する
});