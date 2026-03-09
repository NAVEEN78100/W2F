using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FeedbackPage.Data;
using FeedbackPage.Models;
using FeedbackPage.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackPage.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _db;

        public FeedbackController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/feedback
        [HttpGet]
        public IActionResult GetFeedbackData()
        {
            var vm = new FeedbackIndexViewModel
            {
                HeroTitle = "Product Updates",
                HeroTagline = "Here, you'll find everything we're building to make your experience faster, safer, and more powerful.",
                Cards = new List<FeedbackCardVm>
                {
                    new FeedbackCardVm
                    {
                        Id = 1,
                        Title = "Jeton Physical Card",
                        Subtitle = "Now available in EU countries",
                        ImageUrl = "/images/feedback/premium.jpg",
                        Category = "EarlyAccess",
                        ContentHtml = @"
                            <h3>Jeton Physical Card</h3>
                            <p>The Jeton Physical Card is now available for users in EU countries. This new option allows you to use your balances in more ways, both online and in-store.</p>
                            <p>The physical card can be used for card payments across a wide range of merchants. You can tap to pay where contactless is accepted or link your card to Google Wallet or Apple Wallet for digital transactions via your mobile device.</p>
                            <p>Ordering your card can be done directly through the Jeton app or from jeton.com website. Once received, you can activate it in-app, start your journey, monitor transactions in real-time, and manage your card settings securely and efficiently.</p>
                        ",
                        PublishDate = DateTime.UtcNow
                    },
                    new FeedbackCardVm
                    {
                        Id = 2,
                        Title = "Multi-Currency Support",
                        Subtitle = "Manage 20+ currencies seamlessly",
                        ImageUrl = "/images/feedback/premium.jpg",
                        Category = "EarlyAccess",
                        ContentHtml = @"
                            <h3>Manage Multiple Currencies</h3>
                            <p>Manage, exchange, and spend 20+ currencies with the Jeton App.</p>
                            <p>Our app makes it easy to work with multiple currencies without the hassle of traditional banking. Convert currencies at real-time rates and keep track of your balances across different accounts.</p>
                        ",
                        PublishDate = DateTime.UtcNow.AddDays(-5)
                    },
                    new FeedbackCardVm
                    {
                        Id = 3,
                        Title = "Security Enhancements",
                        Subtitle = "Bug bounty program enhanced",
                        ImageUrl = "/images/feedback/bugg.jpg",
                        Category = "BugBounty",
                        ContentHtml = @"
                            <h3>Report Security Issues</h3>
                            <p>We're committed to maintaining the highest security standards. Our enhanced bug bounty program provides rewards for responsible security disclosures.</p>
                            <p>Help us identify and fix security vulnerabilities. All submissions are reviewed by our security team and handled confidentially.</p>
                        ",
                        PublishDate = DateTime.UtcNow.AddDays(-10)
                    }
                }
            };

            return Ok(vm);
        }

        // POST: api/feedback/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackSubmissionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { 
                    success = false, 
                    message = "Please fill all required fields correctly." 
                });
            }

            try
            {
                var feedback = new FeedbackSubmission
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    Category = dto.Category,
                    Message = dto.Message,
                    AcceptTerms = dto.AcceptTerms,
                    SubmittedAt = DateTime.UtcNow
                };

                _db.FeedbackSubmissions.Add(feedback);
                await _db.SaveChangesAsync();

                return Ok(new { 
                    success = true, 
                    message = "Thank you for your feedback!" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    message = "An error occurred while processing your feedback." 
                });
            }
        }

        // GET: api/feedback/submissions (Admin)
        [HttpGet("submissions")]
        public async Task<IActionResult> GetAllSubmissions()
        {
            var submissions = await _db.FeedbackSubmissions
                .OrderByDescending(f => f.SubmittedAt)
                .ToListAsync();

            return Ok(submissions);
        }
    }

    // DTO for feedback submission
    public class FeedbackSubmissionDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Category { get; set; }
        public string Message { get; set; }
        public bool AcceptTerms { get; set; }
    }
}