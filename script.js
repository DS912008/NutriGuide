function calculateBMI() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;

    // Convert height from cm to meters
    height = height / 100;

    // Calculate BMI
    var bmi = weight / (height * height);

    // Determine weight status
    var weightStatus = "";
    if (bmi < 18.5) {
        weightStatus = "You need to gain weight.";
        document.getElementById("bmiForm").classList.add("error");
        document.getElementById("bmiForm").classList.remove("highlight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        weightStatus = "You have a normal weight.";
        document.getElementById("bmiForm").classList.add("highlight");
        document.getElementById("bmiForm").classList.remove("error");
    } else if (bmi >= 25 && bmi <= 29.9) {
        weightStatus = "You need to lose weight.";
        document.getElementById("bmiForm").classList.add("error");
        document.getElementById("bmiForm").classList.remove("highlight");
    } else {
        weightStatus = "Fill some thing here ";
        document.getElementById("bmiForm").classList.add("error");
        document.getElementById("bmiForm").classList.remove("highlight");
    }

    // Display the result
    document.getElementById("bmiResult").innerHTML = "Your BMI is " + bmi.toFixed(2) + ". " + weightStatus;

    // Create and show the Next button
    if (!document.getElementById("nextButton")) {
        var nextButton = document.createElement("a");
        nextButton.id = "nextButton";
        nextButton.innerText = "Next";
        nextButton.href = "user.html"; // Replace with your target URL
        nextButton.style.display = "inline-block";
        nextButton.style.marginTop = "10px";
        nextButton.style.color = "white";
        nextButton.style.backgroundColor = "green";
        nextButton.style.padding = "10px 20px";
        nextButton.style.borderRadius = "50px";
        nextButton.style.textDecoration = "none";
        nextButton.style.textAlign = "center";
        nextButton.style.border = "none";
        nextButton.style.cursor = "pointer";
        document.getElementById("nextButtonPlaceholder").appendChild(nextButton);
    }
}
