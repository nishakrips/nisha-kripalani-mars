const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector("footer")
const copyright = document.createElement("p")
copyright.innerHTML = `© Nisha Kripalani ${thisYear}`
footer.appendChild(copyright)

const skills = ["JavaScript", "HTML", "CSS", "Adobe Photoshop", "GitHub"]
const skillsSection = document.getElementById("Skills")
const skillsList = skillsSection.querySelector("ul")

for (let i = 0; i < skills.length; i++) {
  const skill = skills[i]
  const skillListItem = document.createElement("li")
  skillListItem.textContent = skill
  skillsList.appendChild(skillListItem)
}

/*Not sure why this is not getting displayed as 2 columns per row */
const skillsWithGridSection = document.getElementById("SkillsWithGrid")
const skillsDiv = skillsWithGridSection.querySelector("div")
for (let i = 0; i < skills.length; i++) {
  const skill = skills[i]
  const skillDivItem = document.createElement("div")
  skillDivItem.textContent = skill
  skillsDiv.appendChild(skillDivItem)
}

const messageSection = document.getElementById("messages")
const messageList = messageSection.querySelector("ul")
messageSection.hidden = messageList.children.length === 0
const messageForm = document.getElementById("leave_message")
messageForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const nameInput = event.target.usersName
  console.log("Name:", nameInput.value)
  const emailInput = event.target.usersEmail
  console.log("Email:", emailInput.value)
  const messageInput = event.target.usersMessage
  console.log("Message:", messageInput.value)
  const newMessage = document.createElement("li")
  newMessage.innerHTML = `<a href="mailto:${emailInput.value}">${nameInput.value}</a> : <span>${messageInput.value} </span>`
  const removeButton = document.createElement("button")
  removeButton.innerText = "remove"
  removeButton.setAttribute("type", "button")
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode
    entry.remove()
    messageSection.hidden = messageList.children.length === 0
  })
  newMessage.appendChild(removeButton)
  messageList.appendChild(newMessage)
  messageSection.hidden = messageList.children.length === 0
  messageForm.reset()
})

const githubRepos = async () => {
  try {
    // throw new Error("Simulated error for testing")
    const res = await fetch("https://api.github.com/users/nishakrips/repos")
    return res.json()
  } catch (error) {
    console.error("Error fetching repositories:", error)
  }
}

const projectsSection = document.getElementById("Projects")
const projectList = projectsSection.querySelector("ul")

const displayRepos = (repos) => {
  console.log("Repositories:", repos)
  if (!repos || repos.length === 0) {
    const noReposMessage = document.createElement("p")
    noReposMessage.textContent = "No repositories found."
    projectsSection.appendChild(noReposMessage)
    return
  }
  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i]
    const project = document.createElement("li")
    project.innerText = repo.name
    projectList.appendChild(project)
  }
}

githubRepos()
  .then(displayRepos)
  .catch((error) => console.error("Error:", error))
