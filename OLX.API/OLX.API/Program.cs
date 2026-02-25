using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // ✅ Add DbContext BEFORE builder.Build()
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection")
            ));

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policy => policy.AllowAnyOrigin(
                    
                    )
                                .AllowAnyMethod()
                                .AllowAnyHeader());
        });

        var app = builder.Build();

        app.UseCors("AllowAll");

        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}