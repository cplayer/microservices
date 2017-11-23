package com.zhuri.microservices.servicecustomerplan;

import java.util.List;

/**
 * return to UI
 */
public class EventTypeTree {
    private int id;
    private String text;
    private List<EventNode> nodes;

    public EventTypeTree() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<EventNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<EventNode> nodes) {
        this.nodes = nodes;
    }
}
