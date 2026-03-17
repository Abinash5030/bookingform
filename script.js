// Helper: check if step has valid input
function isStepValid(step){
    let inputs = step.querySelectorAll("input");

    for(let input of inputs){

        if(input.type === "checkbox" || input.type === "radio"){
            if(step.querySelectorAll("input:checked").length > 0){
                return true;
            }
        }

        else if(input.type === "range"){
            return true; // range always has value
        }

        else if(input.type === "date"){
            if(input.value !== "") return true;
        }

        else{
            if(input.value.trim() !== "") return true;
        }
    }

    return false;
}


// Enable next step
function enableNextStep(currentStepId, nextStepId){

    let currentStep = document.getElementById(currentStepId);
    let nextStep = document.getElementById(nextStepId);

    if(isStepValid(currentStep)){
        nextStep.classList.remove("disabled");
        nextStep.classList.add("active");

        // smooth scroll
        // nextStep.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start"
        // });
    }
}


// STEP EVENTS

// Step 1 → Step 2
document.querySelectorAll('#step1 input').forEach(input=>{
    input.addEventListener('change', ()=>{
        enableNextStep('step1','step2');
    });
});

// Step 2 → Step 3
document.querySelectorAll('#step2 input').forEach(input=>{
    input.addEventListener('input', ()=>{
        enableNextStep('step2','step3');
    });
});

// Step 3 → Step 4
document.querySelectorAll('#step3 input').forEach(input=>{
    input.addEventListener('change', ()=>{
        enableNextStep('step3','step4');
    });
});

// Step 4 → Step 5
document.querySelectorAll('#step4 input').forEach(input=>{
    input.addEventListener('change', ()=>{
        enableNextStep('step4','step5');
    });
});

// Step 5 → Step 6
document.querySelectorAll('#step5 input').forEach(input=>{
    input.addEventListener('input', ()=>{
        enableNextStep('step5','step6');
    });
}); 

const range = document.getElementById("daysRange");
const value = document.getElementById("rangeValue");

function updateSlider(){

    let val = range.value;
    value.innerText = val + " days";

    // calculate position
    let percent = (val - range.min) / (range.max - range.min);

    let sliderWidth = range.offsetWidth;
    let offset = percent * sliderWidth;

    value.style.left = offset + "px";
}

range.addEventListener("input", updateSlider);

// initial position
updateSlider();

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    const ids = ["arrival_date", "departure_date"]; // add all your IDs here

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute("min", minDate);
        }
    });
});


const budgetRange = document.getElementById("budgetRange");
const budgetValue = document.getElementById("budgetValue");

function updateBudget(){

    let val = budgetRange.value;

    // format with commas
    let formatted = "$" + Number(val).toLocaleString();

    // show + at max
    if(val == budgetRange.max){
        formatted = "$" + Number(val).toLocaleString() + "+";
    }

    budgetValue.innerText = formatted;

    // move label with slider
    let percent = (val - budgetRange.min) / (budgetRange.max - budgetRange.min);
    let sliderWidth = budgetRange.offsetWidth;
    let offset = percent * sliderWidth;

    budgetValue.style.left = offset + "px";
}

budgetRange.addEventListener("input", updateBudget);

// initial
updateBudget();

document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("travelForm");

    form.addEventListener("submit", function(e){

        let isValid = true;

        // remove old errors
        document.querySelectorAll(".error").forEach(el => el.remove());

        // ===== STEP 1 =====
        let countries = document.querySelectorAll('#step1 input:checked');
        if(countries.length === 0){
            showError('#step1', "Please select at least one country");
            isValid = false;
        }

        // ===== STEP 4 =====
        let dates = document.querySelectorAll('#step4 input[type="date"]');
        dates.forEach(input=>{
            if(input.value === ""){
                showError('#step4', "Please select travel dates");
                isValid = false;
            }
        });

        // ===== STEP 6 =====
        let name = document.querySelector('#step6 input[type="text"]');
        let email = document.querySelector('#step6 input[type="email"]');

        if(name.value.trim() === ""){
            showError('#step6', "Full name is required");
            isValid = false;
        }

        if(email.value.trim() === "" || !validateEmail(email.value)){
            showError('#step6', "Enter a valid email");
            isValid = false;
        }

        if(!isValid){
            e.preventDefault();
        }

    });

});

function showError(stepSelector, message){

    let step = document.querySelector(stepSelector);

    let error = document.createElement("p");
    error.classList.add("error");
    error.innerText = message;

    step.appendChild(error);
}

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
