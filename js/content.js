jQuery(document).ready(function () {
    /* ----------------------search function---------------------*/
    $('#searchForm').submit( function (e) {
        e.preventDefault();
        var item = $('.search-item').val();
        $("p:contains(" + item + ")").css("background-color", "#12213a");
    });
    /*----------------------------o u t p u t   f u n c t i o n s---------------------------*/
    function html_creator_content(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<h2>'+array[k].category+'</h2>';
            div += '</div>';
            div += '<div data-num=2 class="num">';
            div += '<p>'+array[k].userName+'</p>';
            div += '</div>';
            div += '<div data-num=3 class="num">';
            div += '<p>'+array[k].email+'</p>';
            div += '</div>';
            div += '<div data-num=4 class="num">';
            div += '<p>'+array[k].country+'</p>';
            div += '</div>';
            div += '<div  data-num=5 class="num">';
            div += '<p>'+array[k].file+'</p>';
            div += '</div>';
            div += '<div  data-num=6 class="num">';
            div += '<p>'+array[k].contentType+'</p>';
            div += '</div>';
            div += '<div  data-num=7 class="num">';
            div += '<p>'+array[k].textContent+'</p>';
            div += '</div>';
            $('.page').append(div);
        }
        showPage(array);
    }

    function html_creator_userNames(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<p>'+array[k].userName+'</p>';
            div += '</div>';
            $('.page').append(div);
        }
        showPage(array);
    }
    function html_creator_category(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<h2>'+array[k].category+'</h2>';
            div += '</div>';
            $('.page').append(div);
        }
        showPage(array);
    }
    function html_creator_filePath(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<p>'+array[k].file+'</p>';
            div += '</div>';
            $('.page').append(div);
        }
        showPage(array);
    }
    /* ------------------------PAGINATION---------------------*/
    var showPage = function(array) {
        var count = array.length; //number of all entries
        var cnt = 7; //every page entries
        var cnt_page = Math.ceil(count / cnt); //number of pages

//list of pages
        var paginator = document.querySelector(".paginator");
        var page = "";
        /*var page = "<span>&laquo;</span>";*/
        for (var i = 0; i < cnt_page; i++) {
            page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";/*
            divide the entire list of pages, for example, 5 records per page and assigning each page its own id and the number (i + 1)*/
        }
        paginator.innerHTML = page;

//first 7 entries {cnt}
        var div_num = document.querySelectorAll(".num");
        for (var i = 0; i < div_num.length; i++) {
            if (i < cnt) {
                div_num[i].style.display = "block";
            }
        }
        /*set class "paginator_active" to first page*/
        var main_page = document.getElementById("page1");
        main_page.classList.add("paginator_active");
    };

    /*listing function*/
    $('#pagination').click(function (event) {
        var e = event || window.event;
        var target = e.target;
        var id = target.id;

        if (target.tagName.toLowerCase() !== "span") return;

        var num_ = id.substr(4);
        var data_page = +target.dataset.page;
        main_page.classList.remove("paginator_active");
        main_page = document.getElementById(id);
        main_page.classList.add("paginator_active");

        var j = 0;
        for (var i = 0; i < div_num.length; i++) {
            var data_num = div_num[i].dataset.num;
            if (data_num <= data_page || data_num >= data_page)
                div_num[i].style.display = "none";

        }
        for (var i = data_page; i < div_num.length; i++) {
            if (j >= cnt) break;
            div_num[i].style.display = "block";
            j++;
        }
    });
    /* -----------------------DISCOVER ALL VIDEO AUDIO TEXT---------------------*/

    var get = function(id) {
        return document.getElementById(id);
    };

    /*var typeArray = function(type){
     var new_array = [];
     for (var k in window.content[type]) {
     new_array.push(window.content[type][k]);
     }
     return new_array;
     };*/

    var discoverAll = get("all");
    if(discoverAll.addEventListener){
        discoverAll.addEventListener("click", function() {
            var new_array = [];
            for (var n in window.content) {
                for (var k in window.content[n]) {
                    new_array.push(window.content[n][k]);
                }
            }
            html_creator_content(new_array);
        },false);
    }

    var allNames = get("allUserNames");
    if(allNames.addEventListener){
        allNames.addEventListener("click", function() {
            var new_array = [];
            for (var n in window.content) {
                for (var k in window.content[n]) {
                    new_array.push(window.content[n][k]);
                }
            }
            html_creator_userNames(new_array);
        },false);
    }

    var allCategories = get("allCategories");
    if(allCategories.addEventListener){
        allCategories.addEventListener("click", function() {
            var new_array = [];
            for (var n in window.content) {
                for (var k in window.content[n]) {
                    new_array.push(window.content[n][k]);
                }
            }
            html_creator_category(new_array);
        },false);
    }

    var allFiles = get("allFiles");
    if(allFiles.addEventListener){
        allFiles.addEventListener("click", function() {
            var new_array = [];
            for (var n in window.content) {
                for (var k in window.content[n]) {
                    new_array.push(window.content[n][k]);
                }
            }
            html_creator_filePath(new_array);
        },false);
    }
    /*----------------------------------discover VIDEO--------------*/
    var discoverVideo = get("allVideo");
    if(discoverVideo.addEventListener){
        discoverVideo.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.video) {
                new_array.push(window.content.video[k]);
            }
            html_creator_content(new_array);
        },false);
    }

    var videoNames = get("videoUserNames");
    if(videoNames.addEventListener){
        videoNames.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.video) {
                new_array.push(window.content.video[k]);
            }
            html_creator_userNames(new_array);
        },false);
    }

    var videoCat = get("videoCategory");
    if(videoCat.addEventListener){
        videoCat.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.video) {
                new_array.push(window.content.video[k]);
            }
            html_creator_category(new_array);
        },false);
    }

    var videoFile = get("videoFile");
    if(videoFile.addEventListener){
        videoFile.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.video) {
                new_array.push(window.content.video[k]);
            }
            html_creator_filePath(new_array);
        },false);
    }

    /*----------------------------------discover AUDIO--------------*/
    var discoverAudio = get("allAudio");
    if(discoverAudio.addEventListener){
        discoverAudio.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.audio) {
                new_array.push(window.content.audio[k]);
            }
            html_creator_content(new_array);
        },false);
    }

    var audioNames = get("audioUserNames");
    if(audioNames.addEventListener){
        audioNames.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.audio) {
                new_array.push(window.content.audio[k]);
            }
            html_creator_userNames(new_array);
        },false);
    }

    var audioCat = get("audioCategory");
    if(audioCat.addEventListener){
        audioCat.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.audio) {
                new_array.push(window.content.audio[k]);
            }
            html_creator_category(new_array);
        },false);
    }

    var audioFile = get("audioFile");
    if(audioFile.addEventListener){
        audioFile.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.audio) {
                new_array.push(window.content.audio[k]);
            }
            html_creator_filePath(new_array);
        },false);
    }
    /*----------------------------------discover TEXT--------------*/
    var discoverText = get("allText");
    if(discoverText.addEventListener){
        discoverText.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.text) {
                new_array.push(window.content.text[k]);
            }
            html_creator_content(new_array);
        },false);
    }

    var textNames = get("textUserNames");
    if(textNames.addEventListener){
        textNames.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.text) {
                new_array.push(window.content.text[k]);
            }
            html_creator_userNames(new_array);
        },false);
    }

    var textCat = get("textCategory");
    if(textCat.addEventListener){
        textCat.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.text) {
                new_array.push(window.content.text[k]);
            }
            html_creator_category(new_array);
        },false);
    }

    var textFile = get("textFile");
    if(textFile.addEventListener){
        textFile.addEventListener("click", function() {
            var new_array = [];
            for (var k in window.content.text) {
                new_array.push(window.content.text[k]);
            }
            html_creator_filePath(new_array);
        },false);
    }
});
