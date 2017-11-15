package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerPlanEventController {
    @Autowired
    CustomerPlanEventService customerPlanEventService;

    @RequestMapping(value="/addCustomerPlanEvent", method=RequestMethod.POST)
    @ResponseBody
    public int addCustomerPlanEvent(@RequestBody List<CustomerPlanEvent> eventList, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            //model.addAttribute("error", bindingResult.getFieldErrors());
            System.out.println(bindingResult.getFieldErrors().toString());
            return 0;
        } else {
            return customerPlanEventService.addCustomerPlanEvent(eventList);
        }
    }

    @RequestMapping(value="getCustomerPlanEventByCustomerPlanId", method=RequestMethod.GET )
    @ResponseBody
    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId(@RequestParam int customerPlanId) {
        return customerPlanEventService.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }
}
