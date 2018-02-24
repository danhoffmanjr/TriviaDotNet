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
    [Route("api/list")]
    public class ApiController : Controller
    {
        private readonly NotTriviaCrackContext _dbContext;

        public ApiController(NotTriviaCrackContext dbContext)
        {
            _dbContext = dbContext;
        }

        //private readonly ITriviaRepository _triviaRepository;

        //public ApiController(ITriviaRepository triviaRepository)
        //{
        //    _triviaRepository = triviaRepository;
        //}

        // GET: api/list
        [HttpGet]
        public IEnumerable<TriviaQuestion> GetAll()
        {
            //return _triviaRepository.ListAll();
            return _dbContext.Questions
                .Include(q => q.Answers)
                .OrderBy(q => q.Category)
                .ToList();
        }

        // GET: api?category={category}
        //[HttpGet("{category}")]
        //public IActionResult GetCategory(string category)
        //{
        //    var item = _triviaRepository.ListByCategory(category);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return new ObjectResult(item);
        //}

        // GET: api/Api/5
       // [HttpGet("{id}", Name = "Get")]
       // public string Get(int id)
       // {
       //     return "value";
       // }
        
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
