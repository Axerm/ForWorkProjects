using BackendDemo.BlockModel.Service.Models;
using BackendDemo.BlockModel.Service.Repositories;
using BackendDemo.Common.Repositories;
using BackendDemo.Common.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddSingleton<IRepository<BlockModelEntity>, StubBlockModelRepository>();
builder.Services.AddMongo().AddMongoRepository<BlockModelEntity>("blockmodelentity");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
