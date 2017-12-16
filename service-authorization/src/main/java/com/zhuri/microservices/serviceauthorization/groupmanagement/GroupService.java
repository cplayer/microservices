package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    @Autowired
    GroupMapper groupMapper;

    public Group getGroupTree() {
        Group root = null;
        List<Group> groupList = groupMapper.getAllGroups();
        return this.generateGroupTree(1, groupList);

    }

    private Group getGroupById(int id, List<Group> groupList) {
        Group group = null;
        for (Group item : groupList) {
            if (item.getId() == id) {
                group = item;
                break;
            }
        }
        return group;
    }

    private List<Group> getChildGroupsById(int id, List<Group> groupList){
        List<Group> childGroupList = new ArrayList<Group>();
        for (Group item : groupList) {
            if(item.getParentId() == id){
                childGroupList.add(item);
            }
        }
        return childGroupList;
    }

    private Group generateGroupTree(int rootId,  List<Group> groupList){
        Group root = this.getGroupById(rootId, groupList);
        List<Group> childGroupList = this.getChildGroupsById(rootId, groupList);
        for (Group item : childGroupList) {
            Group node = this.generateGroupTree(item.getId(), groupList);
            root.getChildren().add(node);
        }
        return root;
    }
}

