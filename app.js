
const colors = ["red", "blue", "green", "yellow", "purple"];
const ballsPerColor = 4;


let allBalls = [];

colors.forEach(c => {
  for (let i = 0; i < ballsPerColor; i++) {
    allBalls.push(c);
  }
});


allBalls = allBalls.sort(() => Math.random() - 0.5);


let tubes = [];
const numTubes = colors.length + 2; 
for (let i = 0; i < numTubes; i++) {
  tubes.push([]);
}


let tubeIndex = 0;
allBalls.forEach(ball => {
  if (tubeIndex >= colors.length) tubeIndex = 0;
  tubes[tubeIndex].push(ball);
  tubeIndex++;
});


const initialTubes = JSON.parse(JSON.stringify(tubes));


let selected = null;
const maxCapacity = ballsPerColor;

function render() {
  const tubeEls = document.querySelectorAll('.tube');

  tubeEls.forEach((tube, i) => {
    tube.innerHTML = '';
    tubes[i].forEach(color => {
      const ball = document.createElement('div');
      ball.className = 'ball';
      ball.style.backgroundColor = color;
      tube.appendChild(ball);
    });
    tube.onclick = () => selectTube(i);
  });

  checkWin();
}

function selectTube(index) {
  if (selected === null && tubes[index].length > 0) {
    selected = index;
  } else if (selected !== null && selected !== index) {
    let fromTube = tubes[selected];
    let toTube = tubes[index];

    if (toTube.length < maxCapacity) {
      let ball = fromTube.pop();
      toTube.push(ball);

    
      while (
        fromTube.length > 0 &&
        toTube.length < maxCapacity &&
        fromTube[fromTube.length - 1] === ball
      ) {
        toTube.push(fromTube.pop());
      }
    }

    selected = null;
  } else {
    selected = null;
  }

  render();
}

function checkWin() {
  let won = tubes.every(tube => {
    return tube.length === 0 || (tube.length === maxCapacity && tube.every(c => c === tube[0]));
  });

  if (won) {
    setTimeout(() => alert("🎉 You Win!"), 100);
  }
}


function resetGame() {
  tubes = JSON.parse(JSON.stringify(initialTubes)); 
  selected = null;
  render();
}

window.onload = function() {
  document.getElementById('resetBtn').addEventListener('click', resetGame);
};


render();
