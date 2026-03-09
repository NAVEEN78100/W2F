using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Partners.Data;
using Partners.Models;
using Partners.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Partners.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnershipsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PartnershipsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/partnerships
        [HttpGet]
        public IActionResult GetPartnershipsData()
        {
            var vm = new PartnershipsIndexViewModel
            {
                HeroTitle = "Be a partner",
                HeroTagline = "Get listed in our application under any of these categories.",
                Cards = new List<CategoryCardVm>
                {
                    new CategoryCardVm
                    {
                        Category = PartnerCategory.StarDines,
                        Title = "Star Dines",
                        Subtitle = "Premium Dining",
                        ImageUrl = "/images/partnerships/StarDines.jpg"
                    },
                    new CategoryCardVm
                    {
                        Category = PartnerCategory.RestoBars,
                        Title = "Resto Bars",
                        Subtitle = "Night Clubs and Bar",
                        ImageUrl = "/images/partnerships/RestoBars.jpg"
                    },
                    new CategoryCardVm
                    {
                        Category = PartnerCategory.HangoutSpot,
                        Title = "Hangout Spot",
                        Subtitle = "Cafe, Fine Dine, Dhaba, Food Street",
                        ImageUrl = "/images/partnerships/HangoutSpots.jpg"
                    },
                    new CategoryCardVm
                    {
                        Category = PartnerCategory.Homebakers,
                        Title = "Home Bakers",
                        Subtitle = "Cakes & Pastries Home Cooks",
                        ImageUrl = "/images/partnerships/HomeBakers.jpg"
                    }
                },
                TermsHtml = new Dictionary<PartnerCategory, string>
                {
                    [PartnerCategory.StarDines] = @"
                        <h4>Premium Dining Partnership</h4>
                        <ul>
                            <li>Minimum 4-star rating required</li>
                            <li>Full-service dining experience</li>
                            <li>Quality food and ambiance standards</li>
                            <li>Professional staff and service</li>
                        </ul>
                    ",
                    [PartnerCategory.RestoBars] = @"
                        <h4>Night Clubs and Bar Partnership</h4>
                        <ul>
                            <li>Valid liquor license required</li>
                            <li>Safety and security measures</li>
                            <li>Entertainment and music licensing</li>
                            <li>Compliance with local regulations</li>
                        </ul>
                    ",
                    [PartnerCategory.HangoutSpot] = @"
                        <h4>Cafe, Fine Dine, Dhaba, Food Street Partnership</h4>
                        <ul>
                            <li>FSSAI license mandatory</li>
                            <li>Hygiene and cleanliness standards</li>
                            <li>Quality ingredients and preparation</li>
                            <li>Customer service excellence</li>
                        </ul>
                    ",
                    [PartnerCategory.Homebakers] = @"
                        <h4>Cakes & Pastries Home Cooks Partnership</h4>
                        <ul>
                            <li>Home-based food business registration</li>
                            <li>Quality and freshness guarantee</li>
                            <li>Custom order capabilities</li>
                            <li>Delivery or pickup options</li>
                        </ul>
                    "
                }
            };

            return Ok(vm);
        }

        // POST: api/partnerships/lead
        [HttpPost("lead")]
        public async Task<IActionResult> SubmitLead([FromBody] PartnerLeadDto dto)
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
                var lead = new PartnerLead
                {
                    Email = dto.Email,
                    Name = dto.Name,
                    Phone = dto.Phone,
                    State = dto.State,
                    Location = dto.Location,
                    Category = dto.Category,
                    AcceptTerms = dto.AcceptTerms,
                    CreatedAt = DateTime.UtcNow
                };

                _db.PartnerLeads.Add(lead);
                await _db.SaveChangesAsync();

                return Ok(new { 
                    success = true, 
                    message = "Partnership request submitted successfully!" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    message = "An error occurred while processing your request." 
                });
            }
        }

        // GET: api/partnerships/leads (Admin only - optional)
        [HttpGet("leads")]
        public async Task<IActionResult> GetAllLeads()
        {
            var leads = await _db.PartnerLeads
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();

            return Ok(leads);
        }
    }

    // DTO for API request
    public class PartnerLeadDto
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string State { get; set; }
        public string Location { get; set; }
        public int Category { get; set; }
        public bool AcceptTerms { get; set; }
    }
}