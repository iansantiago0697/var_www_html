$(function(){
    // Update the copyright claim to current year
    let initialCurrentYear = 2022;
    let currentYear = new Date().getFullYear();
    let actualCurrentYear = currentYear > initialCurrentYear ? currentYear : initialCurrentYear;
    $("#footer-copyright-year").html("" + actualCurrentYear);
});
