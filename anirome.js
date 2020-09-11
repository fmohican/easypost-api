// ==UserScript==
// @name         AniroME EasyPost Integration
// @version      0.1
// @description  You are lazy shit? It's okay cuz i'm.
// @author       Fmohican
// @match        https://aniro.me/upload/*
// @match        https://aniro.me/upload
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @grant        GM_*
// @grant        GM.*
// @license      WTFPL
// @run-at       document-end
// ==/UserScript==

function btnReload() {
    $('.upload').prepend("<div class='row'><a href='#' class='btn btn-danger easypost-reload'>[Reload Buttons]</a></div>");
    $(document).on('click', '.easypost-reload', function () {
        $('#easypost').remove();
        doButtons(getdata_list());
    });
}


function getdata_list() {
    let req = $.ajax({
        type: "GET",
        url: "https://wsp.ventus.me/easypost.wien-subs.moe/api.php?whos=anirome",
        async: false
    }).responseText
    req = JSON.parse(atob(req));
    return req;
}

function doButtons(data) {
    $('.upload').prepend("<div class='row' id='easypost' style='margin-top:20px;'></div>");
    $.each(data, function (index, value) {
        $('#easypost').append("<div class='col-md-1'><a href='#' class='btn btn-primary easypost' data-id='"+value.id+"'>"+value.title+"</a></div>");
    });
}

function btnTrigger() {
    $(document).on('click', '.easypost', function () {
        let data = getData($(this).data('id'));
        //$('input#title').val(data.title);
        $('input#autotmdb').val(data.imdb);
        $('input#autoimdb').val(data.tmdb);
        $('input#tvdb').val(data.tvdb);
        $('input#autotvdb').val(data.tvdb);
        $('input[name="mal"]').val(data.mal);
        $('textarea[name="description"]').val(data.data);
        $('textarea[name="mediainfo"]').val(data.mediainfo);
        $('.selectpicker').selectpicker('val', data.geners);
    });
}


function getData(id) {
    let req = $.ajax({
        type: "GET",
        url: "https://wsp.ventus.me/easypost.wien-subs.moe/api.php?whos=aniromeget&id="+id,
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
