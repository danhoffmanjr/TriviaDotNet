using System;
using System.Collections.Generic;

namespace AppCore.Entites
{
    public class TriviaQuestion
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public string Category { get; set; }
        public string User { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        // Navigation properties
        public List<TriviaAnswer> Answers { get; set; }
    }
}
