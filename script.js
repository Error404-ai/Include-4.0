document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const branch = document.getElementById("branch").value;
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const hackerRank = document.getElementById("hackerRank").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.getElementById("gender").value;
    const hosteller = document.getElementById("hosteller").value;
    const rollNumber = document.getElementById("rollNumber").value.trim();

    let errorMessage = "";

    if (!fullName || !branch || !studentNumber || !hackerRank || !email || !gender || !hosteller || !rollNumber) {
        errorMessage = "⚠ Please fill in all fields.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorMessage = "⚠ Enter a valid email address.";
    }

    if (errorMessage) {
        showError(errorMessage);
        return;
    }

    const requestBody = {
        name: fullName,
        branch_name: branch,
        recaptcha_token: "abc",
        student_no: studentNumber,
        hackerrank: hackerRank,
        email: email,
        gender: gender,
        hosteller: hosteller,
        roll_no: rollNumber
    };

    const apiUrl = "https://api.programming-club.tech/api/register";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        if (response.ok) {
            showSuccess("✅ Registration Successful!");
            setTimeout(() => {
                window.location.href = "/success.html";
            }, 2000);
        } else {
            showError(result.error || "⚠ Registration failed!");
        }
    } catch (error) {
        console.error("Error:", error);
        showError("⚠ Something went wrong!");
    }
});

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

    setTimeout(() => {
        errorBox.classList.add("fade-out");
        setTimeout(() => {
            errorBox.style.display = "none";
            errorBox.classList.remove("fade-in", "fade-out");
        }, 500);
    }, 3000);
}

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

    setTimeout(() => {
        successBox.classList.add("fade-out");
        setTimeout(() => {
            successBox.style.display = "none";
            successBox.classList.remove("fade-in", "fade-out");
        }, 500);
    }, 3000);
}
