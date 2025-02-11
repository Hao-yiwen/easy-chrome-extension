document.getElementById('changeColor').addEventListener('click', async () => {
    // 获取当前标签页
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    // 注入并执行脚本
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  function setPageBackgroundColor() {
    // 生成随机颜色
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = color;
  }
  