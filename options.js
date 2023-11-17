window.onload = function(){
  var btn = document.getElementById("btn-save");
  var textarea = document.getElementById("text-format");

  chrome.storage.local.get('key', function (value) {
    document.getElementById("user-id").innerText = value.key
  });

  btn.addEventListener("click", function(){
      chrome.storage.local.set({'key': textarea.value}, function () {
        alert('保存できたからリロードしてちょ♡')
      });
  });
}