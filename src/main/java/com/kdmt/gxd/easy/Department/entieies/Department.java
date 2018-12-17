package com.kdmt.gxd.easy.Department.entieies;

import com.kdmt.gxd.easy.user.entities.HoUser;

import java.io.Serializable;
import java.util.List;

public class Department implements Serializable {


    //部门名称
    private String departmentName;

    //部门编号
    private String code;

    //对应公共内存空间名称
    private String spaceName;

    //空间最大
    private String maxSpace;

    //空间已用
    private String hasUse;

    //空间剩余可用大小
    private String canUse;

    //空间可使用人员的集合
    private List<HoUser> list;

    //对当前空间的使用权限
    private String shiro;

    //群组类型
    private String groupType;

    //群组名称
    private String groupName;

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Department(String departmentName, String code, String spaceName, String maxSpace, String hasUse, String canUse, List<HoUser> list, String shiro, String groupType) {
        this.departmentName = departmentName;
        this.code = code;
        this.spaceName = spaceName;
        this.maxSpace = maxSpace;
        this.hasUse = hasUse;
        this.canUse = canUse;
        this.list = list;
        this.shiro = shiro;
        this.groupType = groupType;
    }

    public Department() {

    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSpaceName() {
        return spaceName;
    }

    public void setSpaceName(String spaceName) {
        this.spaceName = spaceName;
    }

    public String getMaxSpace() {
        return maxSpace;
    }

    public void setMaxSpace(String maxSpace) {
        this.maxSpace = maxSpace;
    }

    public String getHasUse() {
        return hasUse;
    }

    public void setHasUse(String hasUse) {
        this.hasUse = hasUse;
    }

    public String getCanUse() {
        return canUse;
    }

    public void setCanUse(String canUse) {
        this.canUse = canUse;
    }

    public List<HoUser> getList() {
        return list;
    }

    public void setList(List<HoUser> list) {
        this.list = list;
    }

    public String getShiro() {
        return shiro;
    }

    public void setShiro(String shiro) {
        this.shiro = shiro;
    }

    public String getGroupType() {
        return groupType;
    }

    public void setGroupType(String groupType) {
        this.groupType = groupType;
    }
}