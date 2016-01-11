window.TableSearch = function(tableId){
  // a little library that takes a table id
  // and provides a method to search the table's rows for a given query.
  // the row's td must contain the class 'js-searchable' to be considered
  // for searching.
  // Eg:
  // var tableSearch = new TableSearch('tableId');
  // var hits = tableSearch.searchRows('someQuery');
  // 'hits' is a list of ids of the table's rows which contained 'someQuery'
  this.tableId = tableId;
  this.rowData = [];
  this.allMatchedIds = [];
};

window.TableSearch.prototype.getRows = function(){
  return $('#' + this.tableId +' tbody tr');
};

window.TableSearch.prototype.setRowData = function(rowD){
  // Builds a list of objects and sets it the object's rowData
  var rowMap = [];
  $.each(this.getRows(), function(rowIndex, row){
    rowMap.push({
      'rid': '#' + $(row).attr('id'),
      'text': $(row).find('td.js-searchable').text().toLowerCase()
    });
  });
  this.rowData = rowMap;
};

window.TableSearch.prototype.setAllMatchedIds = function(ids) {
  this.allMatchedIds = ids;
};

window.TableSearch.prototype.searchRows = function(q){
  // Search the rows of the table for a supplied query.
  // reset data collection on first search or if table has changed
  if (this.rowData.length !== this.getRows().length) {
    this.setRowData();
  }
  // return cached matched ids if query is blank
  if (q === '' && this.allMatchedIds.length !== 0) {
    return this.allMatchedIds;
  }
  var matchedIds = [];
  for (var i = this.rowData.length - 1; i >= 0; i--) {
    if (this.rowData[i].text.indexOf(q.toLowerCase()) !== -1) {
      matchedIds.push(this.rowData[i]['rid']);
    }
  }
  // cache ids if query is blank
  if (q === '') {
    this.setAllMatchedIds(matchedIds);
  }
  return matchedIds;
};
