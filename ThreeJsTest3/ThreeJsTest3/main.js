var script=document.createElement('script');
script.onload=function()
{
    var stats=new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop()
    {
        stats.update();
        requestAnimationFrame(loop)
    });
};

script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
document.head.appendChild(script);


import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

let camera, scene, renderer, controls;
let clock;
let soldiersCount = 0;
const container = document.getElementById('container');
const count = document.getElementById('count');

const mixers = [];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.set( 50, 25, -20 );
    camera.position.set( 1, 2, 0 );
    //camera.lookAt( 50, 50, 0 );

    //controls = new OrbitControls( camera, renderer.domElement );
    //controls.target.set( 0, 0.5, 0 );
    //controls.update();
    //controls.enablePan = false;
    //controls.enableDamping = true;

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    //scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    //const dirLight = new THREE.DirectionalLight( 0xffffff );
    //dirLight.position.set( - 3, 10, - 10 );
    //dirLight.castShadow = true;
    //dirLight.shadow.camera.top = 4;
    //dirLight.shadow.camera.bottom = - 4;
    //dirLight.shadow.camera.left = - 4;
    //dirLight.shadow.camera.right = 4;
    //dirLight.shadow.camera.near = 0.1;
    //dirLight.shadow.camera.far = 40;
    //scene.add( dirLight );

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // ground

    // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 102, 102 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add( mesh );

    var vertices = [
        new THREE.Vector3(1,3,1),
        new THREE.Vector3(1,3,-1),
        new THREE.Vector3(1,-1,1),
        new THREE.Vector3(1,-1,-1),
        new THREE.Vector3(-1,3,-1),
        new THREE.Vector3(-1,3,1),
        new THREE.Vector3(-1,-1,-1),
        new THREE.Vector3(-1,-1,1)
    ];

    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const mesh2 = new THREE.Mesh( geometry, material );
    scene.add( mesh2 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( container.offsetWidth / (window.innerHeight - 100) );
    renderer.setSize( container.offsetWidth, window.innerHeight - 100 );
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 50, 25, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    container.appendChild( renderer.domElement );

    // stats = new Stats();

    // console.log(stats);
    // container.appendChild( stats.dom );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    for ( const mixer of mixers ) mixer.update( delta );

    // controls.update();

    renderer.render( scene, camera );

    // stats.update();
}