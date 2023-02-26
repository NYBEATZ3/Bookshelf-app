class Book {
  constructor(authors, language, subject, title) {
    this.authors = authors;
    this.language = language;
    this.subject = subject;
    this.title = title;
    this.isFavorite = false;
    this.comments = JSON.parse(localStorage.getItem(title)) || [];
  }

  render(comments = []) {
    const li = document.createElement('li');
    li.textContent = this.title;
    const favButton = document.createElement('button');
    favButton.textContent = this.isFavorite ? '❤️' : '♡';
    li.append(favButton);
    favButton.addEventListener('click', () => {
      this.isFavorite = !this.isFavorite;
      favButton.textContent = this.isFavorite ? '❤️' : '♡'; // Update button text
      this.save();
    });
    if (comments.length <= 280) {
      const commentList = document.createElement('ul');
      comments.forEach((comment) => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);
      });
      li.appendChild(commentList);
    }
    const commentForm = document.createElement('form');
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentForm.appendChild(commentInput);
    const commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.textContent = 'Add comment';
    commentForm.appendChild(commentButton);
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentText = commentInput.value;
      if (commentText) {
        this.addComment(commentText);
        commentInput.value = '';
      }
    });
    li.appendChild(commentForm);
    return li;
  }
  
  save() {
    localStorage.setItem(this.title, JSON.stringify(this.comments));
  }

  addComment(comment) {
    this.comments.push(comment);
    this.save();
  }
}
