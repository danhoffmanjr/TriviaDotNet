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
    public class AdminController : Controller
    {
        private readonly ITriviaRepository _triviaRepository;

        public AdminController(ITriviaRepository triviaRepository)
        {
            _triviaRepository = triviaRepository;
        }
        
        
        // GET: Admin
        public ActionResult Index()
        {
            return View(_triviaRepository.ListAll());
        }

        // GET: Admin/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Admin/Create
        public ActionResult Create()
        {
            TriviaQuestion newQuestion = new TriviaQuestion
            {
                Answers = new List<TriviaAnswer>
                {
                    new TriviaAnswer(),
                    new TriviaAnswer(),
                    new TriviaAnswer(),
                    new TriviaAnswer()
                }
            };

            return View(newQuestion);
        }

        // POST: Admin/Create
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

        // GET: Admin/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Admin/Edit/5
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

        // GET: Admin/Delete/5
        public ActionResult Delete(int id)
        {
            return View(_triviaRepository.GetById(id));
        }

        // POST: Admin/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(TriviaQuestion toDelete, IFormCollection collection)
        {
            try
            {
                _triviaRepository.Delete(toDelete);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View(toDelete);
            }
        }
    }
}