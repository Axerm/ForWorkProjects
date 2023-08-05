using BackendDemo.BlockModel.Service.Models;
using BackendDemo.BlockModel.Service.DTO;

namespace BackendDemo.BlockModel.Service;

public static class BlockModelEntityExtensions
{
    public static BlockModelEntityDTO ToDTO(this BlockModelEntity blockModelEntity)
        => new(blockModelEntity.Id, blockModelEntity.Name, blockModelEntity.ElementsCount, blockModelEntity.CreationDate);
}