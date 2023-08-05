using Godot;
using System;

public class Main : Spatial
{
	// Declare member variables here. Examples:
	// private int a = 2;
	// private string b = "text";

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		var importer = new EditorSceneImporterGLTF(); 
		var node = importer._ImportScene("res://Soldier.glb", 0, 0);
		AddChild(node);
	}

//  // Called every frame. 'delta' is the elapsed time since the previous frame.
//  public override void _Process(float delta)
//  {
//      
//  }
}
