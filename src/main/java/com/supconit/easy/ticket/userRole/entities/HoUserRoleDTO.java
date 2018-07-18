package com.supconit.easy.ticket.userRole.entities;


import com.supconit.easy.ticket.util.util.BeanUtil;

import java.io.Serializable;


public class HoUserRoleDTO implements Serializable {
        
        private static final long serialVersionUID = 1L;
        /**用户ID*/
        private Long uid;
        /**角色ID*/
        private Long rid;
        
        public Long getUid() {
            return this.uid;
        }
        
        public void setUid(Long uid) {
            this.uid = uid;
        }
        
        public Long getRid() {
            return this.rid;
        }
        
        public void setRid(Long rid) {
            this.rid = rid;
        }
        
        public HoUserRole toModel() {
            HoUserRole model = new HoUserRole();
			BeanUtil.convert(this, model);
			return model;
        }
    
}