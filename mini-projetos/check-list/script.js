const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");
const list = document.getElementById("list");

let items = []; // { id: number, text: string, done: boolean }

const STORAGE_KEY = "checklist_items_v1";

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function render() {
  list.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = item.text;

    if (item.done) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    const btnDone = document.createElement("button");
    btnDone.type = "button";
    btnDone.textContent = item.done ? "Desfazer" : "Feito";
    btnDone.addEventListener("click", () => toggleDone(item.id));

    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.textContent = "Remover";
    btnRemove.addEventListener("click", () => removeItem(item.id));

    li.appendChild(span);
    li.appendChild(btnDone);
    li.appendChild(btnRemove);
    list.appendChild(li);
  }
}

function addItem(text) {
  items.push({ id: Date.now(), text, done: false });
  save();
  render();
}

function toggleDone(id) {
  items = items.map((it) =>
    it.id === id ? { ...it, done: !it.done } : it
  );
  save();
  render();
}

function removeItem(id) {
  items = items.filter((it) => it.id !== id);
  save();
  render();
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;
  addItem(text);
  input.value = "";
  input.focus();
});

clearBtn.addEventListener("click", () => {
  items = [];
  save();
  render();
});

// Inicialização
items = load();
render();
