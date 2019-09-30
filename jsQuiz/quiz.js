class Quiz {
        constructor(questions) {
            this.score = 0;
    this.questions = questions;
            this.questionIndex = 0;
}


    getQuestion() {

        return this.questions[this.questionIndex];

}
isCorrectAnswer(choice){
                return this.answer === choice;
            }
            guess(answer) {
    if(this.getQuestion().isCorrectAnswer(answer)) {
        this.score++;
            }

        this.questionIndex++;
}



}
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
function populate() {

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestion().text;

        // show options
        var choices = quiz.getQuestion().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }


};
var quiz = new Quiz(questions);
populate();
