// ==UserScript==
// @name         AniroME EasyPost Integration
// @version      0.4
// @description  You are lazy shit? It's okay cuz i'm.
// @author       Fmohican
// @match        https://aniro.me/upload/*
// @match        https://aniro.me/upload
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @grant        GM_*
// @grant        GM.*
// @supportURL   https://github.com/fmohican/easypost-api/issues
// @source       https://github.com/fmohican/easypost-api
// @updateURL    https://github.com/fmohican/easypost-api/raw/master/anirome.user.js
// @downloadURL  https://github.com/fmohican/easypost-api/raw/master/anirome.user.js
// @license      WTFPL
// @run-at       document-end
// ==/UserScript==

function MediaInfoParse(media) {
    const regex = /^Height\s*: (480|576|720|1080|2160) pixels$/m;
    let m;
    if ((m = regex.exec(media)) !== null) {
        m.forEach((match, groupIndex) => {
            console.log(match);
            if(match == "2160")
                $('select[name=resolution_id]').val(2);
            else if(match == "1080")
                $('select[name=resolution_id]').val(3);
            else if(match == "720")
                $('select[name=resolution_id]').val(5);
            else if(match == "576")
                $('select[name=resolution_id]').val(6);
            else if(match == "480")
                $('select[name=resolution_id]').val(8);
            else
                $('select[name=resolution_id]').val(10);
        });
    }
}

function btnReload() {
    $('.upload').prepend("<div class='row' id='btn-reload'><a href='#' class='btn btn-danger easypost-reload'>[Reload Buttons]</a></div>");
    $(document).on('click', '.easypost-reload', function () {
        $('#easypost').remove();
        $('#btn-reload').remove();
        doButtons(getdata_list());
        $('.upload').prepend("<div class='row' id='btn-reload'><div class='col-md-6'><a href='#' class='btn btn-danger easypost-reload'>[Reload Buttons]</a></div><div class='col-md-6'>Last Update: "+new Date().toString()+"</div></div>");
    });
}


function getdata_list() {
    let req = $.ajax({
        type: "GET",
        url: "https://easypost.wien-subs.moe/api.php?whos=anirome",
        async: false
    }).responseText
    req = JSON.parse(atob(req));
    return req;
}

function doButtons(data) {
    $('.upload').prepend("<div class='row' id='easypost' style='margin-top:20px;'></div>");
    $.each(data, function (index, value) {
        $('#easypost').append("<div class='col-md-3' style='margin-top:10px;'><a href='#' class='btn btn-primary easypost' data-id='"+value.id+"'>"+cutTitle(value.title)+"</a></div>");
    });
}

function btnTrigger() {
    $(document).on('click', '.easypost', function () {
        let data = getData($(this).data('id'));
        $('input[name=name]').val(data.title);
        $("textarea#meta_decription").val(data.desc);
        $('input#autoimdb').val(data.imdb);
        $('input#autotmdb').val(data.tmdb);
        $('input#tvdb').val(data.tvdb);
        $('input#autotvdb').val(data.tvdb);
        $('input[name="mal"]').val(data.mal);
        $('textarea[name="description"]').val(data.data);
        $('textarea[name="mediainfo"]').val(data.mediainfo);
        $('input[name=keywords]').val(data.geners.join(", "));
        MediaInfoParse(data.mediainfo);
        $('select#autotype').val(5);

    });
}

function cutTitle(input) {
    if (input.length > 26) {
      return input.substring(0, 23) + '...';
   }
   return input;
}

function getData(id) {
    let req = $.ajax({
        type: "GET",
        url: "https://easypost.wien-subs.moe/api.php?whos=aniromeget&id="+id,
        async: false
    }).responseText
    req = JSON.parse(atob(req));
    return req;
}


( function ( $ ) {
    $(document).ready(function() {
        doButtons(getdata_list());
        btnTrigger();
        btnReload();
    });
})(jQuery);
