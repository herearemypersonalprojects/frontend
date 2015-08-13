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

    fr['OriginalFrom'] = "Communauté";
    en['OriginalFrom'] = "Community";
    vn['OriginalFrom'] = "Cộng đồng";

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

function initTypeLabels() {
    var en = new Array();
    var vn = new Array();
    var fr = new Array();

    en['RESTAURANT'] = "Restaurant";
    vn['RESTAURANT'] = "Quán ăn";

    en['ADMINISTRATION'] = "Administration";
    vn['ADMINISTRATION'] = "Cơ quan";

    en['COMPANY'] = "Company";
    vn['COMPANY'] = "Công ty";

    en['ASSOCIATION'] = "Association";
    vn['ASSOCIATION'] = "Hiệp hội";

    en['HEALTH'] = "Health";
    vn['HEALTH'] = "Sức khỏe"; // Pharmacy & Doctor

    en['MARKET'] = "Market";
    vn['MARKET'] = "Chợ, thực phẩm";

    en['BEAUTY'] = "Beauty";
    vn['BEAUTY'] = "Chăm sóc sắc đẹp";

    en['TOURISM'] = "Tourism";
    vn['TOURISM'] = "Du lịch";

    en['HISTORY'] = "History";
    vn['HISTORY'] = "Di tích lịch sử";

    en['EVENT'] = "Event";
    vn['EVENT'] = "Sự kiện";

    en['INDIVIDUAL'] = "individual";
    vn['INDIVIDUAL'] = "Cá nhân";

    var resources = new Array();
    resources['fr'] = fr;
    resources['en'] = en;
    resources['vn'] = vn;

    return resources;
}

function getTypeLabel(typeCode) {
    var langResources = initTypeLabels()[$("#multiLanguages").val()];

    return langResources[typeCode];
}