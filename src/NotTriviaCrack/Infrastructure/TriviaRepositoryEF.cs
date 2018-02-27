using AppCore.Entites;
using AppCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
            List<TriviaQuestion> result = _dbContext.Questions
                 .Include(q => q.Answers)
                 .OrderBy(q => q.Category)
                 .ToList();

            return result;
        }

        public List<TriviaQuestion> ListAllQuestions()
        {
            List<TriviaQuestion> result = _dbContext.Questions.ToList();
            return result;
        }

        //public List<TriviaQuestion> ListAllJson()
        //{
        //    List<TriviaQuestion> result = _dbContext.Questions
        //         .Include(q => q.Answers)
        //         .OrderBy(q => q.Category)
        //         .ToList();

        //    var rawList = JsonConvert.DeserializeObject<List<TriviaQuestion>>(result.ToString());

        //    return rawList;
        //}

        public List<TriviaQuestion> ListByCategory(string category)
        {
            return _dbContext.Questions
                //.Include(q => q.Answers)
                .Where(q => q.Category == category)
                .ToList();
        }

        public List<TriviaAnswer> GetAnswers(int id)
        {
           List<TriviaAnswer> answers = _dbContext.Answers.Where(q => q.QuestionId == id).ToList();
           return answers;
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
            TriviaQuestion question = _dbContext.Questions
                .Include(q => q.Answers).FirstOrDefault(q => q.Id == id);

            return question;
        }

        public void Update(TriviaQuestion updatedQuestion)
        {
            _dbContext.Questions.Update(updatedQuestion);
            _dbContext.SaveChanges();
        }
    }
}
