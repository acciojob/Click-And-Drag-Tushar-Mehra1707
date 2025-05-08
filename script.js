// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

const containerRect = container.getBoundingClientRect();
let activeCube = null;
let offsetX, offsetY;

// Initialize cubes in a grid layout
cubes.forEach((cube, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  cube.style.left = `${col * 80 + 10}px`;
  cube.style.top = `${row * 80 + 10}px`;

  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.cursor = 'grabbing';
  });
});

// Move the cube with the mouse
document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Constrain to container bounds
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
});

// Drop the cube
document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.cursor = 'grab';
    activeCube = null;
  }
});
