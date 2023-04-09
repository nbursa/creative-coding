import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

class FlowField extends THREE.Object3D {
  public size: number;
  public resolution: number;
  public arrows: THREE.ArrowHelper[];

  constructor(size: number, resolution: number) {
    super();
    this.size = size;
    this.resolution = resolution;

    this.arrows = [];
    const step = this.size / this.resolution;

    const arrowGeometry = new THREE.CylinderGeometry(0, 0.1, step, 12, 1);
    const arrowMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});

    for (let i = 0; i < this.resolution; i++) {
      for (let j = 0; j < this.resolution; j++) {
        const x = i * step - this.size / 2 + step / 2;
        const z = j * step - this.size / 2 + step / 2;

        const arrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(x, 0, z),
          step,
          0xffffff,
          0.5 * step,
          0.2 * step
        );

        arrow.userData = {direction: new THREE.Vector3(0, 1, 0), intensity: 0};

        const arrowMesh = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrowMesh.scale.set(0.5, 1, 0.5);
        arrowMesh.position.copy(arrow.position);
        arrowMesh.setRotationFromQuaternion(arrow.quaternion);

        arrow.add(arrowMesh);

        this.arrows.push(arrow);
        this.add(arrow);
      }
    }
  }

  updateFlowField(position: THREE.Vector3) {
    const force = new THREE.Vector3();

    this.arrows.forEach((arrow) => {
      const direction = arrow.userData.direction;

      const worldPos = arrow.getWorldPosition(new THREE.Vector3());
      const distance = worldPos.distanceTo(position);
      const intensity = Math.max(0, (1 - distance / 5) ** 2);

      force.addScaledVector(direction, intensity);

      arrow.setDirection(direction);

      arrow.userData.intensity = intensity;

      const color = new THREE.Color(0xffffff).lerp(new THREE.Color(0x0000ff), intensity);
      ((arrow.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).color.set(color);
    });

    return force;
  }


  updateArrows() {
    this.arrows.forEach((arrow) => {
      const intensity = arrow.userData.intensity;
      const color = new THREE.Color(0xffffff).lerp(new THREE.Color(0x0000ff), intensity);
      ((arrow.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).color.set(color);

    });
  }
}


const FlowFieldComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({canvas});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);

    camera.position.z = 2;

    const light = new THREE.DirectionalLight(0xffffff, 1);

    light.position.set(-1, 2, 4);
    scene.add(light);

    const flowField = new FlowField(20, 20);

    scene.add(flowField);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
      mouse.y = (event.clientY / canvas.clientHeight) * 2 - 1;

      // Update arrow directions based on mouse position
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(flowField.children, true);

      if (intersects.length > 0) {
        const object = intersects[0].object;

        if (object instanceof THREE.Mesh && object.geometry && object.geometry.attributes.position) {
          const positionAttribute = object.geometry.attributes.position;

          const face = intersects[0].face!;
          const vector = new THREE.Vector3()
            .fromBufferAttribute(positionAttribute, face.a)
            .add(
              new THREE.Vector3()
                .fromBufferAttribute(positionAttribute, face.b)
                .add(new THREE.Vector3().fromBufferAttribute(positionAttribute, face.c))
                .divideScalar(3)
            );

          flowField.position.copy(vector);
          flowField.lookAt(vector.add(face.normal));
          flowField.updateMatrixWorld();

          flowField.updateArrows();
        }
      }
    }

    function render() {
      requestAnimationFrame(render);
      // Update arrow intensities
      flowField.updateArrows();
      renderer.render(scene, camera);
    }


    render();

  }, []);

  return <canvas ref={canvasRef} className="h-screen w-screen"/>;
};

export default FlowFieldComponent;
