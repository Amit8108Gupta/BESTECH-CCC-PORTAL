// ======================================
// BESTECH CCC Portal - exam.js
// Version 1.0
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbw_ZA-csIdjGBLjHteeNNiNdIbgjN-Kzitl81quPJlo0PweFkZ_ROQmR9nspMDVTC14/exec";

let questions = [];
let answers = {};
let currentQuestion = 0;

const student = {
    name: localStorage.getItem("studentName"),
    mobile: localStorage.getItem("studentMobile"),
    batch: localStorage.getItem("studentBatch"),
    testCode: localStorage.getItem("testCode")
};

document.getElementById("studentName").textContent = student.name;
document.getElementById("studentMobile").textContent = student.mobile;
document.getElementById("testCode").textContent = student.testCode;

window.onload = loadQuestions;

async function loadQuestions(){

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"getQuestions",
                testCode:student.testCode
            })
        });

       
       

        const result = await response.json();

console.log(result);

if(result.success){

    questions = result.questions;

    alert("Questions = " + questions.length);

    createPalette();

    showQuestion();

}else{

    alert(result.message);

}

}else{

    alert(result.message);

}

    }catch(err){

        alert("Unable to load questions.");

        console.log(err);

    }

}
// ======================================
// Display Question
// ======================================

function showQuestion() {

    if (questions.length === 0) return;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("questionText").textContent =
        q.question;

    document.getElementById("optA").textContent = q.options[0];
    document.getElementById("optB").textContent = q.options[1];
    document.getElementById("optC").textContent = q.options[2];
    document.getElementById("optD").textContent = q.options[3];

    document.querySelectorAll("input[name='answer']")
        .forEach(r => r.checked = false);

    if (answers[q.id]) {

        document.querySelector(
            `input[name="answer"][value="${answers[q.id]}"]`
        ).checked = true;

    }

    updatePalette();

    updateProgress();

}


// ======================================
// Save Answer
// ======================================

document.querySelectorAll("input[name='answer']")
.forEach(radio => {

    radio.addEventListener("change", function(){

        answers[
            questions[currentQuestion].id
        ] = this.value;

        updatePalette();

        updateProgress();

    });

});


// ======================================
// Next
// ======================================

document
.getElementById("nextBtn")
.addEventListener("click",()=>{

    if(currentQuestion < questions.length-1){

        currentQuestion++;

        showQuestion();

    }

});


// ======================================
// Previous
// ======================================

document
.getElementById("prevBtn")
.addEventListener("click",()=>{

    if(currentQuestion>0){

        currentQuestion--;

        showQuestion();

    }

});
// ======================================
// Question Palette
// ======================================

function createPalette() {

    const palette = document.getElementById("palette");
    palette.innerHTML = "";

    questions.forEach((q, index) => {

        const btn = document.createElement("button");

        btn.textContent = index + 1;

        btn.onclick = function () {

            currentQuestion = index;
            showQuestion();

        };

        palette.appendChild(btn);

    });

}

function updatePalette() {

    const buttons = document
        .getElementById("palette")
        .querySelectorAll("button");

    buttons.forEach((btn, index) => {

        btn.classList.remove("current", "answered");

        if (index === currentQuestion) {
            btn.classList.add("current");
        }

        if (answers[questions[index].id]) {
            btn.classList.add("answered");
        }

    });

}

// ======================================
// Progress Bar
// ======================================

function updateProgress() {

    const answered = Object.keys(answers).length;

    const percent = (answered / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";

}

// ======================================
// Submit Test
// ======================================

document.getElementById("submitBtn")
.addEventListener("click", submitExam);
const unanswered = questions.length - Object.keys(answers).length;

if (unanswered > 0) {

    if (!confirm(`You have ${unanswered} unanswered question(s).\nDo you still want to submit?`)) {
        return;
    }

}
async function submitExam() {

    if (!confirm("Are you sure you want to submit the test?")) {
        return;
    }

    let score = 0;

    questions.forEach(q => {

        if (answers[q.id] === q.answer) {
            score++;
        }

    });

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "submitResult",

                name: student.name,

                mobile: student.mobile,

                batch: student.batch,

                testCode: student.testCode,

                score: score,

                total: questions.length

            })

        });

        const result = await response.json();

        localStorage.setItem("score", score);
        localStorage.setItem("total", questions.length);
        localStorage.setItem("percentage", result.percentage);
        localStorage.setItem("result", result.result);

        window.location.href = "result.html";

    } catch (err) {

        alert("Result submit failed.");

        console.log(err);

    }

}