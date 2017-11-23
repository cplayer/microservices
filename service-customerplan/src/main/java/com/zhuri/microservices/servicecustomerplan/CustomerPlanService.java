package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CustomerPlanService {
    @Autowired
    CustomerPlanMapper customerPlanMapper;
    public void addCustomerPlan(CustomerPlan customerPlan) {
        customerPlan.setId(0);
        customerPlan.setCreateDate(new Date());
        customerPlan.setStatus(1);
        customerPlanMapper.addCustomerPlan(customerPlan);
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
}
