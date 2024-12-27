// Database
let taskId = 0;
let tasks = new Array();

const TaskStatusEnum = {
    TASK_PENDING: 0,
    TASK_COMPLETE: 1
};

function Task(id, desc, status) {
    this.id = id;
    this.desc = desc;
    this.status = status;
    this.toString = function () {
        return `${this.id} | ${this.desc} | ${this.status}`;
    }
    return this;
}

const addTaskFrom = document.forms.namedItem('add-task-form');
addTaskFrom.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(addTaskFrom);
    // console.log(`typeof formData: ${typeof formData}`);

    const taskDesc = formData.get('task-desc');
    tasks.push(new Task(++taskId, taskDesc, TaskStatusEnum.TASK_PENDING));

    showTasks();
    addTaskFrom.reset();
});

const delTaskForm = document.forms.namedItem('del-task-form');
delTaskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskId = delTaskForm.querySelector('#task-id').value;

    // Check for negative task ID
    if (taskId < 0) {
        alert('Bete mauz kardi, negative Id, Waah!!!');
        return;
    }
    
    // Check for task ID greater than 50
    else if (taskId > 50) {
        alert('50 se jyada task ek din mein kaise krlega bhidu??!');
        return;
    }
    
    // Check if task with given ID exists in the tasks array
    const taskToDelete = tasks.find(task => task.id === parseInt(taskId));
    if (!taskToDelete) {
        alert(`Are bhai andha hai kya jo task exist krta hai uski Id daal na!! Task with ID ${taskId} not found. `);
        return;
    }

    // Correct way to remove the task by filtering out the task with the given ID
    tasks = tasks.filter(task => task.id !== parseInt(taskId));

    // Re-render the tasks after deletion
    showTasks();
    
    // Reset the form after submission
    delTaskForm.reset();
});


function showTasks() {
    const tasksTable = document.querySelector('section[name="task-list"] table');
    const tableBody = tasksTable.querySelector('tbody');
    tableBody.innerHTML = '';

    tasks.forEach(function (task) {
        const tableRow = document.createElement('tr');
        tableRow.id = task.id;

        tableRow.innerHTML = `
            <td>${task.id}</td>
            <td>${task.desc}</td>
            <td><button class="task-status ${task.status === TaskStatusEnum.TASK_PENDING ? 'btn btn-outline-secondary' : 'btn btn-outline-success'}">
                ${task.status === TaskStatusEnum.TASK_PENDING ? "Pending" : "Complete"}
            </button></td>
        `;
        tableBody.appendChild(tableRow);
    });

    const allStatusBtns = document.querySelectorAll('.task-status');
    allStatusBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const taskId = e.target.closest('tr').id;
            const task = tasks.find(t => t.id === Number(taskId));
            if (task) {
                task.status = (task.status === TaskStatusEnum.TASK_PENDING ? TaskStatusEnum.TASK_COMPLETE : TaskStatusEnum.TASK_PENDING);
                showTasks(); // Re-render the tasks
            }
        })
    });
}


