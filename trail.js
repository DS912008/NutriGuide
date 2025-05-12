function nextStep(nextSectionId) {
    var currentStep = document.querySelector('#dietForm > div:not([style*="display: none"])');
    if (currentStep) {
        currentStep.style.display = "none";
    }
    document.getElementById(nextSectionId).style.display = "block";
}

function handleBudgetPreference() {
    var budgetPreference = document.querySelector('input[name="budgetPreference"]:checked').value;
    if (budgetPreference === "recommendedBudget") {
        nextStep('step3a');
    } else {
        nextStep('step3b');
    }
}

function handleMedicalCondition() {
    var medicalCondition = document.querySelector('input[name="condition"]:checked').value;
    if (medicalCondition === "yes") {
        nextStep('step4a');
    } else {
        nextStep('step5');
    }
}

function goBackToStep(stepId) {
    nextStep(stepId);
}

function handleFinalStep() {
    var dietOrSick = document.querySelector('input[name="dietOrSick"]:checked').value;
    var nextButton = document.getElementById('nextButton');
    
    // Set href for the next button to redirect to user.html
    if (dietOrSick === "diet") {
        window.location.href = "recipe.html"; // Redirect to user.html for diet users
    } else if (dietOrSick === "sick") {
        window.location.href = "recipe.html"; // Redirect to user.html for sick users
    }
}

// Optional: Prevent form submission if needed (not used in this case)
document.getElementById("dietForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    var vegPreference = document.querySelector('input[name="vegPreference"]:checked').value;
    var budgetPreference = document.querySelector('input[name="budgetPreference"]:checked').value;
    var budgetAmount = budgetPreference === "recommendedBudget" ? document.getElementById("budgetAmount").value : "N/A";
    var availableItems = budgetPreference === "availableIngredients" ? document.getElementById("availableItems").value : "N/A";
    var medicalCondition = document.querySelector('input[name="condition"]:checked').value;
    var recipeReason = document.querySelector('input[name="recipeReason"]:checked').value;

    // Handle form submission here (e.g., show a summary or send data to a server)
    alert("Diet preference: " + vegPreference +
          "\nBudget Preference: " + budgetPreference +
          "\nBudget: " + budgetAmount +
          "\nAvailable Ingredients: " + availableItems +
          "\nMedical Condition: " + medicalCondition +
          "\nReason for Recipes: " + recipeReason);
});
