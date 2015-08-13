/**
 * Created by quocanh on 13/08/2015.
 */
function getLanguageResources() {
    var fr = new Array();
    var en = new Array();
    fr['Title'] = 'Titre';
    en['Title'] = 'Title';
    fr['new-place'] = 'Ajouter une place';
    en['new-place'] = 'Add a new place';
    fr['settings'] = "paramètres";
    en['settings'] = "settings";
    fr['default_feed'] = "Flux par défaut";
    en['default_feed'] = "Default feed";
    fr['hidden'] = "Masquer";
    en['hidden'] = " Hidden";
    fr['save_settings'] = "Enregistrer les paramètres";
    en['save_settings'] = "Save settings";

    var resources = new Array();
    resources['fr'] = fr;
    resources['en'] = en;

    return resources;
}

function changeLanguage(lang) {
    var langResources = getLanguageResources()[lang];

    $("span[name='lbl']").each(function (i, elt) {
        $(elt).text(langResources[$(elt).attr("caption")]);
    });
}

$(function () {
    //$("#multiLanguages").load("view/multiLanguages.html");
    $("input[name='radio-language']").click(function () {
        changeLanguage($(this).val());

    });
});