(function () {
    var httpRequest,
        baseURL = "http://localhost:51912",
        method = {
            post: 'POST',
            get: 'GET'
        },
        tracker = {
            art: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            },
            entertainment: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            },
            geography: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            },
            history: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            },
            science: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            },
            sports: {
                isCompleteFlag: false,
                stars: 0,
                lemons: 0
            }
        },
        currentQuestion = {},
        correctAnswer = "",
        btnSpin = document.getElementById("btn-spin"),
        uiStart = document.getElementById("start-screen"),
        uiReady = document.getElementById("ready-text"),
        uiPlayersChoice = document.getElementById("players-choice"),
        uiQuestion = document.getElementById("question-area"),
        uiTracker = document.getElementById("game-tracker"),
        displayCategory = document.getElementById("category"),
        displayQuestion = document.getElementById("question"),
        displayAnswers = document.getElementById("answers"),
        answers = Array.from(document.querySelectorAll("#answers>p")),
        answerValues = answers.map(function (item) { return item.innerHTML; }),
        answer = document.getElementById("answers").addEventListener("click", checkIfCorrect),
        answerResponse = document.getElementById("answer-response"),
        displayAnswerResponse = document.getElementById("display-answer-response"),
        btnArt = document.getElementById("btn-art");
        btnEntertainment = document.getElementById("btn-entertainment");
        btnGeography = document.getElementById("btn-geography");
        btnHistory = document.getElementById("btn-history");
        btnScience = document.getElementById("btn-science");
        btnSports = document.getElementById("btn-sports");
        btnContinue = document.getElementById("btn-continue");

    var theWheel = new Winwheel({
        'outerRadius': 220,        // Set outer radius so wheel fits inside the background.
        'innerRadius': 30,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize': 18,         // Set default font size for the segments.
        'textOrientation': 'horizontal', // Make text vertial so goes down from the outside of wheel.
        'textAlignment': 'center',    // Align text to outside of wheel.
        'numSegments': 7,         // Specify number of segments.
        'rotationAngle': -26,
        'segments':             // Define segments including colour and text.
        [
            { 'fillStyle': '#ee2a36', 'text': 'Art' },
            { 'fillStyle': '#e85aa2', 'text': 'Entertainment' },
            { 'fillStyle': '#864fa0', 'text': 'Choose Flag' },
            { 'fillStyle': '#2774ba', 'text': 'Geography' },
            { 'fillStyle': '#44b968', 'text': 'Science' },
            { 'fillStyle': '#f7e042', 'text': 'History' },
            { 'fillStyle': '#f8951e', 'text': 'Sports' }
        ],
        'animation': // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 7,
            'spins': 3,
            'callbackFinished': getQuestionByCategory
        }
    });


    // Wired up event listeners
    btnSpin.addEventListener("click", function () {
        startSpin();
    });
    btnContinue.addEventListener("click", function () {
        continueGame();
    });
    btnArt.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/Art');
    });
    btnEntertainment.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/Entertainment');
    });
    btnGeography.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/Geography');
    });
    btnHistory.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/History');
    });
    btnScience.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/Science');
    });
    btnSports.addEventListener("click", function () {
        getQuestions('GET', baseURL + '/api/sqldata/questions/Sports');
    });

    var sampleData = [
        {
            "id": 1,
            "question": "In what Shakespeare play is there a character called Mercutio?",
            "category": "Art",
            "user": "Admin",
            "dateCreate": "2018-02-24T10:41:28.8098795-05:00",
            "dateUpdate": "2018-02-24T10:41:28.8113055-05:00",
            "answers":
            [
                {
                    "id": 1,
                    "questionId": 1,
                    "answerOpt": "Othello",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 2,
                    "questionId": 1,
                    "answerOpt": "Romeo and Juliet",
                    "isCorrect": true,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 3,
                    "questionId": 1,
                    "answerOpt": "King Leer",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 4,
                    "questionId": 1,
                    "answerOpt": "Cats",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                }
            ]
        },
        {
            "id": 2,
            "question": "What is Water?",
            "category": "Science",
            "user": "Admin",
            "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
            "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
            "answers":
            [
                {
                    "id": 1,
                    "questionId": 2,
                    "answerOpt": "Gas",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 2,
                    "questionId": 2,
                    "answerOpt": "Solid",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 3,
                    "questionId": 2,
                    "answerOpt": "Plasma",
                    "isCorrect": false,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                },
                {
                    "id": 4,
                    "questionId": 2,
                    "answerOpt": "Liquid",
                    "isCorrect": true,
                    "user": "Admin",
                    "dateCreate": "2018-02-24T10:41:28.8450802-05:00",
                    "dateUpdate": "2018-02-24T10:41:28.845083-05:00",
                }
            ]
        }
    ];

    var wheelSpinning = false;

    function startSpin() {
        if (wheelSpinning == false) {
            theWheel.animation.spins = 7;
            theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
            theWheel.startAnimation();
            wheelSpinning = true;
        }
    }

    function resetWheel() {
        theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.   
        theWheel.draw();                // Call draw to render changes to the wheel.
        wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    }

    // Called when the spin animation has finished.
    function getQuestionByCategory(indicatedSegment) {
        if (indicatedSegment.text == "Choose Flag") {
            uiPlayersChoice.style.display = "Block";
            uiStart.style.display = "none";
            resetWheel();
            return;
        }
        getQuestions('GET', baseURL + '/api/sqldata/questions/' + indicatedSegment.text);// SQL controller (ApiController.cs)
    }

    function getQuestions(method, uri) {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log('ERROR getting questions: Cannot create an XMLHTTP instance.');
            return false;
        }
        httpRequest.open(method, uri);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    httpRequest.onload = function () {
                        var data = JSON.parse(httpRequest.responseText);
                        renderQuestion(data);
                        console.log("List of Questions:");//
                        console.log(data);//
                    }
                } else {
                    console.log('[getQuestions] There was a problem with the request.');
                }
            }
        };
        httpRequest.send();
    }

    function renderQuestion(jsonData) {
        var questions = jsonData;
        var count = questions.length;
        var question = questions[random(0, (count - 1))];
        currentQuestion = question;
        console.log(currentQuestion);//
        uiStart.style.display = "none";
        uiPlayersChoice.style.display = "none";
        answerResponse.style.display = "none";
        uiQuestion.style.display = "block";
        displayCategory.innerText = question.category + "!";
        displayQuestion.innerText = question.question;
        displayAnswers.innerHTML = "";
        for (var i = 0; i < question.answers.length; i++){
            displayAnswers.innerHTML += '<p id="answer-option-' + i + '" class="answer-option">' + question.answers[i].answerOpt + '</p>';
            if (question.answers[i].isCorrect == true){
                correctAnswer = question.answers[i].answerOpt;
            }
        }
        console.log(correctAnswer);//
    }

    function checkIfCorrect(event) {
        var selectedText = event.target.innerText;
        var selectedId = document.getElementById(event.target.id);
        var answerOptions = document.getElementsByClassName("answer-option");
        if (selectedText === correctAnswer) {
            selectedId.classList.add("correct");
            answerResponse.style.display = "block";
            displayAnswerResponse.innerText = "Correct!";
            switch (currentQuestion.category) {
                case "Art":
                    if (tracker.art.stars != 3){
                        tracker.art.stars++;
                    }
                    break;
                case "Entertainment":
                    if (tracker.entertainment.stars != 3) {
                        tracker.entertainment.stars++;
                    }
                    break;
                case "Geography":
                    if (tracker.geography.stars != 3) {
                        tracker.geography.stars++;
                    }
                    break;
                case "History":
                    if (tracker.history.stars != 3) {
                        tracker.history.stars++;
                    }
                    break;
                case "Science":
                    if (tracker.science.stars != 3) {
                        tracker.science.stars++;
                    }
                    break;
                case "Sports":
                    if (tracker.sports.stars != 3) {
                        tracker.sports.stars++;
                    } 
                    break;
            }
            renderTracker(tracker);
            return;
        }
        selectedId.classList.add("incorrect");
        answerResponse.style.display = "block";
        displayAnswerResponse.innerText = "Sorry, that's incorrect";
        switch (currentQuestion.category) {
            case "Art":
                tracker.art.lemons++;
                break;
            case "Entertainment":
                tracker.entertainment.lemons++;
                break;
            case "Geography":
                tracker.geography.lemons++;
                break;
            case "History":
                tracker.history.lemons++;
                break;
            case "Science":
                tracker.science.lemons++;
                break;
            case "Sports":
                tracker.sports.lemons++;
                break;
        }
        console.log(tracker);
        renderTracker(tracker);
    }

    function renderTracker(trackerObj) {
        // Possibly add Duck typing here to validate the object being passed in
        var htmlStr = "";
        uiTracker.innerHTML = "";
        for (var category in trackerObj) {
            // create category DIV start
            htmlStr += '<div id="tracker-' + category + '" class="cat-tracker">';
            // create isComplete flag DIV start/end
            if (trackerObj[category].stars < 3) {
                htmlStr += '<div><h3><i class="far fa-flag ' + category + '"></i></h3></div>';
            } else {
                htmlStr += '<div><h3><i class="fas fa-flag ' + category + '"></i></h3></div>';
            }
            // create stars DIV start
            htmlStr += '<div>';
            // create stars I start/end
            for (var i = 1; i <= trackerObj[category].stars; i++) {
                htmlStr += '<i class="fas fa-star"></i> ';
            }
            for (var i = 1; i <= (3 - trackerObj[category].stars); i++) {
                htmlStr += '<i class="far fa-star" ></i > ';
            }
            // create stars DIV end
            htmlStr += '</div>';
            // create lemons DIV start
            htmlStr += '<div>';
            // create lemons I start/end
            for (var i = 1; i <= trackerObj[category].lemons; i++) {
                htmlStr += '<i class="fas fa-lemon"></i> ';
            }
            for (var i = 1; i <= (3 - trackerObj[category].lemons); i++) {
                htmlStr += '<i class="far fa-lemon"></i> ';
            }
            // create lemons DIV end
            htmlStr += '</div>';
            // create category DIV end
            htmlStr += '</div>';
        }  
        uiTracker.innerHTML = htmlStr;
        isGameOver(tracker);
    }

    function continueGame() {
        uiQuestion.style.display = "none";
        uiStart.style.display = "block";
        uiReady.innerHTML = '<i class="fas fa-arrow-circle-left"></i> Ready to spin!';
        resetWheel();
    }

    function isGameOver(trackerObj) {
        for (var category in trackerObj) {
            if (trackerObj[category].lemons == 3){
                alert("Game Over. You Lost!");
                return location.reload();
            }
        }
        if (trackerObj.art.stars == 3 &&
            trackerObj.entertainment.stars == 3 &&
            trackerObj.geography.stars == 3 &&
            trackerObj.history.stars == 3 && 
            trackerObj.science.stars == 3 && 
            trackerObj.sports.stars == 3) {
            alert("YOU WIN!!");
            return location.reload();
        }
    }

    // Generate a random number
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})();