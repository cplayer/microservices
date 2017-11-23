package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventController {
    @Autowired
    EventService eventService;

    @RequestMapping(value = "getUITreeAndUINode", method = RequestMethod.GET)
    public List<EventTypeTree> getUITreeAndUINode() {
        return eventService.getUITreeAndUINode();
    }
}
