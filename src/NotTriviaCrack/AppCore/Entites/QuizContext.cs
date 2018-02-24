using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Entites
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
        }

        public DbSet<TriviaQuestion> Questions { get; set; }
        public DbSet<TriviaAnswer> Answers { get; set; }
    }
}
