package com.zhuri.microservices.servicecustomerplan;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UIController {
    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.GET)
    public String addCustomerPlan() {
        return "addCustomerPlan";
    }

    @RequestMapping(value = "/addCustomerPlanEvent", method = RequestMethod.GET)
    public String addCustomerPlanEvent() {
        return "addCustomerPlanEvent";
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public String dashboard () {
        return "dashboard";
    }

    @RequestMapping(value = "/eventReview", method = RequestMethod.GET)
    public String eventReview () {
        return "eventReview";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login () { return "login"; }
}
