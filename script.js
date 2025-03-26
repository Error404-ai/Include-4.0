document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const year = document.getElementById("year").value;
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const hackerRank = document.getElementById("hackerRank").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const branch = document.getElementById("branch").value;
    const gender = document.getElementById("gender").value;
    const hosteller = document.getElementById("hosteller").value;

    // Error message container
    let errorMessage = "";

    // Validations
    if (!year || !fullName || !email || !phone || !hackerRank || !studentNumber || !branch || !gender || !hosteller) {
        errorMessage = "⚠ Please fill in all fields.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorMessage = "⚠ Enter a valid email address.";
    } else if (!/^\d{10}$/.test(phone)) {
        errorMessage = "⚠ Enter a valid 10-digit phone number.";
    }

    // If there's an error, display and stop form submission
    if (errorMessage) {
        showError(errorMessage);
        return;
    }

    // Success message with animation
    showSuccess("✅ Registration Successful!");

    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById("registrationForm").reset();
    }, 2000);
});

// Function to show error message
function showError(message) {
    let errorBox = document.getElementById("errorBox");
    if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.id = "errorBox";
        document.body.prepend(errorBox);
    }
    errorBox.innerText = message;
    errorBox.style.display = "block";
    errorBox.classList.add("fade-in");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide after 3 seconds
    setTimeout(() => {
        errorBox.classList.add("fade-out");
        setTimeout(() => {
            errorBox.style.display = "none";
            errorBox.classList.remove("fade-in", "fade-out");
        }, 500);
    }, 3000);
}

// Function to show success message
function showSuccess(message) {
    let successBox = document.getElementById("successBox");
    if (!successBox) {
        successBox = document.createElement("div");
        successBox.id = "successBox";
        document.body.prepend(successBox);
    }
    successBox.innerText = message;
    successBox.style.display = "block";
    successBox.classList.add("fade-in");

    // Hide after 3 seconds
    setTimeout(() => {
        successBox.classList.add("fade-out");
        setTimeout(() => {
            successBox.style.display = "none";
            successBox.classList.remove("fade-in", "fade-out");
        }, 500);
    }, 3000);
}
