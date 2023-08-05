import "@babylonjs/core/Debug/debugLayer";
import { SceneLoader } from "@babylonjs/core/";
import "@babylonjs/inspector";
import Stats from "stats.js";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "98%";
        canvas.id = "gameCanvas";

        document.body.appendChild(canvas);
        const count = document.getElementById('count');
        
        var stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        scene.debugLayer.show();

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        // var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        SceneLoader.LoadAssetContainer(
            "https://threejs.org/examples/models/gltf/",
            "Soldier.glb",
            scene,
            (assetContainer) => {
                let x = -1;
                let y = 0;
                let soldiersCount = 0;

                let runAnimation = scene.getAnimationGroupByName("Clone of Run");

                let timerId = setTimeout(function request() {

                    // if (soldiersCount >= 500)
                    //     return;

                    if (y == 51 && x == 51) {
                        return;
                    }

                    x = x + 1;
                    if (x == 51) {
                        x = 0;
                        y = y + 1;
                    }

                    duplicate(assetContainer, x, y, 5, runAnimation);
                    count.innerText = 'Babylon.js ' + ++soldiersCount;

                    timerId = setTimeout(request, 50);

                }, 50);
            }

            // (newMeshes, particleSystems, skeletons, animationGroups) => {
            //     const hero = newMeshes[0] as Mesh;
            
            //     //Scale the model down
            //     hero.scaling.scaleInPlace(0.3);
            
            //     //Lock camera on the character
            //     // camera.target = hero;
            //     camera.setTarget(hero);
            
            //     //Get the Samba animation Group
            //     const sambaAnim = scene.getAnimationGroupByName("Run");
            
            //     //Play the Samba animation
            //     sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);

            //     scene.registerBeforeRender(() => {
            //         hero.createInstance(hero.name);
            //     });
            // }
        );

        var duplicate = function(container, posX, posY, delay, animationGroup) {
            let entries = container.instantiateModelsToScene();
    
            for (var node of entries.rootNodes) {
                node.position.x = posX;
                node.position.y = posY;
            }
    
            setTimeout(() => {
                for (var group of entries.animationGroups) {
                    if (group.name === "Clone of Run")

                    // console.log(group);
                    group.play(true);
                }
                // animationGroup.play(true);
                // animationGroup.start(true, 1.0, animationGroup.from, animationGroup.to, false);
            }, delay);
        }

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