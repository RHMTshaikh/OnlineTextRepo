const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const email = urlParams.get('email')

let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'))
let curr_user = registeredUsers[email]

const detailsDiv = document.querySelector('.user-details')
const form = detailsDiv.querySelector('form')
const repo_list = document.querySelector('.repo-list')
const create_btn = document.querySelector('.create-new')
const display_repo = document.querySelector('.display-repo')

let user_name = document.querySelector('.user-details .name span')
let user_email = document.querySelector('.user-details .email span')
let user_password = document.querySelector('.user-details .password span')
let repos = document.querySelector('.user-details .repos')

user_name.innerText = curr_user.username
user_email.innerText = curr_user.email
user_password.innerText = curr_user.password


const updateRepoList = ()=>{
    let repos = curr_user.repos
    const repo_list = document.querySelector('.repo-list')
    let count = 1
    let className
    for(let key in repos){
        const repo_btn = document.createElement('button')
        repo_btn.innerText = key
        className = `repo-${count}`
        repo_btn.classList.add(className)
        count++
        repo_list.appendChild(repo_btn)
        
        repo_btn.addEventListener('click',(ev)=>{
            displayRepo(ev)
        })
    }
}
const createNewRepo = (name, text)=>{
    if (form.querySelector('.repo-name') == null) {
        const repoNameInput = document.createElement('input')
        repoNameInput.setAttribute('type','text')
        repoNameInput.classList.add('repo-name')
        repoNameInput.value = name
        
        const repoTextInput = document.createElement('input')
        repoTextInput.setAttribute('type','text')
        repoTextInput.classList.add('repo-text')
        repoTextInput.value = text
        
        form.appendChild(repoNameInput)
        form.appendChild(repoTextInput)
    }else{
        form.querySelector('.repo-name').value = name
        form.querySelector('.repo-text').value = text
    }
}
const displayRepo = (ev)=>{
    let name = ev.target.innerText
    let text = curr_user.repos[name]
    
    var name_div
    var text_div
    var delete_btn
    var edit_btn
    if (document.querySelector('.display-repo .repo-name') == null) {
        name_div = document.createElement('div')
        name_div.classList.add('repo-name')
        
        text_div = document.createElement('div')
        text_div.classList.add('repo-text')
        
        delete_btn = document.createElement('button')
        delete_btn.innerText = 'Delete'
        delete_btn.classList.add('delete-repo')
        
        edit_btn = document.createElement('button')
        edit_btn.innerText = 'Edit'
        edit_btn.classList.add('edit-repo')
    }else{
        name_div = document.querySelector('.display-repo .repo-name')
        text_div = document.querySelector('.display-repo .repo-text')
        delete_btn = document.querySelector('.display-repo .delete-repo')
        edit_btn = document.querySelector('.display-repo .edit-repo')
    }
    name_div.innerText = name
    text_div.innerText = text
    
    display_repo.appendChild(name_div)
    display_repo.appendChild(text_div)
    display_repo.appendChild(delete_btn)
    display_repo.appendChild(edit_btn)
    
    delete_btn.addEventListener('click',()=>{
        delete curr_user.repos[name]
        registeredUsers[email] = curr_user
        localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers))
        display_repo.removeChild(name_div)
        display_repo.removeChild(text_div)
        display_repo.removeChild(delete_btn)
        display_repo.removeChild(edit_btn)
        repo_list.removeChild(ev.target)
    })
    edit_btn.addEventListener('click',()=>{
        createNewRepo(name,text)
    })
}

updateRepoList()

create_btn.addEventListener('click',()=>{
    createNewRepo('','')
})
document.addEventListener('keydown', (ev)=>{
    if(ev.ctrlKey && ev.key == 's' && form.querySelector('.repo-name') != null){
        ev.preventDefault()

        let name = form.querySelector('form .repo-name').value
        let text = form.querySelector('form .repo-text').value
        if (name in curr_user.repos ) {
            curr_user.repos[name] = text
            registeredUsers[email] = curr_user
            localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers))
        }else if (name == '') {
            alert('Name cannot be empty')
        }else{
            curr_user.repos[name] = text
            registeredUsers[email] = curr_user
            localStorage.setItem('registeredUsers',JSON.stringify(registeredUsers))
            
            let count = repo_list.childElementCount+1
            let className = `repo-${count}`
            const repo_btn = document.createElement('button')
            repo_btn.innerText = name
            repo_btn.classList.add(className)
            repo_list.appendChild(repo_btn)
            
            repo_btn.addEventListener('click',(ev)=>{
                displayRepo(ev)
            })
        }
    }
})

