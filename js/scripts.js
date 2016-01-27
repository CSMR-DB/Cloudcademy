function check_ID() {
    
    // Get invalidArray after each new submitted username
    var userID = $("input#userID").val();
    
    if (userID === "") {
        
        $("span#spanID").text("This field is required");
        return "error";

    } else if ($.inArray(userID, invalidID) != "-1") {

        $("span#spanID").text(userID + " is not available");
            
            animate_form();
            
        return "error";

    } else {

        $("span#spanID").text(userID + " is available");
        return "";

    }
}

function check_username() {
    
    // Get invalidArray after each new submitted username
    var userName = $("input#userName").val();
    
    if (userName === "") {
        
        $("span#spanName").text("This field is required");
        return "error";

    } else if ($.inArray(userName, invalidNames) != "-1") {

        $("span#spanName").text(userName + " is not available");
                    
            animate_form();
                            
        return "error";

    } else {

        $("span#spanName").text(userName + " is available");
        return "";

    }
}

function check_password() {

    var userPass = $("input#userPass").val(),
        userPass2 = $("input#userPass2").val(),
        userPassRegEx = /\d*/;
    
//    console.log(userPass.length, userPass2.length);
        
    if (userPass === "" && userPass2 === "") {
        
        $("span.spanPassR").text("You need a password");
        return "error";
        
    } else if (userPass != userPass2) {
        
        $("span.spanPassR").text("These passwords don't match");
        return "error";
        
    } else {
        
        $("span.spanPassR").text("These passwords match");
        return "";
        
    }
    
}

function check_registration() {
    
    var registerCheck = check_username();
        registerCheck += check_password();
        registerCheck += check_ID();
    
//    console.log(registerCheck);

    if (registerCheck == "") {
        $("input#submit").prop({ disabled: false });
    } else {
        $("input#submit").prop({ disabled: true });
    }
}

