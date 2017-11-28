Knockout Simple Sortable Gird
=============================

**Knockout Simple Sortable Gird** is enhanced version of **Knockout Simple Grid** found at [http://knockoutjs.com/examples/resources/knockout.simpleGrid.3.0.js]
In addition to the existing features this supports Sorting and it also uses Font Awesome icons which is optional user can provide their own class for sort icon.
Also sorting can be enabled and disabled by simply changing attribute/property values

Sample
======
    var PagedGridModel = function (items) {
        this.items = ko.observableArray(items);
        this.gridViewModel = new ko.simpleSortableGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "Item Name", rowText: "name", isSortable: true },
                { headerText: "Sales Count", rowText: "sales", isSortable: true },
                { headerText: "Price", rowText: 'price', isSortable: true }
            ],
            pageSize: 5, /* pageSize of 0 means infinite pageSize, not paginated */
			gridClass: 'yourClassName',
            sortByClass: 'yourClassName',
            sortByClassAsc: 'yourClassNameAsc',
            sortByClassDesc: 'yourClassNameDesc',
			paginationClass: 'yourClassName'
        });
    };

Change the property **isSortable** to true to enable sorting.

Also if user want to change the default sort icon to be change. Update the **gridClass, sortByClass, sortByClassAsc, sortByClassDesc and paginationClass** property values