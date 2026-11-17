//returns gap ms since the previous press, if its the first press returns null
export function getGap(state, ms) {
    if (state.lastPress === null) {
        return null;
    }
    return ms;
}

//double-click percentage 
export function getPercentage(state) {
    return (state.doubleCount / state.clickCount * 100).toFixed(1);
}

//Updates the three stats above the buttons
export function updateStats(state) {
    document.getElementById("clickCount").textContent = "Clicks: " + state.clickCount;
    document.getElementById("doubleClickCount").textContent = "Double-clicks: " + state.doubleCount;
    document.getElementById("percentage").textContent = "Double-click percentage: " + getPercentage(state) + "%";
}