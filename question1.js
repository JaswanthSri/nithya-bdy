let attempts = 0;
const maxAttempts = 3;
const correctAnswer = "krishnamoorthi";
const answerBox = document.getElementById('answerBox');
const resultMessage = document.getElementById('resultMessage');
const videoContainer = document.getElementById('videoContainer');
const nextQuestionButton = document.getElementById('nextQuestionButton');
const answerImage = document.getElementById('answerImage');
let scoreUpdated = false; // Flag to track if the score has already been updated



document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the submit button
    document.querySelector('.submit-button').addEventListener('click', function() {
        checkAnswer();
    });
});

function checkAnswer() {
    attempts++;
    const userAnswer = answerBox.value.trim().toLowerCase();

    if (userAnswer.startsWith(correctAnswer.substring(0, 4))) {
        if (!scoreUpdated) {
            updateScore(); // Update the score when the answer is correct
            scoreUpdated = true;
        }
        displayResult("Correct Answer! Congratulations", true);
    } else {
        if (attempts >= maxAttempts) {
            answerBox.value = correctAnswer;
            displayResult("The correct answer is displayed.", false);
            nextQuestionButton.style.display = 'inline-block';
        } else {
            displayResult("You are wrong. Try again", false);
        }
    }
}

function displayResult(message, isCorrect) {
    resultMessage.textContent = message;
    resultMessage.style.display = 'block';
    resultMessage.className = 'result-message';
    if (isCorrect) {
        playVideo('answer.mp4');
        showAnswerImage();
        nextQuestionButton.style.display = 'inline-block';
        resultMessage.style.color = 'green';
    } else {
        playVideo('wrong.mp4');
        resultMessage.style.color = 'red';
        if (attempts >= maxAttempts) {
            showAnswerImage();
            nextQuestionButton.style.display = 'inline-block';
        }
    }
}

function playVideo(videoFile) {
    videoContainer.innerHTML = `
        <video width="320" height="240" autoplay>
            <source src="${videoFile}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    const videoElement = videoContainer.querySelector('video');
    videoElement.onended = () => videoElement.play(); // Play twice
    videoElement.addEventListener('ended', function () {
        videoContainer.innerHTML = ''; // Clear the video after playing it once
    }, { once: true });
}

function showAnswerImage() {
    answerImage.style.display = 'block';
    setTimeout(() => {
        answerImage.style.display = 'none';
    }, 5000); // Display the image for 5 seconds
}

function goToNextQuestion() {
    window.location.href = 'question2.html'; // Replace with the actual URL of the next question
}

// Function to update the score
function updateScore() {
    let correctAnswers = parseInt(localStorage.getItem('correctAnswers'), 10) || 0;
    correctAnswers++;
    localStorage.setItem('correctAnswers', correctAnswers);
}
