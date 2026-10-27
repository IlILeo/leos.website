const scene = document.querySelector("#scroll-scene");
const image = document.querySelector("#welcome-img");
const content = document.querySelector("#main-container");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let framePending = false;

function updateScrollScene() {
  const sceneTop = scene.getBoundingClientRect().top;
  const scrollDistance = scene.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -sceneTop / scrollDistance));

  if (!reduceMotion.matches) {
    image.style.transform = `scale(${1 + progress * 0.45}) rotate(${progress * 2}deg)`;
    content.style.opacity = String(1 - progress);
    content.style.transform = `translateY(${-progress * 40}px)`;
  }

  framePending = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!framePending) {
      window.requestAnimationFrame(updateScrollScene);
      framePending = true;
    }
  },
  { passive: true },
); 

window.addEventListener("resize", updateScrollScene);
updateScrollScene();
