const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 400;

let drawing = false;

// Drawing logic
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Clear canvas
document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Send drawing to API
document.getElementById("analyze").addEventListener("click", async () => {
  const dataURL = canvas.toDataURL("image/png");

  document.getElementById("responseText").innerText = "Thinking...";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ image: dataURL })
  });

  const data = await res.json();
  document.getElementById("responseText").innerText = data.text;
});