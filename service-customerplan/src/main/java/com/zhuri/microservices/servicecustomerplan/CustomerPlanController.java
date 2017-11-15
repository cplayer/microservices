package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class CustomerPlanController {
    @Autowired
    CustomerPlanService customerPlanService;

    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.GET)
    public String addCustomerPlanPage() {
        return "addCustomerPlan";
    }

    @RequestMapping(value = "/addCustomerPlan", method = RequestMethod.POST)
    public String addCustomerPlan(CustomerPlan customerPlan, BindingResult bindingResult, Model model) {
        if(bindingResult.hasErrors()) {
            model.addAttribute("error", bindingResult.getFieldErrors());
            return "error";
        } else {
            customerPlanService.addCustomerPlan(customerPlan);
            model.addAttribute("customerPlan", customerPlan);
            return "addCustomerPlanEvent";
        }
    }

    @RequestMapping(value="/getAllCustomerPlanByCustomerId", method=RequestMethod.GET)
    @ResponseBody
    public List<CustomerPlan> getAllCustomerPlanByCustomerId(@RequestParam int customerId) {
        return customerPlanService.getAllCustomerPlanByCustomerId(customerId);
    }

    @RequestMapping(value="/setCustomerPlanStatus", method=RequestMethod.GET)
    @ResponseBody
    public int setCustomerPlanStatus(@RequestParam int status, @RequestParam int id) {
        return customerPlanService.setCustomerPlanStatus(status, id);
    }
}