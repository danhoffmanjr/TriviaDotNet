using System;

namespace AppCore.Entites
{
    public class TriviaQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Category { get; set; }
        public string User { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
    }
}
