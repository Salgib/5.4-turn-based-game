window.GameApp = window.GameApp || {};


(function(){
  'use strict';


  // Create an event hub
  GameApp.vent = _.extend({}, Backbone.Events);

  GameApp.vent.on('list:display', function(event) { //this will need changing
    $('.application').append(JST['character-select']()); // this will need changing
  });

  $(document).ready(function(){
    GameApp.router = new GameApp.GameRouter();
    Backbone.history.start();
    GameApp.router.navigate('index', {trigger: true});

    });

  // Set Event listener on character-selected-event: for whatever event is fired after both characters are selected on the 'CHARACTER SELECT GRID', a "BEGIN GAME BUTTON" or similar is pressed,  and we want to route to the game screen
  $(document).on('click', '.start-button', function(event){
    event.preventDefault();
    GameApp.vent.trigger('list:display');
    $.ajax({
      url: '../pokemon.json'
    }).then(function(pokemonlist) {
      pokemonlist.forEach(function(pokemon) {
      $('.character-grid-container').append(JST['rendercharacter'](pokemon));
      }); // routes user to game screen
    });

  });

  $(document).on('click', '.start-game-button', function(event){
    event.preventDefault();
    GameApp.router.navigate('game', {trigger: true});
    $.ajax({
      url: '../pokemon.json'
    }).then(function(pokemonlist) {
      pokemonlist.forEach(function(pokemon) {
        displayPlayerPokemon(pokemon);
        displayEnemyPokemon(pokemon);
      }); // routes user to game screen
    });
  });

  // EXAMPLE FROM JAKE FROM CHAT-APP
  // function fetchMessages(){
  //   return $.ajax({
  //     url: "http://tiny-lasagna-server.herokuapp.com/collections/messages"
  //   }).then(function(messages){
  //     ** TRIGGER THE data:messages:sync event **
  //     ChatApp.vent.trigger('data:messages:sync', messages);
  //   });
  // }





  function displayBattleMenu(pokemon) {
    var moveSet = pokemon.moves;
    $('.battlemenu').html(JST['battlemenu'](moveSet));
  }

  function displayPlayerPokemon(pokemon) {
    if(pokemon.name === "Charizard") {
      $('.pokemondisplay').append(JST['player'](pokemon));
      displayBattleMenu(pokemon);
    }
  }

  function displayEnemyPokemon(pokemon) {
    if(pokemon.name === "Gengar") {
      $('.pokemondisplay').append(JST['enemy'](pokemon));
    }
}







  // $(document).ready(function(){
  //
  //     route();
  //
  //     $(document).on('click', '.start-button', function(event){
  //       event.preventDefault();
  //       window.location.hash = '/charselect';
  //     });
  //
  //     $(window).on('hashchange', function(event){
  //       event.preventDefault();
  //       route();
  //     });
  //   });
  //
  //
  //   function route(){
  //     switch(window.location.hash){
  //       case '':
  //       $('.application').html(JST['title-screen']());
  //       break;
  //     case '#/charselect':
  //       charSelect()
  //       break;
  //     }
  //   }
  //
  //   function charSelect(){
  //     $('.application').append(JST['character-select']());
  //   }
  //
  //
})();
