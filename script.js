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
        nextStep.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
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



document.querySelectorAll('input[type="range"]').forEach(range => {

    let display = document.createElement('span');
    display.style.marginLeft = "10px";
    range.parentNode.appendChild(display);

    function updateValue(){
        display.innerText = range.value;
    }

    range.addEventListener('input', updateValue);
    updateValue();
});
