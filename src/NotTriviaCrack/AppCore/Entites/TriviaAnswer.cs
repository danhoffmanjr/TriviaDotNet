using System;

namespace AppCore.Entites
{
    public class TriviaAnswer
    {
        public int AnswerId { get; set; }
        public string AnswerOpt { get; set; }
        public bool IsCorrect { get; set; }
        public string User { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        // Navigation properties
        public int QuestionId { get; set; }
        public TriviaQuestion Question { get; set; }
    }
}
