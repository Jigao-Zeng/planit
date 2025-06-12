using NSwag.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Enables minimal API + OpenAPI
builder.Services.AddOpenApiDocument();      // This replaces AddSwaggerGen for .NET 9

// Optional: Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();      // Serve OpenAPI spec
    app.UseSwaggerUi();    // Serve Swagger UI
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost3000");
app.UseAuthorization();
app.MapControllers();
app.Run();
