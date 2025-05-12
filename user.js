function handleMedicalCondition() {
    const isSick = document.querySelector('input[name="condition"]:checked');
    if (!isSick) {
        alert("Please select an option.");
        return;
    }

    if (isSick.value === "yes") {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step1a").style.display = "block";
    } else {
        nextStep("step2");
    }
}

function nextStep(stepId) {
    document.querySelectorAll("form > div").forEach(div => div.style.display = "none");
    document.getElementById(stepId).style.display = "block";
}

function goBackToStep(stepId) {
    nextStep(stepId);
}

function handleFinalStep() {
    const reason = document.querySelector('input[name="recipeReason"]:checked');
    if (!reason) {
        alert("Please choose why you need recipes.");
        return;
    }

    if (reason.value === "sick") {
        window.location.href = "aryuveda.html";
    } else if (reason.value === "weight") {
        // Ask for method: calorie or exercise
        const methodChoice = prompt("Do you want to lose weight by:\n1. Consuming fewer calories\n2. Exercising\n\nType 1 or 2");

        if (methodChoice === "1") {
            window.location.href = "start.html";
        } else if (methodChoice === "2") {
            window.location.href = "exercise.html";
        } else {
            alert("Please enter a valid choice (1 or 2).");
        }
    }
}
