package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;

public class EventType {
    private int Id;
    private String Name;
    private String EventTypeNo;
    private String Description;
    private String Status;
    private boolean Enabled;
    private int CreateMan;
    private Date CreateTime;
    private int updateMan;
    private Date UpdateTime;

    public EventType() {
    }

    public EventType(int id, String name, String eventTypeNo, String description, String status, boolean enabled, int createMan, Date createTime, int updateMan, Date updateTime) {
        Id = id;
        Name = name;
        EventTypeNo = eventTypeNo;
        Description = description;
        Status = status;
        Enabled = enabled;
        CreateMan = createMan;
        CreateTime = createTime;
        this.updateMan = updateMan;
        UpdateTime = updateTime;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEventTypeNo() {
        return EventTypeNo;
    }

    public void setEventTypeNo(String eventTypeNo) {
        EventTypeNo = eventTypeNo;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public boolean isEnabled() {
        return Enabled;
    }

    public void setEnabled(boolean enabled) {
        Enabled = enabled;
    }

    public int getCreateMan() {
        return CreateMan;
    }

    public void setCreateMan(int createMan) {
        CreateMan = createMan;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public int getUpdateMan() {
        return updateMan;
    }

    public void setUpdateMan(int updateMan) {
        this.updateMan = updateMan;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }
}
