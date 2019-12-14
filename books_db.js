/**
The data source for obtaining information from googleapis.com.

@example 
var gBook = new GBOOK();
var r = gBook.search(query);
result( r , function(title) { return gBook.extra(title);});
*/
function GBOOK () {
}


/**
Issue a search query to Google Books database.
@param {string} query - Search query.
*/
GBOOK.prototype.search = function(query) {
  var result = http().get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + encodeURIComponent(query));
  var json = JSON.parse(result.body);
  return json.results;  
}

/**
Issue a search query to Google Books database.
@param {string} code - Search barcodes.
*/
GBOOK.prototype.barcode = function(code) {
  var result = http().get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + encodeURIComponent(code));
  var json = JSON.parse(result.body);
  return json.results;  
}

/**
@param {string} id - The resource identifier.
*/
GBOOK.prototype.extra = function(id) {
    var resultJson = http().get("https://www.googleapis.com/books/v1/volumes?q=id:" + id);
    var result = JSON.parse(resultJson.body); 
    if (result.imageLinks !== undefined) 
        result['imageLinks'] = result.imageLinks.map(function(e) { return e.thumbnail; }).join();
    return result;
}
