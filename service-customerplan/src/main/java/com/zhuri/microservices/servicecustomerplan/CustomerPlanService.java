package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerPlanService {
    @Autowired
    CustomerPlanMapper customerPlanMapper;
    //customerplan
    public int addCustomerPlan(CustomerPlan customerPlan) {
        int result = 0;
        customerPlanMapper.addCustomerPlan(customerPlan);
        for (CustomerPlanEvent customerPlanEvent : customerPlan.getEventList()) {
            customerPlanEvent.setCustomerPlanId(customerPlan.getId());
            result += customerPlanMapper.addCustomerPlanEvent(customerPlanEvent);
        }
        return result;

    }

    public List<CustomerPlan> getCustomerPlansByCustomerId(int customerId) {
        return customerPlanMapper.getCustomerPlansByCustomerId(customerId);
    }

    //status = 0 草稿 1 提交审核 2 已审核 3 申请完成 4 确认完成
    public int setCustomerPlanStatus(int status, int id) {
        return customerPlanMapper.setCustomerPlanStatus(status, id);
    }

    public List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(int customerId, int status) {
        return customerPlanMapper.getCustomerPlansByCustomerIdAndStatus(customerId, status);
    }

    public List<CustomerPlan> getCustomerPlansByStatus(int status) {
        return customerPlanMapper.getCustomerPlansByStatus(status);
    }

    //customrPlan event
    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId( int customerPlanId) {
        return customerPlanMapper.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }
}
