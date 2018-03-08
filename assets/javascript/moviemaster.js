var mmufp={
  curMovie: "",
  antMovie: function (sTitle, sPlot, sPoster,sRating){
    this.Title = sTitle;
    this.Plot = sPlot;
    this.Poster = sPoster;
    this.Rating = sRating;
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
    mmufp.addMovie('Star Wars');
    mmufp.addMovie('Star Trek');    
    mmufp.addMovie('Matrix');    
    mmufp.addMovie('Avatar');
    mmufp.addMovie('Iron Man');
    mmufp.ThemePage('Iron Man');   
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
      let mykey = "trilogy";
      $.ajax(
        {
          url: "http://www.omdbapi.com/?apikey=" + mykey + "&t=" + inSrch,
          method: "GET"
        }
      ).then(
        function (response) {
         mmufp.curMovie = new mmufp.antMovie(response.Title, response.Poster, response,response.rated); 
         $("#maincontent").empty();
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
             $("#maincontent").append(myimg);
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
