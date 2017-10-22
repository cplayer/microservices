package com.zhuri.microservices.servicehello;

import org.springframework.boot.context.embedded.EmbeddedServletContainerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController implements ApplicationListener<EmbeddedServletContainerInitializedEvent> {
    private int serverPort;
    @Override
    public void onApplicationEvent(EmbeddedServletContainerInitializedEvent event) {
        this.serverPort = event.getEmbeddedServletContainer().getPort();

    }

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String sayHello(@RequestParam String name){
        return "Hello " + name + ", greeting from port: " + serverPort;
    }
}
