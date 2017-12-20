package com.zhuri.microservices.serviceauthorization.usermanagement;

import com.zhuri.microservices.serviceauthorization.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /*@RequestMapping(value="/admin/test", method = RequestMethod.GET)
    public String test() {
        return "test";
    }*/

    @RequestMapping(value="/admin/checkInternalUserUsername", method = RequestMethod.GET)
    public int checkInternalUserUsername(@RequestParam  String username) {
        return userService.checkInternalUserUsername(username);
    }


    @RequestMapping(value="/admin/addInternalUser", method = RequestMethod.POST)
    public int addInternalUser(@RequestBody User user) {
        if(userService.addInternalUser(user)==0) {
            return 0;
        } else {
            return user.getId();
        }
    }

    @RequestMapping(value="/admin/getIUsersByRoleId", method = RequestMethod.GET)
    public PageBean<User> getIUsersByRoleId(@RequestParam int roleId, @RequestParam int pageNumber, @RequestParam int pageSize) {
        return userService.getIUsersByRoleId(roleId, pageNumber, pageSize);
    }

    @RequestMapping(value="/admin/getIUsersByGroupId", method = RequestMethod.GET)
    public PageBean<User> getIUsersByGroupoId(@RequestParam int groupId, @RequestParam int pageNumber, @RequestParam int pageSize) {
        return userService.getIUsersByGroupId(groupId, pageNumber, pageSize);
    }

    @RequestMapping(value="/admin/getIUsersByUserInfo", method = RequestMethod.GET)
    public PageBean<User> getIUsersByUserInfo(@RequestParam(required = false)Integer id, @RequestParam(required = false)String username,
                                  @RequestParam(required = false)String realName, @RequestParam(required = false)String mobilePhone,
                                  @RequestParam(required = false)String officePhone, @RequestParam(required = false)String emailAddress
                                    ,@RequestParam int pageNumber,@RequestParam int pageSize) {
        return userService.getIUsersByUserInfo(id,username,realName,mobilePhone,officePhone,emailAddress,pageNumber,pageSize);
    }

    @RequestMapping(value="/admin/updateIUserPassword", method = RequestMethod.POST)
    int updateIUserPassword(@RequestParam int id, @RequestParam String newPassword) {
        return userService.updateIUserPassword(id, newPassword);
    }

    @RequestMapping(value="/admin/updateIUserRole", method = RequestMethod.POST)
    public int updateIUserRole(@RequestParam int iUserId,@RequestParam(value = "roleIds[]") int[] roleIds) {
        if (roleIds == null) {
            return 0;
        }
        return userService.updateIUserRole(iUserId, roleIds);
    }

    @RequestMapping(value="/admin/updateIUserGroup", method = RequestMethod.POST)
    public int updateIUserGroup(@RequestParam int iUserId,@RequestParam int groupId) {
        return userService.updateIUserGroup(iUserId, groupId);
    }

    @RequestMapping(value="/admin/updateIUserInfo", method = RequestMethod.POST)
    public int updateIUserInfo(@RequestBody User user){
        return userService.updateIUserInfo(user);
    }

}
