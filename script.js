// ==========================================
// SMART DIGITAL SAFETY ADVISOR
// ==========================================


// Risk points for each safety factor

const RISK_POINTS = {
    sender: 15,
    urgent: 15,
    link: 25,
    otp: 30,
    offer: 15
};


// ==========================================
// ANALYZE SAFETY
// ==========================================

function checkSafety() {

    // Get answers from the website

    const sender =
        Number(document.getElementById("sender").value);

    const urgent =
        Number(document.getElementById("urgent").value);

    const link =
        Number(document.getElementById("link").value);

    const otp =
        Number(document.getElementById("otp").value);

    const offer =
        Number(document.getElementById("offer").value);


    // Calculate individual risk points

    const senderRisk =
        sender === 1 ? RISK_POINTS.sender : 0;

    const urgentRisk =
        urgent === 1 ? RISK_POINTS.urgent : 0;

    const linkRisk =
        link === 1 ? RISK_POINTS.link : 0;

    const otpRisk =
        otp === 1 ? RISK_POINTS.otp : 0;

    const offerRisk =
        offer === 1 ? RISK_POINTS.offer : 0;


    // Calculate total score

    const totalScore =
        senderRisk +
        urgentRisk +
        linkRisk +
        otpRisk +
        offerRisk;


    // ==========================================
    // DISPLAY SCORE
    // ==========================================

    animateScore(totalScore);


    // Main progress meter

    const meter =
        document.getElementById("meterFill");

    meter.style.width = totalScore + "%";


    // ==========================================
    // DISPLAY BREAKDOWN
    // ==========================================

    document.getElementById("senderPoints").textContent =
        senderRisk + " / 15";

    document.getElementById("urgentPoints").textContent =
        urgentRisk + " / 15";

    document.getElementById("linkPoints").textContent =
        linkRisk + " / 25";

    document.getElementById("otpPoints").textContent =
        otpRisk + " / 30";

    document.getElementById("offerPoints").textContent =
        offerRisk + " / 15";


    // Breakdown bars

    document.getElementById("senderBar").style.width =
        (senderRisk / 15 * 100) + "%";

    document.getElementById("urgentBar").style.width =
        (urgentRisk / 15 * 100) + "%";

    document.getElementById("linkBar").style.width =
        (linkRisk / 25 * 100) + "%";

    document.getElementById("otpBar").style.width =
        (otpRisk / 30 * 100) + "%";

    document.getElementById("offerBar").style.width =
        (offerRisk / 15 * 100) + "%";


    // ==========================================
    // DETERMINE RISK LEVEL
    // ==========================================

    let level;
    let icon;

    if (totalScore >= 70) {

        level = "HIGH RISK";
        icon = "🚨";

    }
    else if (totalScore >= 40) {

        level = "MEDIUM RISK";
        icon = "⚠️";

    }
    else {

        level = "LOW RISK";
        icon = "🛡️";

    }


    // Display level

    document.getElementById("level").textContent =
        level;

    document.getElementById("resultIcon").textContent =
        icon;


    // Change risk level appearance

    const levelElement =
        document.getElementById("level");

    if (totalScore >= 70) {

        levelElement.style.color = "#ef4444";

    }
    else if (totalScore >= 40) {

        levelElement.style.color = "#f59e0b";

    }
    else {

        levelElement.style.color = "#22c55e";

    }


    // ==========================================
    // RISK ANALYSIS
    // ==========================================

    let analysisHTML =
        "<h3>🔍 Risk Analysis</h3>";


    if (sender === 1) {

        analysisHTML +=
            "<p>⚠️ Unknown sender detected</p>";

    }
    else {

        analysisHTML +=
            "<p>✓ Sender appears known</p>";

    }


    if (urgent === 1) {

        analysisHTML +=
            "<p>⚠️ Urgent or threatening language detected</p>";

    }
    else {

        analysisHTML +=
            "<p>✓ No urgent language detected</p>";

    }


    if (link === 1) {

        analysisHTML +=
            "<p>⚠️ Suspicious link detected</p>";

    }
    else {

        analysisHTML +=
            "<p>✓ No suspicious link detected</p>";

    }


    if (otp === 1) {

        analysisHTML +=
            "<p>⚠️ OTP/password request detected</p>";

    }
    else {

        analysisHTML +=
            "<p>✓ No OTP/password request detected</p>";

    }


    if (offer === 1) {

        analysisHTML +=
            "<p>⚠️ Unrealistic offer detected</p>";

    }
    else {

        analysisHTML +=
            "<p>✓ No unrealistic offer detected</p>";

    }


    document.getElementById("analysis").innerHTML =
        analysisHTML;


    // ==========================================
    // RECOMMENDED ACTION
    // ==========================================

    let recommendationHTML =
        "<h3>🛡️ Recommended Action</h3>";


    if (totalScore >= 70) {

        recommendationHTML +=
            "<p><strong>HIGH RISK:</strong> Do not click suspicious links or share OTP, passwords or payment information. Verify the source through an official channel.</p>";

    }
    else if (totalScore >= 40) {

        recommendationHTML +=
            "<p><strong>MEDIUM RISK:</strong> Verify the sender or source before taking any action.</p>";

    }
    else {

        recommendationHTML +=
            "<p><strong>LOW RISK:</strong> No major warning signs detected. You can proceed, but always stay cautious.</p>";

    }


    document.getElementById("recommendation").innerHTML =
        recommendationHTML;


    // ==========================================
    // SCROLL TO RESULT
    // ==========================================

    setTimeout(function () {

        document.getElementById("result").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 300);

}


// ==========================================
// SCORE ANIMATION
// ==========================================

function animateScore(finalScore) {

    const scoreElement =
        document.getElementById("scoreNumber");

    let currentScore = 0;

    const duration = 1200;

    const startTime = performance.now();


    function updateScore(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        // Smooth animation

        currentScore =
            Math.floor(finalScore * progress);


        scoreElement.textContent =
            currentScore;


        if (progress < 1) {

            requestAnimationFrame(updateScore);

        }
        else {

            scoreElement.textContent =
                finalScore;

        }

    }


    requestAnimationFrame(updateScore);

}


// ==========================================
// RESET
// ==========================================

function resetAssessment() {

    // Reset all selections

    document.getElementById("sender").value = "0";

    document.getElementById("urgent").value = "0";

    document.getElementById("link").value = "0";

    document.getElementById("otp").value = "0";

    document.getElementById("offer").value = "0";


    // Reset score

    document.getElementById("scoreNumber").textContent =
        "0";


    // Reset meter

    document.getElementById("meterFill").style.width =
        "0%";


    // Reset breakdown numbers

    document.getElementById("senderPoints").textContent =
        "0 / 15";

    document.getElementById("urgentPoints").textContent =
        "0 / 15";

    document.getElementById("linkPoints").textContent =
        "0 / 25";

    document.getElementById("otpPoints").textContent =
        "0 / 30";

    document.getElementById("offerPoints").textContent =
        "0 / 15";


    // Reset breakdown bars

    document.getElementById("senderBar").style.width =
        "0%";

    document.getElementById("urgentBar").style.width =
        "0%";

    document.getElementById("linkBar").style.width =
        "0%";

    document.getElementById("otpBar").style.width =
        "0%";

    document.getElementById("offerBar").style.width =
        "0%";


    // Reset risk level

    document.getElementById("level").textContent =
        "LOW RISK";

    document.getElementById("level").style.color =
        "#22c55e";


    // Reset icon

    document.getElementById("resultIcon").textContent =
        "🛡️";


    // Clear analysis

    document.getElementById("analysis").innerHTML =
        "";


    // Clear recommendation

    document.getElementById("recommendation").innerHTML =
        "";


    // Go back to safety check

    document.querySelector(".card").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}