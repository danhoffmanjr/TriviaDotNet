using AppCore.Entites;
using AppCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class TriviaRepositoryEF : ITriviaRepository
    {
        private readonly NotTriviaCrackContext _dbContext;

        public TriviaRepositoryEF(NotTriviaCrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<TriviaQuestion> ListAll()
        {
            return _dbContext.Questions
                .Include(q => q.Answers)
                .ToList();
        }

        public void Add(TriviaQuestion newQuestion)
        {
            _dbContext.Questions.Add(newQuestion);
            _dbContext.SaveChanges();
        }

        public void Delete(TriviaQuestion toDelete)
        {
            _dbContext.Questions.Remove(toDelete);
            _dbContext.SaveChanges();
        }

        public TriviaQuestion GetById(int id)
        {
            return _dbContext.Questions.Find(id);
        }

        public void Update(TriviaQuestion updatedQuestion)
        {
            throw new NotImplementedException();
        }
    }
}
