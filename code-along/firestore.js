document.addEventListener('DOMContentLoaded', async function(event) {

  let db = firebase.firestore()
  // Step 1: Make the world's tiniest to-do app

let form = document.querySelector('form')
form.addEventListener('submit', async function(event) {
  event.preventDefault()
  //consol.log('todo submittal')

  let todoText = document.querySelector('#todo').value
  console.log(todoText)

  if (todoText.length > 0) {
  let todoList = document.querySelector('.todo')
  todoList.insertAdjacentHTML('beforeend', `
  <div class ="py-4 text-xl border-purple-500 w-full">
    ${todoText}
    </div>
  `  )

let docRef = await db.collection('todos').add({
  text: todoText

})

let todoId = docRef.id
console.log(`new todo created: ${todoId}`)

}

document.querySelector('#todo').value = ''
})

  // Step 2: Read existing to-dos from Firestore

  let querySnapshot = await db.collection('todos').get()
  console.log(querySnapshot.size)

  let todos = querySnapshot.docs
  console.log(todos)


  //can be query snapshot can be zebra

  for (let i = 0; i < todos.length; i++) {
let todo = todos[i]
console.log(todo)
let todoId = todo.id
console.log(todoId)
let todoData = todo.data()
console.log(todoData)
let todoText = todoData.Text

let todoList = document.querySelector('#todo')
todoList.insertAdjacentHTML('beforeend', `
<div class ="todo-${todoId} "py-4 text-xl border-purple-500 w-full">
<a class ="done p-2 text-sm bg-green-500 text-white"> NEED TO ADD A CHECK MARK </a>  
${todoText}
  </div>
` )

// Step 4: Add code to allow completing todos

let todoLink = document.querySelector(`.todo-${todoId}.done`)

todoLink.addEventListener('click', async function(event) {
  event.preventDefault()
  console.log(`${todoId} was clicked`)

  document.querySelector(`.todo-${todoId}`).classList.add('opacity-20')

  await db.colelction('todos').doc(todoId).delete()

})

  }



// {} is an object

  // Step 3: Add code to Step 1 to add todo to Firestore
  
})