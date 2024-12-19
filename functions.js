    /**
   * Scroll top button
   */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);
  
  // Init isotope layout and filters
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });



/*SWITCH ARK-LIGHT*/
// Toggle Dark Mode Function
function toggleDarkMode() {
  // Toggle the class on the <body> element
  document.body.classList.toggle("dark-background");
  document.body.classList.toggle("light-background");

  // Save the current mode to localStorage
  if (document.body.classList.contains("dark-background")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Apply the persisted theme on page load
(function applyPersistedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-background");
    document.body.classList.remove("light-background");
  } else {
    document.body.classList.add("light-background");
    document.body.classList.remove("dark-background");
  }
})();



/*Contact tikrinimas*/
function validateAndSaveFormData() {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const resultContainer = document.getElementById('result');
  
  let errorMessage = '';

  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessage += '<p style="color: red;">Invalid email address.</p>';
  }

  // Phone Validation (accepts international formats)
  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  if (!phonePattern.test(phone)) {
    errorMessage += '<p style="color: red;">Invalid phone number. Ensure it includes the country code if applicable.</p>';
  }

  // Address Validation (ensure it is non-empty and has a minimum length)
  if (address.length < 5) {
    errorMessage += '<p style="color: red;">Address is too short. Please provide a more detailed address.</p>';
  }

  if (errorMessage) {
    resultContainer.innerHTML = errorMessage;
    return;
  }

  // If validations pass, calculate ratings
  const ratings = {
    question1: parseInt(document.getElementById('question1').value),
    question2: parseInt(document.getElementById('question2').value),
    question3: parseInt(document.getElementById('question3').value),
    question4: parseInt(document.getElementById('question4').value),
    question5: parseInt(document.getElementById('question5').value),
  };

  let total = 0;
  let count = 0;
  for (const value of Object.values(ratings)) {
    total += value;
    count++;
  }

  const average = (total / count).toFixed(2);

  // Adjust text color based on average rating
  let averageColor = '';
  if (average < 4) {
    averageColor = 'red';
  } else if (average < 7) {
    averageColor = 'orange';
  } else {
    averageColor = 'green';
  }

  // Display results
  let output = '';
  output += `<p><strong>Email:</strong> ${email}</p>`;
  output += `<p><strong>Phone:</strong> ${phone}</p>`;
  output += `<p><strong>Address:</strong> ${address}</p>`;

  Object.entries(ratings).forEach(([key, value]) => {
    output += `<p><strong>${key}:</strong> ${value}</p>`;
  });

  output += `<p><strong>Average Rating:</strong> <span style="color: ${averageColor};">${average}</span></p>`;

  resultContainer.innerHTML = output;
}
