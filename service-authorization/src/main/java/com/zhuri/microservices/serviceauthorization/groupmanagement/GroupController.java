package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value="/admin/addGroup", method = RequestMethod.POST)
    public int addGroup(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @RequestMapping(value="/admin/updateGroup", method = RequestMethod.POST)
    public int updateGroup(@RequestBody Group group) {
        return groupService.updateGroup(group);
    }

    @RequestMapping(value="/admin/deleteGroupById", method = RequestMethod.POST)
    public int deleteGroupById(@RequestParam int id) {
        return  groupService.deleteGroupById(id);
    }

    @RequestMapping(value="/admin/getGroupByIUserId", method = RequestMethod.GET)
    public  Group getGroupByIUserId(@RequestParam  int iUserId) {
        return groupService.getGroupByIUserId(iUserId);
    }
}
