package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CustomerPlanService {
    @Autowired
    CustomerPlanMapper customerPlanMapper;
    public void addCustomerPlan(CustomerPlan customerPlan) {
        customerPlan.setId(0);
        customerPlan.setCreateDate(new Date());
        customerPlanMapper.addCustomerPlan(customerPlan);
    }
}
