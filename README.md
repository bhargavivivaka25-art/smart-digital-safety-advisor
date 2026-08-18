# 🛡️ Smart Digital Safety Advisor

A rule-based digital safety web application designed to help users identify common online risk indicators before clicking links, responding to messages, or sharing sensitive information.

## 📌 Project Overview

The Smart Digital Safety Advisor evaluates common digital safety indicators such as unknown senders, urgent messages, suspicious links, OTP/password requests, and unrealistic offers.

The application assigns different risk weights to each indicator and calculates an overall risk score from **0 to 100**.

Based on the score, the system classifies the situation as:

* 🟢 Low Risk
* 🟡 Medium Risk
* 🔴 High Risk

## ✨ Features

* Message and link input
* Five rule-based security checks
* Weighted risk scoring
* Risk level classification
* Risk score breakdown
* Keyword-based warning analysis
* Safety recommendations
* Interactive progress indicators
* New assessment/reset option
* Responsive web interface

## ⚙️ Technologies Used

* **Python** — rule-based scoring logic and project prototype
* **HTML** — webpage structure
* **CSS** — user interface and responsive design
* **JavaScript** — interactive analysis, calculations and result display
* **GitHub Pages** — project deployment

## 🧠 Risk Scoring

| Risk Indicator         | Maximum Score |
| ---------------------- | ------------: |
| Unknown Sender         |            15 |
| Urgent Message         |            15 |
| Suspicious Link        |            25 |
| OTP / Password Request |            30 |
| Unrealistic Offer      |            15 |
| **Total**              |       **100** |

The final score is calculated using predefined rules and weights.

## 🔄 How It Works

1. The user enters a message or link.
2. The user answers five security questions.
3. Each `Yes` answer activates its corresponding risk weight.
4. The system calculates the total risk score.
5. The score is classified into Low, Medium, or High Risk.
6. The application displays the risk breakdown and recommended safety action.

## 🎯 Purpose

The purpose of this project is to demonstrate how simple rule-based logic can be used to create an interactive digital safety assessment tool and improve awareness of common online security risks.

## ⚠️ Disclaimer

This project is an educational rule-based assessment tool. It is not a guaranteed scam detector and should not replace professional cybersecurity tools or official verification.

## 🌐 Live Demo

https://github.com/bhargavivivaka29/smart-digital-safety-advisor

## 👩‍💻 Author

**Bhargavi Vivaka**

CSE (Data Science) Student
