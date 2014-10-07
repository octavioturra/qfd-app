(function () {
  'use strict';

  Polymer({
    directions:['','expand-less','expand-more'],
    productRequirements: [{
      id: 1,
      description: 'teste',
      relevance: {}, direction:0
        }, {
      id: 2,
      description: 'teste1',
      relevance: {}, direction:0
        }, {
      id: 3,
      description: 'teste2',
      relevance: {}, direction:0
        }, {
      id: 4,
      description: 'teste3',
      relevance: {}, direction:0
        }],
    customerRequirements: [{
      id: 1,
      description: 'teste',
      relevance: {}
        }, {
      id: 2,
      description: 'teste1',
      relevance: {}
        }, {
      id: 3,
      description: 'teste2',
      relevance: {}
        }, {
      id: 4,
      description: 'teste3',
      relevance: {}
        }],
    observe: {
      productRequirements: 'prepareGrid',
      customerRequirements: 'prepareGrid'
    },
    ready: function () {
      var that = this;
      this.$.interactions.requirements = this.productRequirements;
      this.$.interactions.requirementAction = function (r) {
        that.removeProductRequirement(r)
      };
      var that = this;
      this.$.halfBox.headerAction = function () {
        that.addProductRequirement()
      };
      this.$.halfBox.footerAction = function () {
        that.addCustomerRequirement();
      }
      this.prepareGrid();
    },
    prepareGrid: function () {
      var grid = [];
      var self = this;
      _(self.customerRequirements).each(function (pr) {
        var row = [];
        _(self.productRequirements).each(function (cr) {
          row.push({
            id: _.uniqueId(),
            y: pr,
            x: cr,
            interaction: 0,
          });
        });
        grid.push(row);
      });
      console.log(grid)
      this.$.grid.grid = grid;
    },
    addProductRequirement: function () {
      this.productRequirements.push({
        id: _.uniqueId()
      });
    },
    addCustomerRequirement: function () {
      this.customerRequirements.push({
        id: _.uniqueId()
      });
    },
    removeCustomerRequirement: function (ev, i, o) {
      if (confirm('Do you want to delete this item?') == false) {
        return;
      }
      var id= o.dataset['id'];
      var r = this.customerRequirements.find(function(j){
        if(j.id==id){
          return j;
        }
      })
      this.customerRequirements = _(this.customerRequirements).without(r);
    },
    removeProductRequirement: function (r) {
      if (confirm('Do you want to delete this item?') == false) {
        return;
      }
      this.productRequirements = _(this.productRequirements).without(r);
      this.$.interactions.requirements = this.productRequirements;
    },
    changeDirection: function(ev, i, o){
      var id = o.dataset['id'];
      var int = this.productRequirements.find(function(j){
        if(j.id==id){
          return j;
        }
      });
      int.direction = (int.direction + 1)%this.directions.length;
    }
  });

})();
