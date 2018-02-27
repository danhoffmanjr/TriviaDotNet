using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Entites;
using AppCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace NotTriviaCrack.Controllers
{
    [Produces("application/json")]
    [Route("api/questions")]
    public class DefaultController : Controller
    {
        private readonly QuizContext _context;

        public DefaultController(QuizContext context)
        {
            _context = context;
            try
            {

                if (_context.Questions.Count() == 0)
                {
                    //var starterQuestion = new TriviaQuestion
                    //{
                    //    Question = "In what Shakespeare play is there a character called Mercutio?",
                    //    Category = "Art",
                    //    User = "APIController constructor",
                    //    DateCreate = DateTime.Now,
                    //    DateUpdate = DateTime.Now,
                    //    Answers = new List<TriviaAnswer>
                    //        {
                    //            new TriviaAnswer
                    //            {
                    //                QuestionId = 1,
                    //                AnswerOpt = "Othello",
                    //                User = "APIController constructor",
                    //                DateCreate = DateTime.Now,
                    //                DateUpdate = DateTime.Now,
                    //                IsCorrect = false
                    //            },
                    //            new TriviaAnswer
                    //            {
                    //                QuestionId = 1,
                    //                AnswerOpt = "Romeo and Juliet",
                    //                User = "APIController constructor",
                    //                DateCreate = DateTime.Now,
                    //                DateUpdate = DateTime.Now,
                    //                IsCorrect = true
                    //            },
                    //            new TriviaAnswer
                    //            {
                    //                QuestionId = 1,
                    //                AnswerOpt = "King Leer",
                    //                User = "APIController constructor",
                    //                DateCreate = DateTime.Now,
                    //                DateUpdate = DateTime.Now,
                    //                IsCorrect = false
                    //            },
                    //            new TriviaAnswer
                    //            {
                    //                QuestionId = 1,
                    //                AnswerOpt = "Hamilton",
                    //                User = "APIController constructor",
                    //                DateCreate = DateTime.Now,
                    //                DateUpdate = DateTime.Now,
                    //                IsCorrect = false
                    //            }
                    //        }
                    //};
                    //_context.Questions.Add(starterQuestion);

                    _context.Questions.Add(new TriviaQuestion
                        {
                            Question = "In what Shakespeare play is there a character called Mercutio?",
                            Category = "Art",
                            User = "Admin",
                            DateCreate = DateTime.Now,
                            DateUpdate = DateTime.Now,
                            Answers = new List<TriviaAnswer>
                            {
                            }
                        }
                    );

                    _context.Questions.Add(new TriviaQuestion
                        {
                            Question = "What is Water?",
                            Category = "Science",
                            User = "Admin",
                            DateCreate = DateTime.Now,
                            DateUpdate = DateTime.Now,
                            Answers = new List<TriviaAnswer>
                            {
                            }
                        }
                    );

                    _context.Answers.Add(new TriviaAnswer
                        {
                            // Nested list breaks the httpXMLRequest
                            QuestionId = 3, // this Id can't match a question Id or Connect Error occurs.
                            AnswerOpt = "Othello",
                            IsCorrect = false
                        }
                    );

                    _context.Answers.Add(new TriviaAnswer
                        {
                            // Nested list breaks the httpXMLRequest
                            QuestionId = 3, // this Id can't match a question Id or Connect Error occurs.
                            AnswerOpt = "Romeo and Juliet",
                            IsCorrect = true
                        }
                    );

                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void DataFixUp()
        {
            var questions = _context.Questions.ToList();
            var answers = _context.Answers.Where(a => a.QuestionId == 1).ToList();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var item = _context.Questions
                .Include(q => q.Answers)
                .ToList();
                if (item.Count == 0)
                {
                    return NotFound();
                }
                return new ObjectResult(item);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{category}", Name = "GetByCategory")]
        public IActionResult GetByCategory(string category)
        {
            try
            {
                var item = _context.Questions
                //.Include(q => q.Answers)
                .Where(q => q.Category == category)
                .ToList(); ;
                if (item.Count == 0)
                {
                    return NotFound();
                }
                return new ObjectResult(item);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("Answers")]
        public IActionResult GetAnswers()
        {
            try
            {
                var item = _context.Answers.ToList(); ;
                if (item.Count == 0)
                {
                    return NotFound();
                }
                return new ObjectResult(item);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // GET: api/Default/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Default
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Default/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
