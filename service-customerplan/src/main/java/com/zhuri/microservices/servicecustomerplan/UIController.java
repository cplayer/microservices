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
}
