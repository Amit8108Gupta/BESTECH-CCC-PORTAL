// ======================================
// BESTECH Dashboard
// ======================================

const API_URL =
"https://script.google.com/macros/s/AKfycbw_ZA-csIdjGBLjHteeNNiNdIbgjN-Kzitl81quPJlo0PweFkZ_ROQmR9nspMDVTC14/exec";

// Check Admin Session
if(localStorage.getItem("adminLogin")!=="YES"){

    window.location.href="admin.html";

}

// Logout
document.getElementById("logoutBtn")
.addEventListener("click",()=>{

    if(confirm("Logout from Admin Panel?")){

        localStorage.removeItem("adminLogin");

        window.location.href="admin.html";

    }

});

// Load Dashboard
window.onload=loadDashboard;

async function loadDashboard(){

    try{

        const response=await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"dashboard"

            })

        });

        const result=await response.json();

        if(result.success){

            document.getElementById("totalStudents").innerText=result.totalStudents;

            document.getElementById("totalTests").innerText=result.totalTests;

            document.getElementById("passPercentage").innerText=result.passPercentage+"%";

            document.getElementById("highestScore").innerText=result.highestScore;

        }else{

            alert(result.message);

        }

    }catch(err){

        console.log(err);

        alert("Dashboard data could not be loaded.");

    }

}