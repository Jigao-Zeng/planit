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

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateTodoDto dto)
    {
        var todo = await _db.Todos.FirstOrDefaultAsync(t => t.Id == id);
        if (todo is null)
        {
            return NotFound();
        }

        todo.Title = dto.Title;
        await _db.SaveChangesAsync();

        return Ok(todo);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await _db.Todos.FirstOrDefaultAsync(t => t.Id == id);
        if (todo is null)
        {
            return NotFound();
        }

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
