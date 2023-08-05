using System.ComponentModel.DataAnnotations;

namespace BackendDemo.BlockModel.Service.DTO;

public record BlockModelEntityDTO(
    Guid Id,
    string Name,
    uint ElementsCount,
    DateTime CreationDate
);