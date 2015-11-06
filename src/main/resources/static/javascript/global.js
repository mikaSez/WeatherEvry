/**
 * Created by MikaSez on 07/11/2015.
 */
var insertIcon = function(text, inserted){
    if(text.toLowerCase().indexOf("sun") >= 0){
        sun(inserted);
    } else if(text.toLowerCase().indexOf("rain") >= 0){
        rain(inserted);
    } else if(text.toLowerCase().indexOf("cloud")>=0){
        cloud(inserted);
    }
}
var weekDayTranslator = function(day){
    if(day==="Mon"){
        return "Lundi";
    }
    if(day==="Tue"){
        return "Mardi";
    }
    if(day==="Wen"){
        return "Mercredi";
    }
    if(day==="Thu"){
        return "Jeudi";
    }
    if(day=="Fri"){
        return "Vendredi";
    }
    if(day==="Sat"){
        return "Samedi";
    }
    if(day==="Sun"){
        return "Dimanche";
    }
}



var FtoC = function(F){
    return  Math.floor((F - 32) * 5/9);
}

var rain = function(id){
    cloud(id);
    $("<div class='rain'><ul><li></li><li></li><li></li></ul></div>").appendTo($("#"+id));
}
var sun = function(id){
    $("<div class='sun'></div>").appendTo($("#"+id));
}
var cloud = function(id){
    $("  <div class='cloud_s'><div class='cloud1'> <ul><li></li><li></li><li></li><li></li></ul></div><div class='cloud1 c_shadow'><ul><li></li><li></li><li></li><li></li></ul></div></div>").appendTo($("#"+id));
}
