var todo = {},
    mediator = Backbone.Mediator,
    app = {
        TodoItem: {},
        TodoItemEditor: {},
        Tasks: {},
        Projects: {}
    };

$(function() {
    "use strict";

    todo.todo_item_editor = new app.TodoItemEditor.ModelView({
        el: $('.todo-item-editor')
    });

    todo.projects = new app.Projects.CollectionView({
        el: $('.main')
    });

});