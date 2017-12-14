package com.zhuri.microservices.servicecustomerplan;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerPlanService {
    @Autowired
    CustomerPlanMapper customerPlanMapper;

    //customerplan
    public int addCustomerPlan(CustomerPlan customerPlan) {
        int result = 0;
        customerPlanMapper.addCustomerPlan(customerPlan);
        if(customerPlan.getEventList() == null) {
            return 1;
        }
        for (CustomerPlanEvent customerPlanEvent : customerPlan.getEventList()) {
            customerPlanEvent.setCustomerPlanId(customerPlan.getId());
            result += customerPlanMapper.addCustomerPlanEvent(customerPlanEvent);
        }
        return result;

    }

    public int updateCustomerPlan(CustomerPlan customerPlan) {
        int i,result = 0;
        CustomerPlanEvent tmp = null;
        //1.update basic info
        customerPlanMapper.updateCustomerPlan(customerPlan);
        if(customerPlan.getEventList() == null) {
            return 1;
        }
        //2.update customerPlan events
        //2.1 get all old customerPlan event id
        List<CustomerPlanEvent> oldCustomerPlanEvent = customerPlanMapper.getCustomerPlanEventByCustomerPlanId(customerPlan.getId());

        //2.2 update
        for (i=0; i<oldCustomerPlanEvent.size() && i<customerPlan.getEventList().size(); i++) {
            tmp = customerPlan.getEventList().get(i);
            tmp.setId(oldCustomerPlanEvent.get(i).getId());
            tmp.setCustomerPlanId(customerPlan.getId());
            customerPlanMapper.updateCustomerPlanEvent(tmp);
        }
        //2.3 delete rest
        while (i<oldCustomerPlanEvent.size()) {
            customerPlanMapper.delete(oldCustomerPlanEvent.get(i).getId());
            i++;
        }
        //2.4 insert
        while (i<customerPlan.getEventList().size()) {
            tmp = customerPlan.getEventList().get(i);
            tmp.setCustomerPlanId(customerPlan.getId());
            customerPlanMapper.addCustomerPlanEvent(tmp);
            i++;
        }
        result = 1;
        return result;
    }
/*
    public List<CustomerPlan> getCustomerPlansByCustomerId(int customerId) {
        return customerPlanMapper.getCustomerPlansByCustomerId(customerId);
    }*/

    //status = 1 提交审核 2 已审核
    public int setCustomerPlanStatus(int status, int id) {
        return customerPlanMapper.setCustomerPlanStatus(status, id);
    }

    public List<CustomerPlan> getCustomerPlansByStatus(int status, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<CustomerPlan> allItems = customerPlanMapper.getCustomerPlansByStatus(status);
        int countNums = customerPlanMapper.countCustomerPlansByStatus(status);            //总记录数
        PageBean<CustomerPlan> pageData = new PageBean<>(pageNum, pageSize, countNums);
        pageData.setItems(allItems);
        return pageData.getItems();
    }

    public List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(int customerId, int status, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<CustomerPlan> allItems = customerPlanMapper.getCustomerPlansByCustomerIdAndStatus(customerId, status);
        int countNums = customerPlanMapper.countCustomerPlansByCustomerIdAndStatus(customerId,status);
        PageBean<CustomerPlan> pageData = new PageBean<>(pageNum, pageSize, countNums);
        pageData.setItems(allItems);
        return pageData.getItems();
    }


    //customrPlan event
    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId( int customerPlanId) {
        return customerPlanMapper.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }
}
