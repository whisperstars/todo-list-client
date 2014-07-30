(function(module) {

    module.ModelView = Backbone.View.extend({
        
        tagName: 'tr',
        className: 'task',

        template: _.template('<td width="25"><input type="checkbox" class="is-done"></td><td width="3" style="padding: 0px;"></td><td style="padding-left: 20px; font-size: 16px;"><span class="task-title"></span></td> ' +
            '<td width="110"><button class="task-move-up btn btn-default btn-xs"><span class="glyphicon glyphicon-chevron-up text-primary"></span></button><button class="task-move-down btn btn-default btn-xs"><span class="glyphicon glyphicon-chevron-down text-primary"></span></button><button class="task-edit btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil text-warning"></span></button><button class="task-delete btn btn-default btn-xs"><span class="glyphicon glyphicon-trash text-danger"></span></button></td>'),

        events: {
            'change .is-done': 'changeTaskStatus',
            'click .task-delete': 'deleteTask',
            'click .task-edit': 'editTask',
            'click .task-move-up': 'movingTaskUp',
            'click .task-move-down': 'movingTaskDown',
            'mouseenter': 'addColoredClass',
            'mouseleave': 'removeColoredClass',
        },

        bindings: {
            is_done: 'input.is-done',
            title: 'span.task-title'
        },

        initialize: function() {
            this.model.on('change:position', this.disableMoveButtons, this);
            this._modelBinder = new Backbone.ModelBinder();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.disableMoveButtons();

            this._modelBinder.bind(this.model, this.el, this.bindings);

            if(this.model.get('is_done')) {
                this.$el.addClass('success');
            } else {
                this.$el.removeClass('success');
            }

            return this;
        },

        changeTaskStatus: function() {
            this.model.set('is_done', !this.model.get('is_done'));
            //this.$el.toggleClass('success');
        },

        editTask: function() {
            mediator.pub('Tasks:EditItem', this.model);
        },

        deleteTask: function() {
            this.model.destroy();
            this.remove();
        },

        movingTaskUp: function() {
            var collection = this.model.collection;

            if(this.model.get('position') !== 0) {
                this.model.rebuildPositions(this.model, collection.where({position: this.model.get('position') - 1})[0]);
            }
        },
        
        movingTaskDown: function() {
            var collection = this.model.collection;
            
            if(this.model.get('position') !== collection.length - 1) {
                this.model.rebuildPositions(this.model, collection.where({position: this.model.get('position') + 1})[0]);
            }
        },

        addColoredClass: function() {
            this.$el.addClass('warning');
        },

        removeColoredClass: function() {
            this.$el.removeClass('warning');
        },

        disableMoveButtons: function() {
            if(this.model.get('position') === 0) {
                this.$('.task-move-up').attr('disabled', 'disabled');
            }
            
            if(this.model.get('position') === this.model.collection.length -1) {
                this.$('.task-move-down').attr('disabled', 'disabled');
            }
        }
        
    });

})(app.Tasks);