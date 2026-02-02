public class Todo
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public string Title { get; set; } = "";
    public bool IsCompleted { get; set; }
}
