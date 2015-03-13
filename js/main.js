$(function() {
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  var Movie = can.Model.extend({
    findAll: 'GET /movies.json'
  }, {});

  var movies   = Movie.findAll();
  var filtered = new can.List(movies);

  can.Component.extend({
    tag: 'movies',
    template: can.view('js/templates/movies.mustache'),
    scope: {
      movies: filtered,
      search: function(attributes, element) {
        var search = escapeRegExp(element.val().toLowerCase());

        this.movies.replace(movies);

        if (/^#.*$/.test(search)) {
          filtered = this.movies.filter(function(item) {
            var genres = item.genres.attr().join(' ');
            var re     = new RegExp('\\b' + search.substring(1));

            return re.test(genres);
          });
        } else {
          filtered = this.movies.filter(function(item) {
            var re = new RegExp(search);
            return re.test(item.title.toLowerCase());
          });
        }

        this.movies.replace(filtered);
      }
    }
  });

  $('#app').html(can.view('js/templates/movies-tag.mustache', {}));
});
