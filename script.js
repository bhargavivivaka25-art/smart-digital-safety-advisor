// ==========================================
// SMART DIGITAL SAFETY ADVISOR
// ==========================================


// Risk weights

const RISK = {
    sender: 15,
    urgent: 15,
    link: 25,
    otp: 30,
    offer: 15
};


// ==========================================
// ANALYZE
// ==========================================

function checkSafety() {

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


    // Calculate risk

    const senderRisk =
        sender * RISK.sender;

    const urgentRisk =
        urgent * RISK.urgent;

    const linkRisk =
        link * RISK.link;

    const otpRisk =
        otp * RISK.otp;

    const offerRisk =
        offer * RISK.offer;


    const total =
        senderRisk +
        urgentRisk +
        linkRisk +
        otpRisk +
        offerRisk;


    // Score animation

    animateScore(total);


    // Main progress bar

    document.getElementById(
        "meterFill"
    ).style.width = total + "%";


    // Breakdown numbers

    document.getElementById(
        "senderPoints"
    ).textContent =
        senderRisk + " / 15";

    document.getElementById(
        "urgentPoints"
    ).textContent =
        urgentRisk + " / 15";

    document.getElementById(
        "linkPoints"
    ).textContent =
        linkRisk + " / 25";

    document.getElementById(
        "otpPoints"
    ).textContent =
        otpRisk + " / 30";

    document.getElementById(
        "offerPoints"
    ).textContent =
        offerRisk + " / 15";


    // Breakdown bars

    document.getElementById(
        "senderBar"
    ).style.width =
        (senderRisk / 15 * 100) + "%";


    document.getElementById(
        "urgentBar"
    ).style.width =
        (urgentRisk / 15 * 100) + "%";


    document.getElementById(
        "linkBar"
    ).style.width =
        (linkRisk / 25 * 100) + "%";


    document.getElementById(
        "otpBar"
    ).style.width =
        (otpRisk / 30 * 100) + "%";


    document.getElementById(
        "offerBar"
    ).style.width =
        (offerRisk / 15 * 100) + "%";


    // Risk level

    let level;
    let icon;
    let color;


    if (total >= 70) {

        level = "HIGH RISK";
        icon = "🚨";
        color = "#ef4444";

    }

    else if (total >= 40) {

        level = "MEDIUM RISK";
        icon = "⚠️";
        color = "#f59e0b";

    }

    else {

        level = "LOW RISK";
        icon = "🛡️";
        color = "#22c55e";

    }


    document.getElementById(
        "level"
    ).textContent = level;

    document.getElementById(
        "level"
    ).style.color = color;

    document.getElementById(
        "resultIcon"
    ).textContent = icon;


    // ==========================================
    // ANALYSIS
    // ==========================================

    let analysis = `
        <h3>🔍 Risk Analysis</h3>
    `;


    analysis += sender
        ? "<p>⚠️ Unknown sender detected</p>"
        : "<p>✓ Sender appears known</p>";


    analysis += urgent
        ? "<p>⚠️ Urgent or threatening language detected</p>"
        : "<p>✓ No urgent language detected</p>";


    analysis += link
        ? "<p>⚠️ Suspicious link detected</p>"
        : "<p>✓ No suspicious link detected</p>";


    analysis += otp
        ? "<p>⚠️ OTP/password request detected</p>"
        : "<p>✓ No OTP/password request detected</p>";


    analysis += offer
        ? "<p>⚠️ Unrealistic offer detected</p>"
        : "<p>✓ No unrealistic offer detected</p>";


    document.getElementById(
        "analysis"
    ).innerHTML = analysis;


    // ==========================================
    // RECOMMENDATION
    // ==========================================

    let recommendation;


    if (total >= 70) {

        recommendation = `
            <h3>🚨 Recommended Action</h3>

            <p>
                <strong>HIGH RISK:</strong>
                Do not click suspicious links or share
                OTP, passwords or payment information.
                Verify the source through an official channel.
            </p>
        `;

    }

    else if (total >= 40) {

        recommendation = `
            <h3>🟠 Recommended Action</h3>

            <p>
                <strong>MEDIUM RISK:</strong>
                Verify the sender or source before taking
                any action.
            </p>
        `;

    }

    else {

        recommendation = `
            <h3>🟢 Recommended Action</h3>

            <p>
                <strong>LOW RISK:</strong>
                No major warning signs detected.
                You can proceed, but always stay cautious.
            </p>
        `;

    }


    document.getElementById(
        "recommendation"
    ).innerHTML = recommendation;


    // Scroll to result

    setTimeout(() => {

        document.getElementById(
            "result"
        ).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 300);

}


// ==========================================
// SCORE + CIRCLE ANIMATION
// ==========================================

function animateScore(finalScore) {

    const scoreElement =
        document.getElementById("scoreNumber");

    const circle =
        document.getElementById("progressCircle");


    // Circle circumference
    // 2 × π × 95 ≈ 597

    const circumference = 597;


    circle.style.strokeDasharray =
        circumference;

    circle.style.strokeDashoffset =
        circumference;


    let startTime = null;

    const duration = 1200;


    function animation(currentTime) {

        if (!startTime) {
            startTime = currentTime;
        }


        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Smooth easing

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentScore =
            Math.floor(
                finalScore * eased
            );


        // Number

        scoreElement.textContent =
            currentScore;


        // Circular progress

        const offset =
            circumference -
            (
                currentScore /
                100
            ) *
            circumference;


        circle.style.strokeDashoffset =
            offset;


        // Circle color

        if (finalScore >= 70) {

            circle.style.stroke =
                "#ef4444";

        }

        else if (finalScore >= 40) {

            circle.style.stroke =
                "#f59e0b";

        }

        else {

            circle.style.stroke =
                "#22c55e";

        }


        if (progress < 1) {

            requestAnimationFrame(
                animation
            );

        }

        else {

            scoreElement.textContent =
                finalScore;

        }

    }


    requestAnimationFrame(
        animation
    );
}


// ==========================================
// RESET
// ==========================================

function resetAssessment() {

    document.getElementById(
        "sender"
    ).value = "0";

    document.getElementById(
        "urgent"
    ).value = "0";

    document.getElementById(
        "link"
    ).value = "0";

    document.getElementById(
        "otp"
    ).value = "0";

    document.getElementById(
        "offer"
    ).value = "0";


    // Score

    document.getElementById(
        "scoreNumber"
    ).textContent = "0";


    // Circle

    const circle =
        document.getElementById(
            "progressCircle"
        );

    circle.style.strokeDashoffset =
        "597";

    circle.style.stroke =
        "#22c55e";


    // Meter

    document.getElementById(
        "meterFill"
    ).style.width = "0%";


    // Breakdown

    document.getElementById(
        "senderPoints"
    ).textContent = "0 / 15";

    document.getElementById(
        "urgentPoints"
    ).textContent = "0 / 15";

    document.getElementById(
        "linkPoints"
    ).textContent = "0 / 25";

    document.getElementById(
        "otpPoints"
    ).textContent = "0 / 30";

    document.getElementById(
        "offerPoints"
    ).textContent = "0 / 15";


    document.getElementById(
        "senderBar"
    ).style.width = "0%";

    document.getElementById(
        "urgentBar"
    ).style.width = "0%";

    document.getElementById(
        "linkBar"
    ).style.width = "0%";

    document.getElementById(
        "otpBar"
    ).style.width = "0%";

    document.getElementById(
        "offerBar"
    ).style.width = "0%";


    // Risk level

    document.getElementById(
        "level"
    ).textContent =
        "LOW RISK";

    document.getElementById(
        "level"
    ).style.color =
        "#22c55e";


    // Icon

    document.getElementById(
        "resultIcon"
    ).textContent =
        "🛡️";


    // Clear result sections

    document.getElementById(
        "analysis"
    ).innerHTML = "";

    document.getElementById(
        "recommendation"
    ).innerHTML = "";


    // Scroll

    document.querySelector(
        ".card"
    ).scrollIntoView({
        behavior: "smooth"
    });

}