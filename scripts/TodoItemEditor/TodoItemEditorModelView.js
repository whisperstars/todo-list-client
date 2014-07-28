(function(module) {

    module.ModelView = Backbone.View.extend({

        template: {
            'Project': '<div class="project-fields">' +
                'Project Title: <input type="text" name="title" value="<%= title%>">' +
                '</div>',
            'Task': ''
        },

        is_new_model: true,

        subscriptions: {
            'Projects:CreateNewItem': 'initItem',
            'Projects:EditItem': 'editItem'
        },

        events: {
            'click .save': 'saveItem',
            'click .cancel': 'cancelItem'
        },

        initItem: function(attributes) {
            this.model = new module.Model();
            this.is_new_model = true;
            this.model.set(attributes);

            this.render();
        },

        editItem: function(model) {
            this.model = model;
            this.is_new_model = false;

            this.render();
        },

        render: function() {
            var template = _.template(this.template[this.model.get('item_type')]);

            this.$('.modal-body').html(template(this.model.toJSON()));
            this.$el.modal('show');
        },

        saveItem: function() {
            this.model.set('title', this.$('input[name="title"]').val());

            if(this.is_new_model) {
                mediator.pub('TodoItemEditor:' + this.model.get('item_type') + 'Saved', this.model);
            }

            this.$el.modal('hide');
        },

        cancelItem: function() {
            /*if(!this.is_new_model) {
                this.model.set(this.model.previousAttributes());
            }*/

            this.$el.modal('hide');
        }

    });

})(app.TodoItemEditor);