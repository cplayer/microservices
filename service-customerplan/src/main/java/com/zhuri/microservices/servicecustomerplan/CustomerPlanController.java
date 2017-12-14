package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class CustomerPlanController {
    @Autowired
    CustomerPlanService customerPlanService;

    /*@RequestMapping("/test")
    public void user(@RequestHeader(value="user-id") String id, @RequestHeader(value="user-username") String username) {

        //System.out.println(httpServletRequest.getHeader("user-id"));
        //System.out.println(httpServletRequest.getHeader("user-username"));
        System.out.println(id + " " + username);
    }*/
    //customerPlan

    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.POST)
    public int addCustomerPlan(@RequestBody CustomerPlan customerPlan, BindingResult bindingResult, @RequestHeader(value="user-id") String userId) {
        if(bindingResult.hasErrors()) {
            return 0;
        } else {
            int id = Integer.parseInt(userId);
            customerPlan.setCustomerId(id);
            return customerPlanService.addCustomerPlan(customerPlan);
        }
    }

    //need customerPlan id
    @RequestMapping(value = "/updateCustomerPlan", method = RequestMethod.POST)
    public int updateCustomerPlan(@RequestBody CustomerPlan customerPlan, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return 0;
        } else {
            return customerPlanService.updateCustomerPlan(customerPlan);
        }
    }

    /*@RequestMapping(value="/getAllCustomerPlansByCustomerId", method=RequestMethod.GET)
    public List<CustomerPlan> getAllCustomerPlansByCustomerId(@RequestParam int customerId) {
        return customerPlanService.getCustomerPlansByCustomerId(customerId);
    }*/

    //status = 1 提交审核 2 已审核
    @RequestMapping(value="/setCustomerPlanStatus", method=RequestMethod.GET)
    public int setCustomerPlanStatus(@RequestParam int status, @RequestParam int id) {
        return customerPlanService.setCustomerPlanStatus(status, id);
    }

    /*@RequestMapping(value="/getCustomerPlansByCustomerIdAndStatus", method=RequestMethod.GET)
    public List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(@RequestParam int customerId, @RequestParam int status) {
        return customerPlanService.getCustomerPlansByCustomerIdAndStatus(customerId, status);
    }*/

    @RequestMapping(value="/getCustomerPlansByStatus", method=RequestMethod.GET)
    public List<CustomerPlan> getCustomerPlansByStatus(@RequestParam int status, Authentication authentication, @RequestHeader(value="user-id") String userId) {
        if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_EXAMINER"))) {
            return customerPlanService.getCustomerPlansByStatus(status);
        } else {
            int id = Integer.parseInt(userId);
            return customerPlanService.getCustomerPlansByCustomerIdAndStatus(id, status);
        }
    }

    //customerPlan event
    @RequestMapping(value="/getCustomerPlanEventByCustomerPlanId", method=RequestMethod.GET )
    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId(@RequestParam int customerPlanId) {
        return customerPlanService.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }

}