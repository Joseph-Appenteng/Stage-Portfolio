const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");
form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Uw bericht wordt verzonden...";
  form.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}


// Waits for the entire HTML page to load before executing the JavaScript code
document.addEventListener('DOMContentLoaded', () => {
  // Finds the element with the ID 'commit-list' to add commit data to later
  const commitList = document.getElementById('commit-list');

  // An asynchronous function to fetch the latest commits from the user
  async function fetchCommits() {
      try {
          // Makes an HTTP request to the GitHub API to get the latest events of the user
          const response = await fetch('https://api.github.com/users/Joseph-Appenteng/events');
          
          // Checks if the request was successful; throws an error if not
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Converts the API response to JSON format
          const events = await response.json();

          // Filters the events to keep only 'PushEvent' types, as these contain commit information
          const pushEvents = events.filter(event => event.type === 'PushEvent');

          // Checks if there are no 'PushEvent' results and displays a message if no recent commits are found
          if (pushEvents.length === 0) {
              commitList.innerHTML = '<li>No recent commits found.</li>';
              return;
          }

          // Clears the initial "loading" message
          commitList.innerHTML = '';

          // Loops through the first 5 push events to display recent commits
          pushEvents.slice(0, 5).forEach(event => {
              // Retrieves the first commit from each push event
              const recentCommit = event.payload.commits[0];

              // Checks if a commit is found and creates a list item to display it
              if (recentCommit) {
                  const listItem = document.createElement('li');
                  listItem.innerHTML = `
                      <strong>Repo:</strong> ${event.repo.name}<br>
                      <strong>Message:</strong> ${recentCommit.message}<br>
                      <strong>Date:</strong> ${new Date(event.created_at).toLocaleString()}
                  `;
                  // Appends the list item to the 'commit-list' element
                  commitList.appendChild(listItem);
              }
          });
      } catch (error) {
          // Logs the error to the console and displays an error message to the user
          console.error('Error fetching commits:', error);
          commitList.innerHTML = '<li>Error fetching commits.</li>';
      }
  }

  // Calls the function to fetch the commits when the page loads
  fetchCommits();
});

