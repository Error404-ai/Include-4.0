document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const year = document.getElementById("year").value;
    const branch = document.getElementById("branch").value;
    const gender = document.getElementById("gender").value;
    const hosteller = document.getElementById("hosteller").value;
    const hackerRank = document.getElementById("hackerRank").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const registeredFor = document.getElementById("registeredFor").value;

    let errorMessage = "";

    if (!fullName || !email || !phone || !year || !branch || !gender || !hosteller || !hackerRank || !studentNumber || !registeredFor) {
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
        email: email,
        phone: phone,
        year: year,
        branch_name: branch,
        gender: gender,
        hosteller: hosteller,
        hackerrank: hackerRank,
        student_no: studentNumber,
        registered_for: registeredFor
    };

    const apiUrl = "http://13.200.54.180/api/register/";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok) {
            showSuccess("✅ Registration Successful!");
            setTimeout(() => {
                window.location.href = "./success.html";
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

// ✅ **Dynamically update 'Registered For' options based on year selection**
document.addEventListener("DOMContentLoaded", function () {
    updateRegisteredForOptions();
    document.getElementById("year").addEventListener("change", updateRegisteredForOptions);
});

function updateRegisteredForOptions() {
    const year = document.getElementById("year").value;
    const registeredFor = document.getElementById("registeredFor");

    registeredFor.innerHTML = '<option value="">Select an option</option>';

    if (year === "1st") {
        registeredFor.innerHTML += '<option value="contest">Contest Only (Free)</option>';
        registeredFor.innerHTML += '<option value="workshop_contest">Workshop + Contest (Charges)</option>';
    } else if (year === "2nd") {
        registeredFor.innerHTML += '<option value="contest">Contest Only (Free)</option>';
    }
}
