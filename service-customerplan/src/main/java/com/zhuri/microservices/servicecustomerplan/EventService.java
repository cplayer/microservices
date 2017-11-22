package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EventService {
    @Autowired
    EventTypeMapper eventTypeMapper;

    @Autowired
    EventMapper eventMapper;

    public List<EventTypeTree> getUITreeAndUINode() {
        //If cache is needed?
        List<EventTypeTree> eventTypeTrees = eventTypeMapper.getAllUITrees();
        for (EventTypeTree eventTypeTree : eventTypeTrees
             ) {
            eventTypeTree.setNodes(eventMapper.getEventsByEventType(eventTypeTree.getId()));
        }
        return eventTypeTrees;
    }
}
