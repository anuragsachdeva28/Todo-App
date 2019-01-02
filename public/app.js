$(document).ready(function(){
    $.getJSON('/api/todo')
        .then(addTodos);
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
            $('#todoInput').value=" ";
        }
        
    });

    $('.list').on('click','li', function(){
        updateTodo($(this));
    });
    
    $('.list').on('click','span', function(event){
        // event.stopPropogation(); 
        removeTodo($(this).parent());
    });

});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    })
}

function addTodo(todo){
    var newTodo=$('<li class="task">'+todo.name+'<span>x</span></li>');
    newTodo.data('id',todo._id);
    newTodo.data('completed',todo.completed);
    if(todo.completed)
    newTodo.addClass("done");
    $('.list').append(newTodo);
}

function createTodo(){
    var usrInput = $('#todoInput').val();
    $.post('/api/todo',{name:usrInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo){
    var deleteId = todo.data('id');
    var urlId = '/api/todo/' + deleteId;
    $.ajax({
        method: 'DELETE',
        url: urlId
    })
    .then(function(){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    }) 
}

function updateTodo(todo){
    var updateId = todo.data('id');
    var urlId = '/api/todo/' + updateId;
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        type: 'PUT',
        url: urlId,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);//isnt making any difference
    })
}