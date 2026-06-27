// ======================================
// BESTECH CCC Portal - login.js
// Version 1.0
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbw_ZA-csIdjGBLjHteeNNiNdIbgjN-Kzitl81quPJlo0PweFkZ_ROQmR9nspMDVTC14/exec";

const form = document.getElementById("loginForm");
const startBtn = document.getElementById("startBtn");
const loading = document.getElementById("loadingScreen");

startBtn.addEventListener("click", startLogin);

async function startLogin() {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const batch = document.getElementById("batch").value;
    const testCode = document.getElementById("testCode").value;
    const agree = document.getElementById("agree").checked;

    if (name.length < 3) {
        alert("Enter valid student name.");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter valid 10 digit mobile number.");
        return;
    }

    if (batch === "") {
        alert("Please select batch.");
        return;
    }

    if (testCode === "") {
        alert("Please select test.");
        return;
    }

    if (!agree) {
        alert("Please accept exam instructions.");
        return;
    }

    loading.style.display = "flex";

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentMobile", mobile);
    localStorage.setItem("studentBatch", batch);
    localStorage.setItem("testCode", testCode);

    checkAttempts(name, mobile, batch, testCode);

}// ===============================
// BESTECH Login Part 2
// ===============================

async function checkAttempts(name, mobile, batch, testCode) {

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                name: name,
                mobile: mobile,
                batch: batch,
                testCode: testCode
            })
        });

        const result = await response.json();

        loading.style.display = "none";

        if (result.status === "success") {

            localStorage.setItem("studentId", result.studentId);
            localStorage.setItem("attempt", result.attempt);

            window.location.href = "exam.html";

        } else {

            alert(result.message);

        }

    } catch (e) {

        loading.style.display = "none";

        alert("Unable to connect to server.\nPlease try again.");

        console.log(e);

    }

}
