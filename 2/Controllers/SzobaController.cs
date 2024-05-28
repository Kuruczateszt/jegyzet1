using foglalasok.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace foglalasok.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SzobaController : Controller
    {
        private readonly foglalasokContext _fogl;

        public SzobaController(foglalasokContext foglalas)
        {
            _fogl = foglalas;
        }

        //2. Szoba táblára lekérdezés azonosító alapján Jó -201 Hiba -401
        [HttpGet("szoba/{id}")]
        public IActionResult szobaID(int id)
        {
            var szoba = _fogl.Szobaks.FirstOrDefault(sz => sz.Szazon == id);

            if (szoba == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        //3. Szoba táblára új szoba felvétele
        [HttpPost]
        public IActionResult szobaUj(Szobak szoba)
        {
            try
            {
                _fogl.Szobaks.Add(szoba);
                _fogl.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }

        //4. Szoba táblára létező szoba adatainak módosítása
        [HttpPut]
        public IActionResult palyaMod(Szobak szoba)
        {
            try
            {
                _fogl.Szobaks.Update(szoba);
                _fogl.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status402PaymentRequired, ex.Message);
            }
        }

        //5. Szoba táblából törlés azonosító alapján
        [HttpDelete("szoba/{id}")]
        public IActionResult palyaTorol([FromRoute] int id)
        {
            var szoba = new Szobak { Szazon = id };
            try
            {
                _fogl.Szobaks.Remove(szoba);
                _fogl.SaveChanges();
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }

        }







    }
}
