// Variables for setup

let container;
let camera;
let renderer;
let scene;
let car;
let controls;

function init(){
  container = document.querySelector('.scene');

  //Создаем сцену
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;
  //Устанавливаем камеру
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2, 10);

  // const ambientlight = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
  // scene.add( ambientlight );

  // const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
  // scene.add( directionalLight );

  // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
  // scene.add( light );

  // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 4);
  // scene.add( hemiLight );

  // const light = new THREE.SpotLight(0xffa95c,4);
  // light.position.set(-50,50,50);
  // light.castShadow = true;
  // light.shadow.bias = 0.001;
  // scene.add( light );

  // const dirLight = new THREE.DirectionalLight( 0xffffff, 4 );
  // dirLight.position.set( -1, 0.75, 1 );
  // dirLight.position.multiplyScalar( 50);
  // dirLight.name = "dirlight";
  // dirLight.shadowCameraVisible = true;
  // dirLight.castShadow = true;
  // dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

  // const d = 300;

  // dirLight.shadowCameraLeft = -d;
  // dirLight.shadowCameraRight = d;
  // dirLight.shadowCameraTop = d;
  // dirLight.shadowCameraBottom = -d;

  // dirLight.shadowCameraFar = 3500;
  // dirLight.shadowBias = -0.0001;
  // dirLight.shadowDarkness = 0.35;
  
  // scene.add( dirLight );



  const ambient = new THREE.AmbientLight(0xffffff, 10);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 10);
  light.position.set(-2, 10, 0);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0x010101);
	spotLight.position.set(-2, 1, 20);
	spotLight.castShadow = true;
	spotLight.shadow.bias = 0.001;
	scene.add(spotLight);
  
  //Рендерим
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  controls = new THREE.OrbitControls(camera, renderer.domElement );
  // scene.add(controls);

  container.appendChild(renderer.domElement);
  //Загружаем модель
  let loader = new THREE.GLTFLoader();
  loader.load('./3d/scene.gltf', function(gltf){
      scene.add(gltf.scene);
      car = gltf.scene.children[0];
      animate();
  });
}
//Анимируем
function animate(){
  requestAnimationFrame(animate);
  car.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

//Адаптируем
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);