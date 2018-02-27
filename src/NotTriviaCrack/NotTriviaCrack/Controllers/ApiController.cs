using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Entites;
using AppCore.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace NotTriviaCrack.Controllers
{
    [Produces("application/json")]
    [Route("api/sqlData/questions")]
    public class ApiController : Controller
    {
        private readonly ITriviaRepository _triviaRepository;

        public ApiController(ITriviaRepository triviaRepository)
        {
            _triviaRepository = triviaRepository;
        }

        // GET: api/sqlData/questions
        [HttpGet]
        public List<TriviaQuestion> GetAll()
        {
            return _triviaRepository.ListAllQuestions();
        }

        // GET: api/sqlData/questions/category
        [HttpGet("{category}")]
        public IActionResult GetByCategory(string category)
        {
            var item = _triviaRepository.ListByCategory(category);
            if (item.Count() == 0)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        //GET: api/sqldata/questions/1/answers
        [HttpGet("{questionId}/Answers")]
        public IActionResult GetAnswers(int questionId)
        {
            var item = _triviaRepository.GetAnswers(questionId);
            if (item.Count() == 0)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        // POST: api/Api
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Api/5
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
