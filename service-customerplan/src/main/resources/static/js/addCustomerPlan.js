var stepProgressDiv;
var stepProgressBar;

$(document).ready(function ()
{
    $("#dtp-time").datetimepicker();
    stepProgressDiv = $("#stepProgress");
    stepProgressBar = stepProgressDiv.progressStep({
        fillColor: "#516784",
        radius: 15,
        strokeColor: "#000000",
        "font-size": 18,
        "labelOffset": 30,
        margin: 30
    });
    stepProgressBar.addStep("填写计划");
    stepProgressBar.addStep("完善计划");
    stepProgressBar.addStep("待审核");
    stepProgressBar.addStep("已审核");
    stepProgressBar.refreshLayout();
    stepProgressBar.setCurrentStep(0);
});

$(window).resize(function ()
{
    stepProgressDiv.css("width", $(document.body).width() * 0.7);
    stepProgressBar.refreshLayout();
});

$("#btn-submit").click(function ()
{
    console.log("Submit Clicked");
    var strName = $("#Name").val();
    var intCustomer = $("#Customer").val();
    var intBrand = $("#Brand").val();
    var _dateUptime = $("#dtp-time").data('DateTimePicker').date();
    var dateUptime = moment(_dateUptime.format("GGGG-MM-DD")).format("x");
    var sendData = 
    {
        "name": strName,
        "customerId": intCustomer,
        "brandId": intBrand,
        "saleDate": dateUptime
    };
    console.log(sendData);
    $.ajax(
        {
            url: "/addCustomerPlan",
            data: JSON.stringify(sendData),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            success: function (data)
            {
                console.log("Success!");
                console.log(data);
            }
        }
    );
});