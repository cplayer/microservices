package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;

public class CustomerPlanEvent {
    private int id;
    private int customerPlanId;
    private int eventId;
    private Date startTime;
    private Date endTime;
    private int sort;

    public CustomerPlanEvent() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomerPlanId() {
        return customerPlanId;
    }

    public void setCustomerPlanId(int customerPlanId) {
        this.customerPlanId = customerPlanId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
