const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9){
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    let msec = timer[3]++ / 100;
/*  To show hours:minutes:seconds
    timer[0] = Math.floor(msec / 3600);
    timer[1] = Math.floor((msec - (timer[0] * 3600)) / 60);
    timer[2] = Math.floor(msec - (timer[0] * 3600) - timer[1] * 60);*/
// Now it is    minutes:seconds:mlsec
    timer[0] = Math.floor(msec/60);
    timer[1] = Math.floor(msec - (timer[0]/60));
    timer[2] = Math.floor((msec * 100) - (timer[1]*100) - (timer[0]*6000));
}


// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originalTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        reset();
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originalTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}


// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00"
    console.log("resset button has be pressed!");
    testWrapper.style.borderColor = "grey";
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
