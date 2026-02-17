
var bounceData = {
    mesh: null, // Placeholder for the asteroid mesh
    velocity: new THREE.Vector3(), // Initial velocity (set later)
};

function ShowcaseItem(mesh = null, mixer = null, info = null, iFrame = null) {
    this.mesh = mesh;   // The loaded mesh
    this.mixer = mixer; // The animation mixer
    this.info = info;   // Metadata or additional data
    this.iFrame = iFrame;
}

ShowcaseItem.prototype.ToggleVisibility = function (isVisible) {
  if (this.mesh) {
      this.mesh.visible = isVisible;
      this.mesh.traverse((child) => {
          child.visible = isVisible; // Ensure visibility change propagates to child objects
      });
  } else {
      console.warn("Mesh not defined for this ShowcaseItem.");
  }
  if(this.iFrame)
  {
    container.style.visibility = isVisible ? 'visible' : 'hidden';
    this.iFrame.style.visibility = isVisible;
  }
};

window.showcaseData = window.showcaseData || {
    Bludgeon: new ShowcaseItem(),
    Title: new ShowcaseItem(),
    InfoDisplay: new ShowcaseItem(),
    HoverAnim: new ShowcaseItem(),
    showcaseMesh: null,
    anims: []
};

window.loadedAsteroidModel = null;
window.loadedBludgeonModel = null;
window.loadedTitleModel = null;
window.cube = null;
window.shotGunSpheres = [];
window.AsteroidDestoryed = false;
window.group = null;
window.bounceCount = 1;
window.canBounce = true;
window.scene = new THREE.Scene();
window.renderer;
window.clock = new THREE.Clock();
window.camera;
window.videoObjects = [];
window.currentVideoIndex = -1;
window.loadingManager;
window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
window.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
window.cssRenderer = new THREE.CSS3DRenderer();
window.container = document.getElementById('containerVideo');
window.controls = new THREE.TrackballControls(camera, cssRenderer.domElement);

window.directionalLight1 = new THREE.DirectionalLight(0x101820, 0.6);
window.directionalLight3 = new THREE.DirectionalLight(0x0082A3, 3);
window.directionalLight2 = new THREE.DirectionalLight(0xffcc00, 1);
window.light1 = new THREE.PointLight(0xffffff, 0.5);
// Initialize Three.js Elements
window.worldScene = $("#world")[0];


renderer.domElement.id = 'renderer';
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadow;
worldScene.appendChild(renderer.domElement);

// CSS3D Renderer (for iframe)

cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
cssRenderer.domElement.style.borderRadius = '20px';
container.appendChild(cssRenderer.domElement);

camera.position.x = 2;
camera.position.z = 400;
camera.position.y = 1;
//scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

// Lighting of the scene
light1.position.set(0, 200, 0);
scene.add(light1);  

// A warm, yellow directional light
directionalLight2.position.set(-300, -200, -300); // Position for balancing the dark areas
scene.add(directionalLight2);


directionalLight3.position.set(300, -300, 300); // Position for balancing the dark areas
scene.add(directionalLight3);

// Secondary ambient light for contrast
window.ambientLight2 = new THREE.AmbientLight(0x101820, 0.5); // Darker ambient light for depth
scene.add(ambientLight2);

// Soft directional light for distant, subtle illumination

directionalLight1.position.set(300, 200, 300); // Position for a balanced distribution of light
scene.add(directionalLight1);

$(document).ready(function () {
let theme = "light";
const $wrapper = $("#wrapper");
$('.collapsible').collapsible();

angular.element('.logout').on('click', function() {
    
});

angular.element('.collapsible-header').each(function(index) {
    angular.element(this).on('click', function() {
      switch (index) {
        case 0:
          WeaponFunction();
          break;
        case 1:
          MainCharacterFunction();
          break;
        case 2:
          VideoFunction();
          break;
        default:
          console.log('No function assigned');
      }
    });
});

// Call Updtae Function
Update();
LoadIpadWithVideo();

document.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals); // Initializes all modals
});

// Show the loader while assets are loading

