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
        fillPlaceTypes($('#placeTypeCriterion'), "/api/types");
        fillPlaceTypes($('#placeType'), "/api/getListAllTypes");
    });
});

function initTypeLabels() {
    var en = new Array();
    var vn = new Array();
    var fr = new Array();

    en['RESTAURANT'] = "Restaurant";
    fr['RESTAURANT'] = "Restaurant";
    vn['RESTAURANT'] = "Ẩm thực";

    en['ADMINISTRATION'] = "Administration";
    fr['ADMINISTRATION'] = "Administration";
    vn['ADMINISTRATION'] = "Cơ quan hành chính";

    en['COMPANY'] = "Company";
    fr['COMPANY'] = "Société";
    vn['COMPANY'] = "Công ty, doanh nghiệp";

    en['ASSOCIATION'] = "Association";
    fr['ASSOCIATION'] = "Association";
    vn['ASSOCIATION'] = "Hiệp hội, tổ chức";

    en['HEALTH'] = "Health";
    fr['HEALTH'] = "Santé";
    vn['HEALTH'] = "Sức khỏe"; // Pharmacy & Doctor

    en['MARKET'] = "Market";
    fr['MARKET'] = "Marché";
    vn['MARKET'] = "Chợ, thực phẩm";

    en['BEAUTY'] = "Beauty";
    fr['BEAUTY'] = "Beauté";
    vn['BEAUTY'] = "Chăm sóc sắc đẹp";

    en['TOURISM'] = "Tourism";
    fr['TOURISM'] = "Tourisme";
    vn['TOURISM'] = "Du lịch";

    en['HISTORY'] = "History";
    fr['HISTORY'] = "Site historique";
    vn['HISTORY'] = "Di tích lịch sử";

    en['RELIGION'] = "Religion";
    fr['RELIGION'] = "Religion";
    vn['RELIGION'] = "Tôn giáo, tín ngưỡng";

    en['EVENT'] = "Event";
    fr['EVENT'] = "Evénement";
    vn['EVENT'] = "Sự kiện";

    en['INDIVIDUAL'] = "Individual";
    fr['INDIVIDUAL'] = "Personnage";
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