package com.zhuri.microservices.serviceauthorization.groupmanagement;

import java.util.ArrayList;
import java.util.List;

public class Group {
    private int id;
    private String name;
    private int parentId;
    private List<Group> children;

    public Group() {
    }

    public Group(int id, String name, int parentId, List<Group> children) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.children = children;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public List<Group> getChildren() {
        return children;
    }

    public void setChildren(List<Group> children) {
        this.children = children;
    }
}
