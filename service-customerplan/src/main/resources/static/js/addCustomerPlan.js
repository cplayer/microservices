$(document).ready(function ()
{
    $("#dtp-time").datetimepicker();
});

$("#btn-submit").click(function ()
{
    console.log("Submit Clicked");
    var strName = $("#Name").val();
    var intCustomer = $("#Customer").val();
    var intBrand = $("#Brand").val();
    var _dateUptime = $("#dtp-time").data('DateTimePicker').date();
    var dateUptime = _dateUptime.format("GGGG-MM-DD");
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