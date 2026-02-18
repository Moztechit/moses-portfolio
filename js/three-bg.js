// Three.js 3D Background Animation
class Background3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particleCount = 1000;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        
        this.init();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('bg-canvas'),
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particles
        this.createParticles();
        
        // Add lights
        this.addLights();
        
        // Start animation loop
        this.animate();
        
        // Add event listeners
        this.addEventListeners();
    }
    
    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        // Create particle positions
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Random position in sphere
            const radius = Math.random() * 100 + 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
            
            // Random colors (purple/blue gradient)
            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                colors[i3] = 0.4 + Math.random() * 0.2;     // R
                colors[i3 + 1] = 0.4 + Math.random() * 0.3; // G
                colors[i3 + 2] = 0.9 + Math.random() * 0.1; // B
            } else {
                colors[i3] = 0.6 + Math.random() * 0.2;     // R
                colors[i3 + 1] = 0.3 + Math.random() * 0.3; // G
                colors[i3 + 2] = 0.9 + Math.random() * 0.1; // B
            }
            
            // Random sizes
            sizes[i] = Math.random() * 3 + 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create particle material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0, 0) }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform vec2 mouse;
                
                void main() {
                    vColor = color;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Add some animation
                    mvPosition.x += sin(time + position.x * 0.01) * 2.0;
                    mvPosition.y += cos(time + position.y * 0.01) * 2.0;
                    mvPosition.z += sin(time + position.z * 0.01) * 1.0;
                    
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - (dist * 2.0);
                    alpha = pow(alpha, 2.0);
                    
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Point lights
        const light1 = new THREE.PointLight(0x6366f1, 1, 100);
        light1.position.set(10, 10, 10);
        this.scene.add(light1);
        
        const light2 = new THREE.PointLight(0x8b5cf6, 1, 100);
        light2.position.set(-10, -10, 10);
        this.scene.add(light2);
        
        const light3 = new THREE.PointLight(0x06b6d4, 0.8, 100);
        light3.position.set(0, 15, -10);
        this.scene.add(light3);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Update particle material
        if (this.particles && this.particles.material.uniforms) {
            this.particles.material.uniforms.time.value = time;
            this.particles.material.uniforms.mouse.value.set(
                this.mouseX * 0.0005,
                this.mouseY * 0.0005
            );
        }
        
        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.001;
            
            // Mouse interaction
            this.targetRotationX = this.mouseY * 0.0001;
            this.targetRotationY = this.mouseX * 0.0001;
            
            this.particles.rotation.x += (this.targetRotationX - this.particles.rotation.x) * 0.02;
            this.particles.rotation.y += (this.targetRotationY - this.particles.rotation.y) * 0.02;
        }
        
        // Move camera in a subtle circular motion
        this.camera.position.x = Math.sin(time * 0.1) * 5;
        this.camera.position.y = Math.cos(time * 0.15) * 3;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX - window.innerWidth / 2;
            this.mouseY = event.clientY - window.innerHeight / 2;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Visibility change (pause when tab is not visible)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.animate = () => {}; // Stop animation
            } else {
                this.animate(); // Restart animation
            }
        });
    }
}

// Initialize 3D background when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Background3D();
});