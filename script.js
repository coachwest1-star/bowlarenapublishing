const form = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');

function loadReviews() {
  const savedReviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
  savedReviews.forEach(addReviewToPage);
}

function addReviewToPage(review) {
  const card = document.createElement('article');
  card.className = 'review-card';
  card.innerHTML = `
    <p>“${escapeHTML(review.text)}”</p>
    <strong>— ${escapeHTML(review.name)}</strong>
  `;
  reviewList.appendChild(card);
}
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz-4yhMkO1sE4TYma5zSEiXC3BKeUL-Qmin0gaI9fguQmHybtwseedOBpfMfr2mJEvI/exec';

function handleFormSubmit(formId) {
  const form = document.getElementById(formId);

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const status = form.querySelector('.form-status');
    status.textContent = 'Submitting...';

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (!data.permission) {
      data.permission = 'No';
    }

    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      status.textContent = 'Thank you! Your submission has been received.';
      form.reset();

    } catch (error) {
      status.textContent = 'Something went wrong. Please try again.';
    }
  });
}

handleFormSubmit('subscribeForm');
handleFormSubmit('speakingForm');
handleFormSubmit('websiteReviewForm');
function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const review = {
    name: document.getElementById('reviewName').value.trim(),
    text: document.getElementById('reviewText').value.trim()
  };

  if (!review.name || !review.text) return;

  const savedReviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
  savedReviews.push(review);
  localStorage.setItem('bookReviews', JSON.stringify(savedReviews));

  addReviewToPage(review);
  form.reset();
});

loadReviews();
