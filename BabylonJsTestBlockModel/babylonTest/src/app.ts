import {
    Color3, FreeCamera, InstancedMesh, Matrix, SceneLoader, StandardMaterial, Tools, VertexBuffer, VertexData,
    Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Quaternion, ScenePerformancePriority, AbstractMesh
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
// scene.performancePriority = ScenePerformancePriority.Intermediate;

// var camera: ArcRotateCamera = new ArcRotateCamera("arcCamera", Tools.ToRadians(90), Tools.ToRadians(90), 10, Vector3.Zero(), scene);
let camera: FreeCamera = new FreeCamera("freeCamera", new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);
camera.speed = 100;

let light: HemisphericLight = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

const defaultMaterial: StandardMaterial = new StandardMaterial("defaultMaterial", scene);
// defaultMaterial.disableLighting = true;
// defaultMaterial.emissiveColor = new Color3(142 / 255, 139 / 255, 175 / 255);
defaultMaterial.alpha = 1;
defaultMaterial.diffuseColor = new Color3(142 / 255, 139 / 255, 175 / 255);

// defaultMaterial.wireframe = true;
// defaultMaterial.freeze();

let box: Mesh = MeshBuilder.CreateBox("box", { size: 7.5, height: 30, width: 30 }, scene);
box.material = defaultMaterial;
//box.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;

//
1
let boxesCount: number;
let matricesBuffer: Float32Array;

const sharedScale: Vector3 = new Vector3(1, 1, 1);
const sharedRotation: Quaternion = Quaternion.RotationYawPitchRoll(0, 0, 0);

let fileName = "../resources/Блочная модель.csv";
Tools.LoadFile(fileName, (data: string) => {
    let blocks: string[] = data.split(/\r?\n/);
    let targetPosition: Vector3 = Vector3.Zero();

    boxesCount = blocks.length - 1;// blocks.length - 1;
    console.log(boxesCount);

    matricesBuffer =  new Float32Array(16 * boxesCount);

    for (let i: number = 1; i <= boxesCount; i++)
    {
        let subBlock = blocks[i].split(';');
        let x = +subBlock[0],
            y = +subBlock[1],
            z = +subBlock[2]
            // , size = +subBlock[3]
            ;

        Matrix
            .Compose(sharedScale, sharedRotation, new Vector3(x, y, z))
            .copyToArray(matricesBuffer, (i - 1) * 16);

        if (i === 1)
            targetPosition = new Vector3(x, y, z);
    }

    box.thinInstanceSetBuffer("matrix", matricesBuffer, 16, true);
    // box.freezeWorldMatrix();
    // scene.freezeActiveMeshes();

    //camera.position = targetPosition;
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
    scene.render();
    stats.update();
});
