$('body').on("keypress", 'input.msgin', function(e){

    if (e.which == 13) {

        var message = $(this).val();

        if (message !== "") {

            $(this).parent().siblings('.msglist').addClass("contains").prepend("<p class=\"lastmsg\">" + message + "</p>");

            $(this).val("");

        }

        // Get name of message recipient
        var receiver = $(this).closest('.fmsg').find('h3').text().replace(" is typing...", "");
        var replying = $(this).closest('.fmsg').find('h3');

        // Set message text lowercase to compare to contains
        var message = message.toLowerCase();

        var response = $(this).closest('.newmsg').siblings('.msglist');

        var x = Math.floor((Math.random() * 10000) + 1);

        function reply(contains, content, c) {

            // Match input to dynamically generated RegEx 
            var messageRegEx = new RegExp("^(" + contains + ")$|^(" + contains + "\\s+)|\\d*\\s(" + contains + ")\\s\\d*");

            if (messageRegEx.test(message)) {

                console.log(x);

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

            reply("allright", "CARLIEEEEEN!!!!", "scream");
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

});


$("body").on("click", "#newpostsubmit", function (e) {

    e.stopPropagation();

    var fTitle = $("#newposttitle").val(),
        fImage = $("#image-embed").val(),
        fVideo = $("#video-embed").val().replace("watch?v=", "embed/"),
        fText = $("#newposttext").val(),

        postHead = "<div class='p'><div class='block post flex'><div class='post-img'>" + 
                   "<div class='image'></div></div><div class='post-text'>",

        postComment =  "<span data-type=\"1\">Remove</span><span class='like-count' data-type=\"3\">" + 0 + 
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

        $("#postlist").prepend(postHead + postImage + postTitle + postVideo + postText + postComment);

    // If post only has video
    } else if (postRequires && (fVideo !== "")) {

        $("#postlist").prepend(postHead + postTitle + postVideo + postText + postComment);

    // If post only has image
    } else if (postRequires && (fImage !== "")) {

        $("#postlist").prepend(postHead + postImage + postTitle + postText + postComment);

    // If post only contains text
    } else if (postRequires) {

        $("#postlist").prepend(postHead + postTitle + postText + postComment);

    }

    // Reset colors to fix post heading and spans
    reset_colors(); reset_images();

    // Clear post area input fields
    $("#newposttitle, #newposttext, #image-embed, #video-embed").val("");
    $('#preview').html('');

    // Update localStorage with every new post
    localStorage.setItem(("itemPostList"), $("#postlist").html());

});