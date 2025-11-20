
import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2, Vec3, Texture, RenderTarget } from 'ogl';

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const LiquidEther: React.FC<LiquidEtherProps> = ({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  resolution = 0.5,
  autoSpeed = 0.5,
  autoIntensity = 1,
  autoDemo = false,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ 
      alpha: true, 
      premultipliedAlpha: false,
      dpr: 1 // Force dpr 1 for performance on high-res screens
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    // Handle WebGL context loss/restore
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost');
    };
    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };
    gl.canvas.addEventListener('webglcontextlost', handleContextLost, false);
    gl.canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    container.appendChild(gl.canvas);

    // Variable setup
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Shaders
    const baseVertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const splatShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main() {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
      }
    `;

    const divergenceShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;
      void main() {
        float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vUv.x < texelSize.x) L = -C.x;
        if (vUv.x > 1.0 - texelSize.x) R = -C.x;
        if (vUv.y < texelSize.y) B = -C.y;
        if (vUv.y > 1.0 - texelSize.y) T = -C.y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 texelSize;
      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;
      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const displayShader = `
      precision highp float;
      precision highp int;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      
      void main() {
        vec3 fluid = texture2D(uTexture, vUv).rgb;
        float intensity = length(fluid);
        
        vec3 col = mix(vec3(0.0), uColor1, smoothstep(0.0, 0.3, intensity));
        col = mix(col, uColor2, smoothstep(0.3, 0.6, intensity));
        col = mix(col, uColor3, smoothstep(0.6, 1.0, intensity));
        
        float alpha = smoothstep(0.05, 0.8, intensity) * 0.8;
        
        gl_FragColor = vec4(col, alpha);
      }
    `;

    // Helper to create double FBO
    const createDoubleFBO = (w: number, h: number, type: number) => {
      const fboConf = {
        width: w,
        height: h,
        type: type,
        format: gl.RGBA,
        internalFormat: gl.RGBA,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        depth: false,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
      };
      
      let fbo1 = new RenderTarget(gl, fboConf);
      let fbo2 = new RenderTarget(gl, fboConf);

      return {
        get read() { return fbo1; },
        set read(value) { fbo1 = value; },
        get write() { return fbo2; },
        set write(value) { fbo2 = value; },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    };

    const supportFloat = gl.getExtension('OES_texture_float');
    gl.getExtension('OES_texture_float_linear');
    const textureType = supportFloat ? gl.FLOAT : gl.UNSIGNED_BYTE;

    // Setup FBOs
    const simWidth = 128; 
    const simHeight = 128;
    
    let density = createDoubleFBO(simWidth, simHeight, textureType);
    let velocity = createDoubleFBO(simWidth, simHeight, textureType);
    let divergence = new RenderTarget(gl, { width: simWidth, height: simHeight, type: textureType, format: gl.RGBA, depth: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    let pressure = createDoubleFBO(simWidth, simHeight, textureType);

    // Geometry
    const geometry = new Triangle(gl);

    // Programs
    const splatProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: splatShader,
      uniforms: {
        uTarget: { value: null },
        aspectRatio: { value: width / height },
        point: { value: new Vec2() },
        color: { value: new Vec3() },
        radius: { value: 0.005 }
      },
      transparent: true
    });

    const advectionProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: advectionShader,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        texelSize: { value: new Vec2(1.0 / simWidth, 1.0 / simHeight) },
        dt: { value: 0.016 },
        dissipation: { value: 0.98 }
      }
    });

    const divergenceProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: divergenceShader,
      uniforms: {
        uVelocity: { value: null },
        texelSize: { value: new Vec2(1.0 / simWidth, 1.0 / simHeight) }
      }
    });

    const pressureProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: pressureShader,
      uniforms: {
        uPressure: { value: null },
        uDivergence: { value: null },
        texelSize: { value: new Vec2(1.0 / simWidth, 1.0 / simHeight) }
      }
    });

    const gradientSubtractProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: gradientSubtractShader,
      uniforms: {
        uPressure: { value: null },
        uVelocity: { value: null },
        texelSize: { value: new Vec2(1.0 / simWidth, 1.0 / simHeight) }
      }
    });

    const hexToVec3 = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    };
    const c1 = hexToVec3(colors[0]);
    const c2 = hexToVec3(colors[1]);
    const c3 = hexToVec3(colors[2]);

    const displayProgram = new Program(gl, {
      vertex: baseVertex,
      fragment: displayShader,
      uniforms: {
        uTexture: { value: null },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
      }
    });

    const mesh = new Mesh(gl, { geometry, program: displayProgram });

    let lastTime = performance.now();
    let mouse = new Vec2(0, 0);

    const updateMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      );
    };

    const onMouseMove = (e: MouseEvent) => {
        updateMouse(e);
        // Add density
        splat(density.read, density.write, mouse, [0.5, 0.5, 0.5]); 
        density.swap();

        // Add velocity
        const dx = e.movementX;
        const dy = -e.movementY;
        splat(velocity.read, velocity.write, mouse, [dx * mouseForce * 0.001, dy * mouseForce * 0.001, 0]);
        velocity.swap();
    };

    container.addEventListener('mousemove', onMouseMove);
    
    let autoTime = 0;

    function splat(read: RenderTarget, write: RenderTarget, point: Vec2, color: number[] | Vec3) {
        if(!read) return;
        splatProgram.uniforms.uTarget.value = read.texture;
        splatProgram.uniforms.point.value = point;
        splatProgram.uniforms.color.value = color;
        splatProgram.uniforms.radius.value = (cursorSize / width) * 0.2;
        mesh.program = splatProgram;
        renderer.render({ scene: mesh, target: write });
    }

    function resize() {
        width = container!.clientWidth;
        height = container!.clientHeight;
        renderer.setSize(width, height);
        splatProgram.uniforms.aspectRatio.value = width / height;
    }
    window.addEventListener('resize', resize);
    resize();

    let animationId: number;

    const update = (t: number) => {
        animationId = requestAnimationFrame(update);
        
        const dt = Math.min((t - lastTime) * 0.001, 0.1);
        lastTime = t;
        
        autoTime += dt * autoSpeed;

        if (autoDemo) {
            const ax = 0.5 + Math.sin(autoTime) * 0.3;
            const ay = 0.5 + Math.cos(autoTime * 0.7) * 0.3;
            splat(density.read, density.write, new Vec2(ax, ay), [0.2, 0.2, 0.2]);
            density.swap();
            
            const vx = Math.cos(autoTime) * 0.005 * autoIntensity;
            const vy = -Math.sin(autoTime * 0.7) * 0.005 * autoIntensity;
            splat(velocity.read, velocity.write, new Vec2(ax, ay), [vx, vy, 0]);
            velocity.swap();
        }

        advectionProgram.uniforms.dt.value = dt;
        advectionProgram.uniforms.dissipation.value = 0.98;
        
        advectionProgram.uniforms.uVelocity.value = velocity.read.texture;
        advectionProgram.uniforms.uSource.value = velocity.read.texture;
        mesh.program = advectionProgram;
        renderer.render({ scene: mesh, target: velocity.write });
        velocity.swap();

        advectionProgram.uniforms.uVelocity.value = velocity.read.texture;
        advectionProgram.uniforms.uSource.value = density.read.texture;
        advectionProgram.uniforms.dissipation.value = 0.97; 
        mesh.program = advectionProgram;
        renderer.render({ scene: mesh, target: density.write });
        density.swap();

        divergenceProgram.uniforms.uVelocity.value = velocity.read.texture;
        mesh.program = divergenceProgram;
        renderer.render({ scene: mesh, target: divergence });

        pressureProgram.uniforms.uDivergence.value = divergence.texture;
        mesh.program = pressureProgram;
        
        for(let i=0; i<20; i++) { 
            pressureProgram.uniforms.uPressure.value = pressure.read.texture;
            renderer.render({ scene: mesh, target: pressure.write });
            pressure.swap();
        }

        gradientSubtractProgram.uniforms.uPressure.value = pressure.read.texture;
        gradientSubtractProgram.uniforms.uVelocity.value = velocity.read.texture;
        mesh.program = gradientSubtractProgram;
        renderer.render({ scene: mesh, target: velocity.write });
        velocity.swap();

        displayProgram.uniforms.uTexture.value = density.read.texture;
        mesh.program = displayProgram;
        renderer.render({ scene: mesh });
    };

    animationId = requestAnimationFrame(update);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
        container.removeEventListener('mousemove', onMouseMove);
        
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
        if (container && container.contains(gl.canvas)) {
            container.removeChild(gl.canvas);
        }
    };
  }, [colors, mouseForce, cursorSize, resolution, autoSpeed, autoIntensity, autoDemo]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} style={style} />;
};

export default LiquidEther;
