package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    @Autowired
    GroupMapper groupMapper;

    public int addGroup(Group group) {
        return groupMapper.addGroup(group);
    }

    public int updateGroup(Group group) {
        return groupMapper.updateGroup(group);
    }

    @Transactional
    public int deleteGroupById(int id) {
        int result = 0;
        result = groupMapper.countGroupsByParentId(id);
        if(result > 0) {
            return 0;
        }
        result = groupMapper.countUsersByGroupId(id);
        if(result > 0) {
            return 0;
        } else {
            groupMapper.deleteGroupById(id);
            return 1;
        }
    }

    public  Group getGroupByIUserId(int iUserId) {
        return groupMapper.getGroupByIUserId(iUserId);
    }

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
            if(root.getChildren()==null) {
                root.setChildren(new ArrayList<>());
            }
            root.getChildren().add(node);
        }
        return root;
    }
}

