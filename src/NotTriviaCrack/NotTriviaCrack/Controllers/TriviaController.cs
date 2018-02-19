using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Entites;
using AppCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NotTriviaCrack.Controllers
{
    public class TriviaController : Controller
    {
        private readonly ITriviaRepository _triviaRepository;

        public TriviaController(ITriviaRepository triviaRepository)
        {
            _triviaRepository = triviaRepository;
        }
        
        
        // GET: Trivia
        public ActionResult Index()
        {
            return View(_triviaRepository.ListAll());
        }

        // GET: Trivia/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Trivia/Create
        public ActionResult Create()
        {
            TriviaQuestion newQuestion = new TriviaQuestion();
            newQuestion.Answers = new List<TriviaAnswer>
            {
                new TriviaAnswer(),
                new TriviaAnswer(),
                new TriviaAnswer(),
                new TriviaAnswer()
            };

            return View(newQuestion);
        }

        // POST: Trivia/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(TriviaQuestion newQuestion, IFormCollection collection)
        {
            try
            {
               _triviaRepository.Add(newQuestion);

                return RedirectToAction(nameof(Index));
            }
            catch(Exception ex)
            {
                return View(newQuestion);
            }
        }

        // GET: Trivia/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Trivia/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Trivia/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Trivia/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}