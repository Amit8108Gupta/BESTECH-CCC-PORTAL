// ======================================
// BESTECH CCC Portal - result.js
// ======================================

// Student Details
document.getElementById("studentName").textContent =
localStorage.getItem("studentName") || "-";

document.getElementById("studentMobile").textContent =
localStorage.getItem("studentMobile") || "-";

document.getElementById("testCode").textContent =
localStorage.getItem("testCode") || "-";

// Result Details
const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("total")) || 0;

const percentage =
total > 0 ? ((score / total) * 100).toFixed(2) : 0;

document.getElementById("score").textContent = score;
document.getElementById("total").textContent = total;
document.getElementById("percentage").textContent = percentage;

// PASS / FAIL
const status = document.getElementById("resultStatus");

if (percentage >= 50) {

    status.innerHTML = "🎉 PASS";

    status.classList.add("pass");

} else {

    status.innerHTML = "❌ FAIL";

    status.classList.add("fail");

}

// Print Button
document
.getElementById("printBtn")
.addEventListener("click", () => {

    window.print();

});

// Home Button
document
.getElementById("homeBtn")
.addEventListener("click", () => {

    localStorage.removeItem("timeLeft");
    localStorage.removeItem("score");
    localStorage.removeItem("total");
    localStorage.removeItem("percentage");
    localStorage.removeItem("result");

    window.location.href = "index.html";

});