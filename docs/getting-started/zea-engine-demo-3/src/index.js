import { 
  Scene,
  GLRenderer 
} from "@zeainc/zea-engine"

const domElement = document.getElementById("app");

const scene = new Scene();
scene.setupGrid(10.0, 10);

const renderer = new GLRenderer(domElement);
renderer.setScene(scene);
renderer.resumeDrawing();