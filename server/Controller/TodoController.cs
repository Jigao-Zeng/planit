using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly AppDbContext _db;

    public TodosController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] DateOnly date)
    {
        var todos = await _db.Todos
            .Where(t => t.Date == date)
            .ToListAsync();

        return Ok(todos);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTodoDto dto)
    {
        var todo = new Todo
        {
            Date = dto.Date,
            Title = dto.Title
        };

        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();

        return Ok(todo);
    }
}
