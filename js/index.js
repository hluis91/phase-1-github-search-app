
// document.addEventListener("DOMContentLoaded", init)
// function init() {
//     let form = document.getElementById('github-form')
//     console.log(form)
// }

const form = document.querySelector("#github-form")


form.addEventListener('submit', function(e){
    e.preventDefault()

    const search = document.getElementById("search").value
    const userName = search.split(' ').join('')
    fetch(`https://api.github.com/users?q=${userName}`)
    .then((result) => result.json())
    .then((data) => {
        data.forEach(userObject => {
            getUserInfo(userObject)
            userRepoInfo(userObject)
        })
    })
})

function getUserInfo(user){
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let userUrl = document.createElement('a')
    let div = document.createElement('div')

    h2.innerText = user.login
    img.src = user.avatar_url
    userUrl.href = user.url
    userUrl.innerText = "Github Link"
    div.append(h2, img, userUrl)

    document.getElementById("user-list").append(div)
    div.addEventListener('click', userRepoInfo)

} 

function userRepoInfo(info){
    const userRepository = document.querySelector("#repos-list")
    let userRepo = document.createElement('a')

    userRepo.href = info.repos_url
    userRepo.innerText = "Github Repository Link"
    userRepository.append(userRepo)
    fetch(`https://api.github.com/users?q=${userRepo}/repos`)
    .then((res) => res.json())
}