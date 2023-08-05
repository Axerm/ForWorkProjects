using System.ComponentModel.DataAnnotations;

namespace BackendDemo.BlockModel.Service.DTO;

public record CreateBlockModelEntityDTO(
    [Required] string Name,
    [Required] uint ElementsCount
);