var chars = '⣾⣽⣻⢿⡿⣟⣯⣷'.split('')
var chars = '⠁⠂⠄⡀⢀⠠⠐⠈'.split('')
var spinTimer = false

function spin() {
    var char = chars.shift()
    document.querySelector('#timerButton').innerText = `Geplant ${char}`
    chars.push(char)
}


function spinToggle(state){
    if (!spinTimer) {
        spinTimer = setInterval(spin, 150)
    }else{
        clearInterval(spinTimer)
        spinTimer = false
        document.querySelector('#timerButton').innerText = `Planen ⌚`
    }
}

function findSaveButton() {
    for (let [index, button ] of document.querySelectorAll("button").entries()) {
        if (button.innerText.trim() == "Save") return button
    }
}

var submitTimer = false

function timerButtonClickFn(){

    spinToggle()

    if (!submitTimer){
        submitTimer = setInterval( ()=>{
            now = new Date();
            if (now.getHours() == 0 && now.getMinutes() == 0){
                console.warn("Mitternacht")
                findSaveButton().click()
                clearInterval(submitTimer)
                submitTimer = false
                spinToggle()
            }
        }, 100)
    } else {
        clearInterval(submitTimer)
        submitTimer = false
    }


}

function addTimerButton(){

    saveButton = findSaveButton()

    timerButton = document.createElement("button")
    timerButton.id = "timerButton"
    timerButton.className = "mat-accent mat-focus-indicator gmat-button mat-raised-button mat-button-base"
    timerButton.style = "margin-right: 8px;"
    timerButton.type = "button"
    
    m1 = document.createElement("mat-icon")
    m1.innerText = `Planen ⌚`
    timerButton.append(m1);

    saveButton.parentElement.prepend(timerButton);

    timerButton.onclick = timerButtonClickFn;

}



/**
 * 
 * @param {event} e 
 */
 function filterMutationObserverEvents(e){

    e.map( MR => {
        
        if (MR.removedNodes.length > 0){
            //remButton = MR.removedNodes.item(0);
            //remButton.dispatchEvent(UNLOAD);
            //console.log(MR.removedNodes)
        }
        if (MR.addedNodes.length > 0){
            for (let [index, node] of MR.addedNodes.entries()){
                mynode = [...node.childNodes].filter( node => node.innerText == "Cancel" )
                if ( mynode.length == 1 ){
                    addTimerButton();
                } 
            }
        }

    })
}

const UNLOAD = new Event('unload')
const MOX = new MutationObserver( filterMutationObserverEvents ) 

function initApp(){
    const mainFrame = document.querySelector("mat-sidenav-content");
    MOX.observe(mainFrame, { childList: true, subtree: true })
}
//MOX.disconnect();


document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        //initLoader();
    }
    else if (event.target.readyState === 'complete') {
        initApp();
    }
});
