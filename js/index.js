document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchQuery = document.getElementById('search').value;
      if (searchQuery) {
        fetch(`https://api.github.com/search/users?q=${searchQuery}`)
          .then(response => response.json())
          .then(data => displayUsers(data.items))
          .catch(error => console.error('Error fetching users:', error));
      }
    });
  
    function displayUsers(users) {
      userList.innerHTML = ''; // Clear previous results
      reposList.innerHTML = ''; // Clear previous repositories
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user.login;
        userItem.className = 'user-item';
        userItem.addEventListener('click', () => fetchAndDisplayRepos(user.login));
        userList.appendChild(userItem);
      });
    }
  
    function fetchAndDisplayRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ''; // Clear previous repositories
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
    }
  });
  