loadingManager = new THREE.LoadingManager(
	// On load
	() => {
		
		const appElement = document.getElementById('ng-root');
		const injector = angular.element(appElement).injector();
		const $rootScope = injector.get('$rootScope');

		$rootScope.$apply(() => {
			$rootScope.isLoading = false;
		});

    document.getElementById("loading-screen").style.display = "none";
		const canvasContainer = document.getElementById("showcaseContent");
		canvasContainer.style.visibility = "visible";
		canvasContainer.style.opacity = "1";

    const tutorialModal = document.getElementById('tutorialModal');
    M.Modal.init(tutorialModal);
    const modalInstance = M.Modal.getInstance(tutorialModal);
    modalInstance.open();
		
	},
	// On progress
	(url, itemsLoaded, itemsTotal) => {
    const percent = Math.round((itemsLoaded / itemsTotal) * 100);
    const percentDiv = document.getElementById("loading-percent");
    if (percentDiv) {
      percentDiv.innerText = `%${percent}`;
    }
  },
	// On error
	(url) => {
		console.error(`There was an error loading ${url}`);
	}
	);

let gltfLoader = new THREE.GLTFLoader(loadingManager);

// Create a Promise to load the GLTF model
const loadModels = () => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      "/assets/ddd/asteroid.glb",
      function (gltf) {
          loadedAsteroidModel = gltf.scene;
          loadedAsteroidModel.scale.set(40, 40, 40); // Adjust the scale
          loadedAsteroidModel.position.set(0, 0, 0); // Center the model
        
          bounceData.mesh = loadedAsteroidModel;
          const cubeGeometry = new THREE.BoxGeometry(550, 225, 800);
          const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(0, 0, 0);
    
          scene.add(loadedAsteroidModel); // Add to the scene
          scene.add(cube);
      },
      undefined,
      function (error) {
          console.error("An error occurred while loading the GLTF model:", error);
    });


    gltfLoader.load(
      "/assets/ddd/goathumaun.glb",
      function (gltf) {
        const data = gltf.scene;
        data.scale.set(50, 50, 50);
        data.position.set(250, 20, 100);

        // Initialize the AnimationMixer
        mixer = new THREE.AnimationMixer(data);

        const clip = gltf.animations[0]; // Get the first (and only) animation
        if (clip) {
          const action = mixer.clipAction(clip);
          action.play();
        }

        // Store the mixer in showcaseData
        showcaseData.HoverAnim.mesh = data;
        showcaseData.HoverAnim.mixer = mixer;
        showcaseData.anims.push(mixer);

        // Add the model to the scene
        showcaseData.HoverAnim.mesh = data;
        data.visible = false;
        scene.add(data);
      },
      undefined,
      function (error) {
        console.error("An error occurred while loading the GLTF model:", error);
    });


    // gltfLoader.load(
    //   "/assets/ddd/ipad2.glb",
    //   function (gltf) {
    //     let data = null;
    //     data = gltf.scene;
    //     data.scale.set(8, 8, 8); // Adjust the scale
    //     data.position.set(120, -45, 100); // Center the model
        
    //     // Find and update the screen child object
    //     let screen = null;
    //     data.traverse((child) => {
    //       if (child.isMesh && child.name === "screenp") {            
    //         screen = child;
    //       }
    //     });

    //     showcaseData.InfoDisplay.mesh = data;
    //     showcaseData.InfoDisplay.mesh.visible = false;

    //     // Create a video element
    //     const video = document.createElement('video');
    //     video.src = '/assets/ddd/video.mkv'; // Replace with your video file URL
    //     video.crossOrigin = 'anonymous'; // Ensures proper handling for cross-origin files
    //     video.loop = true;
    //     video.muted = true;
    //     video.autoplay = true;
    //     video.playsInline = true;
    //     video.play();

    //     const videoTexture = new THREE.VideoTexture(video);
    //     videoTexture.minFilter = THREE.LinearFilter;
    //     videoTexture.magFilter = THREE.LinearFilter;
    //     videoTexture.format = THREE.RGBFormat;
      
    //     const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });

    //     screen.material = material;
        
    //     data.rotation.z = Math.PI / 2;
    //     scene.add(data);
    //   },
    //   undefined,
    //   function (error) {
    //       console.error("An error occurred while loading the GLTF model:", error);
    //   }
    // );

    group = new THREE.Group();
    const geometry = new THREE.DodecahedronBufferGeometry(3, 0);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    for (let i = 0; i < 50; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 1000 - 500;
      mesh.position.y = Math.random() * 600 - 300;
      mesh.position.z = Math.random() * 1000 - 200;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    
    }
    group.visible = false;
    scene.add(group);


    gltfLoader.load(
      "/assets/ddd/BLudgeonL0.glb",
      function (gltf) {
        loadedBludgeonModel = gltf.scene;
        loadedBludgeonModel.scale.set(70, 70, 70); // Adjust the scale
        loadedBludgeonModel.position.set(0, 0, 0);
        scene.add(loadedBludgeonModel); // Center the model
        loadedBludgeonModel.visible = false;
        let currentScrollPosition = null;

        let showcaseWaypointsScrollDown = [
          { x: 0, y: 40, z: 100 },
          { x: 0, y: 20, z: 120 },
          { x: 0, y: 0, z: 120 },
          { x: 0, y: 0, z: 120 },
          { x: 0, y: -40, z: 120 },
          { x: 0, y: -40, z: 120 },
          { x: 30, y: -40, z: 120 },
          { x: 130, y: -40, z: 175 }
        ];

        $(window).on("scroll", function () {
          currentScrollPosition = $(this).scrollTop();
          canBounce = currentScrollPosition < 500 ? true : false;
          if(canBounce) bounceData.mesh.visible = true;
          
          if(loadedBludgeonModel && currentScrollPosition > 510 && currentScrollPosition < 610) {
            //Interpolation between waypoints
            canBounce = false;
            let targetX = gsap.utils.interpolate(loadedBludgeonModel.position.x, 0, 1);
            let targetY = gsap.utils.interpolate(loadedBludgeonModel.position.y, 40, 1);
            let targetZ = gsap.utils.interpolate(loadedBludgeonModel.position.z, 100, 1);

            gsap.to(loadedBludgeonModel.position, {
              x: targetX,
              y: targetY,
              z: targetZ,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                showcaseData.Bludgeon.mesh = loadedBludgeonModel;
                showcaseData.showcaseMesh = showcaseData.Bludgeon.mesh;
              },
            });

            gsap.to(loadedBludgeonModel.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: "power2.out",
            });
          }

          if(showcaseData.Bludgeon.mesh && currentScrollPosition > 610)
            {
              showcaseData.Bludgeon.mesh.visible = true;
              showcaseData.showcaseMesh = showcaseData.Bludgeon.mesh;
              if(currentScrollPosition < 1400) 
              {
                showcaseData.InfoDisplay.ToggleVisibility(false);
                showcaseData.HoverAnim.mesh.visible = false;
                animateMeshAlongPath(showcaseData.Bludgeon.mesh, showcaseWaypointsScrollDown, 610, 1400);
              }
              if(currentScrollPosition > 620)
              {
                bounceData.mesh.visible = true;
                $(".display1, .display2, .display3").removeClass("hidden");
              }
            }
            else
            {
              $(".display1, .display2, .display3").addClass("hidden");
            }
        });
      },
      undefined,
      function (error) {
          console.error("An error occurred while loading the GLTF model:", error);
      }
    );

    gltfLoader.load(
      "/assets/ddd/titlenew.glb",
      function (gltf) {
          // Load and configure the model
          loadedTitleModel = gltf.scene;
          loadedTitleModel.scale.set(100, 100, 100); // Adjust the scale
          loadedTitleModel.position.set(0, -50, -800); // Initial position
          scene.add(loadedTitleModel); // Add the model to the scene
          loadedTitleModel.visible = false; // Set to visible when loaded

          // Waypoints for scroll-based animation
          let waypointsTitle = [
              { x: 0, y: 0, z: -800 },
              { x: 0, y: -10, z: -600 },
              { x: 0, y: -20, z: -400 },
              { x: 0, y: -40, z: -200 },
              { x: 0, y: -20, z: -100 },
              { x: 0, y: 100, z: -100 },
              { x: 0, y: 200, z: -100 },
              { x: 0, y: 300, z: -100 }
          ];

          $(window).on("scroll", function () {
            const currentScrollPosition = $(this).scrollTop();
            if(currentScrollPosition < 500)  animateMeshAlongPath(loadedTitleModel, waypointsTitle, 0, 500);
          });
      },
      undefined,
      function (error) {
          console.error("An error occurred while loading the GLTF model:", error);
    });
  });
};

