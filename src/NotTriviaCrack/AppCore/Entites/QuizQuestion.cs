using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Entites
{
    public class QuizQuestion
    {
        public long Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
