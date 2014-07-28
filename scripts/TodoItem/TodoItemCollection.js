(function(module) {
        
    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        rebuildPositions: function(model1, model2) {
            var tmp_position = model1.get('position');
            model1.set('position', model2.get('position'));
            model2.set('position', tmp_position);
        }
        
    });

})(app.TodoItem);