package com.supconit.easy.ticket.permission.entities;


import com.supconit.easy.ticket.util.util.BeanUtil;

import java.io.Serializable;


public class HoPermissionDTO implements Serializable {
        
        private static final long serialVersionUID = 1L;
        /**url地址*/
        private String url;
        /**url描述*/
        private String name;
        
        public String getUrl() {
            return this.url;
        }
        
        public void setUrl(String url) {
            this.url = url;
        }
        
        public String getName() {
            return this.name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public HoPermission toModel() {
            HoPermission model = new HoPermission();
			BeanUtil.convert(this, model);
			return model;
        }
    
}