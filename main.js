let listElement = document.querySelector(".todo-list");
let inputElement = document.querySelector(".todo-add-input");
const API_URL = "http://159.69.85.4:7777/api/vova";

inputElement.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    let value = e.target.value;

    axios.post(`${API_URL}/tasks`, { text: value }).then(() => {
      fetchData();
      e.target.value = "";
    });
  }
});

fetchData();

function renderList(list) {
  listElement.innerHTML = "";
  list.forEach(function(taks) {
    let li = document.createElement("li");
    li.innerHTML = taks.text;
    listElement.appendChild(li);
    let cross = document.createElement("i");
    cross.innerHTML = "x";
    cross.classList.add("close-button");
    li.appendChild(cross);
    li.addEventListener("click", function() {
      axios.delete(`${API_URL}/tasks/${taks.id}`).then(function() {
        fetchData();
      });
    });
  });
}

function fetchData() {
  axios.get(`${API_URL}/tasks`).then(function(res) {
    renderList(res.data);
  });
}
