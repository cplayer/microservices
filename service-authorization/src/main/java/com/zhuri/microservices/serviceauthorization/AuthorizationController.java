package com.zhuri.microservices.serviceauthorization;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class AuthorizationController {
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String loginPage(){
        return "login";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String loginCheck(Model model, HttpServletRequest req, HttpServletResponse resp,
                             @RequestParam(required = true) String username,
                             @RequestParam(required = true) String password){
        req.getSession().removeAttribute("username");
        if("user".equals(username) && "123".equals(password)) {
            req.getSession().setAttribute("username","user");
            return "index";
        } else {
            model.addAttribute("msg", "Invalid username or password!");
            return "login";
        }
    }

    @RequestMapping(value = "/logout",method = RequestMethod.GET)
    public String logout(Model model, HttpServletRequest req, HttpServletResponse resp) {
        req.getSession().removeAttribute("username");
        model.addAttribute("msg", "You have successfully logged out!");
        return "login";
    }
}
