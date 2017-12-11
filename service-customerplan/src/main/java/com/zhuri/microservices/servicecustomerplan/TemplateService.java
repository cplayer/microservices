package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TemplateService {
    @Autowired
    TemplateMapper templateMapper;

    public List<Template> getAllTemplates() {
        return templateMapper.getAllTemplates();
    }

    public List<EventNode> getTemplateEventsByTemplateId(int id) {
        List<EventNode> eventNodes = new ArrayList<>();
        int[] eventIds = templateMapper.getTemplateEventIdsByTemplateId(id);

        for (int eid:eventIds) {
            eventNodes.add(templateMapper.getEventByEventId(eid));
        }
        return eventNodes;
    }
}
