const CORRECT_PASSWORD = "1234"; // change password here
const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === CORRECT_PASSWORD) {
    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");
  } else {
    alert("Wrong Password!");
  }
}

const addFileBtn = document.getElementById("addFileBtn");
const openFilesBtn = document.getElementById("openFilesBtn");
const sidebar = document.getElementById("sidebar");
const fileView = document.getElementById("fileView");
const fileList = document.getElementById("fileList");

let files = JSON.parse(localStorage.getItem("files")) || [];
renderFileList();

addFileBtn.onclick = () => {
  const fileName = `File ${files.length + 1}`;
  const newFile = { name: fileName, expenses: [] };
  files.push(newFile);
  saveFiles();
  openFile(newFile);
};

openFilesBtn.onclick = () => {
  sidebar.classList.toggle("hidden");
};

function renderFileList() {
  fileList.innerHTML = "";
  if (files.length === 0) {
    fileList.innerHTML = "<li>No files yet</li>";
  } else {
    files.forEach((file, index) => {
      const li = document.createElement("li");
      li.textContent = file.name;
      li.onclick = () => openFile(file);
      fileList.appendChild(li);
    });
  }
}

function openFile(file) {
  fileView.innerHTML = `
    <h2>${file.name}</h2>
    <button onclick="addExpense('${file.name}')">Add Expense</button>
    <table>
      <tr><th>Item</th><th>Price</th><th>Date</th></tr>
      ${file.expenses.map(exp => `
        <tr><td>${exp.item}</td><td>${exp.price}</td><td>${exp.date}</td></tr>
      `).join("")}
    </table>
  `;
}

function addExpense(fileName) {
  const item = prompt("Enter item name:");
  const price = prompt("Enter price:");
  if (!item || !price) return;

  const date = new Date().toLocaleString();
  const file = files.find(f => f.name === fileName);
  file.expenses.push({ item, price, date });
  saveFiles();
  openFile(file);
}

function saveFiles() {
  localStorage.setItem("files", JSON.stringify(files));
  renderFileList();
}
