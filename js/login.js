const API_URL = "https://script.google.com/macros/s/AKfycbw_ZA-csIdjGBLjHteeNNiNdIbgjN-Kzitl81quPJlo0PweFkZ_ROQmR9nspMDVTC14/exec";

document.getElementById("startBtn").addEventListener("click", startExam);

async function startExam() {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const batch = document.getElementById("batch").value;
    const testCode = document.getElementById("testCode").value;
    const agree = document.getElementById("agree").checked;

    if(name===""){
        alert("Please enter your name");
        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)){
        alert("Enter a valid 10 digit mobile number");
        return;
    }

    if(batch===""){
        alert("Please select your batch");
        return;
    }

    if(!agree){
        alert("Please accept exam instructions.");
        return;
    }

    localStorage.setItem("studentName",name);
    localStorage.setItem("studentMobile",mobile);
    localStorage.setItem("studentBatch",batch);
    localStorage.setItem("testCode",testCode);

    alert("Login Successful");

    window.location.href="exam.html";

}