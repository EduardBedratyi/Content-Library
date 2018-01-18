jQuery(document).ready(function () {
    /* ----------------------search function---------------------*/
    $('#searchForm').submit( function (e) {
        e.preventDefault();
        var item = $('.search-item').toLowerCase().val();
        $("p:contains(" + item + ")").css("background-color", "#91b6cc");
    });
    /*----------------------------o u t p u t   f u n c t i o n s---------------------------*/
    function html_creator_content(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div class="page-block">';
            div += '<div data-num=1 class="num">';
            div += '<p>'+'<em>'+'Category:  '+'</em>'+array[k].category+'</p>';
            div += '</div>';
            div += '<div data-num=2 class="num">';
            div += '<p>'+'<em>'+'User name:  '+'</em>'+array[k].userName+'</p>';
            div += '</div>';
            div += '<div data-num=3 class="num">';
            div += '<p>'+'<em>'+'User email:  '+'</em>'+array[k].email+'</p>';
            div += '</div>';
            div += '<div data-num=4 class="num">';
            div += '<p>'+'<em>'+'User country:  '+'</em>'+array[k].country+'</p>';
            div += '</div>';
            div += '<div  data-num=5 class="num">';
            div += '<p>'+'<em>'+'File path:  '+'</em>'+array[k].file+'</p>';
            div += '</div>';
            div += '<div  data-num=6 class="num">';
            div += '<p>'+'<em>'+'Content type:  '+'</em>'+array[k].contentType+'</p>';
            div += '</div>';
            div += '<div  data-num=7 class="num">';
            div += '<p>'+'<em>'+'Text content:  '+'</em>'+array[k].textContent+'</p>';
            div += '</div>';
            div += '<hr>';
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
            div += '<p>'+'<em>'+'User name:  '+'</em>' +array[k].userName+'</p>';
            div += '</div>';
            div += '<hr>';
            $('.page').append(div);
        }
        showPage(array);
    }
    function html_creator_category(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<p>'+'<em>'+'Category:  '+'</em>'+array[k].category+'</p>';
            div += '</div>';
            div += '<hr>';
            $('.page').append(div);
        }
        showPage(array);
    }
    function html_creator_filePath(array){
        $('.page').html('');
        for(var k in array){
            var div = '';
            div += '<div data-num=1 class="num">';
            div += '<p>'+'<em>'+'File path:  '+'</em>'+array[k].file+'</p>';
            div += '</div>';
            div += '<hr>';
            $('.page').append(div);
        }
        showPage(array);
    }
    /* ------------------------PAGINATION---------------------*/
    var showPage = function(array) {
        var count = array.length; //number of all entries
        var cnt = 7; //every page entries
        var cnt_page = Math.ceil(count/cnt); //number of pages

//list of pages
        var paginator = document.querySelector(".paginator");
        var page = "";
        /*var page = "<span>&laquo;</span>";*/
        for (var i = 0; i < cnt_page; i++) {
            page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
        }
        paginator.innerHTML = page;


        var div_num = document.querySelectorAll(".page-block");
        for (var t = 0; t < div_num.length; t++) {
            if (t < cnt) {
                div_num[t].style.display = "block";
            }
        }

        var main_page = document.getElementById("page1");
        main_page.classList.add("paginator_active");

        /*listing function*/
        pagination_processing = function (event) {
            var e = event || window.event;
            var target = e.target;
            var id = target.id;

            if (target.tagName.toLowerCase() !== "span") return;

            var data_page = +target.dataset.page;
            main_page.classList.remove("paginator_active");
            main_page = document.getElementById(id);
            main_page.classList.add("paginator_active");

            var j = 0;

            $(div_num).css('display','none');
            for (var i = data_page; i < div_num.length; i++) {
                if (j >= cnt) break;
                div_num[i].style.display = "block";
                j++;
            }
        }
    };
    var pagination_processing;

    $('#pagination').click(function (event) {
        if(pagination_processing){
            pagination_processing(event);
        }
    });
    /* -----------------------DISCOVER ALL VIDEO AUDIO TEXT---------------------*/

    var getId = function(id) {
        return document.getElementById(id);
    };

    /*------------------------------DISCOVER CONTENT--------------*/
    function discover_content(id,type,callback){
        var element = getId(id);
        if(element && element.addEventListener){
            element.addEventListener("click", function(){
                var new_array = [];
                if (type){
                    for (var k in window.content[type]){
                        new_array.push(window.content[type][k])
                    }
                }
                else {
                    for (var n in window.content){
                        for (var k in window.content[n]){
                            new_array.push(window.content[n][k])
                        }
                    }
                }
                callback(new_array);
                displayBtn(id);
            },false);
        }
    }
    discover_content("all","",html_creator_content);

    discover_content("allUserNames","",html_creator_userNames);

    discover_content("allCategories","",html_creator_category);

    discover_content("allFiles","",html_creator_filePath);

    /*----------------------------------discover VIDEO--------------*/
    discover_content("allVideo","video",html_creator_content);

    discover_content("videoUserNames","video",html_creator_userNames);

    discover_content("videoCategory","video",html_creator_category);

    discover_content("videoFile","video",html_creator_filePath);


    /*----------------------------------discover AUDIO--------------*/
    discover_content("allAudio","audio",html_creator_content);

    discover_content("audioUserNames","audio",html_creator_userNames);

    discover_content("audioCategory","audio",html_creator_category);

    discover_content("audioFile","audio",html_creator_filePath);

    /*----------------------------------discover TEXT--------------*/
    discover_content("allText","text",html_creator_content);

    discover_content("textUserNames","text",html_creator_userNames);

    discover_content("textCategory","text",html_creator_category);

    discover_content("textFile","text",html_creator_filePath);

    /*-----------------SORTING by userName---------------*/
    function sortByUserNameFunc (a, b){
        return a.userName > b.userName;
    }

    function sortByNames(id,type,callback){
        var element = getId(id);
        if (element && element.addEventListener){
            element.addEventListener("click", function(){
                var new_array = [];
                if(type){
                    for(var k in window.content[type]){
                        new_array.push(window.content[type][k]);
                    }
                }
                else{
                    for(var n in window.content){
                        for(var k in window.content[n]){
                            new_array.push(window.content[n][k]);
                        }
                    }
                }
                callback(new_array.sort(sortByUserNameFunc));
            },false)
        }
    }
    sortByNames("sortAllByUserName","",html_creator_userNames);
    sortByNames("sortVideoByUserName","video",html_creator_userNames);
    sortByNames("sortAudioByUserName","audio",html_creator_userNames);
    sortByNames("sortTextByUserName","text",html_creator_userNames);

    /*---function for displaying sorting buttons-------*/

    function displayBtn(id){
        var allBtn = getId("sortAllByUserName");
        var videoBtn = getId("sortVideoByUserName");
        var audioBtn = getId("sortAudioByUserName");
        var textBtn = getId("sortTextByUserName");
        if (id === "allUserNames"){
            allBtn.style.display = "block";
            videoBtn.style.display = "none";
            audioBtn.style.display = "none";
            textBtn.style.display = "none";
        }
        if (id === "videoUserNames"){
            videoBtn.style.display = "block";
            audioBtn.style.display = "none";
            textBtn.style.display = "none";
            allBtn.style.display = "none";
        }
        if (id === "audioUserNames"){
            audioBtn.style.display = "block";
            textBtn.style.display = "none";
            allBtn.style.display = "none";
            videoBtn.style.display = "none";
        }
        if (id === "textUserNames"){
            textBtn.style.display = "block";
            allBtn.style.display = "none";
            videoBtn.style.display = "none";
            audioBtn.style.display = "none";
        }
    }
});