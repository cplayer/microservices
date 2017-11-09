package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class EventController {
    @Autowired
    EventService eventService;

    @RequestMapping(value = "/addEventType", method = RequestMethod.GET)
    @ResponseBody
    public int addEventType() {
        return eventService.addEventType();
    }

    @RequestMapping(value = "/enableEventType", method = RequestMethod.GET)
    @ResponseBody
    public int enableEventType() {
        return eventService.enableEventType();
    }

    public int updateEventType() {
        return 0;
    }

    public EventType getEventType() {
        return null;
    }

    @RequestMapping(value = "/getAllEventType", method = RequestMethod.GET)
    @ResponseBody
    public List<EventType> getAllEventType() {
        return eventService.getAllEventType();
    }

    public int addEvent() {
        return 0;
    }

    public int enableEvent() {
        return 0;
    }

    public int updateEvent() {
        return 0;
    }

    public EventType getEvent() {
        return null;
    }

    public List<EventType> getAllEvent() {
        return null;
    }
}
