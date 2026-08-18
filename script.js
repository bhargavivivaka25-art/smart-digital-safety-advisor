// ==========================================
// RISK WEIGHTS
// ==========================================

const weights = {
    sender: 15,
    urgent: 15,
    link: 25,
    otp: 30,
    offer: 15
};


// ==========================================
// MAIN FUNCTION
// ==========================================

function analyzeSafety() {

    // Get values from the five questions

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


    // Get message and link

    const message =
        document
            .getElementById("messageInput")
            .value
            .toLowerCase();

    const linkText =
        document
            .getElementById("linkInput")
            .value
            .toLowerCase();


    // ======================================
    // CALCULATE SCORE
    // ======================================

    const senderScore =
        sender * weights.sender;

    const urgentScore =
        urgent * weights.urgent;

    const linkScore =
        link * weights.link;

    const otpScore =
        otp * weights.otp;

    const offerScore =
        offer * weights.offer;


    const score =
        senderScore +
        urgentScore +
        linkScore +
        otpScore +
        offerScore;


    // ======================================
    // RISK LEVEL
    // ======================================

    let level;
    let icon;


    if (score <= 30) {

        level = "LOW RISK";

        icon = "🟢";

    }

    else if (score <= 60) {

        level = "MEDIUM RISK";

        icon = "🟡";

    }

    else {

        level = "HIGH RISK";

        icon = "🚨";

    }


    // ======================================
    // DISPLAY SCORE
    // ======================================

    document.getElementById(
        "scoreNumber"
    ).textContent = score;


    document.getElementById(
        "level"
    ).textContent = level;


    document.getElementById(
        "resultIcon"
    ).textContent = icon;


    // ======================================
    // MAIN PROGRESS BAR
    // ======================================

    document.getElementById(
        "meterFill"
    ).style.width = score + "%";


    // ======================================
    // CIRCLE PROGRESS
    // ======================================

    const circle =
        document.getElementById(
            "progressCircle"
        );


    const circumference = 616;


    const offset =
        circumference -
        (score / 100) * circumference;


    circle.style.strokeDashoffset =
        offset;


    // ======================================
    // RISK BREAKDOWN
    // ======================================

    updateBar(
        "senderPoints",
        "senderBar",
        senderScore,
        weights.sender
    );


    updateBar(
        "urgentPoints",
        "urgentBar",
        urgentScore,
        weights.urgent
    );


    updateBar(
        "linkPoints",
        "linkBar",
        linkScore,
        weights.link
    );


    updateBar(
        "otpPoints",
        "otpBar",
        otpScore,
        weights.otp
    );


    updateBar(
        "offerPoints",
        "offerBar",
        offerScore,
        weights.offer
    );


    // ======================================
    // MESSAGE ANALYSIS
    // ======================================

    showMessageAnalysis(
        message,
        linkText
    );


    // ======================================
    // RECOMMENDATION
    // ======================================

    showRecommendation(score);


    // ======================================
    // SHOW RESULT
    // ======================================

    document
        .getElementById("result")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


// ==========================================
// UPDATE RISK BAR
// ==========================================

function updateBar(
    textId,
    barId,
    value,
    maximum
) {

    document.getElementById(
        textId
    ).textContent =
        value + " / " + maximum;


    const percentage =
        (value / maximum) * 100;


    document.getElementById(
        barId
    ).style.width =
        percentage + "%";
}


// ==========================================
// MESSAGE ANALYSIS
// ==========================================

function showMessageAnalysis(
    message,
    linkText
) {

    const analysis =
        document.getElementById(
            "analysis"
        );


    let warnings = [];


    // OTP

    if (
        message.includes("otp") ||
        message.includes("password") ||
        message.includes("passcode") ||
        message.includes("pin")
    ) {

        warnings.push(
            "⚠️ Message contains OTP, password or PIN related words."
        );

    }


    // URGENT

    if (
        message.includes("urgent") ||
        message.includes("immediately") ||
        message.includes("act now") ||
        message.includes("verify now") ||
        message.includes("account blocked") ||
        message.includes("account suspended")
    ) {

        warnings.push(
            "⚠️ Message contains urgent or pressure-based language."
        );

    }


    // OFFER

    if (
        message.includes("you won") ||
        message.includes("winner") ||
        message.includes("prize") ||
        message.includes("lottery") ||
        message.includes("reward") ||
        message.includes("jackpot")
    ) {

        warnings.push(
            "⚠️ Message contains a prize or reward related term."
        );

    }


    // LINK

    if (
        message.includes("http://") ||
        message.includes("https://") ||
        message.includes("www.") ||
        message.includes("click here") ||
        linkText.includes("http://") ||
        linkText.includes("https://") ||
        linkText.includes("www.")
    ) {

        warnings.push(
            "⚠️ A link or link-related content was detected."
        );

    }


    // NO WARNING

    if (warnings.length === 0) {

        analysis.innerHTML = `
            <p>
                ✓ No common suspicious keywords were detected
                in the provided message.
            </p>
        `;

        return;
    }


    // DISPLAY WARNINGS

    let html = "";

    for (
        let i = 0;
        i < warnings.length;
        i++
    ) {

        html +=
            "<p>" +
            warnings[i] +
            "</p>";

    }


    html += `
        <p>
            ℹ️ These are keyword-based observations.
            The final risk score is calculated from your
            Yes/No answers.
        </p>
    `;


    analysis.innerHTML = html;
}


// ==========================================
// RECOMMENDATION
// ==========================================

function showRecommendation(score) {

    const recommendation =
        document.getElementById(
            "recommendation"
        );


    if (score <= 30) {

        recommendation.innerHTML = `

            <h3>
                🟢 Recommended Action
            </h3>

            <p>
                LOW RISK: Few common risk indicators were selected.
                You can proceed, but continue to stay cautious.
            </p>

        `;

    }

    else if (score <= 60) {

        recommendation.innerHTML = `

            <h3>
                🟡 Recommended Action
            </h3>

            <p>
                MEDIUM RISK: Some warning signs were selected.
                Verify the sender or source before taking action.
            </p>

        `;

    }

    else {

        recommendation.innerHTML = `

            <h3>
                🚨 Recommended Action
            </h3>

            <p>
                HIGH RISK: Do not click suspicious links or
                share OTP, passwords or payment information.
                Verify the source through an official channel.
            </p>

        `;

    }
}


// ==========================================
// RESET
// ==========================================

function resetAssessment() {

    // Clear message

    document.getElementById(
        "messageInput"
    ).value = "";


    // Clear link

    document.getElementById(
        "linkInput"
    ).value = "";


    // Reset questions

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


    // Reset score

    document.getElementById(
        "scoreNumber"
    ).textContent = "0";


    document.getElementById(
        "level"
    ).textContent = "LOW RISK";


    document.getElementById(
        "resultIcon"
    ).textContent = "🛡️";


    // Reset meter

    document.getElementById(
        "meterFill"
    ).style.width = "0%";


    document.getElementById(
        "progressCircle"
    ).style.strokeDashoffset = "616";


    // Reset bars

    updateBar(
        "senderPoints",
        "senderBar",
        0,
        15
    );


    updateBar(
        "urgentPoints",
        "urgentBar",
        0,
        15
    );


    updateBar(
        "linkPoints",
        "linkBar",
        0,
        25
    );


    updateBar(
        "otpPoints",
        "otpBar",
        0,
        30
    );


    updateBar(
        "offerPoints",
        "offerBar",
        0,
        15
    );


    // Reset analysis

    document.getElementById(
        "analysis"
    ).innerHTML = `
        <p>
            Enter a message and analyze it.
        </p>
    `;


    // Reset recommendation

    document.getElementById(
        "recommendation"
    ).innerHTML = `

        <h3>
            🛡️ Recommended Action
        </h3>

        <p>
            Analyze the message to receive safety guidance.
        </p>

    `;


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}
