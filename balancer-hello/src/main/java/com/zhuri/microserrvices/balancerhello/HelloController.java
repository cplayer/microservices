package com.zhuri.microserrvices.balancerhello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @Autowired
    HelloService helloService;
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String helloController(@RequestParam String name){
        return helloService.helloService(name)+". In balancer!";
    }
}
