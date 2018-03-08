var mmufp={
  defaults:['Monty Python and the Holy Grail','WarGames','Star Wars','Star Trek','Spaceballs','Caddyshack','Blade Runner','Alien: Covenant','Iron Man'], 
  curMovie: "",
  antMovie: function (sTitle, sPlot, sPoster,sRating,indata){
    this.Title = sTitle;
    this.Plot = sPlot;
    this.Poster = sPoster;
    this.Rating = sRating;
    this.Data = indata;
  },
  antGif: function(sStillImg, sAnimatedImg, sRating){
    this.Still = sStillImg;
    this.Animated = sAnimatedImg;
    this.Rating = sRating;
    this.bAnimated = false;
  },    
  antremovebutton: "",
  bPageAnimate: false,
  ToggleAnimation: function(){
    if(mmufp.bPageAnimate){
      //set all images off
  
      $('.mcimg').each(function(i,item){
       
        $(item).attr('src',$(item).attr('data-still'));
        $(item).attr('data-flag','still');
        $("#AniLable").text('Animation(Off)');
      });
      mmufp.bPageAnimate = false;
    }else{
     //set all images on
     $('.mcimg').each(function(i,item){
      $(item).attr('src',$(item).attr('data-ani'));
      $(item).attr('data-flag','animated');
      $("#AniLable").text('Animation(On)');
      });
      mmufp.bPageAnimate = true;
    }
  },
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
    let themelast = "";
    mmufp.defaults.forEach(function(item,i){
      mmufp.addMovie(item);
      themelast = item;
    })
    mmufp.ThemePage(themelast);   
    },
    addMovie : function(SrchIn){
      $("#addinput").val("");
      //Do api calls and gather data here...
      //End api calls area
      let movie = $("<div class='rowblock'><div class='ThemeMovie controltheme'>" + SrchIn + "<button class='RemoveMovie controltheme innercontrol'>Delete</button></div></div>");
         
      movie.attr('data-giffy-title', SrchIn);
      
     
        
      $("#maincontrolmenu").prepend(movie);
      $(movie).on('click',function(event){    
             
          if($(event.target).attr('class').indexOf('RemoveMovie')>=0){
     
            $(this).remove();
          }
          else{            
            mmufp.ThemePage($(this).attr('data-giffy-title'));
          };                  
     
        })},
    colGiffys:[],    
    getGiffyCol: function(inSrch){
      let col = [];
      col =  mmufp.getGiffyCol1(inSrch);      
      return col;
    },    
    getGiffyCol1: function(inSrch){
      let col = [];
      //let mykey = "trilogy";
      let mykey = "d311e49e";
      $.ajax(
        {
          url: "https://www.omdbapi.com/?apikey=" + mykey + "&t=" + inSrch,
          method: "GET"
        }
      ).then(
        function (response) {
          $("#maincontent").empty();
         mmufp.curMovie = new mmufp.antMovie(response.Title, response.Plot, response.Poster,response.rating,response); 
         
         let movieblurb = $("<div class='mcimg'>"); 
         movieblurb.append($("<H2>" + mmufp.curMovie.Title + "</H2>"));
         movieblurb.append($("<p>" + mmufp.curMovie.Plot + "</p>"));
         movieblurb.append($("<p>Actors: " + mmufp.curMovie.Data.Actors + "</p>"));
         movieblurb.append($("<p>Awards: " + mmufp.curMovie.Data.Awards + "</p>"));
         movieblurb.append($("<p>Box Office: " + mmufp.curMovie.Data.BoxOffice + "</p>"));
         movieblurb.append($("<p>Rated: " + mmufp.curMovie.Data.Rated + "</p>"));
         movieblurb.css('background-image','url("'+ mmufp.curMovie.Poster +'")');
         movieblurb.css('background-size','cover');
         movieblurb.css('background-repeat','no-repeat');
         
         //movieblurb.css('height','160px');
         movieblurb.css('width','80%');
         
         movieblurb.css('margin-left','20%');
         movieblurb.css('padding','3%');
         movieblurb.css('display','inline-block');
         
         movieblurb.css('text-shadow','1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000, 2px 2px #000, -2px -2px #000, -2px 2px #000, 2px -2px #000');
         //$("#mmufpMovieContain").attr('background-image',mmufp.curMovie.Poster);
         let gkey = "aGpceXfwMY5TKtoH39N128oj2HirwBKv";
         let offset = Math.floor(Math.random()*125);    
         $.ajax({
           url: "https://api.giphy.com/v1/gifs/search?api_key=" + gkey + "&q='" + mmufp.curMovie.Title + "'&offset=" + offset + "",
           method: "GET"
         }).then(function(response) {
           mmufp.colGiffys = [];
           for(i=0;i<response.data.length;i++){
             let rd = response.data[i];
             let gif = new mmufp.antGif(rd.images.fixed_height_still.url,
               rd.images.fixed_height.url,
               rd.rating);
               
               
               mmufp.colGiffys.push(gif);            
               
           }
           mmufp.colGiffys.forEach(function(item,i){
             
             let myitem = "";
             if(mmufp.bPageAnimate){
               myitem = item.Animated; 
             }else{
               myitem = item.Still; 
               
             }
             let myimg = $("<img class='mcimg' src='" + myitem + "'/>");          
             myimg.attr('data-ani',item.Animated);
             myimg.attr('data-still',item.Still);
             myimg.attr('data-flag','still');
             myimg.on('click',function(event){
               if($(this).attr('data-flag')==='still'){
                 $(this).attr('src',$(this).attr('data-ani'));
                 $(this).attr('data-flag','animated');
               }else{
                 $(this).attr('src',$(this).attr('data-still'));
                 $(this).attr('data-flag','still');
               }      
             });
             if(i===0){
              $("#maincontent").append(movieblurb);
             }else{
              $("#maincontent").append(myimg);
             }          
               
      
             
           });       
         }); 
         }
      ); 
      
        
    },
    ThemePage: function(inTheme){            
      mmufp.getGiffyCol(inTheme);
    },  
};
$(document).ready(function(){{
  mmufp.reset();
  
  //$("#Go").on('click', TriviaGame.start);
}});
