package com.zhuri.microservices.serviceauthorization;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UIController
{
    @RequestMapping(value="/login", method = RequestMethod.GET)
    public ModelAndView login(@RequestParam(value = "error", required = false) String error) {
        ModelAndView model = new ModelAndView("loginPage");
        if (error != null) {
            model.addObject("error", "Invalid Username and Password!");
        }
        return model;
    }

    @RequestMapping(value="/admin/userManagement", method = RequestMethod.GET)
    public String userManagement(){
        return "/admin/userManagement";
    }

    @RequestMapping(value="/admin/userAddition", method = RequestMethod.GET)
    public String userAddition(){
        return "/admin/userAddition";
    }

    @RequestMapping(value="/admin/updatePassword", method = RequestMethod.GET)
    public String updatePassword(){
        return "/admin/updatePassword";
    }

    @RequestMapping(value="/admin/updateUserInfo", method = RequestMethod.GET)
    public String updateUserInfo(){
        return "/admin/updateUserInfo";
    }
}
