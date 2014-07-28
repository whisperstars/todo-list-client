(function(module) {
    
    module.Model = Backbone.Model.extend({       

        defaults: {
            title: '',
            position: '',
            item_type: '',
            deadline: '',
            status: ''
        }

    });

})(app.TodoItem);