Promise.all([
  loadModels()
]).then(textures => {
  loadingManager.onLoad();
}).catch(error => {
  console.error("An error occurred while loading assets:", error);
});

window.iframe = document.createElement('iframe');
function Element(id) {
		const div = document.createElement('div');
		div.style.width = '480px';
		div.style.height = '360px';
		div.style.backgroundColor = '#000';
		div.style.backfaceVisibility = 'hidden'; // Hide back side
		div.style.transformStyle = 'preserve-3d';
		div.style.transform = 'rotateY(0deg)'; // Needed to apply backface visibility

		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.border = '0px';
		iframe.src = 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1&mute=1&modestbranding=1&controls=1';
		iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
		iframe.allowFullscreen = true;

		div.appendChild(iframe);
		return div;
}

function changeIpadVideoSource(id)
{
  iframe.src = 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=1&mute=1';
}

function LoadIpadWithVideo() {	
		
		controls.rotateSpeed = 4;

    
		const scope = angular.element(document.querySelector('[ng-controller="pavanCtrl"]')).scope();
    window.videoIds = scope.pavanVideoIds;

		window.addEventListener('resize', onWindowResize);

		const blocker = document.getElementById('blockerVideo');
		blocker.style.display = 'none';

		controls.addEventListener('start', () => blocker.style.display = '');
		controls.addEventListener('end', () => blocker.style.display = 'none');

		const loader = new THREE.GLTFLoader();
		loader.load('/assets/ddd/ipad2.glb', (gltf) => {
			const model = gltf.scene;
			model.scale.set(8, 8, 8);
			model.rotation.z = Math.PI / 2;
      model.position.set(120, -45, 100);

			// Find screen mesh
			let screen = null;
			model.traverse(child => {
				if (child.isMesh && child.name === 'screenp') {
					screen = child;
				}
			});

			if (!screen) {
				console.warn('screenp not found');
				return;
			}

			// Get screen's world position relative to model
			screen.updateMatrixWorld(true);
			const localPos = screen.position.clone();
			const localRot = screen.rotation.clone();

			const ipadGroup = new THREE.Group();
      ipadGroup.add(model); // Add the iPad model

      const screenObject = new THREE.CSS3DObject(Element(videoIds[1]));
      screenObject.position.copy(localPos);
      screenObject.position.x += 150;
      screenObject.position.y -= 40;
      screenObject.position.z += -2;
      screenObject.scale.set(0.58, 0.58, 0.25);

      ipadGroup.add(screenObject); 

      showcaseData.InfoDisplay.mesh = ipadGroup;
      showcaseData.InfoDisplay.iFrame = iframe;
      showcaseData.InfoDisplay.ToggleVisibility(false);
      
      scene.add(ipadGroup);
      changeIpadVideoSource(videoIds[0]);
		});
	}

