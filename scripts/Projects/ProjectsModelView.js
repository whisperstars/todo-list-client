(function(module, tasks) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",
        
        className: "project panel panel-primary",
        
        template: _.template('<div class="panel-heading clearfix">' +
                        '<div class="project-title pull-left">' +
                            '<span class="glyphicon glyphicon-list-alt"></span>' +
                            '<span class="title">  <%= title %></span>' +
                        '</div>' +
                        '<div class="project-controlls pull-right btn-group">' +
                            '<div class="btn btn-primary edit"><span class="glyphicon glyphicon-pencil"></span></div> ' +
                            '<div class="btn btn-primary delete"><span class="glyphicon glyphicon-trash"></span></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="panel-body">' +
                        '<div class="tasks-controls">' +
                            '<div class="input-group">' +
                                '<span class="input-group-btn">' +
                                    '<button class="btn btn-success" type="button">' +
                                        '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</button>' +
                                '</span>' +
                                '<input type="text" name="title" class="form-control" placeholder="start typing here to create a task...">' +
                                '<span class="input-group-btn">' +
                                    '<button class="add-task btn btn-success" type="button">Add Task</button>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>'+
                    '<div class="tasks-list-container panel"></div>'),
        
        events: {
            'click .edit': 'editProject',
            'click .delete': 'deleteProject',
            'click .add-task': 'addTask'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            
            this.tasks_collection_view = new tasks.CollectionView({
                el: this.$('.tasks-list-container'),
                project_id: this.model.cid /*@TODO change to cid to id*/
            });

            return this;
        },

        deleteProject: function() {
            this.model.destroy();
            this.remove();
        },

        editProject: function() {
            mediator.pub('Projects:EditItem', this.model);
        },

        addTask: function() {
            var task_title = this.$('input[name="title"]').val(),
                attributes;

            this.$('input[name="title"]').val('');

            attributes = {
                title: task_title,
                item_type: 'Task',
                is_done: false,
                project_id: this.model.cid /*@TODO change to cid to id*/
            };

            mediator.pub('Projects:TaskAdded', attributes);
        }

    });

})(app.Projects, app.Tasks);