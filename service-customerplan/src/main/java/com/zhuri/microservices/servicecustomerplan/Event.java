package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;

public class Event {
    private int d;
    private int eventTypeId;
    private String eventNo;
    private String name;
    private String englishName;
    private String description;
    private String mark;
    private int effect;
    private int allowTime;
    private int remindTime;
    private int deparmentId;
    private boolean enabled;
    private int creatMan;
    private Date creatTime;
    private int updateMan;
    private Date updateTime;
    private int sort;

    public Event() {
    }

    public int getD() {
        return d;
    }

    public void setD(int d) {
        this.d = d;
    }

    public int getEventTypeId() {
        return eventTypeId;
    }

    public void setEventTypeId(int eventTypeId) {
        this.eventTypeId = eventTypeId;
    }

    public String getEventNo() {
        return eventNo;
    }

    public void setEventNo(String eventNo) {
        this.eventNo = eventNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public int getEffect() {
        return effect;
    }

    public void setEffect(int effect) {
        this.effect = effect;
    }

    public int getAllowTime() {
        return allowTime;
    }

    public void setAllowTime(int allowTime) {
        this.allowTime = allowTime;
    }

    public int getRemindTime() {
        return remindTime;
    }

    public void setRemindTime(int remindTime) {
        this.remindTime = remindTime;
    }

    public int getDeparmentId() {
        return deparmentId;
    }

    public void setDeparmentId(int deparmentId) {
        this.deparmentId = deparmentId;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getCreatMan() {
        return creatMan;
    }

    public void setCreatMan(int creatMan) {
        this.creatMan = creatMan;
    }

    public Date getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(Date creatTime) {
        this.creatTime = creatTime;
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

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
