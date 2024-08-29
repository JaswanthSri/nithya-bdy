document.addEventListener('DOMContentLoaded', function() {
    let attempts = 0;
    const maxAttempts = 3;
    const correctAnswer = "ijk";
    const answerBox = document.getElementById('answerBox');
    const resultMessage = document.getElementById('resultMessage');
    const videoContainer = document.getElementById('videoContainer');
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    const answerImage = document.getElementById('answerImage');
    const hintOverlay = document.getElementById('hintOverlay');
    const hintButton = document.getElementById('hintButton');
    const closeHint = document.getElementById('closeHint');
    const submitButton = document.getElementById('submitButton'); // Updated ID
    let scoreUpdated = false; // Flag to track if the score has already been updated

    // Initially hide the hint overlay and the "Go To Main Page" button when the page loads
    hintOverlay.style.display = 'none';
    nextQuestionButton.style.display = 'none'; // Ensure the button is hidden initially

    // Event listener for the submit button
    submitButton.addEventListener('click', function() { // Updated to use the ID
        checkAnswer();
    });

    // Event listener for the hint button
    hintButton.addEventListener('click', function() {
        hintOverlay.style.display = 'flex'; // Show the hint overlay when the hint button is clicked
    });

    // Event listener for the close button in the hint overlay
    closeHint.addEventListener('click', function() {
        hintOverlay.style.display = 'none'; // Hide the hint overlay when the close button is clicked
    });

    // Event listener for the "Go To Main Page" button
    nextQuestionButton.addEventListener('click', function() {
        window.location.href = 'main_page.html'; // Redirect to the main page
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
        // No more questions, just display the score or handle end of quiz
        showGoToMainPageButton(); // Show the "Go To Main Page" button
    }

    // Function to update the score
    function updateScore() {
        let correctAnswers = parseInt(localStorage.getItem('correctAnswers'), 10) || 0;
        correctAnswers++;
        localStorage.setItem('correctAnswers', correctAnswers);
    }

    // Function to display the score on the final question
    function displayScore() {
        let correctAnswers = parseInt(localStorage.getItem('correctAnswers'), 10) || 0;
        document.getElementById('scoreDisplay').textContent = `Score: ${correctAnswers}/15`;
    }

    function showGoToMainPageButton() {
        nextQuestionButton.style.display = 'inline-block'; // Show the button
    }
});
