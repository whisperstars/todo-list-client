(function(module) {
    
    module.Model = Backbone.Model.extend({       

        defaults: {
            title: '',
            position: '',
            parent_id: '',
            deadline: '',
            status: ''
        }

    });

})(app.Tasks);