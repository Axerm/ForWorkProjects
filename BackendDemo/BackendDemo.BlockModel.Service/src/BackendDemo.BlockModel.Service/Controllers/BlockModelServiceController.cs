using BackendDemo.BlockModel.Service.Models;
using BackendDemo.BlockModel.Service.DTO;
using BackendDemo.Common.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendDemo.BlockModel.Service.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BlockModelServiceController : ControllerBase
{
    private readonly IRepository<BlockModelEntity> _repository;

    public BlockModelServiceController(IRepository<BlockModelEntity> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlockModelEntityDTO>>> GetAsync()
    {
        var items = (await _repository.GetAllAsync()).Select(entity => entity.ToDTO());
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BlockModelEntityDTO>> GetByIdAsync(Guid id)
    {
        var blockModelEntity = await _repository.GetAsync(id);

        if (blockModelEntity == null)
            return NotFound();

        return Ok(blockModelEntity.ToDTO());
    }

    [HttpPost]
    public async Task<ActionResult<BlockModelEntityDTO>> PostAsync(CreateBlockModelEntityDTO dto)
    {
        BlockModelEntity newBlockModelEntity = new()
        {
            Name = dto.Name,
            ElementsCount = dto.ElementsCount,
            CreationDate = DateTime.UtcNow
        };

        await _repository.CreateAsync(newBlockModelEntity);

        return Created(nameof(PostAsync), newBlockModelEntity.ToDTO());

        //return CreatedAtAction(nameof(GetByIdAsync), new { id = newBlockModelEntity.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var deletingBlockModelEntity = await _repository.GetAsync(id);

        if (deletingBlockModelEntity == null)
            return NotFound();

        await _repository.RemoveAsync(deletingBlockModelEntity.Id);

        return NoContent();
    }
}
