(function () {
    var httpRequest,
        baseURL = "http://localhost:51912",
        method = {
            post: 'POST',
            get: 'GET'
        },
        currentQuestion = {},
        correctAnswer = "",
        btnSpin = document.getElementById("btn-spin"),
        uiQuestion = document.getElementById("question-area"),
        displayCategory = document.getElementById("category"),
        displayQuestion = document.getElementById("question"),
        answerList = document.getElementById("answers"),
        displayAnswer1 = document.getElementById("answer-option-0"),
        displayAnswer2 = document.getElementById("answer-option-1"),
        displayAnswer3 = document.getElementById("answer-option-2"),
        displayAnswer4 = document.getElementById("answer-option-3");

    var theWheel = new Winwheel({
        'outerRadius': 220,        // Set outer radius so wheel fits inside the background.
        'innerRadius': 44,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize': 18,         // Set default font size for the segments.
        'textOrientation': 'horizontal', // Make text vertial so goes down from the outside of wheel.
        'textAlignment': 'center',    // Align text to outside of wheel.
        'numSegments': 7,         // Specify number of segments.
        'rotationAngle': -26,
        'segments':             // Define segments including colour and text.
        [
            { 'fillStyle': '#ee2a36', 'text': 'Art' },
            { 'fillStyle': '#e85aa2', 'text': 'Entertainment' },
            { 'fillStyle': '#864fa0', 'text': 'Award' },
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
    displayAnswer1.addEventListener("click", function () {
        console.log('Answer 1 clicked');//
        checkIfCorrect(this.textContent);
    });
    displayAnswer2.addEventListener("click", function () {
        console.log('Answer 1 clicked');//
        checkIfCorrect(this.textContent);
    });
    displayAnswer3.addEventListener("click", function () {
        console.log('Answer 1 clicked');//
        checkIfCorrect(this.textContent);
    });
    displayAnswer4.addEventListener("click", function () {
        console.log('Answer 1 clicked');//
        checkIfCorrect(this.textContent);
    });
    displayCategory.addEventListener("click", function () {
        console.log('Answer 1 clicked');//
        checkIfCorrect(this.textContent);
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
        if (indicatedSegment.text == 'Award') {
            // code to select category for award question
        }
        //getQuestions('GET', baseURL + '/api/questions/' + indicatedSegment);// In-memory controller (DefaultController.cs)
        //getQuestions('GET', baseURL + '/api/sqldata/' + indicatedSegment);// SQL controller (ApiController.cs)
        renderQuestion(sampleData);// Just for testing until getQuestions query issue is resolved.
        resetWheel();
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
        console.log(questions);//
        var count = questions.length;
        var question = questions[random(0, (count - 1))];
        currentQuestion = question;
        console.log(question.id - 1);//
        console.log(question);//
        uiQuestion.style.display = "block";
        displayCategory.innerText = question.category + "!";
        displayQuestion.innerText = question.question;
        answerList.innerHTML = "";
        for (var i = 0; i < question.answers.length; i++){
            answerList.innerHTML += '<p id="answer-option-' + i + '" class="answer-option">' + question.answers[i].answerOpt + '</p>';
            if (question.answers[i].isCorrect == true){
                correctAnswer = question.answers[i].answerOpt;
            }
        }
        console.log(correctAnswer);//
    }

    function checkIfCorrect(selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
            alert("Wow! That's Correct. I'm shocked you got that right!");
        } else {
            alert("Wrong Answer, Stupid!");
        }
    }

    // Generate a random number
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})();