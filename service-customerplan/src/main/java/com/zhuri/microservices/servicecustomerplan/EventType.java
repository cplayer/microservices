package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;

public class EventType {
    private int id;
    private String name;
    private String eventTypeNo;
    private String description;
    private String status;
    private boolean enabled;
    private int createMan;
    private Date createTime;
    private int updateMan;
    private Date updateTime;

    public EventType() {
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

    public String getEventTypeNo() {
        return eventTypeNo;
    }

    public void setEventTypeNo(String eventTypeNo) {
        this.eventTypeNo = eventTypeNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getCreateMan() {
        return createMan;
    }

    public void setCreateMan(int createMan) {
        this.createMan = createMan;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getUpdateMan() {
        return updateMan;
    }

    public void setUpdateMan(int updateMan) {
        this.updateMan = updateMan;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
