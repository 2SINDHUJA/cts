// 1. Page Load
console.log("Welcome to the Community Portal");
function pageLoaded() {
  alert("Page is fully loaded!");
  loadEvents();
}

// 2. Event Data
const events = [
  { name: "Yoga Workshop", date: "2025-06-10", seats: 10, type: "Health" },
  { name: "Jazz Night", date: "2025-05-28", seats: 0, type: "Music" },
  { name: "Art & Wine", date: "2025-06-12", seats: 5, type: "Art" },
];

let registeredCount = 0;

// 3. Filter Valid Events
function loadEvents() {
  const today = new Date();
  const eventList = document.getElementById("eventList");
  const dropdown = document.getElementById("eventDropdown");
  eventList.innerHTML = "";
  dropdown.innerHTML = "";

  events.forEach((ev, index) => {
    const eventDate = new Date(ev.date);
    if (eventDate > today && ev.seats > 0) {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `<h3>${ev.name}</h3><p>${ev.date}</p><p>${ev.type}</p><p>Seats: ${ev.seats}</p>
        <button onclick="registerUser(${index})">Register</button>`;
      eventList.appendChild(div);

      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = ev.name;
      dropdown.appendChild(opt);
    }
  });
}

// 4. Register User
function registerUser(index) {
  try {
    if (events[index].seats <= 0) throw new Error("No seats left!");
    events[index].seats--;
    registeredCount++;
    alert(`Registered for ${events[index].name}`);
    loadEvents();
  } catch (err) {
    alert(err.message);
  }
}

// 5. Object, Prototype
function Event(name, date, seats) {
  this.name = name;
  this.date = date;
  this.seats = seats;
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

// 6. Array methods
let musicEvents = events.filter(e => e.type === "Music").map(e => `${e.name} 🎵`);
console.log("Music Events:", musicEvents);

// 7. Form Handling
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = this.elements.name.value;
  let email = this.elements.email.value;
  let selected = this.elements.event.value;
  if (!name || !email) {
    document.getElementById("formMessage").textContent = "All fields are required.";
    return;
  }
  registerUser(parseInt(selected));
  document.getElementById("formMessage").textContent = `Thanks, ${name}, you're registered!`;
});

// 8. jQuery + DOM Effects
$("#registerBtn").click(function () {
  $("#formMessage").fadeIn().delay(2000).fadeOut();
});

// 9. Async Mock
async function fetchMockEvents() {
  document.getElementById("eventList").innerHTML = "Loading...";
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Mock fetch complete");
}
fetchMockEvents();

// 10. Modern JS
const [first, ...rest] = events;
console.log("First Event:", first.name);
