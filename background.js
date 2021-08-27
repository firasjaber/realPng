function getImages() {
  //get all images from dom and save them.
  //console.log(document);
  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    if (image.src.split('').reverse().join('').substring(0, 3) == 'gnp') {
      image.style.border = '2px solid green';
    }
  });
}

function isPng(srcUrl) {
  console.log(srcUrl);
  const images = document.querySelectorAll('img');
  images.forEach((image) => {
    if (image.src == srcUrl) image.style.border = '2px solid green';
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getImages,
  });
});
//we use this later
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo);
});

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
    console.log(info);
    if (reverseString(info.srcUrl).substring(0, 3) == 'gnp') {
      console.log('this is PNG');
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: isPng,
        args: [info.srcUrl],
      });
    } else {
      console.log('this is not a PNG !');
    }
  }
});

//reverse string
function reverseString(str) {
  return str.split('').reverse().join('');
}
