using BackendDemo.Common.Entities;
using BackendDemo.Common.Repositories;
using BackendDemo.BlockModel.Service.Models;
using System.Linq.Expressions;

namespace BackendDemo.BlockModel.Service.Repositories;

public class StubBlockModelRepository : IRepository<BlockModelEntity>
{
    private static readonly List<BlockModelEntity> _blockModels = new()
    {
        new() { Id = Guid.NewGuid(), Name = "Test BlockModel 1", CreationDate = DateTime.Now, ElementsCount = 100 },
        new() { Id = Guid.NewGuid(), Name = "Test BlockModel 2", CreationDate = DateTime.Now, ElementsCount = 200 },
        new() { Id = Guid.NewGuid(), Name = "Test BlockModel 3", CreationDate = DateTime.Now, ElementsCount = 300 },
    };

    public Task CreateAsync(BlockModelEntity entity)
    {
        // entity.Id = _blockModels.Count + 1;
        entity.Id = Guid.NewGuid();
        entity.CreationDate = DateTime.Now;

        _blockModels.Add(entity);
        return Task.CompletedTask;
    }

    public async Task<IReadOnlyCollection<BlockModelEntity>> GetAllAsync()
    {
        return await Task.FromResult(_blockModels.AsReadOnly());
    }

    public Task<IReadOnlyCollection<BlockModelEntity>> GetAllAsync(Expression<Func<BlockModelEntity, bool>> filter)
    {
        throw new NotImplementedException();
    }

    public async Task<BlockModelEntity?> GetAsync(Guid id)
    {
        return await Task.FromResult(_blockModels.FirstOrDefault(bm => bm.Id == id));
    }

    public Task<BlockModelEntity?> GetAsync(Expression<Func<BlockModelEntity, bool>> filter)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(Guid id)
    {
        var deletingBlockModel = _blockModels.FirstOrDefault(bm => bm.Id == id);
        if (deletingBlockModel != null)
            _blockModels.Remove(deletingBlockModel);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(BlockModelEntity entity)
    {
        throw new NotImplementedException();
    }
}