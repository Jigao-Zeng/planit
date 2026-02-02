using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>()
            .Property(t => t.Date)
            .HasConversion(
                d => d.ToString("yyyy-MM-dd"),   // Store as string in DB
                s => DateOnly.Parse(s));         // Convert back to DateOnly
    }
}
