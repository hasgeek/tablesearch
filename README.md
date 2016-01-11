# TableSearch
A JavaScript library that lets you search for values in your HTML table.

## Usage

```javascript
    var tableSearch = new TableSearch('tableId');
    var hits = tableSearch.searchRows('someQuery');
    // 'hits' is a list of ids of the table's rows which contained 'someQuery'
```
