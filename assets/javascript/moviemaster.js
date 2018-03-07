var mmufp={    
  antremovebutton: "",
  reset: function (){     
    let newrow = $("<div class='row rowblock'><div class='col-3' id='maincontrol'><input id='addinput' class='antinput controltheme'><button id='addbutton' class='antbutton controltheme innercontrol'>Add</button><div id='maincontrolmenu'></div></div><div class='col-9 myrowcontent' id='maincontent'></div></div>");  
    $("#mmufpMainContain").empty();
    $("#mmufpMainContain").append($(newrow));
    $('#addbutton').on('click',function(){   
      mmufp.addMovie($("#addinput").val());
    });
    $('#addinput').on('keydown',function(event){
      
      if (event.key==="Enter"){
        mmufp.addMovie($("#addinput").val());
      };
    });
    mmufp.addMovie('Star Wars');
    mmufp.addMovie('Star Trek');  
    mmufp.addMovie('Avatar');
    mmufp.addMovie('Marvel');   
    },
    addMovie : function(SrchIn){
      $("#addinput").val("");
      //Do api calls and gather data here...
      //End api calls area
      let movie = $("<div class='rowblock'><div class='ThemeMovie controltheme'>" + SrchIn + "<button class='RemoveMovie controltheme innercontrol'>Delete</button></div></div>");
      movie.attr('data-movie', "data");    
      movie.attr('data-giffy-title', SrchIn);
      movie.attr('data-giffy-list1', "data");
      movie.attr('data-giffy-list2', "data");
      movie.attr('data-giffy-list3', "data");  
      $("#maincontrolmenu").prepend(movie);
      $(movie).on('click',function(event){          
          if($(event.target).attr('class').indexOf('RemoveMovie')>=0){
            //console.log(this);//$("#maincontrolmenu").remove($(this));
            $(this).remove();
          }
          else{            
            mmufp.ThemePage($(this).attr('data-giffy-title'));
          };                  
              //$("#maincontrolmenu").remove($(this));             
              //$(this).remove();}
        })},
    RemoveButton: function(){
           
       
    },
    ThemePage: function(inTheme){
        window.alert(inTheme);
    },  
};
$(document).ready(function(){{
  mmufp.reset();
  
  //$("#Go").on('click', TriviaGame.start);
}});
