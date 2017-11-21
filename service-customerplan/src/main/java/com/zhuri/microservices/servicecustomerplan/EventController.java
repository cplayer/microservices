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