// Animation
function Update() {

  if(group)
  {
    group.rotation.x += 0.002;
    group.rotation.y += 0.002;
  }

  
  const delta = clock.getDelta();

  if (loadedAsteroidModel) {
    loadedAsteroidModel.rotation.x += 0.002;
    loadedAsteroidModel.rotation.y += 0.002;
  }
  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);

  requestAnimationFrame(Update);
  animateShotGunParticles();
  animateBounceData();

  showcaseData.anims.forEach(item => {
    if (item) {
        item.update(delta);
    } else {
        console.log("Mixer not found for item", item);
    }
  });
}
// Global mousemove for scene
$(window).on("pointermove", function (event) {
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const z = (event.clientX - center.x) / 900;
  const x = (event.clientY - center.y) / 900;
  if(group != null) gsap.to(group.rotation, { x: -x, y: -z, duration: 1, ease: "power2.out" });
  if(loadedTitleModel != null) gsap.to(loadedTitleModel.rotation, { x: -x * 0.5, y: -z *0.5, duration: 1, ease: "power2.out" });
  if(loadedAsteroidModel != null) gsap.to(loadedAsteroidModel.rotation, { x: -x * 0.5, y: -z *0.5, duration: 1, ease: "power2.out" });
  // if(showcaseData.InfoDisplay.mesh && showcaseData.InfoDisplay.mesh.visible == true)
  // {
  //   gsap.to(showcaseData.InfoDisplay.mesh.rotation, { x: -x * 0.1, y: -z * 0.1, duration: 1, ease: "power2.out" });
  //   //gsap.to(camera.rotation, { x: -x * 0.05, y: -z * 0.05, duration: 1, ease: "power2.out" });
  // }
});

