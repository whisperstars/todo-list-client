(function(module) {

    module.ModelView = Backbone.View.extend({

        template: {
            'Project': '<div class="project-fields">' +
                'Project Title: <input type="text" name="title" value="">' +
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

            this.render();
        },

        editItem: function(model) {
            this.model = model;
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
            //this.model.set('title', this.$('input[name="title"]').val());

            if(this.model.get('item_type') === 'Task') {
                //this.model.set('deadline', this.$('input[name="deadline"]').val());
            }

            if(this.is_new_model) {
                mediator.pub('TodoItemEditor:' + this.model.get('item_type') + 'Saved', this.model);
            }

            this._modelBinder.unbind();
            this.$el.modal('hide');
        },

        cancelItem: function() {
            this._modelBinder.unbind();
            this.$el.modal('hide');
        }

    });

})(app.TodoItemEditor);