using System.ComponentModel.DataAnnotations;
using BackendDemo.Common.Entities;

namespace BackendDemo.BlockModel.Service.Models;

public class BlockModelEntity : IEntity
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = String.Empty;

    [Required]
    public uint ElementsCount { get; set; }

    [Required]
    public DateTime CreationDate { get; set; }
}