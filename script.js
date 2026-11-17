import { getGap, updateStats } from "./functions.mjs"

// Stores the running totals in one object, so nothing needs to be reassigned
const state = {
    clickCount: 0,
    doubleCount: 0,
    lastPress: null,
    lastWasDouble: false
};

const DOUBLE_CLICK_GAP = 100;


// Runs the function below every time the Press me button is clicked
document.getElementById("clickButton").addEventListener("click", function() {
    //Variables for now, ms, gap 
    const now = new Date();
    const ms = now.getTime();
    const gap = getGap(state, ms);
    //Conditions for double 
    const isDouble = gap !== null && gap < DOUBLE_CLICK_GAP && !state.lastWasDouble;

    if (isDouble) {
        // The second press adds to the double count but not the click count
        state.doubleCount++;
        state.lastWasDouble = true;
    } else {
        // Every other press counts as a new click
        state.clickCount++;
        state.lastWasDouble = false;
    }

    // Saves this press's time so the next press can measure the gap
    state.lastPress = ms;

    // Builds the parts of the list entry
    const parts = [];

    if (isDouble) {
        parts.push("Double-click");
    } else {
        parts.push("Click " + state.clickCount);
    }

    parts.push(now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 2
    }));

      
    if (gap !== null) {
        parts.push(gap + " ms since last press");
    }

    // Creates the list item and joins the parts into one line of text
    const item = document.createElement("li");
    item.textContent = parts.join(" - ");

    // Makes double-click entries bold so they stand out
    if (isDouble) {
        item.classList.add("double");
    }

    document.getElementById("clickList").appendChild(item);

    updateStats(state);
});

//Resets state to 0
document.getElementById("resetButton").addEventListener("click", function() {
    // Resets all counters and the saved press history
    state.clickCount = 0;
    state.doubleCount = 0;
    state.lastPress = null;
    state.lastWasDouble = false;



    // Clears the list and resets the stats
    document.getElementById("clickList").innerHTML = "";
    updateStats(state);
});



    // generate copyright year
const copyright = document.getElementById("copyright");
copyright.innerHTML = "&copy; " + new Date().getFullYear() + " Midware's Website";