$("#toggleSwitch").on("click", function () {
  theme = theme === "dark" ? "light" : "dark";
  $wrapper.toggleClass("-dark", theme === "dark");
  $("body").toggleClass("-dark", theme === "dark");
}); 

document.addEventListener('mousedown', function (event) {        
    // Use Raycaster to detect if the asteroid is clicked
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Convert mouse position to normalized device coordinates (-1 to +1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Set raycaster from the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check intersections with the asteroid
    if (bounceData.mesh) {
      const intersects = raycaster.intersectObject(bounceData.mesh, true); // `true` to check descendants
      
      if (intersects.length > 0) {
          if (intersects.length > 0) {
            applyInitialVelocity();
            const object = intersects[0].object;
            // Check raycast intersect objects
          }
          return; // Exit early if asteroid is clicked
      }
    }
});
});

// Function to create and add spheres to the scene when the mouse is clicked
function fireShotGunSpheres(position)
{
  // Loop 20 times to create 20 spheres
  for (let i = 0; i < 50 - shotGunSpheres.length; i++) {
    // Create a sphere
    const sphere = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphereMesh = new THREE.Mesh(sphere, material);

    // Set the direction of the shotgun spheres based on the mouse click
    const direction = new THREE.Vector3();
    direction.x = THREE.MathUtils.randFloat(-0.1, 0.1);
    direction.y = THREE.MathUtils.randFloat(-0.1, 0.1);
    direction.z = THREE.MathUtils.randFloat(-0.1, 0.1);
    direction.normalize();

    // Set the initial velocity of the shotgun spheres
    const velocity = direction.clone().multiplyScalar(10);

    // Create a point light at the center
    const pointLight = new THREE.PointLight(0xffffff, 10, 50);
    pointLight.position.set(0, 0, 0);

    // Add the velocity to the sphere position
    sphereMesh.position.add(velocity);
    // Add the sphere to the shotGunSpheres array
    shotGunSpheres.push({ mesh: sphereMesh, velocity: velocity, light: pointLight });
  }

  for (let i = 0; i < shotGunSpheres.length; i++) {
    // Set the sphere position to the origin
    shotGunSpheres[i].mesh.position.copy(position);
    // Add the sphere to the scene
    scene.add(shotGunSpheres[i].mesh);
    scene.add(shotGunSpheres[i].light);

    let randomTimeOut = Math.floor(Math.random() * (2000 - 4000 + 1)) + 2000;

    // Remove the sphere and point light after 2 seconds
    setTimeout(() => {
        scene.remove(shotGunSpheres[i].mesh);
        scene.remove(shotGunSpheres[i].light);
    }, 2000);
  }
}

