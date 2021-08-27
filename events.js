// add is png to context menu
let contextMenuItem = {
  id: 'isPNG',
  title: 'is this a png ?',
  contexts: ['image'],
};

chrome.contextMenus.create(contextMenuItem, (o) => console.log(o));

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == 'isPNG') {
    console.log(reverseString(info.srcUrl));
    if (reverseString(info.srcUrl).substring(0, 3) == 'gnp') {
      console.log('this is a PNG !');
      chrome.contextMenus.update();
    } else {
      console.log('this is not a PNG !');
    }
  }
});

//reverse string
function reverseString(str) {
  return str.split('').reverse().join('');
}
