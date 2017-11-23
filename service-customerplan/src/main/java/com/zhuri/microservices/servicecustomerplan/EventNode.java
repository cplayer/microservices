package com.zhuri.microservices.servicecustomerplan;

/**
 * return to UI with EventTypeTree
 */
public class EventNode {
    private int id;
    private String text;

    public EventNode() {
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
}
