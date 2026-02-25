using System.Text.Json.Serialization;

public class Product
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? Location { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public int UserId { get; set; }

    public int CategoryId { get; set; }

    [JsonIgnore]
    public Category? Category { get; set; }
}
