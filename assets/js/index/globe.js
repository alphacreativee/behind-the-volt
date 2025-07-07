const sampleData = {
  features: [
    {
      properties: {
        name: "UK",
        latitude: 55.3781,
        longitude: -3.436,
        pop_max: 67330000,
        region: "uk",
      },
    },
    {
      properties: {
        name: "Spain",
        latitude: 40.4637,
        longitude: -3.7492,
        pop_max: 47360000,
        region: "spain",
      },
    },
    {
      properties: {
        name: "KSA",
        latitude: 24.7136,
        longitude: 46.6753,
        pop_max: 34810000,
        region: "ksa",
      },
    },
    {
      properties: {
        name: "USA - Florida",
        latitude: 27.9944,
        longitude: -81.7603,
        pop_max: 21540000,
        region: "usa-florida",
      },
    },
    {
      properties: {
        name: "VietNam",
        latitude: 14.0583,
        longitude: 108.2772,
        pop_max: 97470000,
        region: "vietnam",
      },
    },
    {
      properties: {
        name: "UAE: Dubai",
        latitude: 25.2048,
        longitude: 55.2708,
        pop_max: 3500000,
        region: "dubai",
      },
    },
    {
      properties: {
        name: "Abu Dhabi",
        latitude: 24.4539,
        longitude: 54.3773,
        pop_max: 1500000,
        region: "abu-dhabi",
      },
    },
    {
      properties: {
        name: "Singapore",
        latitude: 1.3521,
        longitude: 103.8198,
        pop_max: 5700000,
        region: "singapore",
      },
    },
    {
      properties: {
        name: "Australia",
        latitude: -35.2809,
        longitude: 149.13,
        pop_max: 26000000, // Dân số ước tính của Australia
        region: "australia",
      },
    },
    {
      properties: {
        name: "South Africa",
        latitude: -25.7479,
        longitude: 28.2293,
        pop_max: 60000000, // Dân số ước tính của South Africa
        region: "south-africa",
      },
    },
  ],
};

let globe;
let allPlaces = sampleData;

// Function to move globe to a specific region
function moveToRegion(region) {
  if (!globe) {
    console.error("Globe is not initialized");
    return;
  }

  const regions = allPlaces.features.filter(
    (r) => r.properties.region === region
  );
  console.log("Moving to region:", region, regions);
  if (regions.length === 0) {
    console.warn("No regions found for:", region);
    return;
  }
  const { latitude: lat, longitude: lng } = regions[0].properties;

  globe.pointOfView({ lat, lng, altitude: 1.8 }, 2000); // 2-second transition
}

// Function to reset view to global view
function resetView() {
  if (!globe) {
    console.error("Globe is not initialized");
    return;
  }

  // Uncheck all checkboxes
  const regions = [
    "filter-uk",
    "filter-spain",
    "filter-ksa",
    "filter-usa-florida",
    "filter-vietnam",
  ];
  regions.forEach((id) => {
    document.getElementById(id).checked = false;
  });

  // Reset to global view
  globe.pointOfView({ lat: 0, lng: 0, altitude: 1.5 }, 2000);
}

// Function to handle checkbox changes
function handleRegionChange(regionId, region) {
  const checkbox = document.getElementById(regionId);
  if (checkbox.checked) {
    // Uncheck other checkboxes (single selection)

    const allRegions = [
      "filter-uk",
      "filter-spain",
      "filter-ksa",
      "filter-usa-florida",
      "filter-vietnam",
      "filter-dubai",
      "filter-dhabi",
      "filter-singapore",
      "filter-australia",
      "filter-south-africa",
    ];
    allRegions.forEach((id) => {
      if (id !== regionId) {
        document.getElementById(id).checked = false;
      }
    });

    // Move to selected region
    moveToRegion(region);
  } else {
    // If unchecked, reset to global view
    resetView();
  }
}

