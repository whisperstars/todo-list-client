(function(module) {

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
                                '<input type="text" class="form-control" placeholder="start typing here to create a task...">' +
                                '<span class="input-group-btn">' +
                                    '<button class="add-task btn btn-success" type="button">Add Task</button>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>'+
                    '<div class="tasks-list panel"></div>'),
        
        events: {
            'click .edit': 'editProject',
            'click .delete': 'deleteProject'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        deleteProject: function() {
            this.remove();
        },

        editProject: function() {
            mediator.pub('Projects:EditItem', this.model);
        }

    });

})(app.Projects);