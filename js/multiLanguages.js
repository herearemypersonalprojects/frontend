/**
 * Created by quocanh on 13/08/2015.
 */
function getLanguageResources() {
    var fr = new Array();
    var en = new Array();
    var vn = new Array();

    fr['AddNewPlace'] = 'Ajouter une place';
    en['AddNewPlace'] = 'Add a new place';
    vn['AddNewPlace'] = 'Thêm địa điểm';

    fr['Title'] = 'Titre';
    en['Title'] = 'Title';
    vn['Title'] = 'Tiêu đề';

    fr['Address'] = 'Adresse';
    en['Address'] = 'Address';
    vn['Address'] = 'Địa chỉ';

    fr['Type'] = "Type";
    en['Type'] = "Type";
    vn['Type'] = "Phân loại";

    fr['OriginalFrom'] = "Original de";
    en['OriginalFrom'] = "Original from";
    vn['OriginalFrom'] = "Đến từ";

    fr['Photo'] = "Photo";
    en['Photo'] = "Photo";
    vn['Photo'] = "Hình ảnh";

    fr['Submit'] = "Soumettre";
    en['Submit'] = "Submit";
    vn['Submit'] = "Gửi đi";

    var resources = new Array();
    resources['fr'] = fr;
    resources['en'] = en;
    resources['vn'] = vn;

    return resources;
}

function changeLanguage(lang) {
    var langResources = getLanguageResources()[lang];

    $("span[name='lbl']").each(function (i, elt) {
        $(elt).text(langResources[$(elt).attr("caption")]);
    });

    $('.submit').val(langResources["Submit"]);
}

$(function () {
    //$("#multiLanguages").load("view/multiLanguages.html");
    changeLanguage('vn');
    $(".multiLanguages").change(function () {
        changeLanguage($(this).val());
    });
});