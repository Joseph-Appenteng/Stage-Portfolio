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

const apiURL = "https://api.github.com/users/Joseph-Appenteng/repos";

async function fetchRepos() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }
        const repos = await response.json();
        
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const commitList = document.getElementById('commit-list');

  async function fetchCommits() {
      try {
          const response = await fetch('https://api.github.com/users/Joseph-Appenteng/events');
          const events = await response.json();

          const pushEvents = events.filter(event => event.type === 'PushEvent');

          if (pushEvents.length === 0) {
              commitList.innerHTML = '<li>Geen recente commits gevonden.</li>';
              return;
          }

          commitList.innerHTML = ''; // Clear initial "loading" message

          pushEvents.slice(0, 5).forEach(event => {
              event.payload.commits.forEach(commit => {
                  const listItem = document.createElement('li');
                  listItem.innerHTML = `
                      <strong>Repo:</strong> ${event.repo.name}<br>
                      <strong>Bericht:</strong> ${commit.message}<br>
                      <strong>Datum:</strong> ${new Date(event.created_at).toLocaleString()}
                  `;
                  commitList.appendChild(listItem);
              });
          });
      } catch (error) {
          console.error('Error fetching commits:', error);
          commitList.innerHTML = '<li>Fout bij het ophalen van commits.</li>';
      }
  }

  fetchCommits();
});
