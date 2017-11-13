package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventTypeController {
    @Autowired
    EventTypeService eventTypeService;

    @RequestMapping(value = "/addEventType", method = RequestMethod.GET)
    public int addEventType() {
        return eventTypeService.addEventType();
    }

    @RequestMapping(value = "/enableEventType", method = RequestMethod.GET)
    public int enableEventType() {
        return eventTypeService.enableEventType();
    }

    public int updateEventType() {
        return 0;
    }

    public EventType getEventType() {
        return null;
    }

    @RequestMapping(value = "/getAllEventType", method = RequestMethod.GET)
    public List<EventType> getAllEventType() {
        return eventTypeService.getAllEventType();
    }
}
