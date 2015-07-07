
$(document).ready(function () {
    $(".hidden-container").hide();
    $("#picture").hide();
    $(".motivation").click(function () {
        $("#picture").toggle();
    });
    $(".learnBtn").click(function () {
        $(".hidden-container").toggle();
    });
    $("#clearLocalStorage").click(function(){localStorage.clear(); location.reload()
    });
String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};
});
