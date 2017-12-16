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
    public int addInternalUser(User user,
                                BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return 0;
        } else {
            return userService.addInternalUser(user);
        }
    }

    @RequestMapping(value="/admin/getUserByRoleId", method = RequestMethod.GET)
    public PageBean<User> getUsersByRoleId(@RequestParam int id, @RequestParam int pageNumber, @RequestParam int pageSize) {
        return userService.getIUsersByRoleId(id, pageNumber, pageSize);
    }

    @RequestMapping(value="/admin/updateIuserRole", method = RequestMethod.POST)
    public int updateIuserRole(@RequestParam int iUserId,@RequestBody int[] roleIds) {
        if (roleIds == null) {
            return 0;
        }
        return userService.updateIuserRole(iUserId, roleIds);
    }
}