// Function to animate the spheres created in the fireShotGunSpheres() function
function animateShotGunParticles()
{
  // Loop through each sphere
  for (let i = 0; i < shotGunSpheres.length; i++) {
      const sphereData = shotGunSpheres[i];
      const sphere = sphereData.mesh;
      const velocity = sphereData.velocity;

      // Move the sphere according to its velocity
      sphere.position.add(velocity);

      // Check if the sphere is too far from the camera
      if (sphere.position.z < camera.position.z - 500) {
          scene.remove(sphere);
      }
  }
}

function applyInitialVelocity() 
{
  // Set a small initial velocity
  const direction = new THREE.Vector3(
      THREE.MathUtils.randFloat(-0.05, 0.05),
      THREE.MathUtils.randFloat(-0.05, 0.05),
      0 // Only applying velocity in X and Y directions
  ).normalize();

  const velocity = direction.multiplyScalar(10); // Small velocity
  bounceData.velocity = velocity; // Store velocity in mesh's user data
}

function animateBounceData() 
{
  if(!canBounce) return;
  if(bounceCount % 5 == 0 && !AsteroidDestoryed)
  {
    fireShotGunSpheres(loadedAsteroidModel.position);
    document.body.style.height = "300vh";
    $('.container').css('height', '300vh');
    AsteroidDestoryed = true;
    group.visible = true;
    loadedBludgeonModel.position.copy(loadedAsteroidModel.position);
    loadedBludgeonModel.visible = true;
    bounceData.mesh = loadedBludgeonModel;
    loadedTitleModel.visible = true;
    loadedAsteroidModel.visible = false;
    return;
  }
  
  // Reduce velocity over time
  const velocity = bounceData.velocity;
      velocity.multiplyScalar(0.98);

  if (velocity.length() < 0.01) return;
  if (bounceData.mesh && bounceData.velocity) {
        // Gradually decrease velocity

      // Update mesh position
      bounceData.mesh.position.add(velocity);

      // Assuming cube's scale is set to 400 in all dimensions
      const cubeDimensions = cube.geometry.parameters;

      // Calculate bounds based on scale
      const bounds = {
          left: cube.position.x - cubeDimensions.width / 2,
          right: cube.position.x + cubeDimensions.width / 2,
          top: cube.position.y + cubeDimensions.height / 2,
          bottom: cube.position.y - cubeDimensions.height / 2,
          front: cube.position.z - cubeDimensions.depth / 2,
          back: cube.position.z + cubeDimensions.depth / 2,
      };

      // Check for collisions with screen edges and reverse velocity if necessary
      if (bounceData.mesh.position.x <= bounds.left) {
          velocity.x = Math.abs(velocity.x);
          bounceCount++;
           // Bounce off left edge   
      } else if (bounceData.mesh.position.x >= bounds.right) {
          velocity.x = -Math.abs(velocity.x);
          bounceCount++;
           // Bounce off right edge
      }
      if (bounceData.mesh.position.y <= bounds.bottom) {
          velocity.y = Math.abs(velocity.y);
          bounceCount++;
           // Bounce off bottom edge
      } else if (bounceData.mesh.position.y >= bounds.top) {
          velocity.y = -Math.abs(velocity.y);
          bounceCount++;
           // Bounce off top edge
      }
      if (bounceData.mesh.position.z <= bounds.front) {
          velocity.z = Math.abs(velocity.z);
          bounceCount++;
           // Bounce off front edge
      } else if (bounceData.mesh.position.z >= bounds.back) {
          velocity.z = -Math.abs(velocity.z);
          bounceCount++;
           // Bounce off back edge
      }
      
      // Stop movement if velocity is too small
      if (!velocity.length() < 0.01) {
          // Animate rotation
          bounceData.mesh.rotation.x += 0.02;
          bounceData.mesh.rotation.y += 0.02;
          bounceData.mesh.rotation.z += 0.02; 
      }
      // Update bounce count in the HTML element
      //document.getElementById('bounceCount').innerText = `Bounces: ${bounceCount};
  }
}

function getMeshBounds(mesh) 
{
  const boundingBox = new THREE.Box3().setFromObject(mesh);
  return boundingBox;
}

