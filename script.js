// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const btn_submit = document.querySelector("#submit")
const task_input = document.querySelector("#task-input")
const error = document.querySelector("#error")
const task_list = document.querySelector("#task-list")
const empty = document.querySelector("#empty")
const priority_select = document.querySelector("#priority-select")
btn_submit.addEventListener("click", addTask)

function addTask(e) {
    e.preventDefault()

    const input = task_input.value.trim()
    if (input === "") {
        error.hidden = false
        error.textContent = "Please type a task"
    }

    else {
        const existing_tasks = task_list.querySelectorAll("li .text");
        let is_duplicate = false;

        for (let task_span of existing_tasks) {
            if (task_span.textContent.trim().toLowerCase() === input.toLowerCase()) {
                is_duplicate = true;
                break; 
            }
        }

        if (is_duplicate) {
            error.hidden = false;
            error.textContent = "This task already exists"; 
            return;
        }

        error.hidden = true

        const newTask = document.createElement("li");
        newTask.classList.add(`priority-${priority_select.value.toLowerCase()}`)
        const spanTask = document.createElement("span");
        spanTask.classList.add("text");
        spanTask.textContent = input;
        const btnTask = document.createElement("button")
        btnTask.classList.add("delete");
        btnTask.textContent = "x";

        const active_filter = document.querySelector("#filters button.active");
        if (active_filter.dataset.filter === "done") {
            newTask.hidden = true;
        }

        newTask.appendChild(spanTask)
        newTask.appendChild(btnTask)
        task_list.appendChild(newTask)
        empty.hidden = true
        task_input.value = ""
        task_input.focus()
        updateTaskLeft()
    }

    
}
// Step 2: click a task to toggle the "done" class
task_list.addEventListener('click', doneTask)

function doneTask(e) {
    if (e.target.classList.contains("delete")) {
        e.stopPropagation();
        const li_task = e.target.closest("li");
        if (li_task) {
            li_task.classList.remove("done");
            li_task.remove();
        }

        if (task_list.children.length === 0) {
            empty.hidden = false;
        }
    }
    else {
        const li_task = e.target.closest("li");
        if (li_task) {
            li_task.classList.toggle("done");
        }
    }
    updateTaskLeft()
}

// Step 4: "tasks left" counter
const task_left = document.querySelector("#left")

function updateTaskLeft() {
    const activeTasks = task_list.querySelectorAll("li:not(.done)").length;
    task_left.textContent = activeTasks;
}

// Step 5: filters (All / Active / Done)
const filters_container = document.querySelector("#filters");
const filter_btns = filters_container.querySelectorAll("button")
filters_container.addEventListener("click", filter)
function filter(e) {
    if (e.target.tagName !== "BUTTON") {
        return;
    }
    filter_btns.forEach(btn => { btn.classList.remove("active") })
    e.target.classList.add("active");

    const current_filter = e.target.dataset.filter;
    const task_list = document.querySelectorAll("li");
    task_list.forEach(task => {
        if (current_filter == "all")
            task.hidden = false
        else if (current_filter == "active") {
            if (task.classList.contains("done"))
                task.hidden = true
            else
                task.hidden = false
        }
        else //done 
        {
            if (task.classList.contains("done"))
                task.hidden = false
            else
                task.hidden = true
        }
    })
}



// Step 6: Clear completed
const clear_btn = document.querySelector("#clear-done")
clear_btn.addEventListener("click", clear)

function clear(e) {
    let task_list = document.querySelectorAll("li");
    task_list.forEach(task => {
        if (task.classList.contains("done")) {
            if (task) {
                task.classList.remove("done");
                task.remove();
            }

        }
    })
    // Step 7: show the empty message only when there are no tasks
    task_list = document.querySelectorAll("li");
    if (task_list.length === 0) {
        empty.hidden = false;
    }
    updateTaskLeft();

}

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
