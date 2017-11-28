Knockout Simple Sortable Gird
=============================

**Knockout Simple Sortable Gird** is enhanced version of **Knockout Simple Grid** found at [Knockout.SimpleGrid.3.0.js](http://knockoutjs.com/examples/resources/knockout.simpleGrid.3.0.js)
In addition to the existing features this supports Sorting and it also uses Font Awesome icons which is optional user can provide their own class for sort icon.
Also sorting can be enabled and disabled by simply changing attribute/property values

Example
==
```javascript
    var sampleData = [
        { name: "Well-Travelled Kitten", sales: 352, price: 75.95 },
        { name: "Speedy Coyote", sales: 89, price: 190.00 },
        { name: "Furious Lizard", sales: 152, price: 25.00 },
        { name: "Indifferent Monkey", sales: 1, price: 99.95 },
        { name: "Brooding Dragon", sales: 0, price: 6350 },
        { name: "Ingenious Tadpole", sales: 39450, price: 0.35 },
        { name: "Optimistic Snail", sales: 420, price: 1.50 }
    ];

    var PagedGridModel = function (items) {
        this.items = ko.observableArray(items);
        this.gridViewModel = new ko.simpleSortableGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "Item Name", rowText: "name", isSortable: true },
                { headerText: "Sales Count", rowText: "sales", isSortable: true },
                { headerText: "Price", rowText: 'price', isSortable: true }
            ],
            pageSize: 3,/* pageSize of 0 means infinite pageSize, not paginated */
            gridClass: 'table table-striped table-hover',
            sortByClass: 'fa fa-sort',
            sortByClassAsc: 'fa fa-caret-up',
            sortByClassDesc: 'fa fa-caret-down',
            paginationClass: 'breadcrumb'
        });
    };
    ko.applyBindings(new PagedGridModel(sampleData));
```

Change the property **isSortable** to true to enable sorting for a specific column/field.

Also if user want to change the default sort icon to be change. Update the **gridClass, sortByClass, sortByClassAsc, sortByClassDesc and paginationClass** property values. Please have a look at the [sample](https://github.com/shiljopaulson/Knockout.simpleSortableGrid/blob/master/sample01.html)

Please find the minified version at link [Knockout.SimpleSortableGrid.3.0.min.js](https://github.com/shiljopaulson/Knockout.simpleSortableGrid/blob/master/js/knockout.simpleSortableGrid.3.0.min.js)