function animate_form() {
    
    $('.formcontent').effect("shake", {times: 3, distance: 10}, "fast");
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

function reset_profile() {
    
    var userName = localStorage.getItem("itemName"),
        userMail = localStorage.getItem("itemMail"),
        userAge = parseInt($("input#userAge").val());
    
    $(".fullname").html(userName);
    $(".age").html(userAge);
    // $("#icon span").html(userLetter);
    $("input#userName").val(userName);
        
}

function make_colors() {
    
    var colors = [ "chocolate", "red", "olivedrab", "darkslateblue", "cornflowerblue", "navy", "purple", "crimson", "coral", "indigo", "orchid", "darkgreen" ];

    for ( i = 0; i < colors.length; i++ ){

        $("#colors").append( $( "<div class=\"" + colors[i] + "\">&#10004;</div>" )
                          .css( "background-color", colors[i]) );

    }
    
    $("body").on("click", "#colors div", function(e) {
        
        e.stopPropagation();
        
        $(this).toggleClass("selected");
        
        localStorage.setItem("itemColor", $("#colors div.selected").css("background-color"));
        reset_colors();
        
        if($(this).siblings().hasClass("selected")) {
            
            $(this).siblings().removeClass("selected");
            
            localStorage.setItem("itemColor", $("#colors div.selected").css("background-color"));
            reset_colors();
            
        }
        
    });
    
}

function reset_colors() {
    
    // Get localStorage value returns if submit was available
    var userColor = localStorage.getItem("itemColor");
    
    if (userColor == "undefined" || userColor == undefined || userColor == "") {
        
        userColor = "royalblue";
        
    }
    
    // Style elements based on submitted color (HEX, RGBA, HSLA or HTML)
    $("#icon, #left").css("border-color", userColor);
    $("h1, a, .post-text > span, .post-text > h2").css("color", userColor);
    $("#friendslist p span").css("background-color", "hsla(0, 0%, 90%, 1)")
    $(".sidetoggle, #friendslist p.confirmed span").css("background-color", userColor);
    $("input").focus(function () { $(this).css("border-color", userColor); });
    $("input").focusout(function () { $(this).css("border-color", "hsla(0, 0%, 90%, 1)"); });
    $("svg path, .st0").css("fill", userColor);
        
}

function reset_images() {
    
    var userAvatar = localStorage.getItem("itemAvatar"),
        userHeader = localStorage.getItem("itemHeader");
    
    if ( userAvatar == "undefined" || userAvatar == undefined || userAvatar == "" ) { userAvatar = "images/avatar.jpg"; }
    
    if ( userHeader == "undefined" || userHeader == undefined || userHeader == "" ) { userHeader = "images/clouds.jpg"; }
    
    $('body.bg').css('background', 'url("' + userHeader + '") no-repeat fixed 50% 50% / 100%');
    $('#icon a').html("<img src='" + userAvatar + "'>");
    
    $('input.userAvatar').val(userAvatar);
    $('input.userHeader').val(userHeader);
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

function registree(studentid, name, pass, color, avatar, header, loves, info, group1, group2) {
    this.StudentID = studentid;
    this.Name = name;
    this.Color = color;
    this.Avatar = avatar;
    this.Header = header;
    this.Loves = loves;
    this.Password = pass;
    this.Info = info;
    this.Group1 = group1;
    this.Group2 = group2;
}

function create_post(title, image, video, text, likes, name, avatar) {
    
    var fTitle = title,
        fImage = image,
        fVideo = video.replace("watch?v=", "embed/"),
        fText = text,
        fAvatar = "<img src='" + avatar + "'>",
        fName = "<h3>" + name + "</h3>",

        postHead = "<div class='p'><div class='block post flex'><div class='post-img'>" + 
                   "<div class='image'>" + fAvatar + fName + "</div></div><div class='post-text'>",

        postComment =  "<span data-type=\"1\">Remove</span><span class='like-count' data-type=\"3\">" + (0 + likes) + 
                       "</span><span class='like' data-type=\"2\">Save</span></div></div>" + 
                       "<div class='comment'>" + 
                       "<div class='commentform flex'>" + 
                       "<input class='commenttext' placeholder='Reply to this!..'></input>" + 
                       "<button class='subcomment'>Reply</button></div></div>",

        postRequires = (postTitle !== "") && (postText !== ""),

        postTitle = "<h2>" + fTitle + "</h2>",
        postImage = "<img src=\"" + fImage + "\"/>",
        postText = "<p>" + fText + "</p>",
        postVideo = "<object width=\"800px\" height=\"450px\" data=\"" + fVideo + " \"> </object>";



    // If post has both image and video
    if (postRequires && (fImage !== "") && (fVideo !== "")) {

        $('#postlist').prepend(postHead + postImage + postTitle + postVideo + postText + postComment);

    // If post only has video
    } else if (postRequires && (fVideo !== "")) {

        $('#postlist').prepend(postHead + postTitle + postVideo + postText + postComment);

    // If post only has image
    } else if (postRequires && (fImage !== "")) {

        $('#postlist').prepend(postHead + postImage + postTitle + postText + postComment);

    // If post only contains text
    } else if (postRequires) {

        $('#postlist').prepend(postHead + postTitle + postText + postComment);

    }

    // Reset colors to fix post heading and spans
    reset_colors(); reset_images();

    // Clear post area input fields
    $('#newposttitle, #newposttext, #image-embed, #video-embed').val("");
    $('#preview').html('');

    // Update localStorage with every new post
    localStorage.setItem(("itemPostList"), $("#postlist").html());
    
}

function messages(target, location) {
    
    var message = target.val();
    
    // Get name of message recipient
    var receiver = target.closest('.fmsg').find('h3').text().replace(" is typing...", "");
    var replying = target.closest('.fmsg').find('h3');

    // Set message text lowercase to compare to contains
    var message = message.toLowerCase();

    var response = location.siblings('.msglist');

    var x = Math.floor((Math.random() * 5000) + 1);

    function reply(contains, content, c) {

        // Match input to dynamically generated RegEx 
        var messageRegEx = new RegExp("^(" + contains + ")$|^(" + contains + "\\s+)|\\d*\\s(" + contains + ")\\s\\d*");

        if (messageRegEx.test(message)) {

            replying.html(receiver + " is typing...");

            setTimeout(function(){

                response.prepend("<p class=\"re " + c + "\">" + content + "</p>")
                replying.text(receiver);

            }, x);

        }                
    }

    reply("hi", "Hoi!");
    reply("zin in vakantie", "Zeker weten!");

    if (receiver == "Rogier") {

        reply("hi", "Klootzak");
        reply("", "Oh, weet ik niet");

    } else if (receiver == "Lysanne") {

        reply("leren", "Geen zin in, weekend!");
        reply("hello", "Hey!");

    } else if (receiver == "Anne") {

        reply("hello", "Hey");
        reply("lukt het", "Ja bijna klaar!");

    } else if (receiver == "Mitchell") {

        reply("hello", "Hoi");
        reply("lukt het", "Ja gaat goed");
        reply("ov", "Oké tot zo!");

    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

var userAvatar = "https://thirtyroses.files.wordpress.com/2014/08/music-makes-me-happy-by-plastickheart.jpg",
    userHeader = "images/register.jpg";

// Declaration of global variables

var me = new registree ("1682040", "Casimir", "Cloudcademy", "navy", "", "", "jQuery");
me.Avatar = "https://thirtyroses.files.wordpress.com/2014/08/music-makes-me-happy-by-plastickheart.jpg";
me.Header = "http://2011.joelglovier.com/img/wallpaper/programmer.jpg";

var prereg = [new registree ("1240874", "Hekman", "adalovelace", "coral", "", "", "jQuery"),
              new registree ("1772361", "Koning", "kooning", "chocolate", "", "", "HTML"),
              new registree ("1244415", "ErikHekman", "adalovelace", "limegreen", "", "", "PHP"),
              new registree ("1244676", "ThijsWaardenburg", "appeltaart", "bordeaux", "", "", "CSS"),
              new registree ("1244124", "Ronald", "purple", "arduino", "", "", "CSS"),
              new registree ("1244416", "RonaldVanEssen", "photon", "pink", "", "", "CSS")];

var preID = [];
var prePass = [];
var invalidNames = [];

$.each(prereg, function(i, val){
    
    preID.push(prereg[i].StudentID);
    prePass.push(prereg[i].Password);
    invalidNames.push(prereg[i].Name);
    
});

// Check the newly created & updated array after registering a new user
var checkArray = JSON.parse(localStorage.getItem("regArray"));

if (checkArray != null && checkArray.length > prereg.length) {
    var regArray = JSON.parse(localStorage.getItem("regArray"));
} else {
    var regArray = prereg;
}

// Push every registered ID to the list of invalids
var invalidID = new Array();
for( i = 0; i < regArray.length; i++ ){ invalidID.push(regArray[i].StudentID); }

////////////////////////////////////////////////////////////////////////////////////////////////

// var invalidNames = ["Hekman", "Koning", "ErikHekman", "ThijsWaardenburg", "Ronald", "RonaldVanEssen"];

////////////////////////////////////////////////////////////////////////////////////////////////

var loginAttempts = 3;

////////////////////////////////////////////////////////////////////////////////////////////////

var Lysanne =   new registree ("1240874", "Lysanne", "Westra", "coral", "images/pfimg-4.jpg", "images/clouds.jpg", "Vormgeving", "Here is a short biography", "Anybody Can Learn", "Adobe");
var Anne =      new registree ("1772361", "Anne", "Dreuning", "chocolate", "images/pfimg-1.jpg", "images/clouds-1.jpg", "Marketing Communicatie", "Ja mooi dit", "Marketing", "");
var Mitchell =  new registree ("1244415", "Mitchell", "deRooij", "limegreen", "images/pfimg-2.jpg", "images/clouds-2.jpg", "Javascript", "", "Marketing", "Prototyping");
var Rogier =    new registree ("1244676", "Rogier", "Sangers", "bordeaux", "images/pfimg.jpg", "images/clouds-3.jpg", "Apple", "", "Crossmedia", "Wordpress");
var Susan =     new registree ("1266545", "Susan", "vanVeenendaal", "bordeaux", "images/pfimg-3.jpg", "images/clouds-4.jpg", "Webdesign", "Hoi", "Adobe", "");

var friends = [Lysanne, Anne, Mitchell, Rogier, Susan];

// Everything that needs to run initially goes first
$(document).ready(function () {
    
    var itemPostList = localStorage.getItem("itemPostList");
    
    // Init likedPosts list on every page refresh
    $("#activitylist").html(localStorage.getItem("likedPosts"));
        
    if ( itemPostList === undefined || itemPostList === "undefined" ) {
        
        $("#postlist").html("");
        
        create_post("jQuery", "content/jquery.jpg", "", "Write less, do more", 310, Rogier.Name, Rogier.Avatar);
        create_post("DRY", "content/dry.jpg", "", "Don't Repeat Yourself", 100, Anne.Name, Anne.Avatar);
        create_post("Video", "", "https://www.youtube.com/watch?v=LyLviXQERZU", "Video", 200, Mitchell.name, Mitchell.Avatar);
        create_post("Adobe", "content/adobecc.jpg", "", "Creative Cloud", 408, Lysanne.Name, Lysanne.Avatar);
        create_post("Marketing", "content/marketing.jpg", "", "Alles.", 102, Susan.Name, Susan.Avatar);
        create_post("HU", "content/hu.jpg", "", "HU", 172, me.Name, me.Avatar);
        create_post("Ai vs. Ps", "content/creativity.jpg", "", "Well", 239, Lysanne.Name, Lysanne.Avatar);
        
    } else {
                        
        $("#postlist").html(itemPostList);
        
        $("#postlist").html("");
        
        create_post("jQuery", "content/jquery.jpg", "", "Write less, do more", 310, Rogier.Name, Rogier.Avatar);
        create_post("DRY", "content/dry.jpg", "", "Don't Repeat Yourself", 100, Anne.Name, Anne.Avatar);
        create_post("Video", "", "https://www.youtube.com/watch?v=LyLviXQERZU", "Video", 200, Mitchell.name, Mitchell.Avatar);
        create_post("Adobe", "content/adobecc.jpg", "", "Creative Cloud", 408, Lysanne.Name, Lysanne.Avatar);
        create_post("Marketing", "content/marketing.jpg", "", "Alles.", 102, Susan.Name, Susan.Avatar);
        create_post("HU", "content/hu.jpg", "", "HU", 172, me.Name, me.Avatar);
        create_post("Ai vs. Ps", "content/creativity.jpg", "", "Well", 239, Lysanne.Name, Lysanne.Avatar);
        
        localStorage.setItem(("itemPostList"), $("#postlist").html());
        
    }
    
    // Generate list of pre-registered numbers
    $.each(prereg, function(index, obj) {    
        $("#friendslist").append( "<p class=\"" + obj.StudentID + "\">" + obj.StudentID + " - " + obj.Name + "<span class=\"add\">&#10004;</span></p>" );
    });
    
    $("body").on("click", "#friendslist span", function (e) {
        e.stopPropagation();
        
        $(this).parent().toggleClass("confirmed");
        
        localStorage.setItem(("itemFriendsList"), $("#friendslist").html());
                
        reset_colors();
        
    });
    
    $("body").on("click", "#regClick", function (e) {
        
        $(this).parent().fadeOut(400);
        
        $("li#colors").hide();
        
        $("section#register").show(200, function (){
            
            $("li#colors").show(800);
            
        });
        
        $("body").on("click", "#hidereg", function (e) {
            
            $(this).parent().fadeOut(0);
            
            $("section#title").fadeIn(0);
            
        });
        
    });
    
    $("body").on("click", "#loginClick", function (e) {
        
        $(this).parent().fadeOut(400);
        
        $("section#login").show(800);
        
        $("body").on("click", "#hidelogin", function (e) {
            
            $(this).parent().fadeOut(0);
            
            $("section#title").fadeIn(0);
            
        });
        
    });
    
    $("body").on("click", "#commentbox span", function (e) {
        e.stopPropagation
        
        $(e.currentTarget).addClass("selected");
        
        if ($(e.currentTarget).siblings().hasClass("selected")) {
            
            $(e.currentTarget).siblings().removeClass("selected");
            
        }
        
    });
    
    // Post span click events ON LIKE &| REMOVE
    $('body').on('click', '.post span', function (e) {
        e.stopPropagation();
        
        var userName = localStorage.getItem("itemName");
        
        var likeTitle = $(e.currentTarget).siblings('h2').text();
        
        console.log (likeTitle);
        
        // Click events on post spans to either remove or like a post (includes a counter)
        if ($(e.currentTarget).data('type') == '2') {
            $(e.currentTarget).toggleClass("clicked");

            if ($(e.currentTarget).hasClass("clicked")) {
                $(e.currentTarget).closest('.p').effect("transfer", {to: $('li.activity')}, 900, function(){
                    
                    $('li.activity').animate({backgroundColor: "#EEE"}, 300, function(){
                     
                        $(this).css("background-color", "transparent");
                        
                        $('#activitylist').append("<li>" + userName + " just liked " + likeTitle + "<button class='r' data-type='4'>X</button></li>");
                        
                        localStorage.setItem(("likedPosts"), $("#activitylist").html());
                                                
                    });
                    
                });
                $(e.currentTarget).siblings(".like-count").html(parseInt($(e.currentTarget).siblings(".like-count").html())+1);
            } else {
                $(e.currentTarget).siblings(".like-count").html(parseInt($(e.currentTarget).siblings(".like-count").html())-1);
                
                $('#activitylist').find(':contains(' + likeTitle + ')').remove();
                
                localStorage.setItem(("likedPosts"), $("#activitylist").html());

            }
            
        } else if ($(e.currentTarget).data('type') == '1') {
            $(this).parentsUntil("#postlist").remove().fadeOut(600);
        }
        
        localStorage.setItem(("itemPostList"), $("#postlist").html());
        
        console.log(localStorage.getItem("likedPosts"));
        
    });
    
    // Check for registration form vield validity on page load & keyup
    $("form#userform").ready(function () { 
        $("input#userID").keyup(function () { check_ID(); check_registration(); });
        $("input#userName").keyup(function () { check_username(); check_registration(); });
        $("input#userPass, input#userPass2").keyup(function () { check_password(); check_registration(); });
        
        make_colors(); reset_colors(); reset_images(); 
        check_ID(); check_username(); check_password(); check_registration();
        reset_profile();
    });
    
    // Submit registration form
    $("form#userform").submit(function (e) {
        
        e.preventDefault();
        
        var userID = $('input#userID').val(),
            userName = $('input#userName').val(),
            userPass = $('input.userPass').val(),
            userAvatar = $('input#userAvatar').val(),
            userColor = $('#colors div.selected').css("background-color"),
            userHeader = $('input#userHeader').val();
        
        // registree(studentid, name, pass, color, avatar, header, loves, info, group1, group2)
        var regSubmit = new registree (userID, userName, userPass, userColor, userAvatar, userHeader);        
        regArray.push(regSubmit);
        
        // console.log(regArray);
        localStorage.setItem("regArray", JSON.stringify(regArray));
        
        localStorage.setItem("itemID", userID);
        localStorage.setItem("itemName", userName);
        localStorage.setItem("itemAvatar", userAvatar);
        localStorage.setItem("itemColor", userColor);
        localStorage.setItem("itemHeader", userHeader);
        localStorage.setItem("itemMail", $("input#userMail").val());
                
        reset_profile(); reset_images(); reset_colors();
        
        window.location.replace ('timeline.html');  
    });
    
    // Init submit button prop enabled because logic
    $("input").prop({ disabled: false });
    
    $('form#loginform').submit(function (e) {
        
        e.preventDefault();
                
        var myID = me.StudentID,
            myPass = me.Password,

            loginID = $('input#loginID').val(),
            loginPass = $('input#loginPass').val();

        if (loginID == myID){

            if (loginPass == myPass){

                window.location.replace ('timeline.html');

            } else if ((loginPass !== "") && (loginPass !== myPass)) {

                loginAttempts--;
                
                animate_form();
                                
                $("input#sm-login").siblings('span').html("You have " + loginAttempts + " attempts left");
                
                $('input#loginPass').val("");
                
                if (loginAttempts === 0) {
                                        
                    $(e.currentTarget).find('input').prop({ disabled: true });
                    
                    $("input#sm-login").siblings('span').html("Try again later");
                    
                }
                                
            }

        } else if (loginID == "" || loginPass == "") {

            $("input#sm-login").siblings('span').html("You need to fill in all fields");

        } else {
            
            $("input#sm-login").siblings('span').html("Your ID and/or password are wrong");
            
        }
        
        var userID = me.StudentID,
            userName = me.Name,
            userAvatar = me.Avatar,
            userColor = me.Color,
            userHeader = me.Header;
        
        localStorage.setItem("itemID", userID);
        localStorage.setItem("itemName", userName);
        localStorage.setItem("itemAvatar", userAvatar);
        localStorage.setItem("itemColor", userColor);
        localStorage.setItem("itemHeader", userHeader);
        
    });
    
    // Update header / profile image(s) in settings tab
    $("form#updateimages").submit(function () {
       
        localStorage.setItem("itemAvatar", $("input#userAvatar2").val());
        localStorage.setItem("itemHeader", $("input#userHeader2").val());
        
        reset_images();
        
        return false; 
    });
    
    // Scan image url and show preview on keyup
    $('input#image-embed').keyup(function(){
        
        var postImage = $("#image-embed").val();
        
        if ($("#image-embed").val() != "") {
            
            $('#preview').html('<img src="' + postImage + '"/>');
            
        } else {
            
            $('#preview').html('');
            
        }
        
    });
    
    // Creating a new post and submitting
    $("body").on("click", "#newpostsubmit", function (e) {
        
        e.stopPropagation();
        
        var fTitle = $("#newposttitle").val(),
            fImage = $("#image-embed").val(),
            fVideo = $("#video-embed").val(),
            fText = $("#newposttext").val(),
            
            likes = 0,
        
            avatar = $('.home img').attr("src"),
            name = $('.username span').text();
        
        create_post(fTitle, fImage, fVideo, fText, likes, name, avatar);
        
    });
    
    $("body").on("click", ".subcomment", function (e) {
        e.stopPropagation();
        
        var commentText = $(this).siblings(".commenttext").val();
        
        if (commentText !== "") {
            
            $(this).parent().parent().append("<div class='c'>" + commentText + "</div>");
            reset_colors();
            $(".commenttext").val("");
            
        }
        
        // Update localStorage with every new comment
        localStorage.setItem(("itemPostList"), $("#postlist").html());
    });
    
    $("body").on("keypress", ".commenttext", function (e) {
        e.stopPropagation();
        
        var commentText = $(this).val();
        
        if (e.which == 13) {

            if (commentText !== "") {

                $(this).parent().parent().append("<div class='c'>" + commentText + "</div>");
                reset_colors();
                $(".commenttext").val("");

            }
            
        }

        // Update localStorage with every new comment
        localStorage.setItem(("itemPostList"), $("#postlist").html());
    });
    
    // Click on header menu icons for dropdown sections
    $("body").on("click", "#usernav li", function (e) {
        
        e.stopPropagation();
        
        if ($(e.target).is("#usernav li *") === false) {
            $(this).toggleClass("selected");
        }
        
        if ($(e.target).siblings().hasClass("selected")) {
            $(this).siblings().removeClass("selected");
        }
        
	});
    
    $('body').on("click", 'button.r', function(e) {
        
        $(this).closest('li').remove();
        
        localStorage.setItem(("likedPosts"), $("#activitylist").html());
        
    });
    
    // Popout image 
    $('body').on("click", 'img', function (e) {
                
        $("<section class='lb'></section>").append($(this).clone()).appendTo('body');        
                
    });
    
    $('body').on("click", 'section.lb, section.lb img', function (e) {
        
        if ($('.lb').length !== 0) {
            
            $('.lb').remove();
            
        }
        
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Friends list
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('#friends').ready(function(e) {
        
        $.each(friends, function(i, val){
            
            $('#friends').append("<div class=\"fbox " + friends[i].StudentID + "\"><div class=\"hdr\"><img src=\"" + friends[i].Header + "\"/></div><div><div class=\"friendsavatar fd\"><img src=\"" + friends[i].Avatar + "\"/></div><div class=\"friendscontent fd\"><h2>" + friends[i].Name + "</h2><p>" + friends[i].Loves + "</p><span class=\"fbtns\"><button class=\"showmore\" data-type=\"30\">Toggle full profile</button><button class=\"connect\" data-type=\"31\">Connect</button><button data-options=\"" + friends[i].StudentID + "\" class=\"message\" data-type=\"32\">Send " + friends[i].Name + " a message</button></span><div class=\"info\"><p>" + friends[i].Info + "</p><div class=\"gbox\"><h3>" + friends[i].Name + " is a member of the following groups:</h3><div class=\"groups\"><img src=\"groups/" + friends[i].Group1.toLowerCase() + ".jpg\"/><h4>" + friends[i].Group1 + "</h4></div><div class=\"groups\"><img src=\"groups/" + friends[i].Group2.toLowerCase() + ".jpg\"/><h4>" + friends[i].Group2 + "</h4></div></div></div></div></div>");
                                             
        });
        
        $('.fbox').each(function() {
            
            var gb = $(this).children('.groups');
        
            $('.groups').each(function() {
                            
                if ($(this).text() == "") { 
                    
                    $(this).remove();
                
                }
                
            });
            
        });            
        
        $('.info').hide();
        
    });
    
    $('body').on("click", 'button', function(e){
        
        var thisID = $(this).data('options');
        
        if ($(e.currentTarget).data('type') == '30') {
                                    
            $(this).closest('.fbox').find('.info').toggle();
            $(this).closest('.fbox').siblings('.fbox').find('.info').hide();
            
        } else if ($(e.currentTarget).data('type') == '31') {
            $(e.currentTarget).toggleClass("connected");
            
            if ($(e.currentTarget).hasClass("connected")) {
                
                $(this).html("&#x2713; Connected");
                
                console.log($(this).parentsUntil('.friendscontent').find('h2').text());
                
            } else {
                
                $(this).html("Connect");
                
            }
            
        } else if ($(e.currentTarget).data('type') == '32') {
                        
            window.location.replace ('messages.html');
                                    
        }
        
        
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Messages list
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('#messages').ready(function(e) {
        
        $.each(friends, function(i, val){
            
            $('#messages').append("<div id=\"" + friends[i].StudentID + "\" class=\"fmsg\"><div class=\"friendsavatar fd\"><img src=\"" + friends[i].Avatar + "\"/></div><div class=\"friendscontent fd\"><h3>" + friends[i].Name + "</h3></div><div class=\"friendsconversation fd\"><div class=\"newmsg\"><input class=\"msgin\" type=\"text\" /><button class=\"spm\">Send</button></div><div class=\"msglist\"></div></div></div>");
            
        });
        
    });
    
    $('body').on("click", '.spm', function(e){
        
        var message = $(this).siblings('input').val();

        if (message !== "") {

            $(this).parent().siblings('.msglist').addClass("contains").prepend("<p class=\"lastmsg\">" + message + "</p>");
            
            messages($(this).siblings('input'), $(this).parent());

            $(this).siblings('input').val("");

        }
        
    });
    
    $('body').on("keypress", 'input.msgin', function(e){
        
        if (e.which == 13) {

            var message = $(this).val();

            if (message !== "") {

                $(this).parent().siblings('.msglist').addClass("contains").prepend("<p class=\"lastmsg\">" + message + "</p>");
                
                messages($(this), $(this).closest('.newmsg'));

                $(this).val("");

            }
            
        }
        
    });
            
});


















