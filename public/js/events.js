const events = [
    {
      title: "Girls Empowerment Workshop",
      date: "2025-08-15",
      time: "10:00 AM",
      description: "A hands-on workshop for young girls focused on digital literacy, rights awareness, and leadership.",
      image: "https://via.placeholder.com/600x300?text=Girls+Empowerment"
    },
    {
      title: "Rural Health Outreach",
      date: "2025-09-01",
      time: "9:00 AM",
      description: "Medical outreach for women and children in underserved communities.",
      image: "https://via.placeholder.com/600x300?text=Health+Outreach"
    },
    {
      title: "Literacy & Mother Tongue Festival",
      date: "2025-08-28",
      time: "1:00 PM",
      description: "Celebrating functional literacy and native languages through art, culture, and reading.",
      image: "https://via.placeholder.com/600x300?text=Literacy+Festival"
    }
  ];

  const eventList = document.getElementById('eventList');
  const calendar = document.getElementById('calendar');

  function renderEvents() {
    eventList.innerHTML = '';
    calendar.innerHTML = '';

    events.forEach((event, index) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const countdown = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

      // Create card
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="event-card">
          <img src="${event.image}" alt="event image" class="event-img w-100">
          <div class="p-3">
            <h5>${event.title}</h5>
            <p class="mb-1"><i class="fas fa-calendar-alt me-1"></i>${event.date}</p>
            <p class="mb-2"><i class="fas fa-clock me-1"></i>${event.time}</p>
            <p class="countdown">${countdown >= 0 ? countdown + " days to go" : "Event passed"}</p>
            <button class="btn btn-sm btn-outline-primary mt-2" onclick="openModal(${index})">View Details</button>
          </div>
        </div>
      `;
      eventList.appendChild(card);

      // Calendar entry
      const calEntry = document.createElement('div');
      calEntry.className = "mt-2";
      calEntry.innerHTML = `<i class="fas fa-dot-circle text-success me-1"></i><strong>${event.date}</strong>: ${event.title}`;
      calendar.appendChild(calEntry);
    });
  }

  function openModal(index) {
    const event = events[index];
    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalImage').src = event.image;
    document.getElementById('modalDescription').innerText = event.description;
    document.getElementById('modalDate').innerText = event.date;
    document.getElementById('modalTime').innerText = event.time;
    new bootstrap.Modal(document.getElementById('eventModal')).show();
  }

  renderEvents();