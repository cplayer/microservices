package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;

public class Event {
    private int Id;
    private int EventTypeId;
    private String EventNo;
    private String Name;
    private String EnglishName;
    private String Description;
    private String Mark;
    private int Effect;
    private int AllowTime;
    private int RemindTime;
    private int DeparmentId;
    private boolean Enabled;
    private int CreatMan;
    private Date CreatTime;
    private int UpdateMan;
    private Date UpdateTime;
    private int Sort;

    public Event() {
    }

    public Event(int id, int eventTypeId, String eventNo, String name, String englishName, String description, String mark, int effect, int allowTime, int remindTime, int deparmentId, boolean enabled, int creatMan, Date creatTime, int updateMan, Date updateTime, int sort) {
        Id = id;
        EventTypeId = eventTypeId;
        EventNo = eventNo;
        Name = name;
        EnglishName = englishName;
        Description = description;
        Mark = mark;
        Effect = effect;
        AllowTime = allowTime;
        RemindTime = remindTime;
        DeparmentId = deparmentId;
        Enabled = enabled;
        CreatMan = creatMan;
        CreatTime = creatTime;
        UpdateMan = updateMan;
        UpdateTime = updateTime;
        Sort = sort;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getEventTypeId() {
        return EventTypeId;
    }

    public void setEventTypeId(int eventTypeId) {
        EventTypeId = eventTypeId;
    }

    public String getEventNo() {
        return EventNo;
    }

    public void setEventNo(String eventNo) {
        EventNo = eventNo;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEnglishName() {
        return EnglishName;
    }

    public void setEnglishName(String englishName) {
        EnglishName = englishName;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getMark() {
        return Mark;
    }

    public void setMark(String mark) {
        Mark = mark;
    }

    public int getEffect() {
        return Effect;
    }

    public void setEffect(int effect) {
        Effect = effect;
    }

    public int getAllowTime() {
        return AllowTime;
    }

    public void setAllowTime(int allowTime) {
        AllowTime = allowTime;
    }

    public int getRemindTime() {
        return RemindTime;
    }

    public void setRemindTime(int remindTime) {
        RemindTime = remindTime;
    }

    public int getDeparmentId() {
        return DeparmentId;
    }

    public void setDeparmentId(int deparmentId) {
        DeparmentId = deparmentId;
    }

    public boolean isEnabled() {
        return Enabled;
    }

    public void setEnabled(boolean enabled) {
        Enabled = enabled;
    }

    public int getCreatMan() {
        return CreatMan;
    }

    public void setCreatMan(int creatMan) {
        CreatMan = creatMan;
    }

    public Date getCreatTime() {
        return CreatTime;
    }

    public void setCreatTime(Date creatTime) {
        CreatTime = creatTime;
    }

    public int getUpdateMan() {
        return UpdateMan;
    }

    public void setUpdateMan(int updateMan) {
        UpdateMan = updateMan;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }

    public int getSort() {
        return Sort;
    }

    public void setSort(int sort) {
        Sort = sort;
    }
}
