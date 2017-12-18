package com.zhuri.microservices.servicecustomerplan;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UIController {
    @RequestMapping(value = "/customerPlan", method = RequestMethod.GET)
    public String customerPlan() {
        return "customerPlan";
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public String dashboard () {
        return "dashboard";
    }

    @RequestMapping(value = "/eventReview", method = RequestMethod.GET)
    public String eventReview () {
        return "eventReview";
    }

    @RequestMapping(value = "/userInfo", method = RequestMethod.GET)
    public String userInfo () { return "userInfo"; }
}
