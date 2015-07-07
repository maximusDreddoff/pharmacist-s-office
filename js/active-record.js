
function ActiveRecord(collection) {
    this.collection = collection;
    this.isNewRecord = true;
    this.id = null;
    this._prepareCollection();
}
ActiveRecord.prototype.save = function () {
    if (!this.isNewRecord) {
        this.remove();
    }
    this._storeNewItem();
};
ActiveRecord.prototype.remove = function () {
    var allItems = this.findAll();
    var index = this._findIndexByParams({id: this.id});
    if (index) {
        allItems.splice(index, 1);
    }
    this._writeCollection(allItems);
};
ActiveRecord.prototype.fillWithProperties = function (properties) {
    for (var propertyName in properties) {
        this[propertyName] = properties[propertyName];
    }
};

ActiveRecord.prototype.findAll = function () {
    var self = this;
    return this._retrieveAllFromStorage().map(function (el) {
        return self._createInstanceByParams($.extend(el, {isNewRecord: false}));
    });
};
ActiveRecord.prototype.findOne = function (params) {
    var allItems = this.findAll();
    var result = null;

    var index = this._findIndexByParams(params);
    if (index) {
        result = this._createInstanceByParams($.extend(allItems[index], {isNewRecord: false}));
    }
    return result;
};
ActiveRecord.prototype._createInstanceByParams = function (params) {
    return new window[this.collection](params);
};
ActiveRecord.prototype._findIndexByParams = function (params) {
    var allItems = this.findAll();
    var result = null;

    for (var index in allItems) {
        var matches = true;
        var currentItem = allItems[index];

        for (var searchParamName in params) {
            if (currentItem[searchParamName] != params[searchParamName]) {
                matches = false;
                break;
            }
        }

        if (matches == true) {
            result = index;
            break;
        }
    }
    return result;
};

ActiveRecord.prototype._collectionExists = function () {
    return !!this._retrieveAllFromStorage();
};
ActiveRecord.prototype._retrieveAllFromStorage = function () {
    return JSON.parse(localStorage.getItem(this.collection));
};
ActiveRecord.prototype._writeCollection = function (data) {
    localStorage.setItem(this.collection, JSON.stringify(data));
};
ActiveRecord.prototype._prepareCollection = function () {
    if (!this._collectionExists()) {
        this._writeCollection([]);
    }
};
ActiveRecord.prototype._findHighestId = function () {
    var result = 0;
    var collection = this.findAll();
    for (var itemIndex in collection) {
        var currentItem = collection[itemIndex];
        if (currentItem.id > result) {
            result = currentItem.id;
        }
    }
    return result;
};
ActiveRecord.prototype._storeNewItem = function () {
    var collection = this.findAll();
    this.id = this._findHighestId() + 1;
    collection.push(this);
    localStorage.setItem(this.collection, JSON.stringify(collection));
    this.isNewRecord = false;
};

