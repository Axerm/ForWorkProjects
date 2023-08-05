import {
    Color3, FreeCamera, Matrix, StandardMaterial, Tools,
    Engine, Scene, Vector3, Mesh, MeshBuilder, Quaternion, AbstractMesh
} from "@babylonjs/core/";
import "@babylonjs/inspector";
import Stats from "stats.js";
        
let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// initialize babylon scene and engine
let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let engine = new Engine(canvas, true);
engine.setSize(window.innerWidth, window.innerHeight);
let scene = new Scene(engine);

let camera: FreeCamera = new FreeCamera("freeCamera", new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);
camera.speed = 100;

const defaultMaterial: StandardMaterial = new StandardMaterial("defaultMaterial", scene);
defaultMaterial.disableLighting = true;
defaultMaterial.emissiveColor = new Color3(142 / 255, 139 / 255, 175 / 255);

//defaultMaterial.freeze();

// let box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);
// box.material = defaultMaterial;
// box.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;

//

let boxesCount: number;
let matricesBuffer: Float32Array;

const sharedRotation: Quaternion = Quaternion.RotationYawPitchRoll(0, 0, 0);

let fileName = "../resources/Блочная модель.csv";
Tools.LoadFile(fileName, (data: string) => {
    let blocks: string[] = data.split(/\r?\n/);
    //let targetPosition: Vector3 = Vector3.Zero();

    boxesCount = blocks.length - 1;
    console.log(boxesCount);

    let box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.material = defaultMaterial;
    box.occlusionType = AbstractMesh.OCCLUSION_TYPE_STRICT;

    matricesBuffer =  new Float32Array(16 * boxesCount);

    for (let i: number = 1; i <= boxesCount; i++) {

        let subBlock = blocks[i].split(';');
        let x = +subBlock[0],
            y = +subBlock[1],
            z = +subBlock[2],
            x2 = +subBlock[3],
            y2 = +subBlock[4],
            z2 = +subBlock[5];
            
        Matrix
            .Compose(new Vector3(x2, y2, z2), sharedRotation, new Vector3(x, y, z))
            .copyToArray(matricesBuffer, (i - 1) * 16);
    }

    box.thinInstanceSetBuffer("matrix", matricesBuffer, 16, true);
});

//

// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show({
                embedMode: true, overlay: true
            });
        }
    }
});

window.addEventListener( 'resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    engine.setSize(width, height);
    engine.resize();
} );

// run the main render loop
engine.runRenderLoop(() => {
    stats.begin();
    scene.render();
    stats.end();
});

