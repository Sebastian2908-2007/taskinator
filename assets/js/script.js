var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event) {  
event.preventDefault(); 

var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

//form validation/ checking fields and stopping completion if info is notfilled out
if (!taskNameInput || !taskTypeInput) {
    alert("you need to fill out the task form!!!");
    return false;
}
formEl.reset();

// packaging data as an object
var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
};
// send data as an argument to createTaskEl
createTaskEl(taskDataObj);
    
};

var createTaskEl = function(taskDataObj) {

// create list item/ NOTE TO SELF: This code creates an html element//
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
// give it a class name
taskInfoEl.className = "task-info";
// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name  + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);
// taskActionsEl is a variable i created to store createTaskActions function I am also using taskIdCounter as an argument
var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);


// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

//increase task counter for next unique id
taskIdCounter++;


};
formEl.addEventListener("submit", taskFormHandler);

// for generating form elements variable logic

var createTaskActions = function(taskId) {
    //edit button creation block
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-button";
    editButtonEl.setAttribute("data-task-id", taskId);
    // edit button creation block ends
    // append editbtn to div
    actionContainerEl.appendChild(editButtonEl);

    // delete button creation block
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-button";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
    
    //array for select <option> Elements to be used in for loop this method is better than creating three seperat but similar code blocks
    // using arrays help us with the option of adding more code later, using less code!
    var statusChoices = ["To Do", "In Progress", "Completed"];

    //four loop for looping through this choices aka <option elements> array
    for (var i =0; i < statusChoices.length; i++) {
        // create option el in four loop
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        // append to select element
        statusSelectEl.appendChild(statusOptionEl);
    }

return actionContainerEl;

};