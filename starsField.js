const stars = [
  [4, 4, true, true],
  [4, 44, true],
  [36, 22],
  [50, 146, true, true],
  [64, 43, true, true],
  [76, 30, true],
  [101, 116],
  [140, 36, true],
  [149, 134],
  [162, 74, true],
  [171, 96, true, true],
  [210, 56, true, true],
  [235, 90],
  [275, 82, true, true],
  [306, 6],
  [307, 64, true, true],
  [380, 68, true],
  [380, 108, true, true],
  [391, 148, true, true],
  [405, 18, true],
  [412, 86, true, true],
  [426, 210, true, true],
  [427, 56, true, true],
  [538, 138],
  [563, 88, true, true],
  [611, 154, true, true],
  [637, 150],
  [651, 146, true],
  [682, 70, true, true],
  [683, 128],
  [781, 82, true, true],
  [785, 158, true],
  [832, 146, true, true],
  [852, 89],
 ];
 
 const constellations = [
  [
    [247, 103],
    [261, 86],
    [307, 104],
    [357, 36],
  ],
  [
    [586, 120],
    [516, 100],
    [491, 62],
    [440, 107],
    [477, 180],
    [516, 100],
  ],
  [
    [733, 100],
    [803, 120],
    [879, 113],
    [823, 164],
    [803, 120],
  ],
 ];
 
 function createStar(point, blurId) {
  const [cx, cy, dim, blur] = point;
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', 1);
  circle.style.transformOrigin = `${cx / 16}rem ${cy / 16}rem`;
  circle.style.opacity = dim ? 0.2 : 1;
  circle.style.transform = `scale(${dim ? 1 : 1.2})`;
  if (blur) {
     circle.setAttribute('filter', `url(#${blurId})`);
  }
  group.appendChild(circle);
  return group;
 }
 
 function createConstellation(points, blurId) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const d = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command} ${point[0]} ${point[1]}`;
  }).join(' ');
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'white');
  path.setAttribute('stroke-opacity', '0.3');
  path.setAttribute('stroke-dasharray', 1);
  path.setAttribute('stroke-dashoffset', 0);
  path.setAttribute('fill', 'transparent');
  path.classList.add('animate');
  return path;
 }
 
 function createStarField() {
  const container = document.getElementById('starFieldContainer');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 881 211');
  svg.setAttribute('fill', 'white');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('pointer-events-none', 'absolute', 'w-[55.0625rem]', 'origin-top-right', 'rotate-[30deg]', 'overflow-visible', 'opacity-70', '-right-44', 'top-14');
 
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'blurId');
  const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  feGaussianBlur.setAttribute('in', 'SourceGraphic');
  feGaussianBlur.setAttribute('stdDeviation', '.5');
  filter.appendChild(feGaussianBlur);
  defs.appendChild(filter);
  svg.appendChild(defs);
 
  constellations.forEach(points => {
     const path = createConstellation(points, 'blurId');
     svg.appendChild(path);
     points.forEach(point => {
       const star = createStar(point, 'blurId');
       svg.appendChild(star);
     });
  });
 
  stars.forEach(point => {
     const star = createStar(point, 'blurId');
     svg.appendChild(star);
  });
 
  container.appendChild(svg);
}
 
createStarField();
