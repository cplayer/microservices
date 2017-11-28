$(document).ready(function ()
{
    // $("#stepProgress").loadStep({
    //     size: "large",
    //     color: "green",
    //     steps: [
    //         {
    //             title: "填写计划"
    //         },
    //         {
    //             title: "完善计划"
    //         },
    //         {
    //             title: "待审核"
    //         },
    //         {
    //             title: "已审核"
    //         }
    //     ]
    // });
    // $("#stepProgress").setStep(3);
    var stepProgressDiv = $("#stepProgress");
    var stepProgressBar = stepProgressDiv.progressStep({
        fillColor: "#516784",
        radius: 30,
        strokeColor: "#000000",
        "font-size": 18,
        "labelOffset": 45
    });
    stepProgressBar.addStep("填写计划");
    stepProgressBar.addStep("完善计划");
    stepProgressBar.addStep("待审核");
    stepProgressBar.addStep("已审核");
    stepProgressBar.refreshLayout();
    stepProgressBar.setCurrentStep(2);
});