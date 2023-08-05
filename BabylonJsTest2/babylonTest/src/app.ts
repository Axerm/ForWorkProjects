import "@babylonjs/core/Debug/debugLayer";
import { SceneLoader, StandardMaterial, VertexBuffer, VertexData } from "@babylonjs/core/";
import "@babylonjs/inspector";
import Stats from "stats.js";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "750px";
        canvas.id = "gameCanvas";

        document.body.appendChild(canvas);
        const count = document.getElementById('count');
        
        var stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        var light: HemisphericLight = new HemisphericLight("light1", new Vector3(0, -150, 0), scene);
        // var light: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 150, 0), scene);

        const paths = [[]];

        var ribbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: paths, sideOrientation: Mesh.DOUBLESIDE, updatable: true});
        ribbon.material = new StandardMaterial("");
        ribbon.material.wireframe = true;

        var x = 0, z = 0;
        let timerId = setTimeout(function request() {
            var last_path = paths[paths.length - 1];
            var new_vec = new Vector3(x, Math.random(), z);

            x += 10;

            if (x >= 100)
                z += 10;


            last_path.push(new_vec);

            // for (let t = -6; t <= 6; t++) {
            //     const path = [];
            //     for (let a = 0; a < 2 * Math.PI; a += Math.PI / 8) {
            //         let x = 2 * Math.cos(a);
            //         let y = 2 * Math.sin(a);
            //         let z = t;
            //         path.push(new Vector3(x, y, z))
            //     }
            //     path.push(path[0]); // close circle
            //     paths.push(path);
                
            // }

            ribbon = MeshBuilder.CreateRibbon("ribbon", {pathArray: paths, sideOrientation: Mesh.DOUBLESIDE, instance: ribbon});
            timerId = setTimeout(request, 100);
        }, 100);


        
        

        


        

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            stats.begin();
            scene.render();
            stats.end();
            // stats.update();
        });
    }
}

new App();