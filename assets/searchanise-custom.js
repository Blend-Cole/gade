document.addEventListener('Searchanise.Loaded', function() {
  (function($) {
    $(document).bind("Searchanise.AutocompleteUpdated", function () {
      //console.log('update done')
      if (Searchanise.WasSubmitted) {
        Searchanise.FromAutocomplete = true;
      	Searchanise.WasSubmitted.submit();
      }
    });
    
    $(document).on('Searchanise.DataRequestEnd', function(event, type, params, data) {
      if (type != 'autocomplete') {
        return;
      }

      Searchanise.onlyFoundItem = null;

      if (data.totalItems === 1 && !data.totalCategories && !data.totalPages) {
        Searchanise.onlyFoundItem = data.items[0];
      }
    });
 
    $(Searchanise.SearchInput).parents('form').submit(function(e) {
      //console.log('sub');
      Searchanise.WasSubmitted = $(this);
      
      if (Searchanise.onlyFoundItem) {
        e.stopImmediatePropagation();
        window.location.href = Searchanise.onlyFoundItem.link;
        return false;
      }
    });

  })(window.Searchanise.$);
});