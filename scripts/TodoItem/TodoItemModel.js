(function(module) {
    
    module.Model = Backbone.Model.extend({       

        defaults: {
            title: '',
            position: '',
            item_type: '',
            deadline: '',
            is_done: '',
            project_id: ''
        },

        validate: function(attr, options) {
            if(attr.title.trim() === '') {
                //throw new Error('title can not be empty');
                return 'title can not be empty';
            }
        },

        rebuildPositions: function(model1, model2) {
            var tmp_position = model1.get('position');
            model1.set('position', model2.get('position'));
            model2.set('position', tmp_position);
        }

    });

})(app.TodoItem);