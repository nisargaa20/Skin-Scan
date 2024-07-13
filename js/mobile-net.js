let model;

async function loadModel() {
  console.log("model loading..");
  const loader = document.getElementById("progress-box");
  const loadButton = document.getElementById("load-button");
  loader.style.display = "block";
  modelName = "mobilenet";
  model = await tf.loadLayersModel("./sc_detector/artifacts/tfjs/mobilen_model/model.json");
  loader.style.display = "none";
  loadButton.disabled = true;
  loadButton.innerHTML = "Loaded Model";
  console.log("model loaded..");
}

async function loadFile() {
  console.log("image is in loadfile..");
  document.getElementById("select-file-box").style.display = "flex";
  document.getElementById("predict-box").style.display = "block";
  document.getElementById("prediction").innerHTML = "Click predict to find the type of Skin Cancer!";
  const fileInputElement = document.getElementById("select-file-image");
  renderImage(fileInputElement.files[0]);
}

function renderImage(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const imgUrl = event.target.result;
    document.getElementById("test-image").src = imgUrl;
  };
  reader.readAsDataURL(file);
}

let chart = "";
let firstTime = 0;

function loadChart(label, data) {
  const ctx = document.getElementById("chart-box").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: label,
      datasets: [{
        label: "Probability Chart",
        backgroundColor: "rgb(82, 196, 211)",
        borderColor: "rgb(82, 196, 211)",
        data: data,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 18,
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            font: {
              size: 15,
            },
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 15,
            },
          },
        },
      },
    },
  });
}

async function predButton() {
  if (!model) {
    alert("Please load the model first.");
    return;
  }
  if (document.getElementById("predict-box").style.display === "none") {
    alert("Please load an image using 'Upload Image' button.");
    return;
  }

  const image = document.getElementById("test-image");
  const tensor = preprocessImage(image, modelName);

  const predictions = await model.predict(tensor).data();
  const resultsAll = Array.from(predictions)
    .map((p, i) => ({
      probability: p,
      className: TARGET_CLASSES[i],
      index: i,
    }))
    .sort((a, b) => b.probability - a.probability);

  const results = resultsAll.slice(0, 3);

  document.getElementById("prediction").innerHTML =
    `The predicted type of Skin Cancer is:<br><b>${results[0].className}</b>`;

  const ul = document.getElementById("predict-list");
  ul.innerHTML = "";
  results.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `${p.className} (${p.index}) ${p.probability.toFixed(6)}`;
    ul.appendChild(li);
  });

  const labels = [
    "0: akiec",
    "1: bcc",
    "2: bkl",
    "3: df",
    "4: mel",
    "5: nv",
    "6: vasc",
  ];

  if (firstTime === 0) {
    loadChart(labels, predictions);
    firstTime = 1;
  } else {
    chart.destroy();
    loadChart(labels, predictions);
  }

  document.getElementById("chart-box").style.display = "block";
}

function preprocessImage(image, modelName) {
  let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat();

  if (!modelName) {
    return tensor.expandDims();
  } else if (modelName === "mobilenet") {
    const offset = tf.scalar(127.5);
    return tensor.sub(offset).div(offset).expandDims();
  } else {
    alert("Unknown model name.");
  }
}

function loadDemoImage() {
  document.getElementById("predict-box").style.display = "block";
  document.getElementById("prediction").innerHTML = "Click predict to find the type of Skin Cancer!";
  document.getElementById("select-file-box").style.display = "flex";
  document.getElementById("predict-list").innerHTML = "";

  const imgPath = "./assets/nv_samplepic.jpg";
  document.getElementById("test-image").src = imgPath;
}

