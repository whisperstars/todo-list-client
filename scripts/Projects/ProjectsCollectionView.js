(function(module) {
        
    module.CollectionView = Backbone.View.extend({
     
        template: _.template('<div class="projects-list"></div>' +
            '<button class="btn btn-primary btn-lg add-project-btn center-block"><span class="glyphicon glyphicon-plus dark-blue"></span> Add TODO List</button>'),
        
        subscriptions: {
            'TodoItemEditor:ProjectSaved': 'addProjectToCollection'
        },

        events: {
            'click .add-project-btn': 'createProject'
        },

        initialize: function() {
            this.render();

            this.collection = new module.Collection();
            this.collection.on('add', this.renderOne, this);

            this.collection.add({title: 'project1', item_type: 'Project'});
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        renderOne: function(project_model) {
            var project_view = new module.ModelView({
                    model: project_model
                });

            this.$('.projects-list').append(project_view.render().el);
        },

        createProject: function() {
            var attributes = {
                    item_type: 'Project',
                    position: this.collection.length
                };

            mediator.pub('Projects:CreateNewItem', attributes);
        },

        addProjectToCollection: function(project_model) {
            this.collection.add(project_model);
        }
     
    });

})(app.Projects);