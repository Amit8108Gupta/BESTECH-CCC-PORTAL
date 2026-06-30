// ======================================
// BESTECH CCC Portal - timer.js
// Version 1.0
// ======================================

const EXAM_TIME = 60 * 60; // 60 Minutes

let timeLeft = parseInt(localStorage.getItem("timeLeft"), 10);

if (isNaN(timeLeft) || timeLeft <= 0) {
    timeLeft = EXAM_TIME;
    localStorage.setItem("timeLeft", timeLeft);
}

const timerElement = document.getElementById("timer");

const timer = setInterval(() => {

    timeLeft--;

    localStorage.setItem("timeLeft", timeLeft);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Last 10 Minutes Warning
    if (timeLeft <= 600) {
        timerElement.style.color = "#ff0000";
    }

    // Auto Submit
    if (timeLeft <= 0) {

        clearInterval(timer);

        localStorage.removeItem("timeLeft");

        alert("Time Over!\nYour test will be submitted automatically.");

        submitExam();

    }

}, 1000);

// Prevent Refresh / Back
window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
});