// Get the button and dropdown content
window.onload = function() {
const sortButton = document.querySelector('.sort-dropdown button');
const sortDropdownContent = document.querySelector('.sort-dropdown-content');
sortButton.textContent = 'Sort by: Recommended';
// Listen for a click event on each dropdown item
sortDropdownContent.querySelectorAll('a').forEach(item => {
  item.addEventListener('click', (event) => {
    // Append the selected option to the text of the button
    sortButton.textContent = 'Sort by: ' + event.target.textContent;
    // Hide the dropdown
    sortDropdownContent.style.display = 'none';
  });
});

// Show the dropdown when the button is clicked
sortButton.addEventListener('click', () => {
  sortDropdownContent.style.display = 'block';
});

/**
     * Easy selector helper function
     */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  const navbarLinks = document.querySelectorAll('.navbar-links a');
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarLinks.forEach(link => link.classList.remove('active'));
      link.classList.add('active');
    });
  });

};