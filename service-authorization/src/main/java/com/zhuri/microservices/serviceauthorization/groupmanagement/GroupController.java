package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GroupController {
    @Autowired
    GroupService groupService;

    @RequestMapping(value="/admin/getGroupTree", method = RequestMethod.GET)
    public List<Group> getGroupTree() {
        List<Group> groupList = new ArrayList<>();
        groupList.add(groupService.getGroupTree());
        groupList.add(new Group(0,"未分组用户",0,null));
        return groupList;
    }
}
