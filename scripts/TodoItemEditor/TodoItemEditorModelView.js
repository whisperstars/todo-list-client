(function(module) {

    module.ModelView = Backbone.View.extend({

        template: {
            'Project': '<div class="project-fields">' +
                'Project Title: <input type="text" class="form-control" name="title" value="">' +
                '</div>',
            'Task': '<div class="task-fields">' +
                'Task Title: <input type="text" name="title" value="">' +
                'Task Deadline: <input type="text" name="deadline" value="">' +
                '</div>'
        },

        bindings: {
            'Project': {
                title: 'input[name="title"]'
            },
            'Task': {
                title: 'input[name="title"]',
                deadline : 'input[name="deadline"]'
            }
        },

        is_new_model: true,

        subscriptions: {
            'Projects:CreateNewItem': 'initItem',
            'Projects:EditItem': 'editItem',
            'Tasks:EditItem': 'editItem'
        },

        events: {
            'click .save': 'saveItem',
            'click .cancel': 'cancelItem'
        },

        initItem: function(attributes) {
            this.model = new module.Model();
            this._modelBinder = new Backbone.ModelBinder();

            this.is_new_model = true;
            this.model.set(attributes);

            if(this.model.isValid()) {
                console.log('true');
            } else {
                console.log('false');
            }

            this.render();
        },

        editItem: function(model) {
            this.model = model;

            this.model.previous_attributes = this.model.toJSON();
            this._modelBinder = new Backbone.ModelBinder();

            this.is_new_model = false;

            this.render();
        },

        render: function() {
            var template = _.template(this.template[this.model.get('item_type')]);

            this.$('.modal-body').html(template());

            this._modelBinder.bind(this.model, this.el, this.bindings[this.model.get('item_type')]);
            this.$el.modal('show');
        },

        saveItem: function() {
            if(this.model.isValid()) {
                if(this.is_new_model) {
                    mediator.pub('TodoItemEditor:' + this.model.get('item_type') + 'Saved', this.model);
                }

                this.$el.modal('hide');
            } else {
                this.$('.project-fields').addClass('form-group has-error');
            }
        },

        cancelItem: function() {
            this.model.set(this.model.previous_attributes);
            
            this.$el.modal('hide');
        }

    });

})(app.TodoItemEditor);