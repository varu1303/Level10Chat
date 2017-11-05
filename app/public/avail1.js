$(document).ready(function() {
    
    var socket = io();
//    var logu;
    
    $("#reg-sec").hide();
    $("#chat-sec").hide();
    $("#note").hide();
    $("#note1").hide();
    $("#war").hide();
    $("#log-sec").hide();
    $("#out-btn").hide();
    $("#chat-sec").hide();
    $("#no-war").hide();
    
    $("#dis-up-btn").on('click',function(){
        $("#reg-sec").slideToggle();
    });
    $("#dis-log-btn").on('click',function(){
        $("#log-sec").slideToggle();
    });
    
    $("#up-btn").on('click', function () {

        socket.emit('up user', {userName: $("#up-name").val(),
                                 userEmail: $("#up-email").val(),
                                 userPass: $("#up-pass").val()});
        
        $("#up-name").val('');
        $("#up-email").val('');
        $("#up-pass").val('');
    });
    
    socket.on('up', function(d) {
        if(d){
            $("#up-name").val('');
            $("#up-email").val('');
            $("#up-pass").val('');
            $("#up").hide();
            $("#note").show();
            $("#note1").hide();
            $("#up-email").val('');
            $("#up-name").val('');
            $("#up-pass").val('');
        } else {
            $("#note1").show();
        }
    })
    
    
    $("#log-btn").on('click', function () {


        $("#note").hide();
        $("#note1").hide();
        
        socket.emit('avail user', {user: $("#main-read").val(),
                                   p: $("#main-pass").val()});
        $("#main-pass").val('');
    });
    
    
    socket.on('in', function(d){
        if(d){
            $("#log").slideUp();
            $("#no-war").show();
            $("#war").hide();
            $("#up").slideUp();
            $("#out-btn").show();
            $("#chat-sec").slideDown();
        } else {
            $("#war").show();
        }
    })
    
    socket.on('new avail', function(d) {
            $("#exampleInputName2").val($("#main-read").val());
            $("#avail-list ul").empty();
            $("#avail-list h3").text('Available Users: '+ d.length);
            $.each(d, function(i, v) {
                $("#avail-list ul").append('<li>'+v.name+'</li>');
            }) 
    });
    
    $("#out-btn").on('click', function () {
        
        var u = $("#main-read").val();
        socket.emit('unavail user', {user: u});
        $("#main-read").val('');
        
    });
    
    socket.on('clear req', function () {
         $("#req-list ul").empty();
         $("#no-war").hide();
         $("#out-btn").hide();
         $("#chat-sec").slideUp();
         $("#log").slideDown();
         $("#up").slideDown();
    })
    
    socket.on('new req', function(d) {

        $("#req-list ul").append('<li id='+d+'><a href="#">'+d+'</a> has requested a chat with you!</li>');
        

    })
    
    $("#exampleInputEmail2").on('keyup', function () {
        if ($("#exampleInputEmail2").val().length > 0){
            $("#join-btn").attr('disabled', false);        
        }        
    })
    
    $("#myreq").on('click','a',function(){
        var n = $(this).parent("li").attr('id');
        $("#exampleInputEmail2").val(n);
        $("#join-btn").attr('disabled', false); 
        $("#join-btn").click();
    })
    
    $("#join-btn").on('click', function() {
        console.log()
        socket.emit('unavail user', {user: $("#main-read").val(), req: $("#exampleInputEmail2").val()});        
    })
    
});