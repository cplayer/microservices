package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TemplateController {

    @Autowired
    TemplateService templateService;

    @RequestMapping(value="/getAllTemplates", method = RequestMethod.GET)
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @RequestMapping(value="/getTemplateEventByTemplateId", method = RequestMethod.GET)
    public List<EventNode> getTemplateEventByTemplateId(@RequestParam int id) {
        return templateService.getTemplateEventsByTemplateId(id);
    }
}
