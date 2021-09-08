// ==UserScript==
// @name         Wien-Subs Easy Category Modifier
// @namespace    https://wien-subs.moe/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */wp-admin/edit-tags.php*
// @match        */wp-admin/term.php*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';
    jQuery("document").ready(function () {
        var $ = jQuery;
        $("div[data-key=field_60fc6821d1946]").append('<a href="#" class="button myanimelist">getInfo</a>');
        $("tr[data-key=field_60fc6821d1946]").append('<a href="#" class="button myanimelist">getInfo</a>');
        $(document).on('click', '.myanimelist', function(e) {
            e.preventDefault();
            $(this).prop('disabled', true);
            if($('#acf-field_60fc6821d1946').val() == "") {
                alert("You must enter MyAnimeList Link before click getAnime");
            }
            else {
                $.post('https://wsp.fmohican.eu.org/MyAnimeListAPI/index.php', {
                    mal : $('#acf-field_60fc6821d1946').val(),
                    key : "d03395570b3d82fbe578802b518a0fdf",
                }).done(function (response) {
                    console.log(response.title);
                    $("#tag-name").val(response.title);
                    $("#acf-field_60f894649dbbb").val(response.title_english);
                    $("#acf-field_6138197dc9d47").val(response.title_acronim);
                    $("#acf-field_60f89553ddd4d").val(response.eps);
                    $("#acf-field_60fc6b9ee0505").val(response.release);
                    $("#acf-field_60f89578ddd4e").val(response.genre);
                    $("#acf-field_6103b34bd142d").val(response.video);
                });
            }
            $(this).prop('disabled', false);
        });
    });
})();