// Initialize globe
function initGlobe(places) {
  console.log("Initializing Globe with Places:", places.features);
  const globeContainer = document.getElementById("globeViz");
  console.log("Globe Container Size:", globeContainer.getBoundingClientRect());
  if (
    !globeContainer ||
    globeContainer.getBoundingClientRect().width === 0 ||
    globeContainer.getBoundingClientRect().height === 0
  ) {
    console.error("Globe container has zero size or is not found");
    return;
  }

  const isMobile = window.innerWidth <= 991;

  const globeSize = isMobile
    ? Math.min(window.innerWidth, window.innerHeight)
    : window.innerWidth * 0.7;

  const globeWidth = isMobile ? globeSize : window.innerWidth * 0.7;
  const globeHeight = isMobile ? globeSize : window.innerHeight;

  globe = Globe()(globeContainer)
    .globeImageUrl(
      "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
    )
    .width(globeWidth) // Đặt chiều rộng
    .height(globeHeight) // Đặt chiều cao
    .backgroundColor("rgba(0,0,0,0)") // Nền trong suốt
    .atmosphereColor("white")

    .htmlElementsData(places.features)
    .htmlLat((d) => d.properties.latitude)
    .htmlLng((d) => d.properties.longitude)
    .labelSize((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
    .labelDotRadius((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
    .htmlElement((d) => {
      const el = document.createElement("div");
      el.innerHTML = `
        <div class="dot-name" style="
    
        ">${d.properties.name}</div>
      `;

      // Add hover effect
      // Enhanced hover effect
      const labelDiv = el.firstElementChild;
      labelDiv.addEventListener("mouseenter", () => {
        labelDiv.style.transform = "scale(1.3) translateY(-12px)";
        labelDiv.style.boxShadow = "0 4px 16px rgba(0, 255, 255, 0.7)";
        labelDiv.style.zIndex = "1000"; // Bring to front
      });
      labelDiv.addEventListener("mouseleave", () => {
        labelDiv.style.transform = "scale(1) translateY(-12px)";
        labelDiv.style.boxShadow = "0 2px 8px rgba(0, 255, 255, 0.3)";
        labelDiv.style.zIndex = "1";
      });

      return el;
    })
    .htmlAltitude(() => 0.02);

  if (!globe) {
    console.error("Failed to initialize Globe");
    return;
  }

  // Tắt zoom bằng cách chặn sự kiện wheel và mousewheel
  ["wheel", "mousewheel"].forEach((event) => {
    globeContainer.addEventListener(
      event,
      (e) => {
        e.preventDefault(); // Ngăn hành vi zoom
      },
      { passive: false }
    );
  });
  globe.pointOfView({ lat: 0, lng: 0, altitude: 1.8 }, 0);
  // Tắt zoom qua điều khiển của three.js (nếu dùng OrbitControls)
  if (globe.controls && globe.controls().enableZoom !== undefined) {
    globe.controls().enableZoom = false; // Tắt zoom trong OrbitControls
  }
  setupFilterEventListeners();
}

// Setup event listeners for filter checkboxes
function setupFilterEventListeners() {
  const regionMappings = [
    { id: "filter-uk", region: "uk" },
    { id: "filter-spain", region: "spain" },
    { id: "filter-ksa", region: "ksa" },
    { id: "filter-usa-florida", region: "usa-florida" },
    { id: "filter-vietnam", region: "vietnam" },
    { id: "filter-dubai", region: "dubai" },
    { id: "filter-dhabi", region: "abu-dhabi" },
    { id: "filter-singapore", region: "singapore" },
    { id: "filter-australia", region: "australia" },
    { id: "filter-south-africa", region: "south-africa" },
  ];

  regionMappings.forEach(({ id, region }) => {
    document.getElementById(id).addEventListener("change", function () {
      console.log(`${id} changed:`, this.checked);
      handleRegionChange(id, region);
    });
  });
}

// Initialize with sample data
document.addEventListener("DOMContentLoaded", () => {
  initGlobe(sampleData);

  setTimeout(() => {
    if (globe) {
      moveToRegion("uk");
      document.getElementById("filter-uk").checked = true;
    }
  }, 1000); // Wait 1 second for globe to fully initialize
});
