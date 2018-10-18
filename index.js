var camera, light, scene, renderer, rectangle, scene2, renderer2, div, controls;
        var scene2, renderer2;




        init();
        animate();


        function init() {
            //camera
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 1000);

            controls
            controls = new THREE.OrbitControls(camera);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;

            //Scene
            scene = new THREE.Scene();

            /*
            //CubeGeometry
            rectangle = new THREE.Mesh(new THREE.CubeGeometry(600, 350, 100), new THREE.MeshPhongMaterial());
            scene.add(rectangle);

            //TorusGeometry
            var torus = new THREE.Mesh(new THREE.TorusGeometry(60, 30, 20, 20),
                                       new THREE.MeshNormalMaterial());
            torus.position.set(10, 0, -200);
            scene.add(torus);

            //HemisphereLight
            hemiLight = new THREE.HemisphereLight(0xffbf67, 0x15c6ff);
            scene.add(hemiLight);
            */




            console.log(Math.random()) 
            // scene
            scene = new THREE.Scene();
            var ambient = new THREE.AmbientLight( 0x101030 );
            scene.add( ambient );
            var directionalLight = new THREE.DirectionalLight( 0xffeedd );
            directionalLight.position.set( 0, 0, 1 );
            scene.add( directionalLight );

            // texture
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
            };
            // model
            var loader = new THREE.OBJLoader( manager );
            loader.load( 'Retro_TV/Retro_TV.obj', function ( object ) {
                console.log(object);
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        console.log(child) 
                        child.material.forEach(element => {
                            //element.color.setHex(0x00FF00);
                            let color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
                            console.log(color);
            
                            element.color.setHex('0xffffff');
                            console.log(element);
                            console.log(color);
                            
                            //element.texture.setHex(0x00FF00);
                            //element.map = texture;
                        });
                          //child.material.ambient.setHex(0xFF0000);
                                          //child.material[0].color.setHex(0x00FF00);
                        //child.material.map = texture;
                    }
                } );

            obj = object
            scene.add( obj );
            })



                

            //WebGL Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setClearColor(0xffffff, 1)
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.zIndex = 5;
            document.body.appendChild(renderer.domElement);

            //CSS3D Scene
            scene2 = new THREE.Scene();

            //HTML
            element = document.createElement('div');
            //element = document.getElementById('tv');

            element.innerHTML = '<iframe src="https://www.youtube.com/embed/uuDu43Gnyts" frameborder="0" allowfullscreen=""></iframe>';
            element.className = 'animated bounceInDown' ; 
            element.style.background = "#0094ff";
            element.style.fontSize = "2em";
            element.style.color = "white";
            element.style.padding = "2em";

            //CSS Object
            div = new THREE.CSS3DObject(element);
            div.position.x = 8;
            div.position.y = 9;
            div.position.z = 100;
            scene2.add(div);

            //CSS3D Renderer
            renderer2 = new THREE.CSS3DRenderer();
            renderer2.setSize(window.innerWidth, window.innerHeight);
            renderer2.domElement.style.position = 'absolute';
            renderer2.domElement.style.top = 0;
            document.body.appendChild(renderer2.domElement);
        }

        function animate() {
            requestAnimationFrame(animate);
            renderer2.render(scene2, camera);
            renderer.render(scene, camera);
            controls.update();
        }
