package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerPlanController {
    @Autowired
    CustomerPlanService customerPlanService;

    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.POST)
    public int addCustomerPlan(CustomerPlan customerPlan, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return 0;
        } else {
            customerPlanService.addCustomerPlan(customerPlan);
            return customerPlan.getId();
        }
    }

    @RequestMapping(value="/getAllCustomerPlanByCustomerId", method=RequestMethod.GET)
    public List<CustomerPlan> getAllCustomerPlanByCustomerId(@RequestParam int customerId) {
        return customerPlanService.getAllCustomerPlanByCustomerId(customerId);
    }

    @RequestMapping(value="/setCustomerPlanStatus", method=RequestMethod.GET)
    public int setCustomerPlanStatus(@RequestParam int status, @RequestParam int id) {
        return customerPlanService.setCustomerPlanStatus(status, id);
    }
}