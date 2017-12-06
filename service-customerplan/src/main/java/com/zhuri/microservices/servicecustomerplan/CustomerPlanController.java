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

    //customerPlan

    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.POST)
    public int addCustomerPlan(@RequestBody CustomerPlan customerPlan, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return 0;
        } else {
            return customerPlanService.addCustomerPlan(customerPlan);
        }
    }

    @RequestMapping(value="/getAllCustomerPlansByCustomerId", method=RequestMethod.GET)
    public List<CustomerPlan> getAllCustomerPlansByCustomerId(@RequestParam int customerId) {
        return customerPlanService.getCustomerPlansByCustomerId(customerId);
    }

    //status = 0 草稿 1 提交审核 2 已审核 3 申请完成 4 确认完成
    @RequestMapping(value="/setCustomerPlanStatus", method=RequestMethod.GET)
    public int setCustomerPlanStatus(@RequestParam int status, @RequestParam int id) {
        return customerPlanService.setCustomerPlanStatus(status, id);
    }

    @RequestMapping(value="/getCustomerPlansByCustomerIdAndStatus", method=RequestMethod.GET)
    public List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(@RequestParam int customerId, @RequestParam int status) {
        return customerPlanService.getCustomerPlansByCustomerIdAndStatus(customerId, status);
    }

    @RequestMapping(value="/getCustomerPlansByStatus", method=RequestMethod.GET)
    public List<CustomerPlan> getCustomerPlansByStatus(@RequestParam int status) {
        return customerPlanService.getCustomerPlansByStatus(status);
    }

    //customerPlan event
    @RequestMapping(value="/getCustomerPlanEventByCustomerPlanId", method=RequestMethod.GET )
    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId(@RequestParam int customerPlanId) {
        return customerPlanService.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }

}