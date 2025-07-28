// JSON image list
  const images = [
    { url: "images/gallery/events/1.jpg", category: "Event" },
    { url: "images/gallery/events/2.jpg", category: "Event" },
    { url: "images/gallery/events/3.jpg", category: "Event" },
    { url: "images/gallery/events/4.jpg", category: "Event" },
    { url: "images/gallery/events/5.jpg", category: "Event" },
    { url: "images/gallery/events/6.jpg", category: "Event" },
    { url: "images/gallery/events/7.jpg", category: "Event" },
    { url: "images/gallery/events/8.jpg", category: "Event" },
    { url: "images/gallery/events/9.jpg", category: "Event" },
    { url: "images/gallery/events/10.jpg", category: "Event" },
    { url: "images/gallery/events/11.jpg", category: "Event" },
    { url: "images/gallery/events/12.jpg", category: "Event" },
    { url: "images/gallery/events/13.jpg", category: "Event" },
    { url: "images/gallery/events/14.jpg", category: "Event" },
    { url: "images/gallery/events/15.jpg", category: "Event" },
    { url: "images/gallery/events/16.jpg", category: "Event" },
    { url: "images/gallery/events/17.jpg", category: "Event" },
    { url: "images/gallery/events/18.jpg", category: "Event" },
    { url: "images/gallery/events/19.jpg", category: "Event" },
    { url: "images/gallery/events/20.jpg", category: "Event" },
    { url: "images/gallery/events/21.jpg", category: "Event" },
    { url: "images/gallery/events/22.jpg", category: "Event" },
    { url: "images/gallery/events/23.jpg", category: "Event" },
    { url: "images/gallery/events/24.jpg", category: "Event" },
    { url: "images/gallery/events/25.jpg", category: "Event" },
    { url: "images/gallery/events/26.jpg", category: "Event" },
    { url: "images/gallery/events/27.jpg", category: "Event" },
    { url: "images/gallery/events/28.jpg", category: "Event" },
    { url: "images/gallery/events/29.jpg", category: "Event" },
    { url: "images/gallery/events/30.jpg", category: "Event" },
    { url: "images/gallery/events/31.jpg", category: "Event" },
    { url: "images/gallery/events/32.jpg", category: "Event" },
    { url: "images/gallery/events/33.jpg", category: "Event" },
    { url: "images/gallery/events/34.jpg", category: "Event" },
    { url: "images/gallery/events/35.jpg", category: "Event" },
    { url: "images/gallery/events/36.jpg", category: "Event" },

    
    { url: "images/gallery/outreach/1.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/2.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/3.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/4.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/5.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/6.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/7.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/8.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/9.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/10.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/11.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/12.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/13.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/14.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/15.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/16.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/17.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/18.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/19.jpg", category: "Outreach" },
    { url: "images/gallery/outreach/20.jpg", category: "Outreach" },


    { url: "images/gallery/empowerment/1.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/2.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/3.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/4.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/5.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/6.jpg", category: "Empowerment" },
    { url: "images/gallery/empowerment/7.jpg", category: "Empowerment" },

    
    { url: "images/gallery/workshop/1.jpg", category: "Workshop" },
  ];

  const categories = ["All", ...new Set(images.map(img => img.category))];
  const filterBar = document.getElementById("filterBar");
  const galleryGrid = document.getElementById("galleryGrid");

  function loadFilters() {
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.onclick = () => filterGallery(cat);
      if (cat === "All") btn.classList.add("active");
      filterBar.appendChild(btn);
    });
  }

  function filterGallery(category) {
    document.querySelectorAll(".filter-bar button").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    galleryGrid.innerHTML = "";
    const filtered = category === "All" ? images : images.filter(img => img.category === category);
    filtered.forEach(createImageItem);
  }

  function createImageItem(imgObj) {
    const wrapper = document.createElement("div");
    wrapper.className = "gallery-item";

    const inner = document.createElement("div");
    inner.className = "gallery-item-inner";

    const img = document.createElement("img");
    img.setAttribute("loading", "lazy");
    img.src = imgObj.url;
    img.alt = imgObj.category;
    img.onclick = () => openModal(imgObj.url);

    inner.appendChild(img);
    wrapper.appendChild(inner);
    galleryGrid.appendChild(wrapper);
  }

  function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const fb = document.getElementById("fbShare");
    const tw = document.getElementById("twShare");
    const wa = document.getElementById("waShare");

    modalImg.src = src;
    fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(src)}`;
    tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(src)}`;
    wa.href = `https://wa.me/?text=${encodeURIComponent(src)}`;

    modal.style.display = "flex";
  }

  document.getElementById("modalClose").onclick = () => {
    document.getElementById("imageModal").style.display = "none";
  };

  // Initialize
  loadFilters();
  filterGallery("All");