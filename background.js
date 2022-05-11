
/**
 * load settings from chrome
 */
chrome.storage.sync.get({ settings: 
{
    targethost: "",
    pause: false
} 
}, function(storage) {
    host = storage.settings.targethost;
    pause = storage.settings.pause;
    if (!pause)install_listener();
});

/**
 * install after settings are loaded
 */
function install_listener(){
}

/**
 * if paused remove
 */
 function remove_listener(){
}


/**
 * save pause state
 * @param {boolean} pause must be set to true or false 
 */
// Saves options to chrome.storage.sync.
function save_options(pause, callback) {
  chrome.storage.sync.set({
    pause: pause
  }, function() {
    // Update icon status
    callback();
  });
}


/**
 * set extension icon to pause state
 */
function disableBrowserAction(){
    chrome.action.setIcon({path:"images/icon_status_pause.png"});
    remove_listener();
}
/**
 * set extension icon to normal state
 */
function enableBrowserAction(){
    chrome.action.setIcon({path:"images/icon_status.png"});
    install_listener();
}

/**
 * on click handler for extension icon
 * switch state, store and update icon
 */
function updateState( ){
    
        if(pause == false){
            pause = true;
            save_options(pause,function(){
                disableBrowserAction();
            });
        }else{
            pause = false;
            save_options(pause,function(){
                enableBrowserAction();
            });   
        }
}

/**
 * register extension icon on click handler
 */
chrome.action.onClicked.addListener(updateState);

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['content-script.js']
//     });
//   });

console.log("BGScript")
