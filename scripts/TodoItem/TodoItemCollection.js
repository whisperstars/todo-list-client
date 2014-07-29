(function(module) {
        
    module.Collection = Backbone.Collection.extend({

        model: module.Model
        
    });

})(app.TodoItem);