function WeaponFunction ()
{
  SlideOutRight(function () {
    showcaseData.InfoDisplay.ToggleVisibility(false);
    showcaseData.showcaseMesh.vsisble = false;
    showcaseData.showcaseMesh = showcaseData.Bludgeon.mesh;
    showcaseData.showcaseMesh.visible = true;
    SlideInRight();
  });
}

function MainCharacterFunction ()
{
  SlideOutRight(function() {
    showcaseData.InfoDisplay.ToggleVisibility(false);
    showcaseData.showcaseMesh.visible = false;
    showcaseData.showcaseMesh = showcaseData.HoverAnim.mesh;
    showcaseData.showcaseMesh.visible = true;
    SlideInRight();
  });
}

function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		cssRenderer.setSize(window.innerWidth, window.innerHeight);
	}

function VideoFunction()
{
    showcaseData.InfoDisplay.ToggleVisibility(!showcaseData.InfoDisplay.mesh.visibility);
    SlideOutRight();
}

function SlideOutRight(onCompleteCallback)
{
  let rightSideSlideOut = [
    { x: 120, y: -40, z: 100 },
    { x: 550, y: -40, z: 100 }
  ];

  let targetX = gsap.utils.interpolate(rightSideSlideOut[0].x, rightSideSlideOut[1].x, 1);
  let targetY = gsap.utils.interpolate(rightSideSlideOut[0].y, rightSideSlideOut[1].y, 1);
  let targetZ = gsap.utils.interpolate(rightSideSlideOut[0].z, rightSideSlideOut[1].z, 1);

  gsap.to(showcaseData.showcaseMesh.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.5,
      ease: "power2.out",
      onComplete: function () {
        if (onCompleteCallback && typeof onCompleteCallback === "function") {
          onCompleteCallback();
        }
      }
  });
}

function SlideInRight()
{
  let rightSideSlideIn = [
    { x: 550, y: -40, z: 100 },
    { x: 120, y: -40, z: 100 }
  ];

  let targetX = gsap.utils.interpolate(rightSideSlideIn[0].x, rightSideSlideIn[1].x, 1);
  let targetY = gsap.utils.interpolate(rightSideSlideIn[0].y, rightSideSlideIn[1].y, 1);
  let targetZ = gsap.utils.interpolate(rightSideSlideIn[0].z, rightSideSlideIn[1].z, 1);

  gsap.to(showcaseData.showcaseMesh.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.5,
      ease: "power2.out",
  });
}

function animateMeshAlongPath(mesh, waypoints,  minScroll = 0, maxScroll = 1000, onCompleteCallback = null) {

  let currentScrollPosition = $(window).scrollTop();
  // Ensure maxScroll > minScroll to avoid division by zero
  if (maxScroll <= minScroll) {
      console.error("Invalid scroll range: maxScroll must be greater than minScroll.");
      return;
  }

  // Clamp the current scroll position between minScroll and maxScroll
  currentScrollPosition = Math.max(minScroll, Math.min(maxScroll, currentScrollPosition));

  // Normalize scroll position to a value between 0 and 1
  const scrollProgress = (currentScrollPosition - minScroll) / (maxScroll - minScroll);

  // Determine the current and next waypoint indices
  let waypointIndex = Math.floor(scrollProgress * (waypoints.length - 1));
  waypointIndex = Math.max(0, Math.min(waypointIndex, waypoints.length - 1)); // Clamp index
  let nextWaypointIndex = Math.min(waypointIndex + 1, waypoints.length - 1);

  let currentWaypoint = waypoints[waypointIndex];
  let nextWaypoint = waypoints[nextWaypointIndex];

  // Interpolation between waypoints
  let targetX = gsap.utils.interpolate(currentWaypoint.x, nextWaypoint.x, scrollProgress % 1);
  let targetY = gsap.utils.interpolate(currentWaypoint.y, nextWaypoint.y, scrollProgress % 1);
  let targetZ = gsap.utils.interpolate(currentWaypoint.z, nextWaypoint.z, scrollProgress % 1);

  // Animate the mesh position
  gsap.to(mesh.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.5,
      ease: "power2.out",
      onComplete: onCompleteCallback 
  });
}