package com.zhuri.microservices.servicecustomerplan;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CustomerPlanEventController {

    @RequestMapping(value="/addCustomerPlanEvent", method = RequestMethod.POST)
    @ResponseBody
    public String addCustomerPlanEvent(@RequestBody List<CustomerPlanEvent> eventList, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            //model.addAttribute("error", bindingResult.getFieldErrors());
            return bindingResult.getFieldErrors().toString();
        }
        String s = "";
        for (CustomerPlanEvent customerPlanEvent: eventList
             ) {
            s += customerPlanEvent.getCustomerplanId() + " " + customerPlanEvent.getStartTime() + " " + customerPlanEvent.getEndTime() + "; ";
        } 
        return s;
    }
}
