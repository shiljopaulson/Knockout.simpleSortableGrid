(function () {
    // Private function
    function getColumnsForScaffolding(data) {
        if ((typeof data.length !== 'number') || data.length === 0) {
            return [];
        }
        var columns = [];
        for (var propertyName in data[0]) {
            columns.push({ headerText: propertyName, rowText: propertyName });
        }
        return columns;
    }

    ko.simpleSortableGrid = {
        // Defines a view model class you can use to populate a grid
        viewModel: function (configuration) {
            var self = this;

            this.data = configuration.data;
            this.currentPageIndex = ko.observable(0);
            this.pageSize = configuration.pageSize || 5;
            this.isGridPaginated = !(configuration.pageSize === 0);

            this.gridClass = configuration.gridClass || '';
            this.sortByClass = configuration.sortByClass || 'fa fa-sort';
            this.sortByClassAsc = configuration.sortByClassAsc || 'fa fa-caret-up';
            this.sortByClassDesc = configuration.sortByClassDesc || 'fa fa-caret-down';
            this.paginationClass = configuration.paginationClass || '';

            this.lastSortedColumn = ko.observable('');
            this.lastSort = ko.observable('Desc');

            // If you don't specify columns configuration, we'll use scaffolding
            this.columns = configuration.columns || getColumnsForScaffolding(ko.unwrap(this.data));

            this.itemsOnCurrentPage = (this.isGridPaginated) ?
                ko.computed(function () {
                    var startIndex = this.pageSize * this.currentPageIndex();
                    return ko.unwrap(this.data).slice(startIndex, startIndex + this.pageSize);
                }, this)
                : this.data;

            this.maxPageIndex = ko.computed(function () {
                return Math.ceil(ko.unwrap(this.data).length / this.pageSize) - 1;
            }, this);

            this.sortBy = function (columnName) {
                if (self.lastSortedColumn() != columnName) {
                    self.sortByAsc(columnName);
                    self.lastSortedColumn(columnName);
                    self.lastSort('Asc');
                } else if (self.lastSort() == 'Asc') {
                    self.sortByDesc(columnName);
                    self.lastSort('Desc');
                } else {
                    self.sortByAsc(columnName);
                    self.lastSort('Asc');
                }
                self.currentPageIndex(0);
            };

            this.sortByAsc = function (columnName) {
                self.data.sort(function (a, b) {
                    return a[columnName] < b[columnName] ? -1 : 1;
                });
            };

            this.sortByDesc = function (columnName) {
                self.data.reverse(function (a, b) {
                    return a[columnName] < b[columnName] ? -1 : 1;
                });
            };

            this.sortByCSS = function (columnName) {
                if (columnName != undefined && columnName != '') {
                    return self.lastSortedColumn() == columnName ? (self.lastSort() == 'Asc' ? self.sortByClassAsc : self.sortByClassDesc) : self.sortByClass;
                } else {
                    return '';
                }
            };
        }
    };

    // Templates used to render the grid
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function (templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

    templateEngine.addTemplate("ko_simpleSortableGrid_grid", "\
                    <table data-bind=\"css:gridClass\">\
                        <thead>\
                            <tr data-bind=\"foreach: columns\" style=\"cursor:pointer;\">\
                                <!-- ko if: isSortable == true-->\
                                <th data-bind=\"click:$parent.sortBy($data.rowText)\"><span data-bind=\"text: headerText\"></span>  <span data-bind=\"css:$parent.sortByCSS($data.rowText)\"></span></th>\
                                <!-- /ko -->\
                                <!-- ko ifnot: isSortable == true-->\
                                <th><span data-bind=\"text: headerText\"></span></th>\
                                <!-- /ko -->\
                            </tr>\
                        </thead>\
                        <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
                           <tr data-bind=\"foreach: $parent.columns\">\
                               <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                            </tr>\
                        </tbody>\
                    </table>");

    templateEngine.addTemplate("ko_simpleSortableGrid_pageLinks", "\
                    <div data-bind=\"css:paginationClass\">\
						Pages: \
                        <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                               <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                            </a>\
                        <!-- /ko -->\
                    </div>");

    // The "simpleSortableGrid" binding
    ko.bindingHandlers.simpleSortableGrid = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindings) {
            var viewModel = viewModelAccessor();

            // Empty the element
            while (element.firstChild)
                ko.removeNode(element.firstChild);

            // Allow the default templates to be overridden
            var gridTemplateName = allBindings.get('simpleSortableGridTemplate') || "ko_simpleSortableGrid_grid",
                pageLinksTemplateName = allBindings.get('simpleSortableGridPagerTemplate') || "ko_simpleSortableGrid_pageLinks";

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links
            if (viewModel.isGridPaginated) {
                var pageLinksContainer = element.appendChild(document.createElement("DIV"));
                ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
            }
        }
    };
})();