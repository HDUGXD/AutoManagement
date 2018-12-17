package com.kdmt.gxd.easy.user.entities;

import com.kdmt.gxd.easy.user.services.impl.AutoValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.io.Serializable;

@Document
public class HoUser implements Serializable {
        
        private static final long serialVersionUID = 1L;
        @AutoValue
        @Id
        private Long id;
        /**用户昵称*/
        private String username;
        /**邮箱|登录帐号*/
        private String email;
        /**密码*/
        private String password;
        /**创建时间*/
        private Date createTime;
        /**最后登录时间*/
        private Date lastLoginTime;
        /**1:有效，0:禁止登录*/
        private Long status;
        /**身份证号码*/
        private String idcard;
        
        private String department;
        
        private String company;
        /**电话号*/
        private String phoneNumber;
        /**备注*/
        private String remark;
        /**人员姓名*/
        private String person_name;
        /**人员生日*/
        private Date person_birth;
        /**人员编号*/
        private String person_code;


       //******分页属性-自定义********
           private int  pageNo;
           private int  pageSize;
       //**************************

    public String getPerson_name() {
        return person_name;
    }

    public void setPerson_name(String person_name) {
        this.person_name = person_name;
    }

    public Date getPerson_birth() {
        return person_birth;
    }

    public void setPerson_birth(Date person_birth) {
        this.person_birth = person_birth;
    }

    public String getPerson_code() {
        return person_code;
    }

    public void setPerson_code(String person_code) {
        this.person_code = person_code;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getUsername() {
            return this.username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getEmail() {
            return this.email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getPassword() {
            return this.password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
        
        public Date getCreateTime() {
            return this.createTime;
        }
        
        public void setCreateTime(Date createTime) {
            this.createTime = createTime;
        }
        
        public Date getLastLoginTime() {
            return this.lastLoginTime;
        }
        
        public void setLastLoginTime(Date lastLoginTime) {
            this.lastLoginTime = lastLoginTime;
        }
        
        public Long getStatus() {
            return this.status;
        }
        
        public void setStatus(Long status) {
            this.status = status;
        }
        
        public String getIdcard() {
            return this.idcard;
        }
        
        public void setIdcard(String idcard) {
            this.idcard = idcard;
        }
        
        public String getDepartment() {
            return this.department;
        }
        
        public void setDepartment(String department) {
            this.department = department;
        }
        
        public String getCompany() {
            return this.company;
        }
        
        public void setCompany(String company) {
            this.company = company;
        }
        
        public String getRemark() {
            return this.remark;
        }
        
        public void setRemark(String remark) {
            this.remark = remark;
        }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}