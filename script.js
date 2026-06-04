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
