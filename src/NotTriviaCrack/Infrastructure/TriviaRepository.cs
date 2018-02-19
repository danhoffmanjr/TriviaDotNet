using AppCore.Entites;
using AppCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class TriviaRepository : ITriviaRepository
    {
        private readonly NotTriviaCrackContext _dbContext;

        public TriviaRepository(NotTriviaCrackContext dbContext)
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

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public TriviaQuestion GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(TriviaQuestion updatedQuestion)
        {
            throw new NotImplementedException();
        }
    }
}
