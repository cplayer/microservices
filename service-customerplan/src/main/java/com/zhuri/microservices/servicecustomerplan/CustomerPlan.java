package com.zhuri.microservices.servicecustomerplan;

import java.util.Date;
import java.util.List;

public class CustomerPlan {
    private List<CustomerPlanEvent> eventList;

    private int id;
    private String name;
    private int customerId;
    private int brandId;
    private Date saleDate;
    private int status;
    private Date createDate;

    public CustomerPlan() {
    }

    public List<CustomerPlanEvent> getEventList() {
        return eventList;
    }

    public void setEventList(List<CustomerPlanEvent> eventList) {
        this.eventList = eventList;
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

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getBrandId() {
        return brandId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public Date getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(Date saleDate) {
        this.saleDate = saleDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
