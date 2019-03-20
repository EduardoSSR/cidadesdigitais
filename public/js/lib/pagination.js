angular.module('ui.bootstrap.pagination', [])

.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    templateUrl: 'js/lib/pagination.html',
    replace: true,
    link: function(scope) {
      scope.$watch('numPages', function(value) {
        scope.pages = [];
        if (value<=10){  
          for(var i=1;i<=value;i++) {
            scope.pages.push(i);
          }
        } else{
            if(scope.currentPage<=6){
              for(var i = 1;i<=10;i++){
                scope.pages.push(i);
                console.log("Entrou no primeiro");
              }
            } else if(scope.currentPage > 6){
              for(var i= (scope.currentPage - 4);i<=(scope.currentPage+5);i++){
                scope.pages.push(i);
                console.log("Entrou no segundo");
              }
            } else{
              for (var i=scope.currentPage;i<=value;i++){
                scope.pages.push(i);
              }
            }
        }
        if ( scope.currentPage > value ) {
          scope.selectPage(value);
        }
      });
      scope.geraLista = function(){

      }
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        scope.pages = [];
        if ( ! scope.isActive(page) ) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
          if(scope.currentPage<=6){
            for(var i = 1;i<=10;i++){
              scope.pages.push(i);
              console.log("Entrou no primeiro");
            }
          }else if(scope.currentPage>6 && scope.currentPage<=scope.numPages - 4){
            for(var i = scope.currentPage - 4;i<=scope.currentPage + 5;i++){
              scope.pages.push(i);
              console.log("Entrou no segundo");
            }
          }else{
            for (var i=scope.currentPage-3;i<=scope.numPages;i++){
              scope.pages.push(i);
            }
          }
        }
      };

      scope.selectPrevious = function() {
        if ( !scope.noPrevious() ) {
          scope.selectPage(scope.currentPage-1);
        }
      };
      scope.selectNext = function() {
        if ( !scope.noNext() ) {
          scope.selectPage(scope.currentPage+1);
        }
      };
    }
  };
});