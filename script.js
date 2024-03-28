// let idArray = [];

let removeTask = function () {
  let thisTask = $(this).closest('.task');
  let taskId = thisTask.attr('id');
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + taskId + '?api_key=1220',
    success: function(response, textStatus) {
      console.log(response);
      thisTask.detach();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  
  });
  console.log("task deleted");

  // $(this).closest('.task').detach();
};

let markComplete = function () {
  let status = $(this).closest('tr');

  console.log('button pressed');

  if ($(status).attr('class') !== "task comp") {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + status.attr('id') + '/mark_complete?api_key=1220',
      contentType: 'application/json',
      dataType: 'json',
      success: function(response, textStatus) {
        console.log(response);
        console.log("updated status");
        $(status).toggleClass('comp');
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    // $(status).find('.btn-outline-primary').toggleClass('active');
    // $(status).find('.btn-outline-primary').attr('aria-pressed', 'true');
    
  } else if ($(status).attr('class') === "task comp") {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + status.attr('id') + '/mark_active?api_key=1220',
      contentType: 'application/json',
      dataType: 'json',
      success: function(response, textStatus) {
        console.log(response);
        console.log("updated status");
        $(status).toggleClass('comp');
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });

    // $(status).find('.btn-outline-primary').toggleClass('active');
    // $(status).find('.btn-outline-primary').attr('aria-pressed', 'false');

  }
  
  
}

let displayNew = function(itemNew) {
  let tableTask = $('<tr class="task" id=""></tr>');
  $(tableTask).append('<th scope="row"><button type="button" class="btn btn-outline-primary" data-bs-toggle="button">></button></th>');
  $(tableTask).append('<td class="task-content">' + itemNew.content + '</td>');
  $(tableTask).append('<td><button type="button" class="btn btn-outline-danger">Delete</button></td>');
  $(tableTask).attr('id', itemNew.id);

  if (itemNew.completed === true) {
    $(tableTask).find('.btn-outline-primary').toggleClass('active');
    $(tableTask).find('.btn-outline-primary').attr('aria-pressed', 'true');
    $(tableTask).addClass('comp');
  }

  $('tbody').append(tableTask);
  console.log("displayed tasks: " + itemNew.content);
  console.log("item ID: " + itemNew.id);
  console.log("completed: " + itemNew.completed);
  // idArray.push({
  //   content: itemNew.content,
  //   id: itemNew.id,
  //   completed: false
  // });
}

let apiDisplay = function() { 
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1220',
    dataType: 'json',
    success: function(response, textStatus) {
      console.log('API Response:', response);

      for (let i = 0; i < response.tasks.length; i++) {
        let task = response.tasks[i];
        displayNew(task);
        // idArray.push({
        //   content: response.tasks[i].content,
        //   id: response.tasks[i].id,
        //   completed: response.tasks[i].completed
        // });
      }    
      // console.log(idArray);
      // console.log(idArray[1]);
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

let newTask = function() {
  let taskInput = $('#new-task').val();
  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1220',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: taskInput
      }
    }),
    success: function(response, textStatus) {
      console.log(response);
      console.log("Updated Tasks: " + response.task.content);
      displayNew(response.task);
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}




$(document).ready(function() {
  // btnDelete();
  apiDisplay();

  $('#add-btn').on('click', newTask);
  // $('.btn-outline-primary').on('click', markComplete);
  $('tbody').on('click', '.btn-outline-danger', removeTask);

  $('tbody').on('click', '.btn-outline-primary', markComplete);
  
});