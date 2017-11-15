package com.zhuri.microservices.servicecustomerplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerPlanEventService {
    @Autowired
    CustomerPlanEventMapper customerPlanEventMapper;

    public int addCustomerPlanEvent(List<CustomerPlanEvent> eventList) {
        int result = 0;
        for (CustomerPlanEvent customerPlanEvent : eventList) {
            result += customerPlanEventMapper.addCustomerPlanEvent(customerPlanEvent);
        }
        return result;
    }

    public List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId( int customerPlanId) {
        return customerPlanEventMapper.getCustomerPlanEventByCustomerPlanId(customerPlanId);
    }
}
