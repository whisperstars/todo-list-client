(function(module) {
        
    module.CollectionView = Backbone.View.extend({
        
        template: _.template('<table class="task-list table table-bordered table-hover table-condensed"></table>'),

        subscriptions: {
            'Projects:TaskAdded': 'addTask'
        },

        initialize: function(options) {
            this.project_id = options.project_id;

            this.collection = new module.Collection();
            
            this.collection.comparator = function(model) {
                return model.get('position');
            };

            this.render();

            this.collection.on('add', this.render, this);
            this.collection.on('change', this.render, this);

            if(options.project_id == 'c3') {
                this.collection.add({
                    title: 'task_title 1',
                    item_type: 'Task',
                    position: 0,
                    is_done: false,
                    project_id: 'c3' /*@TODO change to cid to id*/
                });
                this.collection.add({
                    title: 'task_title 2',
                    item_type: 'Task',
                    position: 1,
                    is_done: false,
                    project_id: 'c3' /*@TODO change to cid to id*/
                });
            }
        },

        render: function() {
            this.collection.sort();
            this.$el.html(this.template());

            if(!this.collection.isEmpty()) {
                this.collection.each(function(model) {
                    this.renderOne(model);
                }, this);
            }

            return this;
        },

        renderOne: function(task_model) {
            var task_view = new module.ModelView({
                model: task_model
            });

            this.$('.task-list').append(task_view.render().el);
        },

        addTask: function(attributes) {
            if(attributes.project_id === this.project_id) {
                attributes.position = this.collection.length;
            
                this.collection.add(attributes);
            }
        }

    });

})(app.Tasks);