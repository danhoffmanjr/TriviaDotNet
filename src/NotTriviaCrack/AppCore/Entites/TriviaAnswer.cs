using System;

namespace AppCore.Entites
{
    public class TriviaAnswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string AnswerOpt { get; set; }
        public bool IsCorrect { get; set; }
        public string User { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
    }
}
